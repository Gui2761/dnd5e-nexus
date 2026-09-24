import React from "react";
import { Sparkles } from "lucide-react";

// Dados canônicos e arte temática para todas as 9 raças oficiais de D&D 5e (PHB)
export const RACE_LORE = {
  "Meio-Orc": {
    title: "Meio-Orc",
    sub: "Herança dos Clãs Guerreiros",
    color: "#b45309",
    bgAccent: "rgba(180, 83, 9, 0.15)",
    borderAccent: "rgba(217, 119, 6, 0.45)",
    quote: "A fúria de Gruumsh corre nas minhas veias, temperada pelo aço e pela disciplina marcial.",
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
    sub: "Nobreza e Fogo dos Dragões",
    color: "#dc2626",
    bgAccent: "rgba(220, 38, 38, 0.15)",
    borderAccent: "rgba(239, 68, 68, 0.45)",
    quote: "O sopro dos dragões ancestrais arde em nosso peito e rege nossa honra de clã.",
    statBonus: "+2 Força, +1 Carisma",
    speed: "9m (30 pés)",
    size: "Médio",
    vision: "Normal",
    traits: [
      { name: "Arma de Sopro", desc: "Ação para expelir sopro destruidor (cone de 4,5m ou linha de 9m) causando 2d6 de dano." },
      { name: "Resistência Dracônica", desc: "Resistência natural ao tipo de dano associado à sua linhagem ancestral." }
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
    bgAccent: "rgba(16, 185, 129, 0.15)",
    borderAccent: "rgba(52, 211, 153, 0.45)",
    quote: "A magia das estrelas e o sussurro das árvores seculares ecoam em nossos passos leves.",
    statBonus: "+2 Destreza",
    speed: "9m (30 pés)",
    size: "Médio",
    vision: "Visão no Escuro (18m)",
    traits: [
      { name: "Sentidos Aguçados", desc: "Proficiência natural automática na perícia Percepção." },
      { name: "Ancestral Feérico", desc: "Vantagem contra encantamentos e imune à condição inconsciente por magia de sono." },
      { name: "Transe", desc: "Não necessita dormir; 4 horas de meditação concedem um Descanso Longo completo." }
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
    sub: "Filhos da Rocha e das Forjas",
    color: "#d97706",
    bgAccent: "rgba(217, 119, 6, 0.15)",
    borderAccent: "rgba(245, 158, 11, 0.45)",
    quote: "Firme como o granito mais profundo e fiel como o ferro temperado na forja.",
    statBonus: "+2 Constituição",
    speed: "7,5m (25 pés)",
    size: "Médio",
    vision: "Visão no Escuro (18m)",
    traits: [
      { name: "Resiliência Anã", desc: "Vantagem em salvaguardas contra veneno e resistência inata a dano de veneno." },
      { name: "Treinamento em Combate", desc: "Proficiência bélica com machados de guerra, machadinhas e martelos." },
      { name: "Especialização em Rochas", desc: "Dobra o bônus de proficiência em testes de História sobre alvenaria e pedra." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]">
        <circle cx="50" cy="50" r="46" fill="#1c1917" stroke="#f59e0b" strokeWidth="2.5" />
        <rect x="36" y="24" width="28" height="20" rx="3" fill="#78350f" stroke="#fbbf24" strokeWidth="2" />
        <rect x="46" y="44" width="8" height="34" fill="#92400e" />
      </svg>
    )
  },
  "Humano": {
    title: "Humano",
    sub: "Ambição, Adaptabilidade & Vontade",
    color: "#3b82f6",
    bgAccent: "rgba(59, 130, 246, 0.15)",
    borderAccent: "rgba(96, 165, 250, 0.45)",
    quote: "A diversidade de espírito e a determinação implacável forjam as lendas dos reinos.",
    statBonus: "+1 em Todos os Atributos (ou Talento)",
    speed: "9m (30 pés)",
    size: "Médio",
    vision: "Normal",
    traits: [
      { name: "Versatilidade", desc: "Adaptação rápida a qualquer classe, cultura ou circunstância adversa." },
      { name: "Idiomas Extras", desc: "Domínio de Comum mais um idioma à escolha do aventureiro." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]">
        <circle cx="50" cy="50" r="46" fill="#1e293b" stroke="#60a5fa" strokeWidth="2.5" />
        <polygon points="50,22 62,45 85,45 66,60 74,82 50,68 26,82 34,60 15,45 38,45" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
      </svg>
    )
  },
  "Halfling": {
    title: "Halfling",
    sub: "Pequeninos Corajosos & Sortudos",
    color: "#14b8a6",
    bgAccent: "rgba(20, 184, 166, 0.15)",
    borderAccent: "rgba(45, 212, 191, 0.45)",
    quote: "A sorte favorece quem tem um coração generoso, espírito livre e passos silenciosos.",
    statBonus: "+2 Destreza",
    speed: "7,5m (25 pés)",
    size: "Pequeno",
    vision: "Normal",
    traits: [
      { name: "Sortudo", desc: "Ao rolar um 1 natural em d20 num ataque, teste ou salvaguarda, pode rerrolar o dado!" },
      { name: "Corajoso", desc: "Vantagem em salvaguardas contra a condição amedrontado." },
      { name: "Agilidade Halfling", desc: "Pode se mover através do espaço de criaturas que sejam de tamanho maior que o seu." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(20,184,166,0.5)]">
        <circle cx="50" cy="50" r="46" fill="#042f2e" stroke="#14b8a6" strokeWidth="2.5" />
        {/* Trevo de Quatro Folhas da Sorte */}
        <circle cx="42" cy="42" r="10" fill="#0d9488" stroke="#5eead4" strokeWidth="1.5" />
        <circle cx="58" cy="42" r="10" fill="#0d9488" stroke="#5eead4" strokeWidth="1.5" />
        <circle cx="42" cy="58" r="10" fill="#0d9488" stroke="#5eead4" strokeWidth="1.5" />
        <circle cx="58" cy="58" r="10" fill="#0d9488" stroke="#5eead4" strokeWidth="1.5" />
        <path d="M 50 50 Q 52 75 45 80" fill="none" stroke="#2dd4bf" strokeWidth="2" />
      </svg>
    )
  },
  "Gnomo": {
    title: "Gnomo",
    sub: "Inventores Vivos & Curiosidade Feérica",
    color: "#eab308",
    bgAccent: "rgba(234, 179, 8, 0.15)",
    borderAccent: "rgba(250, 204, 21, 0.45)",
    quote: "Cada engrenagem do universo esconde um mistério brilhante aguardando para ser revelado.",
    statBonus: "+2 Inteligência",
    speed: "7,5m (25 pés)",
    size: "Pequeno",
    vision: "Visão no Escuro (18m)",
    traits: [
      { name: "Esperteza Gnômica", desc: "Vantagem em todas as salvaguardas de Inteligência, Sabedoria e Carisma contra magias." },
      { name: "Visão no Escuro", desc: "Enxerga na penumbra até 18m como luz plena e escuridão como penumbra." },
      { name: "Engenhosidade Nato", desc: "Proficiência instintiva com ferramentas, invenções e mecanismos arcanos." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(234,179,8,0.5)]">
        <circle cx="50" cy="50" r="46" fill="#1c1917" stroke="#eab308" strokeWidth="2.5" />
        {/* Engrenagem Gnômica Mística */}
        <circle cx="50" cy="50" r="18" fill="#854d0e" stroke="#facc15" strokeWidth="2" />
        <circle cx="50" cy="50" r="8" fill="#1c1917" />
        <line x1="50" y1="24" x2="50" y2="76" stroke="#facc15" strokeWidth="3" />
        <line x1="24" y1="50" x2="76" y2="50" stroke="#facc15" strokeWidth="3" />
        <line x1="32" y1="32" x2="68" y2="68" stroke="#facc15" strokeWidth="3" />
        <line x1="68" y1="32" x2="32" y2="68" stroke="#facc15" strokeWidth="3" />
      </svg>
    )
  },
  "Meio-Elfo": {
    title: "Meio-Elfo",
    sub: "A Ponte entre Dois Mundos",
    color: "#06b6d4",
    bgAccent: "rgba(6, 182, 212, 0.15)",
    borderAccent: "rgba(34, 211, 238, 0.45)",
    quote: "Carrego a graça atemporal dos elfos e a paixão incansável dos homens.",
    statBonus: "+2 Carisma, +1 em dois atributos",
    speed: "9m (30 pés)",
    size: "Médio",
    vision: "Visão no Escuro (18m)",
    traits: [
      { name: "Ancestral Feérico", desc: "Vantagem contra ser encantado e total imunidade mágica ao sono." },
      { name: "Versatilidade em Perícias", desc: "Ganha proficiência imediata em duas perícias quaisquer à sua escolha." },
      { name: "Visão no Escuro", desc: "Enxerga na penumbra até 18 metros como luz plena." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]">
        <circle cx="50" cy="50" r="46" fill="#082f49" stroke="#06b6d4" strokeWidth="2.5" />
        {/* Estrelas Gêmeas Feéricas */}
        <polygon points="50,22 56,40 75,40 60,52 66,70 50,58 34,70 40,52 25,40 44,40" fill="#0891b2" stroke="#67e8f9" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="5" fill="#cffafe" />
      </svg>
    )
  },
  "Tiefling": {
    title: "Tiefling",
    sub: "Herança dos Planos Infernais",
    color: "#e11d48",
    bgAccent: "rgba(225, 29, 72, 0.15)",
    borderAccent: "rgba(251, 113, 133, 0.45)",
    quote: "O fogo infernal em meus olhos não é uma maldição, mas uma arma temível e altiva.",
    statBonus: "+2 Carisma, +1 Inteligência",
    speed: "9m (30 pés)",
    size: "Médio",
    vision: "Visão no Escuro (18m)",
    traits: [
      { name: "Resistência Infernal", desc: "Resistência inata e permanente contra dano de fogo." },
      { name: "Legado Infernal", desc: "Conhece o truque Taumaturgia. No 3º nível, Repreensão Infernal; no 5º nível, Escuridão." },
      { name: "Visão no Escuro", desc: "Enxerga na penumbra e escuridão até 18 metros." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(225,29,72,0.5)]">
        <circle cx="50" cy="50" r="46" fill="#310b14" stroke="#e11d48" strokeWidth="2.5" />
        {/* Chifres Demoníacos e Olhos de Enxofre */}
        <path d="M 32 60 Q 20 30 38 20 Q 34 35 44 48 Z" fill="#9f1239" stroke="#fda4af" strokeWidth="1.5" />
        <path d="M 68 60 Q 80 30 62 20 Q 66 35 56 48 Z" fill="#9f1239" stroke="#fda4af" strokeWidth="1.5" />
        <circle cx="42" cy="52" r="3" fill="#fde047" />
        <circle cx="58" cy="52" r="3" fill="#fde047" />
        <polygon points="50,60 45,72 55,72" fill="#be123c" />
      </svg>
    )
  }
};

export function findRaceData(name) {
  if (!name) return RACE_LORE["Humano"];
  const clean = name.trim();
  if (RACE_LORE[clean]) return RACE_LORE[clean];
  const lower = clean.toLowerCase();
  for (const key of Object.keys(RACE_LORE)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return RACE_LORE[key];
    }
  }
  return RACE_LORE["Humano"];
}

export default function RaceFlank({ race = "Humano" }) {
  const data = findRaceData(race);

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
