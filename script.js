/* Data model: obligations split by jurisdiction and state */
const STATES = [
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

let OBLIGATIONS = {
  federal: [
    {
      id: "irs-1120",
      title: "IRS Form 1120 — U.S. Corporation Income Tax Return",
      frequency: "Anual",
      due: "15º dia do 4º mês após o término do ano fiscal",
      who: "Corporations (C-Corp)",
      companyTypes: ["C-Corp"],
      links: [
        { label: "Instruções", url: "https://www.irs.gov/forms-pubs/about-form-1120" },
        { label: "Formulário", url: "https://www.irs.gov/pub/irs-pdf/f1120.pdf" }
      ]
    },
    {
      id: "irs-1065",
      title: "IRS Form 1065 — U.S. Return of Partnership Income",
      frequency: "Anual",
      due: "15º dia do 3º mês após o término do ano fiscal",
      who: "Parcerias (LLC tratada como partnership)",
      companyTypes: ["Partnership", "LLC"],
      links: [
        { label: "Instruções", url: "https://www.irs.gov/forms-pubs/about-form-1065" },
        { label: "Formulário", url: "https://www.irs.gov/pub/irs-pdf/f1065.pdf" }
      ]
    },
    {
      id: "irs-941",
      title: "IRS Form 941 — Employer's Quarterly Federal Tax Return",
      frequency: "Trimestral",
      due: "Último dia do mês após o fim do trimestre (Jan–Mar: 30/04, etc.)",
      who: "Empregadores com retenção de payroll federal",
      companyTypes: ["Employer", "C-Corp", "S-Corp", "LLC", "Partnership"],
      links: [
        { label: "Instruções", url: "https://www.irs.gov/forms-pubs/about-form-941" },
        { label: "E-file", url: "https://www.irs.gov/payments" }
      ]
    },
    {
      id: "irs-940",
      title: "IRS Form 940 — Employer's Annual Federal Unemployment (FUTA)",
      frequency: "Anual",
      due: "31 de janeiro (ou 10 de fevereiro se todos os depósitos foram pontuais)",
      who: "Empregadores sujeitos a FUTA",
      companyTypes: ["Employer", "C-Corp", "S-Corp", "LLC", "Partnership"],
      links: [
        { label: "Instruções", url: "https://www.irs.gov/forms-pubs/about-form-940" }
      ]
    },
    {
      id: "irs-1099",
      title: "IRS Forms 1099 — Informes a contratados e fornecedores",
      frequency: "Anual",
      due: "Envio a receptores até 31 de janeiro; e-file IRS até 31 de março (variável)",
      who: "Pagadores a contratados/juros/dividendos etc.",
      companyTypes: ["C-Corp", "S-Corp", "LLC", "Partnership", "Sole Proprietorship", "Contractor"],
      links: [
        { label: "Visão geral", url: "https://www.irs.gov/forms-pubs/about-form-1099-misc" }
      ]
    },
    {
      id: "irs-1120s",
      title: "IRS Form 1120-S — U.S. Income Tax Return for an S Corporation",
      frequency: "Anual",
      due: "15º dia do 3º mês após o término do ano fiscal",
      who: "S-Corporations",
      companyTypes: ["S-Corp"],
      links: [
        { label: "Instruções", url: "https://www.irs.gov/forms-pubs/about-form-1120s" },
        { label: "Formulário", url: "https://www.irs.gov/pub/irs-pdf/f1120s.pdf" }
      ]
    },
    {
      id: "irs-1120s-k1",
      title: "IRS Form 1120-S Schedule K-1 — Shareholder's Share of Income",
      frequency: "Anual",
      due: "Envio aos acionistas até 15º dia do 3º mês após fim do ano fiscal",
      who: "S-Corporations (para acionistas)",
      companyTypes: ["S-Corp"],
      links: [
        { label: "Instruções", url: "https://www.irs.gov/forms-pubs/about-form-1120s" }
      ]
    },
    {
      id: "irs-1040-schedule-c",
      title: "IRS Form 1040 Schedule C — Profit or Loss from Business",
      frequency: "Anual",
      due: "15 de abril (ou prorrogação até 15 de outubro)",
      who: "Sole Proprietorships e atividades comerciais",
      companyTypes: ["Sole Proprietorship"],
      links: [
        { label: "Instruções", url: "https://www.irs.gov/forms-pubs/about-schedule-c-form-1040" }
      ]
    },
    {
      id: "irs-990",
      title: "IRS Form 990 — Return of Organization Exempt From Income Tax",
      frequency: "Anual",
      due: "15º dia do 5º mês após o fim do ano fiscal",
      who: "Organizações isentas de impostos",
      companyTypes: ["Non-Profit"],
      links: [
        { label: "Instruções", url: "https://www.irs.gov/forms-pubs/about-form-990" }
      ]
    }
  ],
  states: {
    CA: [
      {
        id: "ca-sales-tax",
        title: "California — Sales and Use Tax Return",
        frequency: "Mensal/Trimestral/Anual (conforme volume)",
        due: "Geralmente último dia do mês seguinte",
        who: "Varejistas e vendedores sujeitos a sales/use tax",
        companyTypes: ["C-Corp", "S-Corp", "LLC", "Partnership", "Sole Proprietorship"],
        links: [
          { label: "CDTFA eFile", url: "https://onlineservices.cdtfa.ca.gov/" },
          { label: "Guia", url: "https://www.cdtfa.ca.gov/taxes-and-fees/sut-programs.htm" }
        ]
      },
      {
        id: "ca-payroll",
        title: "California — Payroll Withholding (EDD)",
        frequency: "Mensal/Quinzenal/Outro (segundo cadastro)",
        due: "Conforme calendário EDD",
        who: "Empregadores com retenção estadual",
        companyTypes: ["Employer", "C-Corp", "S-Corp", "LLC", "Partnership"],
        links: [
          { label: "EDD e-Services", url: "https://edd.ca.gov/en/e-Services_for_Business/" }
        ]
      }
    ],
    NY: [
      {
        id: "ny-sales-tax",
        title: "New York — Sales and Use Tax Return",
        frequency: "Mensal/Trimestral/Anual",
        due: "Conforme calendário do NYS",
        who: "Vendedores com nexus em NY",
        companyTypes: ["C-Corp", "S-Corp", "LLC", "Partnership", "Sole Proprietorship"],
        links: [
          { label: "File", url: "https://www.tax.ny.gov/online/" }
        ]
      },
      {
        id: "ny-withholding",
        title: "New York — Employer Withholding",
        frequency: "Mensal/Trimestral",
        due: "Conforme atribuição",
        who: "Empregadores em NY",
        companyTypes: ["Employer", "C-Corp", "S-Corp", "LLC", "Partnership"],
        links: [
          { label: "Guia", url: "https://www.tax.ny.gov/bus/emp/withhold.htm" }
        ]
      }
    ],
    TX: [
      {
        id: "tx-sales-tax",
        title: "Texas — Sales and Use Tax Return",
        frequency: "Mensal/Trimestral/Anual",
        due: "20º dia do mês seguinte (geral)",
        who: "Vendedores em TX",
        companyTypes: ["C-Corp", "S-Corp", "LLC", "Partnership", "Sole Proprietorship"],
        links: [
          { label: "Webfile", url: "https://comptroller.texas.gov/taxes/file-pay/webfile/" }
        ]
      }
    ]
  }
};

async function loadObligationsJSON() {
  try {
    const res = await fetch("/api/obligations", { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data && typeof data === "object") {
      if (Array.isArray(data.federal)) {
        OBLIGATIONS.federal = data.federal;
      }
      if (data.states && typeof data.states === "object") {
        OBLIGATIONS.states = data.states;
      }
      if (data.locals && typeof data.locals === "object") {
        OBLIGATIONS.locals = data.locals;
      }
    }
  } catch (e) {
    console.warn("Usando dados embutidos. Falha ao carregar data/obligations.json:", e);
  }
}

function populateStateSelect() {
  const select = document.getElementById("stateSelect");
  select.innerHTML = "";
  const optAll = document.createElement("option");
  optAll.value = "ALL";
  optAll.textContent = "Todos os Estados";
  select.appendChild(optAll);
  STATES.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.code;
    opt.textContent = `${s.code} — ${s.name}`;
    select.appendChild(opt);
  });
  select.value = "ALL";
}

function getFilteredObligations() {
  const state = document.getElementById("stateSelect").value;
  const includeFederal = document.getElementById("filterFederal").checked;
  const includeState = document.getElementById("filterState").checked;
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const county = (document.getElementById("countyInput")?.value || '').trim().toLowerCase();
  const city = (document.getElementById("cityInput")?.value || '').trim().toLowerCase();
  const companyType = document.getElementById("companyTypeSelect").value;

  const result = [];
  if (includeFederal) {
    result.push(...OBLIGATIONS.federal.map(o => ({ ...o, scope: "federal" })));
  }

  if (includeState) {
    if (state === "ALL") {
      Object.entries(OBLIGATIONS.states).forEach(([code, list]) => {
        list.forEach(o => result.push({ ...o, scope: "state", state: code }));
      });
    } else {
      (OBLIGATIONS.states[state] || []).forEach(o => result.push({ ...o, scope: "state", state }));
    }
  }

  let filtered = result;
  if (query) {
    filtered = filtered.filter(o => [o.title, o.frequency, o.due, o.who].filter(Boolean).join(" ").toLowerCase().includes(query));
  }
  if (county) {
    filtered = filtered.filter(o => (o.county || '').toLowerCase().includes(county));
  }
  if (city) {
    filtered = filtered.filter(o => (o.city || '').toLowerCase().includes(city));
  }
  if (companyType && companyType !== "ALL") {
    filtered = filtered.filter(o => {
      if (!o.companyTypes || !Array.isArray(o.companyTypes)) {
        return true; // Se não há tipos especificados, mostrar para todos
      }
      return o.companyTypes.includes(companyType);
    });
  }

  return filtered;
}

function renderCounts(list) {
  const countFederal = list.filter(o => o.scope === "federal").length;
  const countState = list.filter(o => o.scope === "state").length;
  document.getElementById("countFederal").textContent = String(countFederal);
  document.getElementById("countState").textContent = String(countState);
}

function renderObligations() {
  const list = getFilteredObligations();
  renderCounts(list);
  const sporadic = list.filter(o => o.sporadic === true);
  const scheduled = list.filter(o => o.sporadic !== true);
  renderList(scheduled);
  renderCalendar(scheduled);
  renderSporadic(sporadic);
  renderLocals();
}

function renderList(list) {
  const container = document.getElementById("obligationsList");
  container.innerHTML = "";
  list.forEach(item => container.appendChild(buildObligationCard(item)));
}

function buildObligationCard(item) {
  const card = document.createElement("div");
  card.className = "obligation";

  const header = document.createElement("div");
  header.className = "obligation-header";

  const title = document.createElement("div");
  title.className = "obligation-title";
  title.textContent = item.title;
  header.appendChild(title);

  const chips = document.createElement("div");
  chips.className = "chips";
  const chipScope = document.createElement("span");
  chipScope.className = `chip ${item.scope === "federal" ? "federal" : "state"}`;
  chipScope.textContent = item.scope === "federal" ? "Federal" : `Estadual${item.state ? ` • ${item.state}` : ""}`;
  chips.appendChild(chipScope);
  if (Array.isArray(item.months) && item.months.length) {
    const chipMonth = document.createElement("span");
    chipMonth.className = "chip";
    chipMonth.textContent = `Meses: ${item.months.join(", ")}`;
    chips.appendChild(chipMonth);
  }
  header.appendChild(chips);

  const meta = document.createElement("div");
  meta.className = "muted";
  meta.textContent = `${item.frequency || ""} • ${item.due || ""} • ${item.who || ""}`;

  const links = document.createElement("div");
  links.className = "links";
  if (Array.isArray(item.links)) {
    item.links.forEach(l => {
      const a = document.createElement("a");
      a.href = l.url; a.target = "_blank"; a.rel = "noreferrer noopener"; a.className = "link"; a.textContent = l.label;
      links.appendChild(a);
    });
  }

  card.appendChild(header);
  card.appendChild(meta);
  card.appendChild(links);
  return card;
}

function renderCalendar(list) {
  const cal = document.getElementById("obligationsCalendar");
  cal.innerHTML = "";
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const groups = Array.from({ length: 12 }, () => []);
  list.forEach(item => {
    if (Array.isArray(item.months) && item.months.length) {
      item.months.forEach(m => {
        if (m >= 1 && m <= 12) groups[m - 1].push(item);
      });
    } else {
      // Sem months definidos: mostrar em todos os meses da frequência trimestral/mensal básica
      if ((item.frequency || "").toLowerCase().includes("trimes")) {
        [3, 6, 9, 12].forEach(m => groups[m - 1].push(item));
      } else if ((item.frequency || "").toLowerCase().includes("mensal")) {
        for (let m = 1; m <= 12; m++) groups[m - 1].push(item);
      } else if ((item.frequency || "").toLowerCase().includes("anual")) {
        groups[11].push(item); // Dezembro por padrão
      }
    }
  });

  months.forEach((label, idx) => {
    const box = document.createElement("div");
    box.className = "month";
    const h4 = document.createElement("h4");
    h4.textContent = label;
    const wrap = document.createElement("div");
    wrap.className = "obligations";
    groups[idx].forEach(item => wrap.appendChild(buildObligationCard(item)));
    box.appendChild(h4);
    box.appendChild(wrap);
    cal.appendChild(box);
  });
}

function renderSporadic(list) {
  const container = document.getElementById("sporadicList");
  if (!container) return;
  container.innerHTML = "";
  list.forEach(item => {
    const card = buildObligationCard(item);
    card.classList.add("sporadic");
    const chips = card.querySelector('.chips');
    if (chips) {
      const chip = document.createElement('span');
      chip.className = 'chip state';
      chip.textContent = 'Esporádica';
      chips.appendChild(chip);
    }
    container.appendChild(card);
  });
}

function renderLocals() {
  const container = document.getElementById('localsList');
  if (!container) return;
  container.innerHTML = '';
  const state = document.getElementById('stateSelect').value;
  const county = (document.getElementById('countyInput')?.value || '').trim().toLowerCase();
  const city = (document.getElementById('cityInput')?.value || '').trim().toLowerCase();
  const localsByState = (OBLIGATIONS.locals && OBLIGATIONS.locals[state]) || [];
  let list = localsByState;
  if (county) list = list.filter(o => (o.county || '').toLowerCase().includes(county));
  if (city) list = list.filter(o => (o.city || '').toLowerCase().includes(city));
  list.forEach(item => {
    const card = buildObligationCard(item);
    const chips = card.querySelector('.chips');
    if (chips) {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = item.level === 'county' ? `Condado${item.county ? ' • ' + item.county : ''}` : `Cidade${item.city ? ' • ' + item.city : ''}`;
      chips.appendChild(chip);
    }
    container.appendChild(card);
  });
}

function exportToCSV() {
  const list = getFilteredObligations();
  const rows = [
    ["Escopo", "Estado", "Título", "Frequência", "Vencimento", "Quem", "Tipos de Empresa", "Links"],
    ...list.map(o => [
      o.scope,
      o.state || "",
      o.title,
      o.frequency || "",
      o.due || "",
      o.who || "",
      (o.companyTypes || []).join(", "),
      (o.links || []).map(l => `${l.label}: ${l.url}`).join(" | ")
    ])
  ];
  const csv = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "obrigacoes_irs_estaduais.csv"; a.click();
  URL.revokeObjectURL(url);
}

function bindEvents() {
  document.getElementById("stateSelect").addEventListener("change", renderObligations);
  document.getElementById("filterFederal").addEventListener("change", renderObligations);
  document.getElementById("filterState").addEventListener("change", renderObligations);
  document.getElementById("searchInput").addEventListener("input", renderObligations);
  document.getElementById("companyTypeSelect").addEventListener("change", renderObligations);
  const countyInput = document.getElementById('countyInput');
  const cityInput = document.getElementById('cityInput');
  if (countyInput) countyInput.addEventListener('input', renderObligations);
  if (cityInput) cityInput.addEventListener('input', renderObligations);
  document.getElementById("clearFiltersBtn").addEventListener("click", () => {
    document.getElementById("filterFederal").checked = true;
    document.getElementById("filterState").checked = true;
    document.getElementById("searchInput").value = "";
    document.getElementById("stateSelect").value = "ALL";
    document.getElementById("companyTypeSelect").value = "ALL";
    if (countyInput) countyInput.value = '';
    if (cityInput) cityInput.value = '';
    renderObligations();
  });
  document.getElementById("exportCsvBtn").addEventListener("click", exportToCSV);
  const listBtn = document.getElementById("viewListBtn");
  const calBtn = document.getElementById("viewCalendarBtn");
  listBtn.addEventListener("click", () => {
    document.getElementById("obligationsList").hidden = false;
    document.getElementById("obligationsCalendar").hidden = true;
    listBtn.setAttribute("aria-selected", "true");
    calBtn.setAttribute("aria-selected", "false");
  });
  calBtn.addEventListener("click", () => {
    document.getElementById("obligationsList").hidden = true;
    document.getElementById("obligationsCalendar").hidden = false;
    listBtn.setAttribute("aria-selected", "false");
    calBtn.setAttribute("aria-selected", "true");
  });
}

function init() {
  document.getElementById("year").textContent = String(new Date().getFullYear());
  populateStateSelect();
  bindEvents();
  loadObligationsJSON().then(() => {
    renderObligations();
  });
}

document.addEventListener("DOMContentLoaded", init);


