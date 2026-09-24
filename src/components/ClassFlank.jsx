import React from "react";
import { Shield, Sparkles, Flame, Wand2, Crosshair, Award, Zap, Heart } from "lucide-react";

const CLASS_LORE = {
  "Paladino": {
    title: "Paladino",
    sub: "Guerreiro Sagrado & Vingador Divino",
    color: "#eab308",
    bgAccent: "rgba(234, 179, 8, 0.12)",
    borderAccent: "rgba(250, 204, 21, 0.4)",
    quote: "Um juramento inquebrantável une o aço de minha espada à luz imortal da justiça.",
    hitDie: "1d10 por nível",
    primaryStats: "Força & Carisma",
    spellcasting: "Carisma (CD = 8 + Prof + Mod Car)",
    mechanics: [
      { name: "Sentido Divino", desc: "Detecta celestiais, corruptores e mortos-vivos num raio de 18m." },
      { name: "Cura pelas Mãos", desc: "Reserva de cura sagrada (Nível x 5 PV) para restaurar vida ou curar venenos." },
      { name: "Destruição Divina", desc: "No nível 2, gasta espaços de magia para adicionar dano radiante extra aos golpes." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(234,179,8,0.6)]">
        <circle cx="50" cy="50" r="46" fill="#1c1917" stroke="#eab308" strokeWidth="2.5" />
        {/* Brasão Sagrado com Sol e Espada Radiante */}
        <path d="M 50 18 L 65 32 L 65 65 L 50 82 L 35 65 L 35 32 Z" fill="#713f12" stroke="#facc15" strokeWidth="1.8" />
        {/* Espada Sagrada */}
        <line x1="50" y1="22" x2="50" y2="76" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="42" y1="36" x2="58" y2="36" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
        {/* Raios Solares */}
        <circle cx="50" cy="48" r="8" fill="#eab308" opacity="0.8" />
      </svg>
    )
  },
  "Guerreiro": {
    title: "Guerreiro",
    sub: "Mestre Supremo das Armas",
    color: "#ea580c",
    bgAccent: "rgba(234, 88, 12, 0.12)",
    borderAccent: "rgba(249, 115, 22, 0.35)",
    quote: "Aço, disciplina e perseverança derrotam qualquer magia.",
    hitDie: "1d10 por nível",
    primaryStats: "Força ou Destreza",
    spellcasting: "Não-conjurador (exceto Cavaleiro Arcano)",
    mechanics: [
      { name: "Retomar o Fôlego", desc: "Ação bônus para recuperar 1d10 + nível em PV (1x por descanso curto)." },
      { name: "Surto de Ação", desc: "No nível 2, realiza uma ação adicional inteira no mesmo turno." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(234,88,12,0.5)]">
        <circle cx="50" cy="50" r="46" fill="#1c1917" stroke="#ea580c" strokeWidth="2.5" />
        <line x1="28" y1="28" x2="72" y2="72" stroke="#fdba74" strokeWidth="3" />
        <line x1="72" y1="28" x2="28" y2="72" stroke="#fdba74" strokeWidth="3" />
      </svg>
    )
  },
  "Mago": {
    title: "Mago",
    sub: "Erudito dos Arcanos e da Realidade",
    color: "#6366f1",
    bgAccent: "rgba(99, 102, 241, 0.12)",
    borderAccent: "rgba(129, 140, 248, 0.35)",
    quote: "As leis do universo dobram-se sob a ponta da minha pena e da minha mente.",
    hitDie: "1d6 por nível",
    primaryStats: "Inteligência",
    spellcasting: "Inteligência (Grimório com rituais)",
    mechanics: [
      { name: "Grimório", desc: "Copia magias encontradas em pergaminhos para o livro perpétuo." },
      { name: "Recuperação Arcana", desc: "Recupera espaços de magia gastos após um descanso curto." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(99,102,241,0.5)]">
        <circle cx="50" cy="50" r="46" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2.5" />
        <polygon points="50,15 62,38 88,38 67,54 75,78 50,63 25,78 33,54 12,38 38,38" fill="#4338ca" stroke="#c7d2fe" strokeWidth="1.5" />
      </svg>
    )
  },
  "Bárbaro": {
    title: "Bárbaro",
    sub: "Fúria Primitiva Inabalável",
    color: "#dc2626",
    bgAccent: "rgba(220, 38, 38, 0.12)",
    borderAccent: "rgba(248, 113, 113, 0.35)",
    quote: "Nenhuma armadura é mais forte do que a fúria em meu sangue.",
    hitDie: "1d12 por nível",
    primaryStats: "Força & Constituição",
    spellcasting: "Não-conjurador",
    mechanics: [
      { name: "Fúria", desc: "Vantagem em testes de Força, dano bônus e resistência a cortante/perfurante/concussão." },
      { name: "Defesa sem Armadura", desc: "CA = 10 + Mod DES + Mod CON enquanto não usar armadura." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(220,38,38,0.5)]">
        <circle cx="50" cy="50" r="46" fill="#1c1917" stroke="#dc2626" strokeWidth="2.5" />
        <path d="M 30 35 L 70 35 L 60 70 L 40 70 Z" fill="#991b1b" stroke="#fca5a5" strokeWidth="2" />
        <line x1="50" y1="20" x2="50" y2="80" stroke="#fca5a5" strokeWidth="3" />
      </svg>
    )
  }
};

export default function ClassFlank({ className = "Paladino", character }) {
  const data = CLASS_LORE[className] || CLASS_LORE["Paladino"];

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
          Ordem & Vocação
        </span>
        <h3 className="font-serif font-black text-xl text-white tracking-wide" style={{ color: data.color }}>
          {data.title}
        </h3>
        <p className="text-[11px] text-white/60 italic mt-0.5">
          {data.sub}
        </p>
      </div>

      {/* Citação / Juramento */}
      <div className="my-3 p-2.5 rounded-xl bg-black/40 border border-white/5 text-[10px] text-white/70 italic leading-relaxed text-center">
        "{data.quote}"
      </div>

      {/* Estatísticas Fundamentais */}
      <div className="space-y-1.5 text-xs pb-3 border-b border-white/10">
        <div className="flex justify-between items-center py-1 px-2 rounded-lg bg-white/5">
          <span className="text-[11px] text-white/50 font-medium">Dado de Vida:</span>
          <span className="font-bold text-amber-300 font-mono text-[11px]">{data.hitDie}</span>
        </div>
        <div className="flex justify-between items-center py-1 px-2 rounded-lg bg-white/5">
          <span className="text-[11px] text-white/50 font-medium">Atributo Chave:</span>
          <span className="font-bold text-white text-[11px]">{data.primaryStats}</span>
        </div>
        {character?.spellcasting && (
          <div className="flex justify-between items-center py-1 px-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <span className="text-[11px] text-amber-200 font-medium">CD Magia / Atq:</span>
            <span className="font-bold text-amber-300 font-mono text-[11px]">CD 13 | +5</span>
          </div>
        )}
      </div>

      {/* Mecânicas de Classe */}
      <div className="mt-3 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">
          Poderes da Classe:
        </span>
        {data.mechanics.map((m, idx) => (
          <div 
            key={idx} 
            className="p-2.5 rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] transition-all"
          >
            <div className="flex items-center gap-1.5 mb-1 font-bold text-xs" style={{ color: data.color }}>
              <Sparkles size={12} />
              <span>{m.name}</span>
            </div>
            <p className="text-[10px] text-white/70 leading-snug">
              {m.desc}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}
