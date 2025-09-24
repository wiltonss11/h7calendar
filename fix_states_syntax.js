const db = require('./db');
const fs = require('fs');

// Função para obter tipos de empresa
const getCompanyTypes = (obligation) => {
  const title = (obligation.title || "").toLowerCase();
  const who = (obligation.who || "").toLowerCase();
  const id = (obligation.id || "").toLowerCase();

  if (id.includes("irs-1120") && !id.includes("s")) return ["C-Corp"];
  if (id.includes("irs-1120s")) return ["S-Corp"];
  if (id.includes("irs-1065")) return ["Partnership", "LLC"];
  if (id.includes("irs-941") || id.includes("irs-940")) return ["Employer", "C-Corp", "S-Corp", "LLC", "Partnership"];
  if (id.includes("irs-1099")) return ["C-Corp", "S-Corp", "LLC", "Partnership", "Sole Proprietorship", "Contractor"];
  if (id.includes("irs-1040") || id.includes("schedule-c")) return ["Sole Proprietorship"];
  if (id.includes("irs-990")) return ["Non-Profit"];
  if (id.includes("boir")) return ["C-Corp", "S-Corp", "LLC", "Partnership"];
  if (title.includes("corporation") || title.includes("corp")) return ["C-Corp"];
  if (title.includes("partnership") || title.includes("llc")) return ["Partnership", "LLC"];
  if (title.includes("payroll") || title.includes("withholding") || title.includes("employer")) return ["Employer", "C-Corp", "S-Corp", "LLC", "Partnership"];
  if (title.includes("sales") || title.includes("tax")) return ["C-Corp", "S-Corp", "LLC", "Partnership", "Sole Proprietorship"];
  if (title.includes("unemployment") || title.includes("ui")) return ["Employer", "C-Corp", "S-Corp", "LLC", "Partnership"];
  if (title.includes("annual report") || title.includes("biennial")) return ["C-Corp", "S-Corp", "LLC"];
  if (title.includes("business license") || title.includes("license")) return ["C-Corp", "S-Corp", "LLC", "Partnership", "Sole Proprietorship"];
  if (who.includes("corporation") || who.includes("corp")) return ["C-Corp"];
  if (who.includes("partnership") || who.includes("llc")) return ["Partnership", "LLC"];
  if (who.includes("empregador") || who.includes("employer")) return ["Employer", "C-Corp", "S-Corp", "LLC", "Partnership"];
  if (who.includes("varejista") || who.includes("vendedor")) return ["C-Corp", "S-Corp", "LLC", "Partnership", "Sole Proprietorship"];
  return ["C-Corp", "S-Corp", "LLC", "Partnership", "Sole Proprietorship"];
};

try {
  console.log("🔧 Corrigindo sintaxe e sincronizando dados estaduais...");
  
  // Buscar dados do banco
  const states = db.prepare('SELECT * FROM state_obligations ORDER BY state, id').all();
  const slinks = db.prepare('SELECT * FROM state_links').all();
  const smonths = db.prepare('SELECT * FROM state_months').all();

  // Processar dados estaduais
  const groupedStates = {};
  states.forEach(o => {
    if (!groupedStates[o.state]) groupedStates[o.state] = [];
    groupedStates[o.state].push({
      id: o.id,
      title: o.title,
      frequency: o.frequency,
      due: o.due,
      who: o.who,
      sporadic: !!o.sporadic,
      companyTypes: getCompanyTypes(o),
      links: slinks.filter(l => l.obligation_id === o.id).map(l => ({ label: l.label, url: l.url })),
      months: smonths.filter(m => m.obligation_id === o.id).map(m => m.month)
    });
  });

  // Ler script.js atual
  const scriptContent = fs.readFileSync('script.js', 'utf8');
  
  // Encontrar início e fim da seção states
  const statesStartIndex = scriptContent.indexOf('states: {');
  const localsIndex = scriptContent.indexOf('locals: {');
  
  if (statesStartIndex === -1 || localsIndex === -1) {
    throw new Error('Seções states ou locals não encontradas');
  }
  
  // Extrair partes antes e depois
  const beforeStates = scriptContent.substring(0, statesStartIndex + 8); // "states: "
  const afterStates = scriptContent.substring(localsIndex - 1); // incluir vírgula
  
  // Criar nova seção states com sintaxe correta
  const statesEntries = Object.entries(groupedStates)
    .map(([state, obligations]) => {
      const stateObligations = obligations
        .map(ob => {
          return `    {
      "id": "${ob.id}",
      "title": "${ob.title}",
      "frequency": "${ob.frequency}",
      "due": "${ob.due}",
      "who": "${ob.who}",
      "sporadic": ${ob.sporadic},
      "companyTypes": ${JSON.stringify(ob.companyTypes, null, 8)},
      "links": ${JSON.stringify(ob.links, null, 8)},
      "months": ${JSON.stringify(ob.months, null, 8)}
    }`;
        })
        .join(',\n');
      
      return `    "${state}": [
${stateObligations}
    ]`;
    })
    .join(',\n');
  
  const statesSection = `{\n${statesEntries}\n  }`;
  
  // Novo conteúdo
  const newContent = beforeStates + statesSection + afterStates;
  
  // Salvar
  fs.writeFileSync('script.js', newContent);
  
  console.log("✅ Script.js corrigido e sincronizado!");
  console.log(`📊 Estados: ${Object.keys(groupedStates).length}`);
  console.log(`📊 Obrigações estaduais: ${states.length}`);
  
  // Verificar sintaxe
  try {
    require('./script.js');
    console.log("✅ Sintaxe JavaScript válida!");
  } catch (e) {
    console.error("❌ Erro de sintaxe:", e.message);
  }
  
} catch (error) {
  console.error("❌ Erro:", error.message);
} finally {
  db.close();
}
