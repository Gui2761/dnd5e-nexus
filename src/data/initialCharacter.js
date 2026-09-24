export const DEFAULT_CHARACTER = {
  id: "thokk_lamina_partida",
  name: "Thokk Lâmina-Partida",
  className: "Paladino",
  subclass: "Juramento Sagrado",
  level: 1,
  race: "Meio-Orc",
  background: "Soldado",
  alignment: "Leal e Bom",
  playerName: "Guilherme",
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

  // Proficiências em salvaguardas (Sabedoria e Carisma)
  savingProficiencies: {
    str: false,
    dex: false,
    con: false,
    int: false,
    wis: true,
    cha: true
  },

  // Perícias exatas do Thokk:
  // [*] Atletismo (+7)
  // [*] Intimidação (+5)
  // [*] Medicina (+3)
  // [*] Persuasão (+5)
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
    medicine: true,
    perception: false,
    survival: false,
    deception: false,
    intimidation: true,
    performance: false,
    persuasion: true
  },

  // Combate
  armorClass: 16,
  armorName: "Cota de Malha",
  initiativeBonus: 0,
  speed: "9 m",
  hpMax: 13,
  hpCurrent: 13,
  hpTemp: 0,
  hitDiceTotal: "1d10",
  hitDiceCurrent: "1d10",
  deathSaves: {
    successes: 0,
    failures: 0
  },

  // Ataques oficiais do Thokk:
  // 1. Machado Grande (+7 no ataque, 1d12+5 Cortante)
  // 2. Azagaia (x5) (+7 no ataque, 1d6+5 Perf., alcance 9/36m)
  attacks: [
    {
      id: "atk-1",
      name: "Machado Grande",
      bonus: "+7",
      damage: "1d12 + 5 cortante",
      notes: "Pesada, duas mãos"
    },
    {
      id: "atk-2",
      name: "Azagaia (x5)",
      bonus: "+7",
      damage: "1d6 + 5 perf. (9/36m)",
      notes: "Arremesso 9m / 36m"
    }
  ],

  attackNotes: "• CD Resistência de Magia: 13 (8 + 2 Prof + 3 Car)\n• Bônus de Ataque Mágico: +5\n• Machado Grande: Pesada, duas mãos.\n• Azagaias: Arremesso (9m / 36m).\n• Cota de Malha: CA fixa 16 (desvantagem em Furtividade).",

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
      { id: "sp-1", name: "Cura pelas Mãos (Reserva 5 PV)", level: 1, prepared: true, desc: "Reserva de 5 PV curativos por Descanso Longo. Toque para restaurar PV ou gaste 5 PV para curar 1 doença ou neutralizar 1 veneno." },
      { id: "sp-2", name: "Sentido Divino (4x/dia)", level: 1, prepared: true, desc: "Ação: Detecta celestiais, corruptores e mortos-vivos num raio de 18m. 4 utilizações por Descanso Longo (1 + Mod Carisma)." }
    ]
  },

  // Moedas & Riqueza: 10 PO
  coins: {
    cp: 0,
    sp: 0,
    ep: 0,
    gp: 10,
    pp: 0
  },

  // Equipamento
  equipmentText: "• Cota de Malha (CA 16, For 13 necessária)\n• Machado Grande (Greataxe, 1d12 cortante)\n• 5 Azagaias (Javelins, 1d6 perf., 9/36m)\n• Pacote de Explorador: mochila, saco de dormir, kit de refeição, caixa de fogo, 10 tochas, 10 rações, cantil, 15m corda de cânhamo.\n• Símbolo Sagrado (Amuleto no peitoral)\n• Jogo de Cartas, insígnia militar de Soldado, algibeira.\n• Riquezas: 10 PO",

  // Outras Proficiências & Idiomas
  otherProficiencies: "IDIOMAS: Comum, Orc, Anão.\n\nARMADURAS: Todas as armaduras (leves, médias, pesadas) e escudos.\n\nARMAS: Armas simples e armas marciais.\n\nFERRAMENTAS: Jogo de Cartas, Veículos Terrestres.",

  // Personalidade & Roleplay
  personality: {
    traits: "Encaro os perigos de frente como um veterano de guerra experiente. Nunca recuo nem abandono um companheiro em apuros.",
    ideals: "Honra e Proteção: A força deve servir para proteger os fracos e expurgar a corrupção do mundo. (Leal e Bom)",
    bonds: "Minha lâmina partida e meu juramento sagrado honram o sacrifício do meu antigo esquadrão nas linhas de frente.",
    flaws: "O sangue orc incita fúria contra crueldade desmedida; sou implacável contra traidores e tiranos."
  },

  // Características & Habilidades
  featuresText: "• Visão no Escuro (Racial Meio-Orc)\nEnxerga na penumbra até 18 m como se fosse luz plena, e na escuridão como penumbra (tons de cinza).\n\n• Ameaçador (Racial Meio-Orc)\nProficiência automática na perícia Intimidação.\n\n• Resistência Implacável (Racial Meio-Orc)\nAo cair a 0 PV e não morrer de imediato, cai para 1 PV em vez disso (1x por Descanso Longo).\n\n• Ataques Selvagens (Racial Meio-Orc)\nAo acertar um crítico corpo a corpo, rola mais um dado de dano da arma e adiciona ao total.\n\n• Sentido Divino (Paladino 1)\nAção: Detecta celestiais, corruptores e mortos-vivos num raio de 18 m, além de locais consagrados/profanados. 4 utilizações / Descanso Longo (1 + Mod Carisma).\n\n• Cura pelas Mãos (Paladino 1)\nReserva de 5 PV curativos por Descanso Longo. Toque para restaurar PV ou gaste 5 PV da reserva para curar 1 doença ou neutralizar 1 veneno.",

  // Biografia
  bio: {
    age: "24",
    height: "1,98 m",
    weight: "115 kg",
    eyes: "Âmbar vivo",
    skin: "Verde acinzentado",
    hair: "Negro trançado",
    appearance: "Imponente, ombros largos e presas salientes de meio-orc, trajado em cota de malha reluzente com símbolo sagrado.",
    backstory: "Veterano de infantaria que encontrou no juramento dos paladinos o propósito para guiar sua força em defesa dos inocentes.",
    allies: "Legião dos Soldados de Fronteira",
    treasure: "Lâmina partida da sua primeira batalha honrosa."
  }
};
