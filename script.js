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
      months: [4], // Abril
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
      months: [3], // Março
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
      months: [4, 7, 10, 1], // Abril, Julho, Outubro, Janeiro
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
      months: [1], // Janeiro
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
      months: [1, 3], // Janeiro e Março
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
      months: [3], // Março
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
      months: [3], // Março
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
      months: [4, 10], // Abril e Outubro (prorrogação)
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
      months: [5], // Maio
      links: [
        { label: "Instruções", url: "https://www.irs.gov/forms-pubs/about-form-990" }
      ]
    },
    {
      id: "boir",
      title: "FinCEN — Beneficial Ownership Information Reporting (BOIR)",
      frequency: "Evento (inicial e alterações)",
      due: "Inicial: até 30 dias após formação (entidades novas desde 2024); alterações: 30 dias",
      who: "Reporting Companies conforme CTA",
      companyTypes: ["C-Corp", "S-Corp", "LLC", "Partnership"],
      months: [], // Eventual
      links: [
        { label: "FinCEN BOI", url: "https://www.fincen.gov/boi" },
        { label: "e-Filing", url: "https://boiefiling.fincen.gov/" }
      ]
    }
  ],
  states: {
    "AK": [
        {
            "id": "AK-annual-report",
            "title": "AK — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
      ,
  locals: {
    "CA": [
        {
            "id": "CA-LA-bus-license",
            "level": "city",
            "county": null,
            "city": "Los Angeles",
            "title": "City Business License Tax",
            "frequency": "Anual",
            "due": "Conforme calendário municipal",
            "who": "Negócios na cidade",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [
                {
                    "label": "Portal local",
                    "url": "#"
                }
            ],
            "months": [
                1
            ]
        },
        {
            "id": "CA-LA-sut",
            "level": "county",
            "county": "Los Angeles County",
            "city": null,
            "title": "County Sales and Use Tax Surtax",
            "frequency": "Mensal",
            "due": "Fim do mês seguinte",
            "who": "Varejistas no condado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [
                {
                    "label": "Portal local",
                    "url": "#"
                }
            ],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "FL": [
        {
            "id": "FL-MD-sut",
            "level": "county",
            "county": "Miami-Dade County",
            "city": null,
            "title": "Discretionary Sales Surtax",
            "frequency": "Mensal",
            "due": "Fim do mês seguinte",
            "who": "Varejistas no condado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [
                {
                    "label": "Portal local",
                    "url": "#"
                }
            ],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "NY": [
        {
            "id": "NY-NYC-bus",
            "level": "city",
            "county": null,
            "city": "New York City",
            "title": "NYC Business Taxes (GCT/UBT)",
            "frequency": "Anual/Estimativas",
            "due": "Conforme NYC DOF",
            "who": "Negócios em NYC",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [
                {
                    "label": "Portal local",
                    "url": "#"
                }
            ],
            "months": [
                4,
                6,
                9,
                12
            ]
        }
    ]
}
  },
        {
            "id": "AK-sales-tax",
            "title": "AK — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "AK-ui",
            "title": "AK — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "AK-withholding",
            "title": "AK — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "AL": [
        {
            "id": "AL-annual-report",
            "title": "AL — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "AL-sales-tax",
            "title": "AL — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "AL-ui",
            "title": "AL — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "AL-withholding",
            "title": "AL — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "AR": [
        {
            "id": "AR-annual-report",
            "title": "AR — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "AR-sales-tax",
            "title": "AR — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "AR-ui",
            "title": "AR — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "AR-withholding",
            "title": "AR — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "AZ": [
        {
            "id": "AZ-annual-report",
            "title": "AZ — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "AZ-sales-tax",
            "title": "AZ — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "AZ-ui",
            "title": "AZ — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "AZ-withholding",
            "title": "AZ — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "CA": [
        {
            "id": "ca-annual-report",
            "title": "California — Statement of Information (Annual/Biennial)",
            "frequency": "Anual/Bianual",
            "due": "Conforme tipo da entidade",
            "who": "Corp/LLC CA",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [
                {
                    "label": "Secretary of State",
                    "url": "https://bizfileonline.sos.ca.gov/"
                }
            ],
            "months": [
                1
            ]
        },
        {
            "id": "ca-sales-tax",
            "title": "California — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Geralmente último dia do mês seguinte",
            "who": "Varejistas e vendedores sujeitos a sales/use tax",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [
                {
                    "label": "CDTFA eFile",
                    "url": "https://onlineservices.cdtfa.ca.gov/"
                },
                {
                    "label": "Guia",
                    "url": "https://www.cdtfa.ca.gov/taxes-and-fees/sut-programs.htm"
                }
            ],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "ca-ui",
            "title": "California — Unemployment Insurance (UI)",
            "frequency": "Trimestral",
            "due": "Conforme EDD",
            "who": "Empregadores CA",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [
                {
                    "label": "EDD UI",
                    "url": "https://edd.ca.gov/"
                }
            ],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "ca-withholding",
            "title": "California — Employer Withholding (EDD)",
            "frequency": "Mensal/Quinzenal",
            "due": "Conforme calendário EDD",
            "who": "Empregadores com retenção CA",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [
                {
                    "label": "EDD e-Services",
                    "url": "https://edd.ca.gov/en/e-Services_for_Business/"
                }
            ],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "CO": [
        {
            "id": "CO-annual-report",
            "title": "CO — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "CO-sales-tax",
            "title": "CO — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "CO-ui",
            "title": "CO — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "CO-withholding",
            "title": "CO — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "CT": [
        {
            "id": "CT-annual-report",
            "title": "CT — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "CT-sales-tax",
            "title": "CT — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "CT-ui",
            "title": "CT — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "CT-withholding",
            "title": "CT — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "DC": [
        {
            "id": "DC-annual-report",
            "title": "DC — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "DC-sales-tax",
            "title": "DC — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "DC-ui",
            "title": "DC — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "DC-withholding",
            "title": "DC — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "DE": [
        {
            "id": "DE-annual-report",
            "title": "DE — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "DE-sales-tax",
            "title": "DE — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "DE-ui",
            "title": "DE — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "DE-withholding",
            "title": "DE — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "FL": [
        {
            "id": "FL-annual-report",
            "title": "FL — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "FL-sales-tax",
            "title": "FL — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "FL-ui",
            "title": "FL — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "FL-withholding",
            "title": "FL — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "GA": [
        {
            "id": "GA-annual-report",
            "title": "GA — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "GA-sales-tax",
            "title": "GA — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "GA-ui",
            "title": "GA — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "GA-withholding",
            "title": "GA — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "HI": [
        {
            "id": "HI-annual-report",
            "title": "HI — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "HI-sales-tax",
            "title": "HI — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "HI-ui",
            "title": "HI — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "HI-withholding",
            "title": "HI — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "IA": [
        {
            "id": "IA-annual-report",
            "title": "IA — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "IA-sales-tax",
            "title": "IA — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "IA-ui",
            "title": "IA — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "IA-withholding",
            "title": "IA — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "ID": [
        {
            "id": "ID-annual-report",
            "title": "ID — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "ID-sales-tax",
            "title": "ID — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "ID-ui",
            "title": "ID — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "ID-withholding",
            "title": "ID — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "IL": [
        {
            "id": "IL-annual-report",
            "title": "IL — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "IL-sales-tax",
            "title": "IL — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "IL-ui",
            "title": "IL — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "IL-withholding",
            "title": "IL — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "IN": [
        {
            "id": "IN-annual-report",
            "title": "IN — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "IN-sales-tax",
            "title": "IN — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "IN-ui",
            "title": "IN — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "IN-withholding",
            "title": "IN — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "KS": [
        {
            "id": "KS-annual-report",
            "title": "KS — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "KS-sales-tax",
            "title": "KS — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "KS-ui",
            "title": "KS — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "KS-withholding",
            "title": "KS — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "KY": [
        {
            "id": "KY-annual-report",
            "title": "KY — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "KY-sales-tax",
            "title": "KY — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "KY-ui",
            "title": "KY — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "KY-withholding",
            "title": "KY — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "LA": [
        {
            "id": "LA-annual-report",
            "title": "LA — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "LA-sales-tax",
            "title": "LA — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "LA-ui",
            "title": "LA — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "LA-withholding",
            "title": "LA — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "MA": [
        {
            "id": "MA-annual-report",
            "title": "MA — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "MA-sales-tax",
            "title": "MA — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "MA-ui",
            "title": "MA — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "MA-withholding",
            "title": "MA — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "MD": [
        {
            "id": "MD-annual-report",
            "title": "MD — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "MD-sales-tax",
            "title": "MD — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "MD-ui",
            "title": "MD — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "MD-withholding",
            "title": "MD — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "ME": [
        {
            "id": "ME-annual-report",
            "title": "ME — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "ME-sales-tax",
            "title": "ME — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "ME-ui",
            "title": "ME — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "ME-withholding",
            "title": "ME — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "MI": [
        {
            "id": "MI-annual-report",
            "title": "MI — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "MI-sales-tax",
            "title": "MI — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "MI-ui",
            "title": "MI — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "MI-withholding",
            "title": "MI — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "MN": [
        {
            "id": "MN-annual-report",
            "title": "MN — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "MN-sales-tax",
            "title": "MN — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "MN-ui",
            "title": "MN — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "MN-withholding",
            "title": "MN — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "MO": [
        {
            "id": "MO-annual-report",
            "title": "MO — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "MO-sales-tax",
            "title": "MO — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "MO-ui",
            "title": "MO — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "MO-withholding",
            "title": "MO — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "MS": [
        {
            "id": "MS-annual-report",
            "title": "MS — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "MS-sales-tax",
            "title": "MS — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "MS-ui",
            "title": "MS — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "MS-withholding",
            "title": "MS — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "MT": [
        {
            "id": "MT-annual-report",
            "title": "MT — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "MT-sales-tax",
            "title": "MT — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "MT-ui",
            "title": "MT — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "MT-withholding",
            "title": "MT — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "NC": [
        {
            "id": "NC-annual-report",
            "title": "NC — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "NC-sales-tax",
            "title": "NC — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "NC-ui",
            "title": "NC — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "NC-withholding",
            "title": "NC — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "ND": [
        {
            "id": "ND-annual-report",
            "title": "ND — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "ND-sales-tax",
            "title": "ND — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "ND-ui",
            "title": "ND — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "ND-withholding",
            "title": "ND — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "NE": [
        {
            "id": "NE-annual-report",
            "title": "NE — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "NE-sales-tax",
            "title": "NE — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "NE-ui",
            "title": "NE — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "NE-withholding",
            "title": "NE — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "NH": [
        {
            "id": "NH-annual-report",
            "title": "NH — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "NH-sales-tax",
            "title": "NH — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "NH-ui",
            "title": "NH — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "NH-withholding",
            "title": "NH — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "NJ": [
        {
            "id": "NJ-annual-report",
            "title": "NJ — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "NJ-sales-tax",
            "title": "NJ — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "NJ-ui",
            "title": "NJ — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "NJ-withholding",
            "title": "NJ — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "NM": [
        {
            "id": "NM-annual-report",
            "title": "NM — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "NM-sales-tax",
            "title": "NM — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "NM-ui",
            "title": "NM — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "NM-withholding",
            "title": "NM — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "NV": [
        {
            "id": "NV-annual-report",
            "title": "NV — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "NV-sales-tax",
            "title": "NV — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "NV-ui",
            "title": "NV — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "NV-withholding",
            "title": "NV — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "NY": [
        {
            "id": "ny-annual-report",
            "title": "New York — Biennial Statement (Corp) / Biennial (LLC)",
            "frequency": "Bianual",
            "due": "Conforme entidade",
            "who": "Corp/LLC NY",
            "sporadic": false,
            "companyTypes": [
                "C-Corp"
            ],
            "links": [
                {
                    "label": "DOS",
                    "url": "https://www.dos.ny.gov/corps/"
                }
            ],
            "months": []
        },
        {
            "id": "ny-sales-tax",
            "title": "New York — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do NYS",
            "who": "Vendedores com nexus em NY",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [
                {
                    "label": "File",
                    "url": "https://www.tax.ny.gov/online/"
                }
            ],
            "months": []
        },
        {
            "id": "ny-ui",
            "title": "New York — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme NY DOL",
            "who": "Empregadores NY",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [
                {
                    "label": "NY DOL",
                    "url": "https://dol.ny.gov/"
                }
            ],
            "months": []
        },
        {
            "id": "ny-withholding",
            "title": "New York — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores em NY",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [
                {
                    "label": "Guia",
                    "url": "https://www.tax.ny.gov/bus/emp/withhold.htm"
                }
            ],
            "months": []
        }
    ],
    "OH": [
        {
            "id": "OH-annual-report",
            "title": "OH — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "OH-sales-tax",
            "title": "OH — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "OH-ui",
            "title": "OH — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "OH-withholding",
            "title": "OH — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "OK": [
        {
            "id": "OK-annual-report",
            "title": "OK — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "OK-sales-tax",
            "title": "OK — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "OK-ui",
            "title": "OK — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "OK-withholding",
            "title": "OK — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "OR": [
        {
            "id": "OR-annual-report",
            "title": "OR — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "OR-sales-tax",
            "title": "OR — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "OR-ui",
            "title": "OR — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "OR-withholding",
            "title": "OR — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "PA": [
        {
            "id": "PA-annual-report",
            "title": "PA — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "PA-sales-tax",
            "title": "PA — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "PA-ui",
            "title": "PA — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "PA-withholding",
            "title": "PA — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "RI": [
        {
            "id": "RI-annual-report",
            "title": "RI — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "RI-sales-tax",
            "title": "RI — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "RI-ui",
            "title": "RI — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "RI-withholding",
            "title": "RI — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "SC": [
        {
            "id": "SC-annual-report",
            "title": "SC — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "SC-sales-tax",
            "title": "SC — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "SC-ui",
            "title": "SC — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "SC-withholding",
            "title": "SC — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "SD": [
        {
            "id": "SD-annual-report",
            "title": "SD — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "SD-sales-tax",
            "title": "SD — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "SD-ui",
            "title": "SD — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "SD-withholding",
            "title": "SD — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "TN": [
        {
            "id": "TN-annual-report",
            "title": "TN — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "TN-sales-tax",
            "title": "TN — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "TN-ui",
            "title": "TN — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "TN-withholding",
            "title": "TN — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "TX": [
        {
            "id": "tx-franchise",
            "title": "Texas — Franchise Tax Report",
            "frequency": "Anual",
            "due": "15 de maio (geral)",
            "who": "Entidades tributáveis em TX",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [
                {
                    "label": "Franchise",
                    "url": "https://comptroller.texas.gov/taxes/franchise/"
                }
            ],
            "months": [
                5
            ]
        },
        {
            "id": "tx-sales-tax",
            "title": "Texas — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "20º dia do mês seguinte",
            "who": "Vendedores em TX",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [
                {
                    "label": "Webfile",
                    "url": "https://comptroller.texas.gov/taxes/file-pay/webfile/"
                }
            ],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "tx-ui",
            "title": "Texas — Unemployment Tax (TWC)",
            "frequency": "Trimestral",
            "due": "Conforme TWC",
            "who": "Empregadores TX",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [
                {
                    "label": "TWC",
                    "url": "https://www.twc.texas.gov/businesses/unemployment-tax"
                }
            ],
            "months": [
                1,
                4,
                7,
                10
            ]
        }
    ],
    "UT": [
        {
            "id": "UT-annual-report",
            "title": "UT — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "UT-sales-tax",
            "title": "UT — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "UT-ui",
            "title": "UT — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "UT-withholding",
            "title": "UT — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "VA": [
        {
            "id": "VA-annual-report",
            "title": "VA — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "VA-sales-tax",
            "title": "VA — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "VA-ui",
            "title": "VA — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "VA-withholding",
            "title": "VA — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "VT": [
        {
            "id": "VT-annual-report",
            "title": "VT — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "VT-sales-tax",
            "title": "VT — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "VT-ui",
            "title": "VT — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "VT-withholding",
            "title": "VT — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "WA": [
        {
            "id": "WA-annual-report",
            "title": "WA — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "WA-sales-tax",
            "title": "WA — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "WA-ui",
            "title": "WA — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "WA-withholding",
            "title": "WA — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "WI": [
        {
            "id": "WI-annual-report",
            "title": "WI — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "WI-sales-tax",
            "title": "WI — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "WI-ui",
            "title": "WI — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "WI-withholding",
            "title": "WI — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "WV": [
        {
            "id": "WV-annual-report",
            "title": "WV — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "WV-sales-tax",
            "title": "WV — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "WV-ui",
            "title": "WV — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "WV-withholding",
            "title": "WV — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "WY": [
        {
            "id": "WY-annual-report",
            "title": "WY — Annual/Biennial Report",
            "frequency": "Anual/Bianual",
            "due": "Conforme entidade/estado",
            "who": "Corp/LLC registradas no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC"
            ],
            "links": [],
            "months": [
                1
            ]
        },
        {
            "id": "WY-sales-tax",
            "title": "WY — Sales and Use Tax Return",
            "frequency": "Mensal/Trimestral/Anual",
            "due": "Conforme calendário do estado",
            "who": "Vendedores com nexus no estado",
            "sporadic": false,
            "companyTypes": [
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership",
                "Sole Proprietorship"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        },
        {
            "id": "WY-ui",
            "title": "WY — Unemployment Insurance",
            "frequency": "Trimestral",
            "due": "Conforme agência de trabalho",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                4,
                7,
                10
            ]
        },
        {
            "id": "WY-withholding",
            "title": "WY — Employer Withholding",
            "frequency": "Mensal/Trimestral",
            "due": "Conforme atribuição",
            "who": "Empregadores no estado",
            "sporadic": false,
            "companyTypes": [
                "Employer",
                "C-Corp",
                "S-Corp",
                "LLC",
                "Partnership"
            ],
            "links": [],
            "months": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    ],
    "CA": [
      {
        id: "ca-payroll",
        title: "California — Payroll Withholding (EDD)",
        frequency: "Mensal/Quinzenal/Outro (segundo cadastro)",
        due: "Conforme calendário EDD",
        who: "Empregadores com retenção estadual",
        companyTypes: ["Employer", "C-Corp", "S-Corp", "LLC", "Partnership"],
        months: [1,2,3,4,5,6,7,8,9,10,11,12], // Mensal
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
    // Verifica se estamos no GitHub Pages (sem servidor backend)
    const isGitHubPages = window.location.hostname.includes('github.io') || 
                         window.location.hostname.includes('github.com');
    
    if (isGitHubPages) {
      console.log("GitHub Pages detectado - usando dados embutidos");
      return;
    }
    
    const res = await fetch("/api/obligations", { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data && typeof data === "object") {
      if (Array.isArray(data.federal)) {
        OBLIGATIONS.federal = data.federal;
        console.log(`Carregadas ${data.federal.length} obrigações federais do servidor`);
      }
      if (data.states && typeof data.states === "object") {
        OBLIGATIONS.states = data.states;
      }
      if (data.locals && typeof data.locals === "object") {
        OBLIGATIONS.locals = data.locals;
      }
    }
  } catch (e) {
    console.warn("Usando dados embutidos. Falha ao carregar API:", e.message);
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
  const companyTypeSelect = document.getElementById("companyTypeSelect");
  const companyType = companyTypeSelect ? companyTypeSelect.value : "ALL";

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
        return false; // Se não há tipos especificados, não mostrar
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
  list.forEach(item => container.appendChild(buildObligationCard(item, "list")));
}

function buildObligationCard(item, viewType = "list") {
  const card = document.createElement("div");
  card.className = `obligation obligation-${viewType}`;
  
  // Determinar tipo para cores específicas
  const getType = (item) => {
    if (item.title.includes("1120")) return "corporate";
    if (item.title.includes("1065")) return "partnership";
    if (item.title.includes("941") || item.title.includes("940") || item.title.includes("Payroll")) return "payroll";
    if (item.title.includes("Sales") || item.title.includes("Tax")) return "tax";
    if (item.title.includes("990")) return "nonprofit";
    if (item.title.includes("Schedule C")) return "individual";
    return "default";
  };
  
  card.setAttribute("data-type", getType(item));

  if (viewType === "list") {
    // Design compacto para lista - formato horizontal
    const getIcon = (item) => {
      if (item.scope === "federal") {
        if (item.title.includes("1120")) return "🏢";
        if (item.title.includes("1065")) return "🤝";
        if (item.title.includes("941") || item.title.includes("940")) return "💰";
        if (item.title.includes("1099")) return "📊";
        if (item.title.includes("990")) return "🏛️";
        if (item.title.includes("Schedule C")) return "👤";
      }
      if (item.title.includes("Sales") || item.title.includes("Tax")) return "🛒";
      if (item.title.includes("Payroll") || item.title.includes("Withholding")) return "👥";
      return "📋";
    };
    
    card.innerHTML = `
      <div class="obligation-main">
        <div class="obligation-icon">
          <span class="icon">${getIcon(item)}</span>
        </div>
        <div class="obligation-content">
          <div class="obligation-title">${item.title}</div>
          <div class="obligation-meta">
            <span class="frequency">${item.frequency || ""}</span>
            <span class="separator">•</span>
            <span class="due">${item.due || ""}</span>
          </div>
          <div class="obligation-who">${item.who || ""}</div>
        </div>
        <div class="obligation-actions">
          <div class="obligation-badges">
            <span class="badge ${item.scope === "federal" ? "federal" : "state"}">
              ${item.scope === "federal" ? "Federal" : `Estadual${item.state ? ` • ${item.state}` : ""}`}
            </span>
            ${item.companyTypes ? `<span class="badge company">${item.companyTypes.slice(0, 2).join(", ")}</span>` : ""}
          </div>
          <div class="obligation-links">
            ${item.links ? item.links.map(l => `<a href="${l.url}" target="_blank" class="link-btn">${l.label}</a>`).join("") : ""}
          </div>
        </div>
      </div>
    `;
  } else {
    // Design para calendário - formato vertical compacto
    card.innerHTML = `
      <div class="obligation-header">
        <div class="obligation-title">${item.title}</div>
        <div class="obligation-badges">
          <span class="badge ${item.scope === "federal" ? "federal" : "state"}">
            ${item.scope === "federal" ? "Federal" : `Estadual${item.state ? ` • ${item.state}` : ""}`}
          </span>
        </div>
      </div>
      <div class="obligation-meta">
        <span class="frequency">${item.frequency || ""}</span>
        <span class="due">${item.due || ""}</span>
      </div>
      <div class="obligation-who">${item.who || ""}</div>
      ${item.links ? `<div class="obligation-links">${item.links.map(l => `<a href="${l.url}" target="_blank" class="link">${l.label}</a>`).join("")}</div>` : ""}
    `;
  }

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
      } else {
        // Se não tem frequência específica, mostrar em todos os meses
        for (let m = 1; m <= 12; m++) groups[m - 1].push(item);
      }
    }
  });

  months.forEach((label, idx) => {
    const box = document.createElement("div");
    box.className = "month";
    
    const header = document.createElement("div");
    header.className = "month-header";
    const h4 = document.createElement("h4");
    h4.textContent = label;
    const count = document.createElement("span");
    count.className = "month-count";
    count.textContent = `(${groups[idx].length})`;
    header.appendChild(h4);
    header.appendChild(count);
    
    const wrap = document.createElement("div");
    wrap.className = "obligations";
    
    if (groups[idx].length === 0) {
      const emptyMsg = document.createElement("p");
      emptyMsg.className = "empty-month";
      emptyMsg.textContent = "Nenhuma obrigação neste mês";
      wrap.appendChild(emptyMsg);
    } else {
      groups[idx].forEach(item => wrap.appendChild(buildObligationCard(item, "calendar")));
    }
    
    box.appendChild(header);
    box.appendChild(wrap);
    cal.appendChild(box);
  });
}

function renderSporadic(list) {
  const container = document.getElementById("sporadicList");
  if (!container) return;
  container.innerHTML = "";
  list.forEach(item => {
    const card = buildObligationCard(item, "list");
    card.classList.add("sporadic");
    const badges = card.querySelector('.obligation-badges');
    if (badges) {
      const badge = document.createElement('span');
      badge.className = 'badge sporadic';
      badge.textContent = 'Esporádica';
      badges.appendChild(badge);
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
    const card = buildObligationCard(item, "list");
    const badges = card.querySelector('.obligation-badges');
    if (badges) {
      const badge = document.createElement('span');
      badge.className = 'badge local';
      badge.textContent = item.level === 'county' ? `Condado${item.county ? ' • ' + item.county : ''}` : `Cidade${item.city ? ' • ' + item.city : ''}`;
      badges.appendChild(badge);
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


