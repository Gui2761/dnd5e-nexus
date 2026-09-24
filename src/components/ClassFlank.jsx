import React from "react";
import { Sparkles } from "lucide-react";
import { getAbilityModifier, getProficiencyBonus, CLASS_SPELL_ABILITY } from "../utils/dndCalc";

export const CLASS_LORE = {
  "Bruxo": {
    title: "Bruxo",
    sub: "Pacto de Outro Mundo & Ocultismo Arcano",
    color: "#a855f7",
    bgAccent: "rgba(168, 85, 247, 0.15)",
    borderAccent: "rgba(192, 132, 252, 0.45)",
    quote: "O conhecimento proibido tem um preço, e meus patronos exigem lealdade no limiar das sombras.",
    hitDie: "1d8 por nível",
    primaryStats: "Carisma",
    spellcasting: "Carisma (Magia de Pacto - Slots máx recarregam em Descanso Curto)",
    spellStat: "cha",
    mechanics: [
      { name: "Patrono Transcendental", desc: "Pacto com entidade extraplanar suprema (Corruptor, Grande Antigo ou Arquifada)." },
      { name: "Magia de Pacto", desc: "Espaços de magia lançados sempre no círculo máximo disponível e recuperados em descanso curto." },
      { name: "Invocações Místicas", desc: "Poderes arcanos permanentes como Rajada Agonizante, Visão Diabólica e Armadura das Sombras." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_14px_rgba(168,85,247,0.7)]">
        <circle cx="50" cy="50" r="46" fill="#140824" stroke="#a855f7" strokeWidth="2.5" />
        {/* Olho Oculto Transcendental */}
        <path d="M 20 50 Q 50 20 80 50 Q 50 80 20 50 Z" fill="#2e1047" stroke="#c084fc" strokeWidth="2" />
        <circle cx="50" cy="50" r="14" fill="#a855f7" />
        <circle cx="50" cy="50" r="6" fill="#090514" />
        <circle cx="53" cy="47" r="2.5" fill="#f3e8ff" />
        {/* Runas de Pacto */}
        <line x1="50" y1="12" x2="50" y2="24" stroke="#e9d5ff" strokeWidth="2" strokeLinecap="round" />
        <line x1="50" y1="76" x2="50" y2="88" stroke="#e9d5ff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  "Paladino": {
    title: "Paladino",
    sub: "Guerreiro Sagrado & Vingador Divino",
    color: "#eab308",
    bgAccent: "rgba(234, 179, 8, 0.15)",
    borderAccent: "rgba(250, 204, 21, 0.45)",
    quote: "Um juramento inquebrantável une o aço de minha espada à luz imortal da justiça.",
    hitDie: "1d10 por nível",
    primaryStats: "Força & Carisma",
    spellcasting: "Carisma (Preparação diária divina)",
    spellStat: "cha",
    mechanics: [
      { name: "Sentido Divino", desc: "Detecta a presença de celestiais, corruptores e mortos-vivos num raio de 18m." },
      { name: "Cura pelas Mãos", desc: "Reserva sagrada (Nível x 5 PV) para restaurar vida ou expurgar venenos e doenças." },
      { name: "Destruição Divina", desc: "Gasta espaços de magia ao acertar ataques corpo a corpo para causar dano radiante extra massivo." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(234,179,8,0.6)]">
        <circle cx="50" cy="50" r="46" fill="#1c1917" stroke="#eab308" strokeWidth="2.5" />
        <path d="M 50 18 L 65 32 L 65 65 L 50 82 L 35 65 L 35 32 Z" fill="#713f12" stroke="#facc15" strokeWidth="1.8" />
        <line x1="50" y1="22" x2="50" y2="76" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="42" y1="36" x2="58" y2="36" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="48" r="8" fill="#eab308" opacity="0.8" />
      </svg>
    )
  },
  "Guerreiro": {
    title: "Guerreiro",
    sub: "Mestre Supremo das Armas & Táticas",
    color: "#ea580c",
    bgAccent: "rgba(234, 88, 12, 0.15)",
    borderAccent: "rgba(249, 115, 22, 0.4)",
    quote: "Aço, disciplina e perseverança derrotam qualquer feitiço ou besta das trevas.",
    hitDie: "1d10 por nível",
    primaryStats: "Força ou Destreza",
    spellcasting: "Não-conjurador (exceto Cavaleiro Arcano)",
    spellStat: null,
    mechanics: [
      { name: "Retomar o Fôlego", desc: "Ação bônus para recuperar 1d10 + Nível em PV (1x por descanso curto ou longo)." },
      { name: "Surto de Ação", desc: "Realiza uma ação adicional inteira no mesmo turno (1x por descanso curto)." },
      { name: "Estilo de Luta", desc: "Especialização em Duelo, Arquearia, Combate com Duas Armas ou Defesa." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(234,88,12,0.6)]">
        <circle cx="50" cy="50" r="46" fill="#1c1917" stroke="#ea580c" strokeWidth="2.5" />
        <line x1="28" y1="28" x2="72" y2="72" stroke="#fdba74" strokeWidth="3" />
        <line x1="72" y1="28" x2="28" y2="72" stroke="#fdba74" strokeWidth="3" />
        <circle cx="50" cy="50" r="10" fill="#7c2d12" stroke="#ea580c" strokeWidth="2" />
      </svg>
    )
  },
  "Mago": {
    title: "Mago",
    sub: "Erudito dos Arcanos e da Realidade",
    color: "#6366f1",
    bgAccent: "rgba(99, 102, 241, 0.15)",
    borderAccent: "rgba(129, 140, 248, 0.45)",
    quote: "As leis do universo dobram-se sob a ponta da minha pena e da minha mente.",
    hitDie: "1d6 por nível",
    primaryStats: "Inteligência",
    spellcasting: "Inteligência (Grimório com aprendizado contínuo e rituais)",
    spellStat: "int",
    mechanics: [
      { name: "Grimório Arcano", desc: "Copia novas magias encontradas em pergaminhos ou tomos arcanos para seu livro perpétuo." },
      { name: "Recuperação Arcana", desc: "Recupera espaços de magia gastos equivalente a metade do nível após descanso curto." },
      { name: "Tradição Arcana", desc: "Especialização em escolas primordiais: Evocação, Necromancia, Ilusão ou Abjuração." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(99,102,241,0.6)]">
        <circle cx="50" cy="50" r="46" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2.5" />
        <polygon points="50,15 62,38 88,38 67,54 75,78 50,63 25,78 33,54 12,38 38,38" fill="#4338ca" stroke="#c7d2fe" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="7" fill="#a5b4fc" />
      </svg>
    )
  },
  "Bárbaro": {
    title: "Bárbaro",
    sub: "Fúria Primitiva & Força Implacável",
    color: "#dc2626",
    bgAccent: "rgba(220, 38, 38, 0.15)",
    borderAccent: "rgba(248, 113, 113, 0.45)",
    quote: "Nenhuma armadura de ferro é mais forte do que a fúria ancestral em meu sangue.",
    hitDie: "1d12 por nível",
    primaryStats: "Força & Constituição",
    spellcasting: "Não-conjurador",
    spellStat: null,
    mechanics: [
      { name: "Fúria Implacável", desc: "Vantagem em testes de Força, dano bônus corpo a corpo e resistência a corte, perfuração e concussão." },
      { name: "Defesa Sem Armadura", desc: "Sua Classe de Armadura é 10 + Mod DES + Mod CON enquanto não portar armadura." },
      { name: "Ataque Descuidado", desc: "Ataca com vantagem sacrificando defesas, concedendo vantagem aos inimigos até o próximo turno." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(220,38,38,0.6)]">
        <circle cx="50" cy="50" r="46" fill="#1c1917" stroke="#dc2626" strokeWidth="2.5" />
        <path d="M 28 35 L 72 35 L 60 70 L 40 70 Z" fill="#991b1b" stroke="#fca5a5" strokeWidth="2" />
        <line x1="50" y1="20" x2="50" y2="80" stroke="#fca5a5" strokeWidth="3" />
      </svg>
    )
  },
  "Bardo": {
    title: "Bardo",
    sub: "Mestre da Canção, Carisma & Encanto",
    color: "#c084fc",
    bgAccent: "rgba(192, 132, 252, 0.15)",
    borderAccent: "rgba(216, 180, 254, 0.45)",
    quote: "A música dos cosmos tece os destinos dos reis e dita o ritmo da vitória.",
    hitDie: "1d8 por nível",
    primaryStats: "Carisma & Destreza",
    spellcasting: "Carisma (Instrumentos musicais e canções mágicas)",
    spellStat: "cha",
    mechanics: [
      { name: "Inspiração de Bardo", desc: "Gasta dados de inspiração (d6 a d12) como ação bônus para conferir bônus aos testes dos aliados." },
      { name: "Pau pra Toda Obra", desc: "Adiciona metade do bônus de proficiência em qualquer teste de atributo que não possua proficiência." },
      { name: "Canção de Descanso", desc: "Aliados recuperam 1d6 PV extras ao gastar dados de vida durante descansos curtos." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(192,132,252,0.6)]">
        <circle cx="50" cy="50" r="46" fill="#1f1033" stroke="#c084fc" strokeWidth="2.5" />
        {/* Alaúde / Lira Bárdica */}
        <path d="M 40 30 Q 35 60 45 75 Q 50 80 55 75 Q 65 60 60 30 Z" fill="#581c87" stroke="#e9d5ff" strokeWidth="2" />
        <circle cx="50" cy="55" r="7" fill="#1f1033" stroke="#c084fc" strokeWidth="1.5" />
        <line x1="48" y1="30" x2="48" y2="74" stroke="#f3e8ff" strokeWidth="1" />
        <line x1="52" y1="30" x2="52" y2="74" stroke="#f3e8ff" strokeWidth="1" />
      </svg>
    )
  },
  "Clérigo": {
    title: "Clérigo",
    sub: "Emissário dos Deuses & Luz Celestial",
    color: "#38bdf8",
    bgAccent: "rgba(56, 189, 248, 0.15)",
    borderAccent: "rgba(125, 211, 252, 0.45)",
    quote: "Pela fé na minha divindade, sou o escudo dos fracos e a justiça implacável contra o mal.",
    hitDie: "1d8 por nível",
    primaryStats: "Sabedoria",
    spellcasting: "Sabedoria (Símbolo Sagrado e Milagres Divinos)",
    spellStat: "wis",
    mechanics: [
      { name: "Canalizar Divindade", desc: "Canaliza poder cósmico para Expulsar Mortos-Vivos ou manifestar graças do Domínio Divino." },
      { name: "Domínio Divino", desc: "Vida, Luz, Guerra, Tempestade, Trapaça concedem magias e proficiências de bônus." },
      { name: "Intervenção Divina", desc: "Em momentos cruciais, suplica auxílio direto da própria divindade padroeira." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]">
        <circle cx="50" cy="50" r="46" fill="#082f49" stroke="#38bdf8" strokeWidth="2.5" />
        {/* Cruz / Símbolo Sagrado com Raios Divinos */}
        <polygon points="50,18 56,38 78,38 60,50 67,72 50,58 33,72 40,50 22,38 44,38" fill="#0284c7" stroke="#bae6fd" strokeWidth="1.5" />
        <circle cx="50" cy="46" r="6" fill="#f0f9ff" />
      </svg>
    )
  },
  "Druida": {
    title: "Druida",
    sub: "Guardião da Natureza Primordial",
    color: "#22c55e",
    bgAccent: "rgba(34, 197, 94, 0.15)",
    borderAccent: "rgba(134, 239, 172, 0.45)",
    quote: "A força da tempestade e o silêncio da floresta antiga correm no bater do meu coração.",
    hitDie: "1d8 por nível",
    primaryStats: "Sabedoria",
    spellcasting: "Sabedoria (Foco Druídico e Trama Natural)",
    spellStat: "wis",
    mechanics: [
      { name: "Forma Selvagem", desc: "Assume forma física de feras terrestres, aquáticas ou aladas com barra de PV própria." },
      { name: "Círculo Druídico", desc: "Ordens antigas (Terra, Lua, Pastor) que expandem o poder elemental e metamorfoses de combate." },
      { name: "Druídico", desc: "A linguagem secreta vegetal e ancestral falada exclusivamente por iniciados da ordem." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(34,197,94,0.6)]">
        <circle cx="50" cy="50" r="46" fill="#052e16" stroke="#22c55e" strokeWidth="2.5" />
        {/* Folha de Carvalho Sagrada */}
        <path d="M 50 18 C 65 25 75 45 70 70 C 60 65 55 78 50 82 C 45 78 40 65 30 70 C 25 45 35 25 50 18 Z" fill="#15803d" stroke="#86efac" strokeWidth="2" />
        <line x1="50" y1="24" x2="50" y2="76" stroke="#bbf7d0" strokeWidth="2" />
      </svg>
    )
  },
  "Feiticeiro": {
    title: "Feiticeiro",
    sub: "Magia Inata & Poder no Sangue",
    color: "#f97316",
    bgAccent: "rgba(249, 115, 22, 0.15)",
    borderAccent: "rgba(253, 186, 116, 0.45)",
    quote: "Eu não aprendo a magia através de velhos tomos; eu sou o fogo da magia encarnado.",
    hitDie: "1d6 por nível",
    primaryStats: "Carisma",
    spellcasting: "Carisma (Centelha arcana residente na alma)",
    spellStat: "cha",
    mechanics: [
      { name: "Metamagia", desc: "Altera feitiços no instante do lançamento: Magia Acelerada, Gêmea, Sutil ou Potencializada." },
      { name: "Pontos de Feitiçaria", desc: "Reserva de energia mística flexível convertível em espaços de magia e efeitos de metamagia." },
      { name: "Origem de Feitiçaria", desc: "Linhagem Dracônica, Magia Selvagem ou Alma Divina concedem resistências e asas." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]">
        <circle cx="50" cy="50" r="46" fill="#2a1005" stroke="#f97316" strokeWidth="2.5" />
        {/* Chama Dracônica Cósmica */}
        <path d="M 50 15 Q 68 35 60 55 Q 75 60 65 80 Q 50 85 40 75 Q 25 65 40 45 Q 35 30 50 15 Z" fill="#ea580c" stroke="#fdba74" strokeWidth="2" />
        <circle cx="50" cy="58" r="8" fill="#fef08a" />
      </svg>
    )
  },
  "Ladino": {
    title: "Ladino",
    sub: "Mestre da Furtividade & Ataque Preciso",
    color: "#10b981",
    bgAccent: "rgba(16, 185, 129, 0.15)",
    borderAccent: "rgba(110, 231, 183, 0.45)",
    quote: "O golpe perfeito é aquele que a vítima nunca teve a oportunidade de ver.",
    hitDie: "1d8 por nível",
    primaryStats: "Destreza",
    spellcasting: "Não-conjurador (exceto Trapaceiro Arcano)",
    spellStat: null,
    mechanics: [
      { name: "Ataque Furtivo", desc: "Dano adicional maciço (1d6 até 10d6) com armas de acuidade ou à distância sob vantagem." },
      { name: "Ação Ardilosa", desc: "Ação bônus a cada turno para Disparar, Desengajar ou Esconder-se nas sombras." },
      { name: "Especialização", desc: "Dobra permanentemente o bônus de proficiência em 4 perícias (ex: Furtividade e Ladinagem)." },
      { name: "Esquiva Sobrenatural", desc: "Reação para reduzir pela metade o dano de um ataque que você possa enxergar." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]">
        <circle cx="50" cy="50" r="46" fill="#042318" stroke="#10b981" strokeWidth="2.5" />
        {/* Adagas Cruzadas de Furtividade */}
        <path d="M 30 75 L 70 25 L 75 30 L 35 80 Z" fill="#059669" stroke="#6ee7b7" strokeWidth="1.5" />
        <path d="M 70 75 L 30 25 L 25 30 L 65 80 Z" fill="#059669" stroke="#6ee7b7" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="4" fill="#a7f3d0" />
      </svg>
    )
  },
  "Monge": {
    title: "Monge",
    sub: "Harmonia do Ki & Artes Marciais Supremas",
    color: "#fb923c",
    bgAccent: "rgba(251, 146, 60, 0.15)",
    borderAccent: "rgba(254, 215, 170, 0.45)",
    quote: "Mente e corpo em perfeita harmonia tornam a mão desarmada mais letal que a melhor espada.",
    hitDie: "1d8 por nível",
    primaryStats: "Destreza & Sabedoria",
    spellcasting: "Não-conjurador (manipulação de Ki primordial)",
    spellStat: "wis",
    mechanics: [
      { name: "Artes Marciais", desc: "Utiliza Destreza para golpes desarmados e desfere ataques desarmados extras com ação bônus." },
      { name: "Pontos de Ki", desc: "Energia mística para Rajada de Golpes (2 socos extras), Passo do Vento e Defesa Paciente." },
      { name: "Defesa Sem Armadura", desc: "Sua CA é 10 + Mod DES + Mod SAB enquanto não empunhar escudo nem armadura." },
      { name: "Movimento Rápido", desc: "Velocidade ampliada e habilidade de correr verticalmente por paredes e líquidos." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(251,146,60,0.6)]">
        <circle cx="50" cy="50" r="46" fill="#261307" stroke="#fb923c" strokeWidth="2.5" />
        {/* Símbolo do Equilíbrio Ki */}
        <circle cx="50" cy="50" r="28" fill="#7c2d12" stroke="#fdba74" strokeWidth="2" />
        <path d="M 50 22 A 14 14 0 0 1 50 50 A 14 14 0 0 0 50 78 A 28 28 0 0 1 50 22 Z" fill="#fdba74" />
        <circle cx="50" cy="36" r="4" fill="#261307" />
        <circle cx="50" cy="64" r="4" fill="#fdba74" />
      </svg>
    )
  },
  "Ranger": {
    title: "Ranger",
    sub: "Sentinela das Selvas & Rastreador Mortal",
    color: "#84cc16",
    bgAccent: "rgba(132, 204, 22, 0.15)",
    borderAccent: "rgba(190, 242, 100, 0.45)",
    quote: "Nenhum rastro escapa dos meus olhos, e nenhuma presa sobrevive à minha flecha silenciosa.",
    hitDie: "1d10 por nível",
    primaryStats: "Destreza & Sabedoria",
    spellcasting: "Sabedoria (Magias de rastreio, caça e sobrevivência)",
    spellStat: "wis",
    mechanics: [
      { name: "Inimigo Favorito", desc: "Vantagem em testes de Sobrevivência para rastrear e bônus de conhecimento de criaturas." },
      { name: "Explorador Natural", desc: "Imunidade a terreno difícil, o grupo nunca se perde e alerta constante durante marchas." },
      { name: "Marca do Caçador", desc: "Sintoniza a caça a uma presa específica para infligir 1d6 de dano adicional contínuo." }
    ],
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_12px_rgba(132,204,22,0.6)]">
        <circle cx="50" cy="50" r="46" fill="#142605" stroke="#84cc16" strokeWidth="2.5" />
        {/* Arco e Flecha Épica */}
        <path d="M 30 70 Q 60 50 70 30" fill="none" stroke="#bef264" strokeWidth="3" />
        <path d="M 28 72 Q 22 45 45 22 Q 68 22 72 28" fill="none" stroke="#65a30d" strokeWidth="3" />
        <polygon points="72,28 66,35 62,31" fill="#bef264" />
      </svg>
    )
  }
};

export function findClassData(name) {
  if (!name) return CLASS_LORE["Guerreiro"];
  const clean = name.trim();
  if (CLASS_LORE[clean]) return CLASS_LORE[clean];
  const lower = clean.toLowerCase();
  for (const key of Object.keys(CLASS_LORE)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return CLASS_LORE[key];
    }
  }
  return CLASS_LORE["Guerreiro"];
}

export default function ClassFlank({ className = "Guerreiro", character }) {
  const data = findClassData(className);

  // Calcula CD de Magia e Bônus de Ataque Mágico dinamicamente se a classe for conjuradora
  const spellStat = data.spellStat || (character?.spellcastingClass ? CLASS_SPELL_ABILITY[character.spellcastingClass] : null);
  const profBonus = character?.profBonusOverride !== undefined && character.profBonusOverride !== "" && !isNaN(parseInt(character.profBonusOverride, 10))
    ? parseInt(character.profBonusOverride, 10)
    : getProficiencyBonus(character?.level || 1);

  const statMod = spellStat && character?.stats ? getAbilityModifier(character.stats[spellStat] || 10) : 0;
  const spellDC = 8 + profBonus + statMod;
  const spellAttack = profBonus + statMod;
  const spellAttackFormatted = spellAttack >= 0 ? `+${spellAttack}` : `${spellAttack}`;

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
        {spellStat && (
          <div className="flex justify-between items-center py-1 px-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <span className="text-[11px] text-amber-200 font-medium">CD Magia / Atq:</span>
            <span className="font-bold text-amber-300 font-mono text-[11px]">
              CD {spellDC} | {spellAttackFormatted}
            </span>
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
