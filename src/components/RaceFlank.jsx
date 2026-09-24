import React from "react";
import { Shield, Sparkles, Eye, Zap, Heart, Sword, Flame } from "lucide-react";

// Dados canônicos e arte temática para as raças de D&D 5e
const RACE_LORE = {
  "Meio-Orc": {
    title: "Meio-Orc",
    sub: "Herança dos Clãs Guerreiros",
    color: "#b45309",
    bgAccent: "rgba(180, 83, 9, 0.12)",
    borderAccent: "rgba(217, 119, 6, 0.35)",
    quote: "A fúria de Gruumsh corre nas minhas veias, temperada pelo aço e pela disciplina.",
    statBonus: "+2 Força, +1 Constituição",
    speed: "9m (30 pés)",
    size: "Médio",
    vision: "Visão no Escuro (18m)",
    traits: [
      { name: "Resistência Implacável", desc: "Ao cair a 0 PV e não morrer de imediato, cai para 1 PV (1x por Descanso Longo)." },
      { name: "Ataques Selvagens", desc: "Em acertos críticos corpo a corpo, rola mais um dado de dano da arma." },
      { name: "Ameaçador", desc: "Proficiência automática e natural na perícia Intimidação." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(217,119,6,0.5)]">
        <circle cx="50" cy="50" r="46" fill="#1c1917" stroke="#d97706" strokeWidth="2.5" />
        {/* Presas de Meio-Orc e Elmo tribal */}
        <path d="M 28 62 Q 32 46 38 42 Q 39 52 35 64 Z" fill="#fef08a" stroke="#78350f" strokeWidth="1.5" />
        <path d="M 72 62 Q 68 46 62 42 Q 61 52 65 64 Z" fill="#fef08a" stroke="#78350f" strokeWidth="1.5" />
        <path d="M 32 32 L 50 18 L 68 32 L 50 42 Z" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="42" cy="46" r="3" fill="#ef4444" />
        <circle cx="58" cy="46" r="3" fill="#ef4444" />
        <path d="M 38 58 Q 50 68 62 58" fill="none" stroke="#d97706" strokeWidth="2" />
      </svg>
    )
  },
  "Draconato": {
    title: "Draconato",
    sub: "Nobreza e Fogo Ancestral",
    color: "#dc2626",
    bgAccent: "rgba(220, 38, 38, 0.12)",
    borderAccent: "rgba(239, 68, 68, 0.35)",
    quote: "O sopro dos dragões ancestrais arde em nosso peito.",
    statBonus: "+2 Força, +1 Carisma",
    speed: "9m (30 pés)",
    size: "Médio",
    vision: "Normal",
    traits: [
      { name: "Arma de Sopro", desc: "Cone de 4,5m ou Linha de 9m (dano elemental de 2d6 a 5d6)." },
      { name: "Resistência Dracônica", desc: "Resistência ao tipo de dano associado à ancestralidade." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(239,68,68,0.5)]">
        <circle cx="50" cy="50" r="46" fill="#1c1917" stroke="#ef4444" strokeWidth="2.5" />
        <path d="M 30 65 Q 50 25 70 65 Q 50 55 30 65 Z" fill="#991b1b" stroke="#f87171" strokeWidth="1.5" />
        <polygon points="50,18 42,35 58,35" fill="#f59e0b" />
        <circle cx="44" cy="48" r="3" fill="#fbbf24" />
        <circle cx="56" cy="48" r="3" fill="#fbbf24" />
      </svg>
    )
  },
  "Elfo": {
    title: "Elfo",
    sub: "Graça das Florestas Antigas",
    color: "#10b981",
    bgAccent: "rgba(16, 185, 129, 0.12)",
    borderAccent: "rgba(52, 211, 153, 0.35)",
    quote: "A magia da floresta sussurra através das eras em nossos passos leves.",
    statBonus: "+2 Destreza",
    speed: "9m (30 pés)",
    size: "Médio",
    vision: "Visão no Escuro (18m)",
    traits: [
      { name: "Sentidos Aguçados", desc: "Proficiência automática em Percepção." },
      { name: "Ancestral Feérico", desc: "Vantagem contra ser enfeitiçado, imune ao sono mágico." },
      { name: "Transe", desc: "Não dorme; medita 4 horas para descanso longo completo." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]">
        <circle cx="50" cy="50" r="46" fill="#064e3b" stroke="#34d399" strokeWidth="2.5" />
        <path d="M 25 50 Q 50 20 75 50 Q 50 80 25 50 Z" fill="#047857" stroke="#a7f3d0" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="8" fill="#ecfdf5" />
      </svg>
    )
  },
  "Anão": {
    title: "Anão",
    sub: "Filhos da Rocha e do Aço",
    color: "#d97706",
    bgAccent: "rgba(217, 119, 6, 0.12)",
    borderAccent: "rgba(245, 158, 11, 0.35)",
    quote: "Firme como o granito das montanhas mais profundas.",
    statBonus: "+2 Constituição",
    speed: "7,5m (25 pés)",
    size: "Médio",
    vision: "Visão no Escuro (18m)",
    traits: [
      { name: "Resiliência Anã", desc: "Vantagem contra veneno e resistência a dano de veneno." },
      { name: "Treinamento em Combate", desc: "Proficiência com machados e martelos." },
      { name: "Conhecimento de Pedra", desc: "Dobro de proficiência em testes de História sobre rocha." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]">
        <circle cx="50" cy="50" r="46" fill="#1c1917" stroke="#f59e0b" strokeWidth="2.5" />
        <rect x="38" y="24" width="24" height="20" rx="3" fill="#78350f" stroke="#fbbf24" strokeWidth="2" />
        <rect x="46" y="44" width="8" height="34" fill="#92400e" />
      </svg>
    )
  },
  "Humano": {
    title: "Humano",
    sub: "Ambição e Adaptabilidade",
    color: "#3b82f6",
    bgAccent: "rgba(59, 130, 246, 0.12)",
    borderAccent: "rgba(96, 165, 250, 0.35)",
    quote: "A diversidade e a perseverança moldam as lendas dos reinos.",
    statBonus: "+1 em Todos os Atributos (ou Talento)",
    speed: "9m (30 pés)",
    size: "Médio",
    vision: "Normal",
    traits: [
      { name: "Versatilidade", desc: "Aprendizado acelerado e adaptabilidade a qualquer classe." },
      { name: "Idiomas Extras", desc: "Comum e um idioma adicional à sua escolha." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]">
        <circle cx="50" cy="50" r="46" fill="#1e293b" stroke="#60a5fa" strokeWidth="2.5" />
        <polygon points="50,22 62,45 85,45 66,60 74,82 50,68 26,82 34,60 15,45 38,45" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
      </svg>
    )
  }
};

export default function RaceFlank({ race = "Meio-Orc" }) {
  const data = RACE_LORE[race] || RACE_LORE["Meio-Orc"];

  return (
    <aside 
      className="hidden xl:flex flex-col w-64 2xl:w-72 rounded-2xl p-4 border backdrop-blur-md shadow-2xl transition-all self-start sticky top-16"
      style={{
        backgroundColor: "rgba(18, 15, 12, 0.88)",
        borderColor: data.borderAccent,
        boxShadow: `0 10px 30px -5px ${data.bgAccent}`
      }}
    >
      {/* Cabeçalho do Card */}
      <div className="flex flex-col items-center text-center pb-3 border-b border-white/10">
        <div className="mb-2 p-1.5 rounded-2xl bg-black/40 border border-white/10 shadow-inner">
          {data.icon}
        </div>
        <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">
          Ancestralidade
        </span>
        <h3 className="font-serif font-black text-xl text-white tracking-wide" style={{ color: data.color }}>
          {data.title}
        </h3>
        <p className="text-[11px] text-white/60 italic mt-0.5">
          {data.sub}
        </p>
      </div>

      {/* Citação / Flavor */}
      <div className="my-3 p-2.5 rounded-xl bg-black/40 border border-white/5 text-[10px] text-white/70 italic leading-relaxed text-center">
        "{data.quote}"
      </div>

      {/* Estatísticas Básicas da Raça */}
      <div className="space-y-1.5 text-xs pb-3 border-b border-white/10">
        <div className="flex justify-between items-center py-1 px-2 rounded-lg bg-white/5">
          <span className="text-[11px] text-white/50 font-medium">Bônus:</span>
          <span className="font-bold text-amber-300 font-mono text-[11px]">{data.statBonus}</span>
        </div>
        <div className="flex justify-between items-center py-1 px-2 rounded-lg bg-white/5">
          <span className="text-[11px] text-white/50 font-medium">Deslocamento:</span>
          <span className="font-bold text-white text-[11px]">{data.speed}</span>
        </div>
        <div className="flex justify-between items-center py-1 px-2 rounded-lg bg-white/5">
          <span className="text-[11px] text-white/50 font-medium">Visão:</span>
          <span className="font-bold text-emerald-400 text-[11px]">{data.vision}</span>
        </div>
      </div>

      {/* Traços Raciais Especiais */}
      <div className="mt-3 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">
          Traços Raciais Natos:
        </span>
        {data.traits.map((t, idx) => (
          <div 
            key={idx} 
            className="p-2.5 rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] transition-all"
          >
            <div className="flex items-center gap-1.5 mb-1 font-bold text-xs" style={{ color: data.color }}>
              <Sparkles size={12} />
              <span>{t.name}</span>
            </div>
            <p className="text-[10px] text-white/70 leading-snug">
              {t.desc}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}
