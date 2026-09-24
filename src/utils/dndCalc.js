// ============================================================================
// CÁLCULOS CANÔNICOS OFICIAIS D&D 5ª EDIÇÃO (LIVRO DO JOGADOR)
// ============================================================================

export function getAbilityModifier(score) {
  const num = parseInt(score, 10);
  if (isNaN(num)) return 0;
  return Math.floor((num - 10) / 2);
}

export function formatModifier(mod) {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function getProficiencyBonus(level) {
  const lvl = Math.min(20, Math.max(1, parseInt(level, 10) || 1));
  return Math.ceil(lvl / 4) + 1; // 1-4: +2, 5-8: +3, 9-12: +4, 13-16: +5, 17-20: +6
}

export const CLASS_HIT_DICE = {
  "Bárbaro": "d12",
  "Guerreiro": "d10",
  "Paladino": "d10",
  "Ranger": "d10",
  "Bardo": "d8",
  "Bruxo": "d8",
  "Clérigo": "d8",
  "Druida": "d8",
  "Ladino": "d8",
  "Monge": "d8",
  "Feiticeiro": "d6",
  "Mago": "d6"
};

export const CLASS_SAVING_PROFS = {
  "Bárbaro": ["str", "con"],
  "Bardo": ["dex", "cha"],
  "Bruxo": ["wis", "cha"],
  "Clérigo": ["wis", "cha"],
  "Druida": ["int", "wis"],
  "Feiticeiro": ["con", "cha"],
  "Guerreiro": ["str", "con"],
  "Ladino": ["dex", "int"],
  "Mago": ["int", "wis"],
  "Monge": ["str", "dex"],
  "Paladino": ["wis", "cha"],
  "Ranger": ["str", "dex"]
};

export const CLASS_SPELL_ABILITY = {
  "Bardo": "cha",
  "Bruxo": "cha",
  "Clérigo": "wis",
  "Druida": "wis",
  "Feiticeiro": "cha",
  "Mago": "int",
  "Paladino": "cha",
  "Ranger": "wis"
};

export const ABILITIES = [
  { id: "str", name: "Força", short: "FOR" },
  { id: "dex", name: "Destreza", short: "DES" },
  { id: "con", name: "Constituição", short: "CON" },
  { id: "int", name: "Inteligência", short: "INT" },
  { id: "wis", name: "Sabedoria", short: "SAB" },
  { id: "cha", name: "Carisma", short: "CAR" }
];

export const SKILLS = [
  { id: "acrobatics", name: "Acrobacia", stat: "dex" },
  { id: "animalHandling", name: "Lidar com Animais", stat: "wis" },
  { id: "arcana", name: "Arcanismo", stat: "int" },
  { id: "athletics", name: "Atletismo", stat: "str" },
  { id: "deception", name: "Enganação", stat: "cha" },
  { id: "history", name: "História", stat: "int" },
  { id: "insight", name: "Intuição", stat: "wis" },
  { id: "intimidation", name: "Intimidação", stat: "cha" },
  { id: "investigation", name: "Investigação", stat: "int" },
  { id: "medicine", name: "Medicina", stat: "wis" },
  { id: "nature", name: "Natureza", stat: "int" },
  { id: "perception", name: "Percepção", stat: "wis" },
  { id: "performance", name: "Atuação", stat: "cha" },
  { id: "persuasion", name: "Persuasão", stat: "cha" },
  { id: "religion", name: "Religião", stat: "int" },
  { id: "sleightOfHand", name: "Prestidigitação", stat: "dex" },
  { id: "stealth", name: "Furtividade", stat: "dex" },
  { id: "survival", name: "Sobrevivência", stat: "wis" }
];

// TABELA OFICIAL DE EXPERIÊNCIA E AVANÇO DE NÍVEL (PHB Pág 15)
export const XP_TABLE = {
  1: 0,
  2: 300,
  3: 900,
  4: 2700,
  5: 6500,
  6: 14000,
  7: 23000,
  8: 34000,
  9: 48000,
  10: 64000,
  11: 85000,
  12: 100000,
  13: 120000,
  14: 140000,
  15: 165000,
  16: 195000,
  17: 225000,
  18: 265000,
  19: 305000,
  20: 355000
};

export function getLevelFromXP(xp) {
  const points = parseInt(xp, 10) || 0;
  for (let lvl = 20; lvl >= 1; lvl--) {
    if (points >= XP_TABLE[lvl]) return lvl;
  }
  return 1;
}

export function getNextLevelXP(currentLevel) {
  const lvl = Math.min(20, Math.max(1, parseInt(currentLevel, 10) || 1));
  if (lvl >= 20) return XP_TABLE[20];
  return XP_TABLE[lvl + 1];
}

// CÁLCULO CANÔNICO DE PONTOS DE VIDA (PV)
// Nível 1: Dado Máximo + Mod Con
// Níveis seguintes: Média arredondada para cima + Mod Con por nível
export function calculateCanonicalHP(className, level, conScore) {
  const lvl = Math.max(1, parseInt(level, 10) || 1);
  const conMod = getAbilityModifier(conScore);
  const dieStr = CLASS_HIT_DICE[className] || "d8";
  const dieMax = parseInt(dieStr.replace("d", ""), 10) || 8;
  const dieAvg = Math.floor(dieMax / 2) + 1; // d12=7, d10=6, d8=5, d6=4
  
  const lvl1HP = Math.max(1, dieMax + conMod);
  const extraLevelsHP = Math.max(0, (lvl - 1) * Math.max(1, dieAvg + conMod));
  return lvl1HP + extraLevelsHP;
}

// TABELA OFICIAL DE ESPAÇOS DE MAGIA (CONJURADORES COMPLETOS)
export const FULL_CASTER_CLASSES = ["Bardo", "Clérigo", "Druida", "Feiticeiro", "Mago"];
export const HALF_CASTER_CLASSES = ["Paladino", "Ranger"];

export const FULL_CASTER_SLOTS = {
  1: { 1: 2 },
  2: { 1: 3 },
  3: { 1: 4, 2: 2 },
  4: { 1: 4, 2: 3 },
  5: { 1: 4, 2: 3, 3: 2 },
  6: { 1: 4, 2: 3, 3: 3 },
  7: { 1: 4, 2: 3, 3: 3, 4: 1 },
  8: { 1: 4, 2: 3, 3: 3, 4: 2 },
  9: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
  10: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
  11: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
  12: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
  13: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
  14: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
  15: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
  16: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
  17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
  18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 },
  19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
  20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 }
};

export const HALF_CASTER_SLOTS = {
  1: {},
  2: { 1: 2 },
  3: { 1: 3 },
  4: { 1: 3 },
  5: { 1: 4, 2: 2 },
  6: { 1: 4, 2: 2 },
  7: { 1: 4, 2: 3 },
  8: { 1: 4, 2: 3 },
  9: { 1: 4, 2: 3, 3: 2 },
  10: { 1: 4, 2: 3, 3: 2 },
  11: { 1: 4, 2: 3, 3: 3 },
  12: { 1: 4, 2: 3, 3: 3 },
  13: { 1: 4, 2: 3, 3: 3, 4: 1 },
  14: { 1: 4, 2: 3, 3: 3, 4: 1 },
  15: { 1: 4, 2: 3, 3: 3, 4: 2 },
  16: { 1: 4, 2: 3, 3: 3, 4: 2 },
  17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
  18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
  19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
  20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 }
};

export const WARLOCK_SLOTS_TABLE = {
  1: { slotCount: 1, slotLevel: 1 },
  2: { slotCount: 2, slotLevel: 1 },
  3: { slotCount: 2, slotLevel: 2 },
  4: { slotCount: 2, slotLevel: 2 },
  5: { slotCount: 2, slotLevel: 3 },
  6: { slotCount: 2, slotLevel: 3 },
  7: { slotCount: 2, slotLevel: 4 },
  8: { slotCount: 2, slotLevel: 4 },
  9: { slotCount: 2, slotLevel: 5 },
  10: { slotCount: 2, slotLevel: 5 },
  11: { slotCount: 3, slotLevel: 5 },
  12: { slotCount: 3, slotLevel: 5 },
  13: { slotCount: 3, slotLevel: 5 },
  14: { slotCount: 3, slotLevel: 5 },
  15: { slotCount: 3, slotLevel: 5 },
  16: { slotCount: 3, slotLevel: 5 },
  17: { slotCount: 4, slotLevel: 5 },
  18: { slotCount: 4, slotLevel: 5 },
  19: { slotCount: 4, slotLevel: 5 },
  20: { slotCount: 4, slotLevel: 5 }
};

export function getSlotsForClassAndLevel(className, level, existingSlots = {}) {
  const lvl = Math.min(20, Math.max(1, parseInt(level, 10) || 1));
  const newSlots = { ...existingSlots };

  // Inicializa níveis 1 a 9 com 0
  for (let circle = 1; circle <= 9; circle++) {
    newSlots[circle] = { total: 0, used: existingSlots[circle]?.used || 0 };
  }

  if (FULL_CASTER_CLASSES.includes(className)) {
    const table = FULL_CASTER_SLOTS[lvl] || {};
    for (let circle = 1; circle <= 9; circle++) {
      newSlots[circle].total = table[circle] || 0;
    }
  } else if (HALF_CASTER_CLASSES.includes(className)) {
    const table = HALF_CASTER_SLOTS[lvl] || {};
    for (let circle = 1; circle <= 9; circle++) {
      newSlots[circle].total = table[circle] || 0;
    }
  } else if (className === "Bruxo") {
    const warlockData = WARLOCK_SLOTS_TABLE[lvl] || { slotCount: 1, slotLevel: 1 };
    newSlots[warlockData.slotLevel].total = warlockData.slotCount;
  }

  return newSlots;
}

// ============================================================================
// MOTOR CANÔNICO DE MULTICLASSE (D&D 5ª EDIÇÃO - PHB CAPÍTULO 6)
// ============================================================================

export const MULTICLASS_PREREQUISITES = {
  "Bárbaro": { label: "Força 13", check: (s) => (s?.str || 10) >= 13 },
  "Bardo": { label: "Carisma 13", check: (s) => (s?.cha || 10) >= 13 },
  "Bruxo": { label: "Carisma 13", check: (s) => (s?.cha || 10) >= 13 },
  "Clérigo": { label: "Sabedoria 13", check: (s) => (s?.wis || 10) >= 13 },
  "Druida": { label: "Sabedoria 13", check: (s) => (s?.wis || 10) >= 13 },
  "Feiticeiro": { label: "Carisma 13", check: (s) => (s?.cha || 10) >= 13 },
  "Guerreiro": { label: "Força 13 ou Destreza 13", check: (s) => (s?.str || 10) >= 13 || (s?.dex || 10) >= 13 },
  "Ladino": { label: "Destreza 13", check: (s) => (s?.dex || 10) >= 13 },
  "Mago": { label: "Inteligência 13", check: (s) => (s?.int || 10) >= 13 },
  "Monge": { label: "Destreza 13 e Sabedoria 13", check: (s) => (s?.dex || 10) >= 13 && (s?.wis || 10) >= 13 },
  "Paladino": { label: "Força 13 e Carisma 13", check: (s) => (s?.str || 10) >= 13 && (s?.cha || 10) >= 13 },
  "Ranger": { label: "Destreza 13 e Sabedoria 13", check: (s) => (s?.dex || 10) >= 13 && (s?.wis || 10) >= 13 }
};

export const MULTICLASS_PROFICIENCIES = {
  "Bárbaro": "Escudos, armas simples, armas marciais",
  "Bardo": "Armadura leve, 1 perícia da lista, 1 instrumento musical",
  "Bruxo": "Armadura leve, armas simples",
  "Clérigo": "Armadura leve, armadura média, escudos",
  "Druida": "Armadura leve, armadura média, escudos (sem metal)",
  "Feiticeiro": "Nenhuma nova proficiência",
  "Guerreiro": "Armadura leve, armadura média, escudos, armas simples, armas marciais",
  "Ladino": "Armadura leve, 1 perícia da lista, ferramentas de ladrão",
  "Mago": "Nenhuma nova proficiência",
  "Monge": "Armas simples, espadas curtas",
  "Paladino": "Armadura leve, armadura média, escudos, armas simples, armas marciais",
  "Ranger": "Armadura leve, armadura média, escudos, armas simples, armas marciais, 1 perícia da lista"
};

// Tabela oficial de espaços de magia para conjurador multiclasse (PHB p. 167)
export const MULTICLASS_SPELL_SLOTS_TABLE = {
  1: { 1: 2 },
  2: { 1: 3 },
  3: { 1: 4, 2: 2 },
  4: { 1: 4, 2: 3 },
  5: { 1: 4, 2: 3, 3: 2 },
  6: { 1: 4, 2: 3, 3: 3 },
  7: { 1: 4, 2: 3, 3: 3, 4: 1 },
  8: { 1: 4, 2: 3, 3: 3, 4: 2 },
  9: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
  10: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
  11: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
  12: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
  13: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
  14: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
  15: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
  16: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
  17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
  18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 },
  19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
  20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 }
};

export function checkMulticlassPrerequisites(className, stats) {
  const prereq = MULTICLASS_PREREQUISITES[className];
  if (!prereq) return { meets: true, label: "Sem pré-requisitos rígidos" };
  const meets = prereq.check(stats);
  return { meets, label: prereq.label };
}

export function calculateMulticlassHitDice(classList = []) {
  if (!classList || classList.length === 0) return "1d8";
  
  const dieCounts = {};
  classList.forEach(c => {
    const die = CLASS_HIT_DICE[c.className] || "d8";
    const lvl = Math.max(1, parseInt(c.level, 10) || 1);
    dieCounts[die] = (dieCounts[die] || 0) + lvl;
  });

  const sortedDice = Object.keys(dieCounts).sort((a, b) => {
    const numA = parseInt(a.replace("d", ""), 10);
    const numB = parseInt(b.replace("d", ""), 10);
    return numB - numA;
  });

  return sortedDice.map(die => `${dieCounts[die]}${die}`).join(" + ");
}

export function calculateMulticlassHP(classList = [], conScore = 10) {
  if (!classList || classList.length === 0) return 10;
  const conMod = getAbilityModifier(conScore);

  let totalHP = 0;
  classList.forEach((c, idx) => {
    const lvl = Math.max(1, parseInt(c.level, 10) || 1);
    const dieStr = CLASS_HIT_DICE[c.className] || "d8";
    const dieMax = parseInt(dieStr.replace("d", ""), 10) || 8;
    const dieAvg = Math.floor(dieMax / 2) + 1;

    if (idx === 0) {
      // 1ª Classe: Ganha dado máximo no 1º nível
      const lvl1HP = Math.max(1, dieMax + conMod);
      const otherLevelsHP = Math.max(0, (lvl - 1) * Math.max(1, dieAvg + conMod));
      totalHP += lvl1HP + otherLevelsHP;
    } else {
      // Classes seguintes: Todos os níveis recebem a média arredondada
      const allLevelsHP = lvl * Math.max(1, dieAvg + conMod);
      totalHP += allLevelsHP;
    }
  });

  return Math.max(1, totalHP);
}

export function calculateCombinedSpellSlots(classList = [], existingSlots = {}) {
  if (!classList || classList.length === 0) return existingSlots;
  if (classList.length === 1) {
    return getSlotsForClassAndLevel(classList[0].className, classList[0].level, existingSlots);
  }

  const warlockEntry = classList.find(c => c.className === "Bruxo");
  const nonWarlockCasters = classList.filter(c => c.className !== "Bruxo");

  let totalCasterLevel = 0;
  nonWarlockCasters.forEach(c => {
    const lvl = parseInt(c.level, 10) || 1;
    if (FULL_CASTER_CLASSES.includes(c.className)) {
      totalCasterLevel += lvl;
    } else if (HALF_CASTER_CLASSES.includes(c.className)) {
      totalCasterLevel += Math.floor(lvl / 2);
    }
  });

  const newSlots = { ...existingSlots };
  for (let circle = 1; circle <= 9; circle++) {
    newSlots[circle] = { total: 0, used: existingSlots[circle]?.used || 0 };
  }

  if (totalCasterLevel > 0) {
    const cappedLvl = Math.min(20, Math.max(1, totalCasterLevel));
    const table = MULTICLASS_SPELL_SLOTS_TABLE[cappedLvl] || {};
    for (let circle = 1; circle <= 9; circle++) {
      newSlots[circle].total = table[circle] || 0;
    }
  }

  // Se tiver Bruxo, adiciona os espaços de Pacto ao círculo correspondente
  if (warlockEntry) {
    const wLvl = Math.min(20, Math.max(1, parseInt(warlockEntry.level, 10) || 1));
    const wData = WARLOCK_SLOTS_TABLE[wLvl] || { slotCount: 1, slotLevel: 1 };
    newSlots[wData.slotLevel] = {
      total: (newSlots[wData.slotLevel]?.total || 0) + wData.slotCount,
      used: newSlots[wData.slotLevel]?.used || 0,
      pactSlots: wData.slotCount
    };
  }

  return newSlots;
}

export function formatClassString(classList = []) {
  if (!classList || classList.length === 0) return "Aventureiro";
  if (classList.length === 1) return classList[0].className;
  return classList.map(c => `${c.className} ${c.level}`).join(" / ");
}

export function parseClassString(str, totalLevel = 1) {
  if (!str) return [{ className: "Guerreiro", level: totalLevel }];
  if (str.includes("/")) {
    const parts = str.split("/").map(s => s.trim());
    const list = [];
    parts.forEach(part => {
      const match = part.match(/^([a-zA-ZÀ-ÿ\s]+?)\s*(\d+)?$/);
      if (match) {
        const cls = match[1].trim();
        const lvl = parseInt(match[2], 10) || 1;
        list.push({ className: cls, level: lvl });
      }
    });
    if (list.length > 0) return list;
  }
  return [{ className: str.trim(), level: totalLevel }];
}
