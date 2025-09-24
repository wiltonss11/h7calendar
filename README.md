# Obrigações Tributárias — IRS e Estados (EUA)

Aplicação estática que lista obrigações tributárias federais (IRS) e estaduais por estado americano, com filtros e exportação CSV. UI inspirada no template/estilo do site de referência [H7 Contábil](https://h7contabil.com.br/).

## Uso

- Abra `index.html` no navegador.
- Selecione o estado em "Selecione o Estado".
- Marque/desmarque "Federal (IRS)" e "Estadual".
- Pesquise por título/descrição (ex.: "1120", "sales tax").
- Clique em "Exportar CSV" para baixar a lista filtrada.

## Estrutura

- `index.html`: marcação, seções, filtros.
- `styles.css`: paleta, tipografia e layout no estilo H7.
- `script.js`: dados, filtros, renderização e exportação.

## Estendendo para todos os estados

1. Abra `script.js` e localize `const OBLIGATIONS`.
2. Em `OBLIGATIONS.states`, adicione um array para o código do estado (ex.: `FL`, `WA`).
3. Cada obrigação segue o formato:

```js
{
  id: "fl-sales-tax",
  title: "Florida — Sales and Use Tax Return",
  frequency: "Mensal/Trimestral/Anual",
  due: "Conforme calendário do estado",
  who: "Vendedores com nexus em FL",
  links: [ { label: "File", url: "https://..." } ]
}
```

4. Salve e recarregue o navegador.

## Observação

- Esta aplicação não substitui aconselhamento fiscal/tributário. Confirme exigências no site do IRS e das autoridades do estado correspondente.

## Créditos

- UI inspirada no site [H7 Contábil](https://h7contabil.com.br/).
"# h7calendar" 
