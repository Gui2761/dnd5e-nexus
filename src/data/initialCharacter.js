export const DEFAULT_CHARACTER = {
  id: "thokk_lamina_partida",
  name: "Thokk Lâmina-Partida",
  className: "Paladino",
  subclass: "Juramento de Devoção",
  level: 1,
  race: "Meio-Orc",
  background: "Soldado",
  alignment: "Leal e Bom",
  playerName: "Gui",
  xp: 0,
  inspiration: false,

  // Atributos base
  stats: {
    str: 20,
    dex: 11,
    con: 16,
    int: 8,
    wis: 12,
    cha: 16
  },

  // Proficiências em salvaguardas
  savingProficiencies: {
    str: false,
    dex: false,
    con: false,
    int: false,
    wis: true,
    cha: true
  },

  // Perícias (true se proficiente)
  skillsProficiencies: {
    athletics: true,
    acrobatics: false,
    sleightOfHand: false,
    stealth: false,
    arcana: false,
    history: false,
    investigation: false,
    nature: false,
    religion: false,
    animalHandling: false,
    insight: false,
    medicine: false,
    perception: true,
    survival: true,
    deception: false,
    intimidation: true,
    performance: false,
    persuasion: false
  },

  // Combate
  armorClass: 16,
  armorName: "Cota de Malha",
  initiativeBonus: 0,
  speed: "9m",
  hpMax: 13,
  hpCurrent: 13,
  hpTemp: 0,
  hitDiceTotal: "1d10",
  hitDiceCurrent: "1d10",
  deathSaves: {
    successes: 0,
    failures: 0
  },

  // Ataques
  attacks: [
    {
      id: "atk-1",
      name: "Espada Longa",
      bonus: "+7",
      damage: "1d8+5 cortante",
      notes: "Versátil (1d10+5 com 2 mãos)"
    },
    {
      id: "atk-2",
      name: "Adaga",
      bonus: "+7",
      damage: "1d4+5 perfurante",
      notes: "Acuidade, arremesso 6/18m"
    },
    {
      id: "atk-3",
      name: "Dardo",
      bonus: "+7",
      damage: "1d4+5 perfurante",
      notes: "Distância 6/18m"
    }
  ],

  // Magias & Habilidades de Conjuração
  spellcasting: {
    ability: "cha",
    slots: {
      1: { total: 0, used: 0 },
      2: { total: 0, used: 0 },
      3: { total: 0, used: 0 },
      4: { total: 0, used: 0 },
      5: { total: 0, used: 0 },
      6: { total: 0, used: 0 },
      7: { total: 0, used: 0 },
      8: { total: 0, used: 0 },
      9: { total: 0, used: 0 }
    },
    spells: [
      { id: "sp-1", name: "Cura pelas Mãos (Reserva)", level: 1, prepared: true, desc: "Reserva de 5 PVs por descanso longo para cura direta ou cura de venenos." },
      { id: "sp-2", name: "Sentido Divino", level: 1, prepared: true, desc: "Detecta celestiais, corruptores e mortos-vivos a até 18 metros." }
    ]
  },

  // Riqueza & Moedas
  coins: {
    cp: 0,
    sp: 0,
    ep: 0,
    gp: 10,
    pp: 0
  },

  // Equipamentos
  equipmentText: "Cota de Malha (CA 16)\nEspada Longa de aço forjado\nAdaga de cinto com bainha de couro\n6x Dardos de ferro\nSímbolo Sagrado de Helm cravado no escudo\nMochila de aventureiro\nSaco de dormir, cantil de água\n10 dias de rações de viagem\nCorda de cânhamo de 15 metros\nTocha (x5), pederneira e isqueiro\nUniforme de soldado com insígnia da legião",

  // Outras Proficiências e Idiomas
  otherProficiencies: "Armaduras: Todas as armaduras, escudos.\nArmas: Armas simples, armas marciais.\nFerramentas: Conjunto de dados de jogo, veículos terrestres.\nIdiomas: Comum, Orc.",

  // Personalidade & Roleplay
  personality: {
    traits: "Sempre mantenho minha postura militar e olho firme nos olhos de quem conversa comigo.",
    ideals: "Maior Bem: Nosso dever e espada pertencem à proteção dos inocentes e frágeis.",
    bonds: "Aqueles que lutaram lado a lado comigo no front têm minha lealdade até a morte.",
    flaws: "Minha fúria orc por vezes ferve por baixo da couraça e tenho dificuldade em recuar de um desafio."
  },

  // Habilidades e Características Especiais
  featuresText: "SENTIDO DIVINO (Paladino 1)\nDetecta presenças de bem e mal num raio de 18m. Usos: 4/dia (1 + mod CAR).\n\nCURA PELAS MÃOS (Paladino 1)\nReserva de cura sagrada = 5 PVs (nível x 5). Gaste 5 PVs para purificar doenças ou neutralizar venenos.\n\nATAQUES SELVAGENS (Meio-Orc)\nAo acertar um ataque crítico com arma corpo a corpo, role um dado de dano adicional da arma e some ao total.\n\nRESILIÊNCIA IMPLACÁVEL (Meio-Orc)\nQuando seus PVs caírem para 0 mas não for morto de imediato, você cai para 1 PV em vez disso (1x por descanso longo).\n\nVISÃO NO ESCURO (Meio-Orc)\nEnxerga na penumbra e escuridão a até 18 metros.",

  // Biografia
  bio: {
    age: "24",
    height: "1,98 m",
    weight: "115 kg",
    eyes: "Âmbar vivo",
    skin: "Verde acinzentado",
    hair: "Negro trançado",
    appearance: "Imponente, ombros largos e presas salientes que indicam sua linhagem orc, ostentando cicatrizes de guerra e uma armadura reluzente com o símbolo sagrado.",
    backstory: "Nascido entre duas culturas e criado nas fileiras da guarda de fronteira, Thokk encontrou na disciplina marcial e na fé a força para dominar sua fúria interior.",
    allies: "Legião do Punho de Prata, Ordem dos Paladinos do Alvorecer.",
    treasure: "Pingente com a pedra do seu antigo pelotão de infantaria."
  }
};
