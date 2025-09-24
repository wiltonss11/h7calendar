const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());

// Static files
app.use(express.static(__dirname));
const US_STATES = [
  { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" }, { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" }, { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" }, { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" }, { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" }, { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" }, { code: "KS", name: "Kansas" }, { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" }, { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" }, { code: "MI", name: "Michigan" }, { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" }, { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" }, { code: "NV", name: "Nevada" }, { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" }, { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" }, { code: "ND", name: "North Dakota" }, { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" }, { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" }, { code: "SC", name: "South Carolina" }, { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" }, { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" }, { code: "VA", name: "Virginia" }, { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" }, { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" }
];


// API: obligations
app.get('/api/obligations', (_req, res) => {
  try {
    const federal = db.prepare('SELECT * FROM federal_obligations').all();
    const states = db.prepare('SELECT * FROM state_obligations').all();
    const locals = db.prepare('SELECT * FROM local_obligations').all();
    const flinks = db.prepare('SELECT * FROM federal_links').all();
    const fmonths = db.prepare('SELECT * FROM federal_months').all();
    const slinks = db.prepare('SELECT * FROM state_links').all();
    const smonths = db.prepare('SELECT * FROM state_months').all();
    const llinks = db.prepare('SELECT * FROM local_links').all();
    const lmonths = db.prepare('SELECT * FROM local_months').all();

    // Função para obter tipos de empresa dos dados embutidos
    const getCompanyTypes = (obligationId, scope) => {
      // Dados embutidos com tipos de empresa
      const embeddedObligations = {
        federal: [
          { id: "irs-1120", companyTypes: ["C-Corp"] },
          { id: "irs-1065", companyTypes: ["Partnership", "LLC"] },
          { id: "irs-941", companyTypes: ["Employer", "C-Corp", "S-Corp", "LLC", "Partnership"] },
          { id: "irs-940", companyTypes: ["Employer", "C-Corp", "S-Corp", "LLC", "Partnership"] },
          { id: "irs-1099", companyTypes: ["C-Corp", "S-Corp", "LLC", "Partnership", "Sole Proprietorship", "Contractor"] },
          { id: "irs-1120s", companyTypes: ["S-Corp"] },
          { id: "irs-1120s-k1", companyTypes: ["S-Corp"] },
          { id: "irs-1040-schedule-c", companyTypes: ["Sole Proprietorship"] },
          { id: "irs-990", companyTypes: ["Non-Profit"] }
        ],
        state: [
          { id: "ca-sales-tax", companyTypes: ["C-Corp", "S-Corp", "LLC", "Partnership", "Sole Proprietorship"] },
          { id: "ca-payroll", companyTypes: ["Employer", "C-Corp", "S-Corp", "LLC", "Partnership"] },
          { id: "ny-sales-tax", companyTypes: ["C-Corp", "S-Corp", "LLC", "Partnership", "Sole Proprietorship"] },
          { id: "ny-withholding", companyTypes: ["Employer", "C-Corp", "S-Corp", "LLC", "Partnership"] },
          { id: "tx-sales-tax", companyTypes: ["C-Corp", "S-Corp", "LLC", "Partnership", "Sole Proprietorship"] }
        ]
      };

      if (scope === 'federal') {
        const obligation = embeddedObligations.federal.find(o => o.id === obligationId);
        return obligation?.companyTypes || [];
      }
      if (scope === 'state') {
        const obligation = embeddedObligations.state.find(o => o.id === obligationId);
        return obligation?.companyTypes || [];
      }
      return [];
    };

    const federalWith = federal.map(o => ({
      id: o.id, title: o.title, frequency: o.frequency, due: o.due, who: o.who, sporadic: !!o.sporadic,
      companyTypes: getCompanyTypes(o.id, 'federal'),
      links: flinks.filter(l => l.obligation_id === o.id).map(l => ({ label: l.label, url: l.url })),
      months: fmonths.filter(m => m.obligation_id === o.id).map(m => m.month)
    }));

    const groupedStates = {};
    states.forEach(o => {
      if (!groupedStates[o.state]) groupedStates[o.state] = [];
      groupedStates[o.state].push({
        id: o.id, title: o.title, frequency: o.frequency, due: o.due, who: o.who, sporadic: !!o.sporadic,
        companyTypes: getCompanyTypes(o.id, 'state'),
        links: slinks.filter(l => l.obligation_id === o.id).map(l => ({ label: l.label, url: l.url })),
        months: smonths.filter(m => m.obligation_id === o.id).map(m => m.month)
      });
    });

    const groupedLocals = {};
    locals.forEach(o => {
      const key = `${o.state}`;
      if (!groupedLocals[key]) groupedLocals[key] = [];
      groupedLocals[key].push({
        id: o.id,
        level: o.level,
        county: o.county,
        city: o.city,
        title: o.title,
        frequency: o.frequency,
        due: o.due,
        who: o.who,
        sporadic: !!o.sporadic,
        companyTypes: getCompanyTypes(o.id, 'local'),
        links: llinks.filter(l => l.obligation_id === o.id).map(l => ({ label: l.label, url: l.url })),
        months: lmonths.filter(m => m.obligation_id === o.id).map(m => m.month)
      });
    });

    res.json({ federal: federalWith, states: groupedStates, locals: groupedLocals });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Falha ao consultar banco' });
  }
});

// Simple seed endpoint to import from JSON once
app.post('/api/seed', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'data', 'obligations.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const txn = db.transaction(() => {
      // clear
      db.exec('DELETE FROM federal_links; DELETE FROM federal_months; DELETE FROM federal_obligations;');
      db.exec('DELETE FROM state_links; DELETE FROM state_months; DELETE FROM state_obligations;');
      // federal
      const insFed = db.prepare('INSERT INTO federal_obligations (id,title,frequency,due,who,sporadic) VALUES (?,?,?,?,?,?)');
      const insFLink = db.prepare('INSERT INTO federal_links (obligation_id,label,url) VALUES (?,?,?)');
      const insFMonth = db.prepare('INSERT INTO federal_months (obligation_id,month) VALUES (?,?)');
      (data.federal || []).forEach(o => {
        insFed.run(o.id, o.title, o.frequency || null, o.due || null, o.who || null, o.sporadic ? 1 : 0);
        (o.links || []).forEach(l => insFLink.run(o.id, l.label, l.url));
        (o.months || []).forEach(m => insFMonth.run(o.id, m));
      });
      // states
      const insState = db.prepare('INSERT INTO state_obligations (id,state,title,frequency,due,who,sporadic) VALUES (?,?,?,?,?,?,?)');
      const insSLink = db.prepare('INSERT INTO state_links (obligation_id,label,url) VALUES (?,?,?)');
      const insSMonth = db.prepare('INSERT INTO state_months (obligation_id,month) VALUES (?,?)');
      Object.entries(data.states || {}).forEach(([state, list]) => {
        list.forEach(o => {
          const oid = o.id || `${state}-${Math.random().toString(36).slice(2,8)}`;
          insState.run(oid, state, o.title, o.frequency || null, o.due || null, o.who || null, o.sporadic ? 1 : 0);
          (o.links || []).forEach(l => insSLink.run(oid, l.label, l.url));
          (o.months || []).forEach(m => insSMonth.run(oid, m));
        });
      });
    });
    txn();
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Falha ao executar seed' });
  }
});

// Seed locais de exemplo (placeholders) para alguns condados/cidades por estado
app.post('/api/seed-locals', (_req, res) => {
  try {
    const ins = db.prepare('INSERT OR IGNORE INTO local_obligations (id,level,state,county,city,title,frequency,due,who,sporadic) VALUES (?,?,?,?,?,?,?,?,?,?)');
    const insLink = db.prepare('INSERT INTO local_links (obligation_id,label,url) VALUES (?,?,?)');
    const insMonth = db.prepare('INSERT INTO local_months (obligation_id,month) VALUES (?,?)');
    const txn = db.transaction(() => {
      // Exemplos: Los Angeles (CA), Miami-Dade (FL), NYC (NY)
      const records = [
        { id: 'CA-LA-sut', level: 'county', state: 'CA', county: 'Los Angeles County', city: null, title: 'County Sales and Use Tax Surtax', frequency: 'Mensal', due: 'Fim do mês seguinte', who: 'Varejistas no condado', months: [1,2,3,4,5,6,7,8,9,10,11,12] },
        { id: 'CA-LA-bus-license', level: 'city', state: 'CA', county: null, city: 'Los Angeles', title: 'City Business License Tax', frequency: 'Anual', due: 'Conforme calendário municipal', who: 'Negócios na cidade', months: [1] },
        { id: 'FL-MD-sut', level: 'county', state: 'FL', county: 'Miami-Dade County', city: null, title: 'Discretionary Sales Surtax', frequency: 'Mensal', due: 'Fim do mês seguinte', who: 'Varejistas no condado', months: [1,2,3,4,5,6,7,8,9,10,11,12] },
        { id: 'NY-NYC-bus', level: 'city', state: 'NY', county: null, city: 'New York City', title: 'NYC Business Taxes (GCT/UBT)', frequency: 'Anual/Estimativas', due: 'Conforme NYC DOF', who: 'Negócios em NYC', months: [4,6,9,12] }
      ];
      records.forEach(r => {
        ins.run(r.id, r.level, r.state, r.county, r.city, r.title, r.frequency, r.due, r.who, 0);
        (r.months || []).forEach(m => insMonth.run(r.id, m));
        // Link genérico placeholder
        insLink.run(r.id, 'Portal local', '#');
      });
    });
    txn();
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Falha ao seed locais' });
  }
});

// Seed placeholders for all missing states with basic obligations
app.post('/api/seed-fill-states', (_req, res) => {
  try {
    const existingStates = db.prepare('SELECT DISTINCT state FROM state_obligations').all().map(r => r.state);
    const missing = US_STATES.map(s => s.code).filter(code => !existingStates.includes(code));

    const insState = db.prepare('INSERT INTO state_obligations (id,state,title,frequency,due,who,sporadic) VALUES (?,?,?,?,?,?,?)');
    const insSLink = db.prepare('INSERT INTO state_links (obligation_id,label,url) VALUES (?,?,?)');
    const insSMonth = db.prepare('INSERT INTO state_months (obligation_id,month) VALUES (?,?)');

    const txn = db.transaction(() => {
      missing.forEach(state => {
        const create = (suffix, title, frequency, due, who, months, linkLabel, linkUrl) => {
          const id = `${state}-${suffix}`;
          insState.run(id, state, `${state} — ${title}`, frequency, due, who, 0);
          (months || []).forEach(m => insSMonth.run(id, m));
          if (linkLabel && linkUrl) insSLink.run(id, linkLabel, linkUrl);
        };
        // Placeholders genéricos por estado
        create('sales-tax', 'Sales and Use Tax Return', 'Mensal/Trimestral/Anual', 'Conforme calendário do estado', 'Vendedores com nexus no estado', [1,2,3,4,5,6,7,8,9,10,11,12], 'Portal Fiscal', null);
        create('withholding', 'Employer Withholding', 'Mensal/Trimestral', 'Conforme atribuição', 'Empregadores no estado', [1,2,3,4,5,6,7,8,9,10,11,12], 'Revenue/Tax Dept', null);
        create('ui', 'Unemployment Insurance', 'Trimestral', 'Conforme agência de trabalho', 'Empregadores no estado', [1,4,7,10], 'Workforce/DoL', null);
        create('annual-report', 'Annual/Biennial Report', 'Anual/Bianual', 'Conforme entidade/estado', 'Corp/LLC registradas no estado', [1], 'Secretary of State', null);
      });
    });
    txn();
    res.json({ ok: true, addedStates: missing });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Falha ao completar estados' });
  }
});

// Cron stub to update data periodically (e.g., daily at 03:00)
cron.schedule('0 3 * * *', () => {
  console.log('[CRON] Atualização de obrigações (stub)');
  // TODO: Implementar coleta de fontes oficiais (IRS/state sites) e atualização
});

// Fallback to index.html for root
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


