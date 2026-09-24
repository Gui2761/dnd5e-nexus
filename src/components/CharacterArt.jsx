import React from "react";

const RACE_ICONS = {
  "Meio-Orc": "🧌",
  "Draconato": "🐲",
  "Elfo": "🧝",
  "Anão": "⛏️",
  "Humano": "👑",
  "Halfling": "🍀",
  "Gnomo": "⚙️",
  "Meio-Elfo": "✨",
  "Tiefling": "🔥"
};

const CLASS_ICONS = {
  "Paladino": "🛡️",
  "Guerreiro": "⚔️",
  "Mago": "🔮",
  "Bárbaro": "🪓",
  "Ladino": "🗡️",
  "Clérigo": "✨",
  "Druida": "🌿",
  "Bardo": "🎭",
  "Monge": "🥋",
  "Ranger": "🏹",
  "Bruxo": "👁️",
  "Feiticeiro": "🐉"
};

export default function CharacterArt({ className = "Paladino", race = "Meio-Orc" }) {
  const isPaladin = className.toLowerCase().includes("paladino");
  const isHalfOrc = race.toLowerCase().includes("orc");
  const isDragon = race.toLowerCase().includes("drag") || className.toLowerCase().includes("feiticeiro");

  // Localiza ícone da raça
  let raceEmoji = "🛡️";
  for (const [rKey, emoji] of Object.entries(RACE_ICONS)) {
    if (race.toLowerCase().includes(rKey.toLowerCase())) {
      raceEmoji = emoji;
      break;
    }
  }

  // Localiza ícone da classe
  let classEmoji = "✨";
  for (const [cKey, emoji] of Object.entries(CLASS_ICONS)) {
    if (className.toLowerCase().includes(cKey.toLowerCase())) {
      classEmoji = emoji;
      break;
    }
  }

  return (
    <div className="flex items-center gap-3 p-2 bg-gradient-to-r from-amber-950/20 via-neutral-900/40 to-amber-950/20 rounded-xl border border-amber-500/20 my-2 select-none shadow-inner">
      {/* Insígnia da Raça */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-amber-600/40 flex items-center justify-center shadow-md relative overflow-hidden group">
          {isHalfOrc ? (
            <svg viewBox="0 0 100 100" className="w-8 h-8 fill-amber-500 drop-shadow">
              <circle cx="50" cy="45" r="28" fill="#262626" stroke="#b45309" strokeWidth="4" />
              <polygon points="32,62 38,48 42,62" fill="#fef3c7" stroke="#92400e" strokeWidth="2" />
              <polygon points="68,62 62,48 58,62" fill="#fef3c7" stroke="#92400e" strokeWidth="2" />
              <circle cx="40" cy="42" r="4" fill="#ef4444" />
              <circle cx="60" cy="42" r="4" fill="#ef4444" />
              <path d="M24,35 Q50,22 76,35" stroke="#f59e0b" strokeWidth="5" fill="none" />
            </svg>
          ) : isDragon ? (
            <svg viewBox="0 0 100 100" className="w-8 h-8 fill-orange-500 drop-shadow">
              <path d="M50,15 L75,45 L60,85 L40,85 L25,45 Z" fill="#991b1b" stroke="#f97316" strokeWidth="4" />
              <circle cx="42" cy="45" r="5" fill="#fef08a" />
              <circle cx="58" cy="45" r="5" fill="#fef08a" />
            </svg>
          ) : (
            <span className="text-xl">{raceEmoji}</span>
          )}
        </div>
        <div className="leading-tight">
          <span className="text-[7.5px] uppercase font-extrabold tracking-wider text-neutral-400 block">Linhagem Racial</span>
          <span className="text-xs font-bold font-serif text-amber-200">{race || "Aventureiro"}</span>
        </div>
      </div>

      {/* Conexão Sagrada / Brasão da Fusão */}
      <div className="flex-1 flex items-center justify-center gap-1.5 px-2 text-center border-x border-white/10">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-500/50" />
        <span className="text-[9px] font-serif font-black tracking-widest text-amber-400 uppercase whitespace-nowrap drop-shadow">
          ⚔️ {race} • {className} ⚔️
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-500/50" />
      </div>

      {/* Insígnia da Classe */}
      <div className="flex items-center gap-2">
        <div className="leading-tight text-right">
          <span className="text-[7.5px] uppercase font-extrabold tracking-wider text-neutral-400 block">Ordem & Vocação</span>
          <span className="text-xs font-bold font-serif text-amber-300">{className || "Aventureiro"}</span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-yellow-500/50 flex items-center justify-center shadow-md relative overflow-hidden">
          {isPaladin ? (
            <svg viewBox="0 0 100 100" className="w-8 h-8 drop-shadow">
              <circle cx="50" cy="50" r="32" fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="6,4" />
              <path d="M50,15 L78,28 C78,65 50,88 50,88 C50,88 22,65 22,28 Z" fill="#78350f" stroke="#fbbf24" strokeWidth="4" />
              <line x1="50" y1="26" x2="50" y2="72" stroke="#fef08a" strokeWidth="5" strokeLinecap="round" />
              <line x1="38" y1="42" x2="62" y2="42" stroke="#fef08a" strokeWidth="5" strokeLinecap="round" />
            </svg>
          ) : (
            <span className="text-xl">{classEmoji}</span>
          )}
        </div>
      </div>
    </div>
  );
}
