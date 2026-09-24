// Gerador de Fichas Limpas com Automação de Raça, Classe e Regras Oficiais D&D 5e

export const RACE_DATA = {
  "Meio-Orc": {
    statsBonus: { str: 2, con: 1 },
    speed: "9m (30 pés)",
    languages: ["Comum", "Orc"],
    senses: "Visão no Escuro (18m)",
    traits: [
      {
        name: "Visão no Escuro",
        desc: "Enxerga na penumbra até 18 m como se fosse luz plena, e na escuridão como penumbra (tons de cinza)."
      },
      {
        name: "Ameaçador",
        desc: "Proficiência natural automática na perícia Intimidação."
      },
      {
        name: "Resistência Implacável",
        desc: "Ao cair a 0 PV e não morrer de imediato, cai para 1 PV em vez disso (1x por Descanso Longo)."
      },
      {
        name: "Ataques Selvagens",
        desc: "Ao acertar um crítico corpo a corpo, rola mais um dado de dano da arma e adiciona ao total."
      }
    ],
    skillProficiencies: { intimidation: true }
  },
  "Elfo": {
    statsBonus: { dex: 2, int: 1 },
    speed: "9m (30 pés)",
    languages: ["Comum", "Élfico"],
    senses: "Visão no Escuro (18m)",
    traits: [
      {
        name: "Visão no Escuro",
        desc: "Enxerga na penumbra até 18 m como se fosse luz plena, e na escuridão como penumbra."
      },
      {
        name: "Sentidos Aguçados",
        desc: "Proficiência natural na perícia Percepção."
      },
      {
        name: "Ancestral Feérico",
        desc: "Vantagem em salvaguardas contra ser encantado e imune a magias de sono."
      },
      {
        name: "Transe",
        desc: "Não dorme; medita profundamente por 4 horas para receber benefícios de um descanso longo."
      }
    ],
    skillProficiencies: { perception: true }
  },
  "Anão": {
    statsBonus: { con: 2, str: 2 },
    speed: "7.5m (25 pés)",
    languages: ["Comum", "Anão"],
    senses: "Visão no Escuro (18m)",
    traits: [
      {
        name: "Visão no Escuro",
        desc: "Enxerga no escuro até 18 metros."
      },
      {
        name: "Resiliência dos Anões",
        desc: "Vantagem em salvaguardas contra veneno e resistência contra dano de veneno."
      },
      {
        name: "Especialização em Rochas",
        desc: "Dobra o bônus de proficiência em testes de História relacionados a estruturas de pedra."
      }
    ],
    skillProficiencies: {}
  },
  "Draconato": {
    statsBonus: { str: 2, cha: 1 },
    speed: "9m (30 pés)",
    languages: ["Comum", "Dracônico"],
    senses: "Normal",
    traits: [
      {
        name: "Ancestral Dracônico",
        desc: "Linhagem de dragão que define o tipo de sopro e resistência elemental."
      },
      {
        name: "Arma de Sopro",
        desc: "Ação para exalar energia elemental (2d6 de dano, cone de 4.5m ou linha de 9m, CD 8 + CON + Prof)."
      },
      {
        name: "Resistência a Dano",
        desc: "Resistência natural ao elemento da sua linhagem dracônica."
      }
    ],
    skillProficiencies: {}
  },
  "Humano": {
    statsBonus: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
    speed: "9m (30 pés)",
    languages: ["Comum", "Um idioma à escolha"],
    senses: "Normal",
    traits: [
      {
        name: "Versatilidade Humana",
        desc: "Capacidade de adaptação incomparável com bônus abrangente e proficiências diversas."
      }
    ],
    skillProficiencies: {}
  },
  "Halfling": {
    statsBonus: { dex: 2, cha: 1 },
    speed: "7.5m (25 pés)",
    languages: ["Comum", "Halfling"],
    senses: "Normal",
    traits: [
      {
        name: "Sortudo",
        desc: "Ao rolar um 1 natural em d20 para jogada de ataque, teste ou salvaguarda, pode rerrolar o dado."
      },
      {
        name: "Corajoso",
        desc: "Vantagem em salvaguardas contra a condição amedrontado."
      },
      {
        name: "Agilidade Halfling",
        desc: "Pode mover-se através do espaço de criaturas maiores que você."
      }
    ],
    skillProficiencies: {}
  },
  "Gnomo": {
    statsBonus: { int: 2, con: 1 },
    speed: "7.5m (25 pés)",
    languages: ["Comum", "Gnômico"],
    senses: "Visão no Escuro (18m)",
    traits: [
      {
        name: "Visão no Escuro",
        desc: "Enxerga na escuridão até 18 metros."
      },
      {
        name: "Esperteza Gnômica",
        desc: "Vantagem em todas as salvaguardas de Inteligência, Sabedoria e Carisma contra magia."
      }
    ],
    skillProficiencies: {}
  },
  "Meio-Elfo": {
    statsBonus: { cha: 2, dex: 1, con: 1 },
    speed: "9m (30 pés)",
    languages: ["Comum", "Élfico", "Um idioma à escolha"],
    senses: "Visão no Escuro (18m)",
    traits: [
      {
        name: "Visão no Escuro",
        desc: "Enxerga na escuridão até 18 metros."
      },
      {
        name: "Ancestral Feérico",
        desc: "Vantagem em salvaguardas contra ser encantado e imune a sono mágico."
      },
      {
        name: "Versatilidade em Perícias",
        desc: "Proficiência em duas perícias à sua escolha."
      }
    ],
    skillProficiencies: {}
  },
  "Tiefling": {
    statsBonus: { cha: 2, int: 1 },
    speed: "9m (30 pés)",
    languages: ["Comum", "Infernal"],
    senses: "Visão no Escuro (18m)",
    traits: [
      {
        name: "Visão no Escuro",
        desc: "Enxerga no escuro até 18 metros."
      },
      {
        name: "Resistência Infernal",
        desc: "Resistência contra dano de fogo."
      },
      {
        name: "Legado Infernal",
        desc: "Conhece o truque Taumaturgia. No 3º nível lança Repreensão Infernal; no 5º nível, Escuridão."
      }
    ],
    skillProficiencies: {}
  }
};

export const CLASS_DATA = {
  "Paladino": {
    hitDie: "1d10",
    hitDieSides: 10,
    savingProficiencies: { str: false, dex: false, con: false, int: false, wis: true, cha: true },
    baseAC: 16,
    features: [
      {
        name: "Sentido Divino",
        desc: "Ação: Detecta celestiais, corruptores e mortos-vivos num raio de 18 m, além de locais consagrados/profanados (1 + Mod Carisma usos/descanso longo)."
      },
      {
        name: "Cura pelas Mãos",
        desc: "Reserva de cura sagrada igual a (Nível x 5 PV) para restaurar vida ou curar venenos e doenças."
      }
    ],
    starterAttack: {
      name: "Espada Longa",
      bonus: "+5",
      damage: "1d8 + 3 cortante",
      notes: "Versátil (1d10)"
    },
    starterEquipment: "• Cota de Malha (CA 16)\n• Espada Longa\n• Escudo (+2 CA)\n• Símbolo Sagrado\n• Mochila de Aventureiro com rações e tochas\n• Riquezas: 10 PO"
  },
  "Bárbaro": {
    hitDie: "1d12",
    hitDieSides: 12,
    savingProficiencies: { str: true, dex: false, con: true, int: false, wis: false, cha: false },
    baseAC: 14,
    features: [
      {
        name: "Fúria",
        desc: "Ação Bônus: Entra em fúria. Ganha vantagem em testes e salvaguardas de Força, +2 de dano corpo a corpo e resistência contra concussão, cortante e perfurante (2x/descanso longo)."
      },
      {
        name: "Defesa Sem Armadura",
        desc: "Quando não estiver usando armadura, sua CA é 10 + Modificador de Destreza + Modificador de Constituição."
      }
    ],
    starterAttack: {
      name: "Machado Grande",
      bonus: "+5",
      damage: "1d12 + 3 cortante",
      notes: "Pesada, duas mãos"
    },
    starterEquipment: "• Machado Grande\n• 2 Machadinhas de arremesso\n• Pacote de Explorador\n• 4 Azagaias\n• Riquezas: 10 PO"
  },
  "Guerreiro": {
    hitDie: "1d10",
    hitDieSides: 10,
    savingProficiencies: { str: true, dex: false, con: true, int: false, wis: false, cha: false },
    baseAC: 16,
    features: [
      {
        name: "Estilo de Luta",
        desc: "Adota uma especialidade marcial (Arquearia, Combate com Armas Grandes, Defesa, Duelo, etc.)."
      },
      {
        name: "Retomar o Fôlego",
        desc: "Ação Bônus: Recupera 1d10 + Nível de PV uma vez por descanso curto ou longo."
      }
    ],
    starterAttack: {
      name: "Espada Longa",
      bonus: "+5",
      damage: "1d8 + 3 cortante",
      notes: "Versátil (1d10)"
    },
    starterEquipment: "• Cota de Malha (CA 16)\n• Espada Longa e Escudo\n• Besta Leve com 20 virotes\n• Pacote de Masmorra\n• Riquezas: 10 PO"
  },
  "Ladino": {
    hitDie: "1d8",
    hitDieSides: 8,
    savingProficiencies: { str: false, dex: true, con: false, int: true, wis: false, cha: false },
    baseAC: 14,
    features: [
      {
        name: "Ataque Furtivo",
        desc: "1x por turno, causa 1d6 de dano extra a criatura atingida com arma de acuidade ou à distância se tiver vantagem ou aliado adjacente."
      },
      {
        name: "Especialização",
        desc: "Dobra o bônus de proficiência em 2 perícias à escolha ou ferramentas de ladrão."
      },
      {
        name: "Gíria de Ladrão",
        desc: "Dialeto secreto e sinais codificados do submundo."
      }
    ],
    starterAttack: {
      name: "Florete",
      bonus: "+5",
      damage: "1d8 + 3 perfurante",
      notes: "Acuidade"
    },
    starterEquipment: "• Armadura de Couro (CA 11 + DES)\n• Florete e Arco Curto com 20 flechas\n• 2 Adagas\n• Ferramentas de Ladrão\n• Pacote de Assaltante\n• Riquezas: 10 PO"
  },
  "Mago": {
    hitDie: "1d6",
    hitDieSides: 6,
    savingProficiencies: { str: false, dex: false, con: false, int: true, wis: true, cha: false },
    baseAC: 12,
    features: [
      {
        name: "Grimório & Conjuração",
        desc: "Conhece 3 truques e 6 magias de 1º círculo. CD de magia: 8 + Bônus Prof + Mod INT."
      },
      {
        name: "Recuperação Arcana",
        desc: "1x ao dia durante descanso curto, recupera espaços de magia cuja soma dos círculos seja igual a metade do nível de mago (mínimo 1)."
      }
    ],
    starterAttack: {
      name: "Raio de Fogo",
      bonus: "+5",
      damage: "1d10 de fogo",
      notes: "Alcance 36m (120 pés)"
    },
    starterEquipment: "• Grimório Mágico\n• Bordão\n• Bolsa de componentes ou Foco Arcano\n• Pacote de Estudioso\n• Riquezas: 10 PO"
  },
  "Clérigo": {
    hitDie: "1d8",
    hitDieSides: 8,
    savingProficiencies: { str: false, dex: false, con: false, int: false, wis: true, cha: true },
    baseAC: 16,
    features: [
      {
        name: "Conjuração Divina",
        desc: "Prepara magias da lista de clérigo. CD: 8 + Bônus Prof + Mod SAB. Bônus de Ataque Mágico: Prof + Mod SAB."
      },
      {
        name: "Domínio Divino",
        desc: "Concede magias de domínio preparadas automaticamente e características exclusivas do patrono sagrado."
      }
    ],
    starterAttack: {
      name: "Maça",
      bonus: "+4",
      damage: "1d6 + 2 de concussão",
      notes: "Simples"
    },
    starterEquipment: "• Cota de Escamas (CA 14 + DES máx 2)\n• Maça e Escudo (+2 CA)\n• Símbolo Sagrado\n• Pacote de Sacerdote\n• Riquezas: 10 PO"
  },
  "Druida": {
    hitDie: "1d8",
    hitDieSides: 8,
    savingProficiencies: { str: false, dex: false, con: false, int: true, wis: true, cha: false },
    baseAC: 13,
    features: [
      {
        name: "Druídico",
        desc: "Conhece a linguagem secreta dos círculos druídicos."
      },
      {
        name: "Conjuração da Natureza",
        desc: "Canaliza forças da terra e animais. CD: 8 + Bônus Prof + Mod SAB."
      }
    ],
    starterAttack: {
      name: "Cimitarra",
      bonus: "+4",
      damage: "1d6 + 2 cortante",
      notes: "Acuidade, Leve"
    },
    starterEquipment: "• Armadura de Couro\n• Cimitarra e Escudo de madeira\n• Foco Druídico (ramo de visco)\n• Pacote de Explorador\n• Riquezas: 10 PO"
  },
  "Bardo": {
    hitDie: "1d8",
    hitDieSides: 8,
    savingProficiencies: { str: false, dex: true, con: false, int: false, wis: false, cha: true },
    baseAC: 13,
    features: [
      {
        name: "Inspiração de Bardo",
        desc: "Ação Bônus: Concede 1 dado d6 de inspiração a um aliado a até 18 m (Mod Carisma usos/descanso longo)."
      },
      {
        name: "Conjuração Artística",
        desc: "Manipula a trama através da canção ou poesia. CD: 8 + Bônus Prof + Mod CAR."
      }
    ],
    starterAttack: {
      name: "Rapieira",
      bonus: "+5",
      damage: "1d8 + 3 perfurante",
      notes: "Acuidade"
    },
    starterEquipment: "• Armadura de Couro\n• Rapieira e Adaga\n• Instrumento Musical (Alaúde ou Flauta)\n• Pacote de Artista\n• Riquezas: 10 PO"
  },
  "Monge": {
    hitDie: "1d8",
    hitDieSides: 8,
    savingProficiencies: { str: true, dex: true, con: false, int: false, wis: false, cha: false },
    baseAC: 15,
    features: [
      {
        name: "Defesa Sem Armadura",
        desc: "Sem armadura e sem escudo, sua CA é 10 + Mod Destreza + Mod Sabedoria."
      },
      {
        name: "Artes Marciais",
        desc: "Dano desarmado 1d4. Usa Destreza para ataques e pode golpear desarmado com ação bônus após ataque."
      }
    ],
    starterAttack: {
      name: "Golpe Desarmado",
      bonus: "+5",
      damage: "1d4 + 3 de concussão",
      notes: "Artes Marciais (Ação Bônus)"
    },
    starterEquipment: "• Lança Curta\n• 10 Dardos\n• Pacote de Masmorra\n• Roupas simples de monastério\n• Riquezas: 10 PO"
  },
  "Ranger": {
    hitDie: "1d10",
    hitDieSides: 10,
    savingProficiencies: { str: true, dex: true, con: false, int: false, wis: false, cha: false },
    baseAC: 14,
    features: [
      {
        name: "Inimigo Favorito",
        desc: "Vantagem em testes de Sobrevivência para rastrear e Inteligência sobre o tipo de criatura escolhido."
      },
      {
        name: "Explorador Natural",
        desc: "Especialista em navegar e sobreviver no tipo de terreno selvagem escolhido."
      }
    ],
    starterAttack: {
      name: "Arco Longo",
      bonus: "+5",
      damage: "1d8 + 3 perfurante",
      notes: "Munição (45/180m), duas mãos"
    },
    starterEquipment: "• Armadura de Couro Batido\n• Arco Longo com aljava e 20 flechas\n• 2 Espadas Curtas\n• Pacote de Explorador\n• Riquezas: 10 PO"
  },
  "Bruxo": {
    hitDie: "1d8",
    hitDieSides: 8,
    savingProficiencies: { str: false, dex: false, con: false, int: false, wis: true, cha: true },
    baseAC: 13,
    features: [
      {
        name: "Patrono Transcendental",
        desc: "Pacto selado com entidade cósmica (Corruptor, Arquifada ou Grande Antigo)."
      },
      {
        name: "Magia de Pacto",
        desc: "Seus espaços de magia são sempre lançados no círculo máximo disponível e recarregam em Descanso Curto."
      }
    ],
    starterAttack: {
      name: "Rajada Mística",
      bonus: "+5",
      damage: "1d10 de energia",
      notes: "Truque, Alcance 36m (120 pés)"
    },
    starterEquipment: "• Armadura de Couro\n• Adaga e Foco Arcano\n• Pacote de Estudioso\n• Riquezas: 10 PO"
  },
  "Feiticeiro": {
    hitDie: "1d6",
    hitDieSides: 6,
    savingProficiencies: { str: false, dex: false, con: true, int: false, wis: false, cha: true },
    baseAC: 12,
    features: [
      {
        name: "Origem de Feitiçaria",
        desc: "Poder mágico inato transmitido por linhagem dracônica ou magia selvagem."
      },
      {
        name: "Conjuração Inata",
        desc: "Lança magias moldando a trama arcana com Carisma. CD: 8 + Bônus Prof + Mod CAR."
      }
    ],
    starterAttack: {
      name: "Raio de Fogo",
      bonus: "+5",
      damage: "1d10 de fogo",
      notes: "Alcance 36m"
    },
    starterEquipment: "• Foco Arcano\n• 2 Adagas\n• Pacote de Masmorra\n• Riquezas: 10 PO"
  }
};

/**
 * Cria uma ficha 100% LIMPA e Nova, aplicando automaticamente as regras de Raça e Classe do D&D 5e
 */
export function createCleanCharacter({ name, race = "Humano", className = "Guerreiro", level = 1, playerName = "" }) {
  const rData = RACE_DATA[race] || RACE_DATA["Humano"];
  const cData = CLASS_DATA[className] || CLASS_DATA["Guerreiro"];

  // Atributos base equilibrados (14, 12, 13, 10, 10, 10 padrão)
  const baseScores = {
    str: 14,
    dex: 12,
    con: 13,
    int: 10,
    wis: 10,
    cha: 10
  };

  // Se classe for Mago, prioriza INT; se Ladino, prioriza DES; se Bárbaro/Paladino, prioriza FOR; etc.
  if (className === "Mago") {
    baseScores.int = 14; baseScores.str = 10;
  } else if (className === "Ladino" || className === "Ranger" || className === "Monge") {
    baseScores.dex = 14; baseScores.str = 10;
  } else if (className === "Clérigo" || className === "Druida") {
    baseScores.wis = 14; baseScores.str = 10;
  } else if (className === "Bardo" || className === "Bruxo" || className === "Feiticeiro") {
    baseScores.cha = 14; baseScores.str = 10;
  }

  // Soma bônus racial
  const finalStats = {
    str: baseScores.str + (rData.statsBonus?.str || 0),
    dex: baseScores.dex + (rData.statsBonus?.dex || 0),
    con: baseScores.con + (rData.statsBonus?.con || 0),
    int: baseScores.int + (rData.statsBonus?.int || 0),
    wis: baseScores.wis + (rData.statsBonus?.wis || 0),
    cha: baseScores.cha + (rData.statsBonus?.cha || 0)
  };

  const conMod = Math.floor((finalStats.con - 10) / 2);
  const dexMod = Math.floor((finalStats.dex - 10) / 2);

  // PVs no nível 1: Dado cheio + CON
  const hpBase = cData.hitDieSides + conMod;
  const hpPerLevel = Math.floor(cData.hitDieSides / 2) + 1 + conMod;
  const hpTotal = Math.max(1, hpBase + (Math.max(1, level) - 1) * hpPerLevel);

  // Características formatadas em texto com marcadores
  let featuresText = `• HERANÇA RACIAL: ${race.toUpperCase()}\n`;
  rData.traits.forEach(t => {
    featuresText += `\n• ${t.name} (Racial)\n${t.desc}\n`;
  });

  featuresText += `\n• VOCAÇÃO DE CLASSE: ${className.toUpperCase()}\n`;
  cData.features.forEach(f => {
    featuresText += `\n• ${f.name} (${className} 1)\n${f.desc}\n`;
  });

  // Idiomas e outras proficiências
  const profLanguages = rData.languages.join(", ");
  const otherProf = `• Idiomas: ${profLanguages}\n• Armaduras: Proficiência de ${className}\n• Armas: Proficiência marcial/simples de ${className}`;

  return {
    id: "char_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
    name: name.trim(),
    className,
    level: Number(level) || 1,
    background: "Aventureiro",
    playerName: playerName.trim() || "Aventureiro",
    race,
    alignment: "Neutro",
    xp: 0,

    stats: finalStats,
    inspiration: false,
    profBonusOverride: undefined,
    savingProficiencies: { ...cData.savingProficiencies },
    skillsProficiencies: {
      acrobatics: false,
      animalHandling: false,
      arcana: false,
      athletics: false,
      deception: false,
      history: false,
      insight: false,
      intimidation: Boolean(rData.skillProficiencies?.intimidation),
      investigation: false,
      medicine: false,
      nature: false,
      perception: Boolean(rData.skillProficiencies?.perception),
      performance: false,
      persuasion: false,
      religion: false,
      sleightOfHand: false,
      stealth: false,
      survival: false
    },
    passivePerceptionOverride: undefined,

    armorClass: cData.baseAC || (10 + dexMod),
    initiativeBonus: dexMod,
    speed: rData.speed || "9m",
    hpMax: hpTotal,
    hpCurrent: hpTotal,
    hpTemp: 0,
    hitDiceTotal: `${level}${cData.hitDie.replace(/^\d+/, "")}`,
    hitDiceCurrent: `${level}${cData.hitDie.replace(/^\d+/, "")}`,
    deathSaves: { successes: 0, failures: 0 },

    attacks: [
      {
        id: "atk-" + Date.now(),
        name: cData.starterAttack.name,
        bonus: cData.starterAttack.bonus,
        damage: cData.starterAttack.damage,
        notes: cData.starterAttack.notes
      }
    ],
    attackNotes: `• Dado de Vida: ${cData.hitDie}\n• Deslocamento Base: ${rData.speed}\n• Sentidos: ${rData.senses}`,

    coins: { cp: 0, sp: 0, ep: 0, gp: 10, pp: 0 },
    equipmentText: cData.starterEquipment,
    otherProficiencies: otherProf,

    featuresText: featuresText.trim(),

    // Campos de personalidade começam em branco para o jogador personalizar
    personalityTraits: "",
    ideals: "",
    bonds: "",
    flaws: "",

    spellcasting: {
      spellClass: className,
      spellAbility: className === "Mago" ? "int" : (className === "Clérigo" || className === "Druida" || className === "Ranger") ? "wis" : "cha",
      spellSaveDC: 8 + 2 + (className === "Mago" ? Math.floor((finalStats.int - 10) / 2) : 2),
      spellAttackBonus: 2 + (className === "Mago" ? Math.floor((finalStats.int - 10) / 2) : 2),
      spells: []
    }
  };
}
