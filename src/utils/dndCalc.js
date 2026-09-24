// Funções de Cálculo Oficial D&D 5e (SRD 2024)

export function getAbilityModifier(score) {
  const num = parseInt(score, 10);
  if (isNaN(num)) return 0;
  return Math.floor((num - 10) / 2);
}

export function formatModifier(mod) {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function getProficiencyBonus(level) {
  const lvl = parseInt(level, 10) || 1;
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
