import React, { useState, useEffect, useMemo } from "react";
import OfficialSheet from "./components/OfficialSheet";
import CombatTab from "./components/CombatTab";
import StatsTab from "./components/StatsTab";
import SpellsTab from "./components/SpellsTab";
import InventoryTab from "./components/InventoryTab";
import BioTab from "./components/BioTab";
import CompendiumModal from "./components/CompendiumModal";
import DiceRoller from "./components/DiceRoller";
import ShareModal from "./components/ShareModal";
import { DEFAULT_CHARACTER } from "./data/initialCharacter";
import { getThemeForClass } from "./utils/theme";
import { decompressCharacterFromUrl } from "./utils/sync";
import { 
  BookOpen, Dices, Smartphone, Save, Printer, ZoomIn, ZoomOut, Maximize2, 
  Check, Layout, Smartphone as PhoneIcon 
} from "lucide-react";

export default function App() {
  const [character, setCharacter] = useState(() => {
    // 1. Tenta carregar da URL (?sheet=...) se veio de um QR Code ou link
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const sheetParam = urlParams.get("sheet");
      if (sheetParam) {
        const fromUrl = decompressCharacterFromUrl(sheetParam);
        if (fromUrl) return fromUrl;
      }
      // 2. Tenta carregar do localStorage com chave v3
      const saved = localStorage.getItem("dnd5e_nexus_character_v3");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return DEFAULT_CHARACTER;
  });

  // Modo de visualização: "official" (Ficha Oficial D&D 5e) ou "tactical" (Modo Abas Mobile)
  const [viewMode, setViewMode] = useState("official");
  const [tacticalTab, setTacticalTab] = useState("combat");

  // Zoom da Ficha Oficial (auto-ajusta para celulares)
  const [zoomScale, setZoomScale] = useState(1);

  const [isCompendiumOpen, setIsCompendiumOpen] = useState(false);
  const [isDiceRollerOpen, setIsDiceRollerOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [quickRollNotification, setQuickRollNotification] = useState(null);

  // Calcula o tema dinâmico baseado na classe atual
  const currentTheme = useMemo(() => {
    return getThemeForClass(character.className);
  }, [character.className]);

  // Ajusta o zoom inicial para telas de celular (mobile responsive)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const screenWidth = window.innerWidth;
      if (screenWidth < 860) {
        const autoScale = Math.max(0.42, (screenWidth - 20) / 840);
        setZoomScale(Number(autoScale.toFixed(2)));
      }
    }
  }, []);

  // Salva no localStorage e atualiza título
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dnd5e_nexus_character_v3", JSON.stringify(character));
      document.title = `${character.name || "Personagem"} — D&D 5e Oficial`;
    }
  }, [character]);

  const handleSave = () => {
    localStorage.setItem("dnd5e_nexus_character", JSON.stringify(character));
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleQuickRoll = (label, sides, mod = 0) => {
    const roll = Math.floor(Math.random() * sides) + 1;
    const total = roll + mod;
    setQuickRollNotification({
      label,
      sides,
      roll,
      mod,
      total,
      isCrit: sides === 20 && roll === 20,
      isFumble: sides === 20 && roll === 1
    });
    setTimeout(() => setQuickRollNotification(null), 4000);
  };

  const handleFitScreen = () => {
    if (typeof window !== "undefined") {
      const screenWidth = window.innerWidth;
      const fit = Math.min(1.2, Math.max(0.4, (screenWidth - 24) / 840));
      setZoomScale(Number(fit.toFixed(2)));
    }
  };

  const classesList = [
    "Paladino", "Feiticeiro", "Bárbaro", "Guerreiro", "Ladino", 
    "Mago", "Clérigo", "Druida", "Bardo", "Monge", "Ranger", "Bruxo"
  ];

  return (
    <div 
      className="min-h-screen text-slate-100 font-sans pb-16 selection:bg-amber-400 selection:text-black"
      style={{
        backgroundColor: currentTheme.bgDark || "#18140c",
        backgroundImage: `radial-gradient(ellipse at 50% 0%, ${currentTheme.primary}22, transparent 65%)`
      }}
    >
      {/* ============================================================ */}
      {/* BARRA SUPERIOR DE FERRAMENTAS & CONTROLES */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-white/10 px-3 py-2 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Lado Esquerdo: Logo & Seletor de Classe / Tema */}
          <div className="flex items-center gap-2">
            <span className="text-xl">🎲</span>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1">
              <span className="text-[10px] text-white/50 uppercase font-bold">Tema:</span>
              <select
                value={character.className}
                onChange={(e) => setCharacter({ ...character, className: e.target.value })}
                className="bg-transparent text-white font-serif font-bold text-xs focus:outline-none cursor-pointer"
              >
                {classesList.map(c => (
                  <option key={c} value={c} className="bg-neutral-900 text-white">{c}</option>
                ))}
              </select>
            </div>

            {/* Alternador de Modo: Ficha Oficial vs Modo Tático */}
            <div className="flex rounded-xl bg-white/5 p-0.5 border border-white/10 text-xs">
              <button
                onClick={() => setViewMode("official")}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                  viewMode === "official" ? "bg-white/20 text-white shadow" : "text-white/50 hover:text-white"
                }`}
                title="Ver no modelo oficial impresso D&D 5e"
              >
                <Layout size={13} />
                <span className="hidden sm:inline">Ficha Oficial 5e</span>
              </button>
              <button
                onClick={() => setViewMode("tactical")}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                  viewMode === "tactical" ? "bg-white/20 text-white shadow" : "text-white/50 hover:text-white"
                }`}
                title="Modo Tático com botões grandes para combate"
              >
                <PhoneIcon size={13} />
                <span className="hidden sm:inline">Modo Tático</span>
              </button>
            </div>

            {/* Botão de Restaurar Ficha do Thokk */}
            <button
              onClick={() => {
                if (confirm("Deseja carregar a ficha original do Thokk Lâmina-Partida com todos os atributos oficiais?")) {
                  setCharacter(DEFAULT_CHARACTER);
                }
              }}
              className="px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition-all flex items-center gap-1 shadow-sm"
              title="Carregar a ficha canônica do Thokk Lâmina-Partida"
            >
              <span>⚔️ Ficha do Thokk</span>
            </button>
          </div>

          {/* Centro: Controles de Zoom da Ficha Oficial */}
          {viewMode === "official" && (
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl px-2 py-0.5 text-xs">
              <button
                onClick={() => setZoomScale(prev => Math.max(0.4, Number((prev - 0.1).toFixed(2))))}
                className="p-1 rounded text-white/70 hover:text-white"
                title="Diminuir Zoom"
              >
                <ZoomOut size={14} />
              </button>
              <span className="font-mono font-bold text-[11px] w-12 text-center text-amber-300">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                onClick={() => setZoomScale(prev => Math.min(1.5, Number((prev + 0.1).toFixed(2))))}
                className="p-1 rounded text-white/70 hover:text-white"
                title="Aumentar Zoom"
              >
                <ZoomIn size={14} />
              </button>
              <button
                onClick={handleFitScreen}
                className="p-1 rounded text-white/70 hover:text-white ml-1"
                title="Ajustar à Tela do Celular / Computador"
              >
                <Maximize2 size={13} />
              </button>
            </div>
          )}

          {/* Lado Direito: Livro, Dados, Celular e Salvar */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsCompendiumOpen(true)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-all shadow border border-white/10"
              title="Abrir Compêndio e Livro de Regras"
            >
              <BookOpen size={14} style={{ color: currentTheme.primary }} />
              <span className="hidden md:inline">Livro / Regras</span>
            </button>

            <button
              onClick={() => setIsDiceRollerOpen(true)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-all shadow border border-white/10"
              title="Rolar Dados"
            >
              <Dices size={14} style={{ color: currentTheme.primary }} />
              <span className="hidden sm:inline">Dados</span>
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow flex items-center gap-1.5 active:scale-95 text-black"
              style={{ backgroundColor: currentTheme.primary }}
              title="Gerar QR Code para abrir no celular de amigos"
            >
              <Smartphone size={14} />
              <span>Conectar Celular</span>
            </button>

            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 hidden sm:block"
              title="Imprimir / Salvar PDF"
            >
              <Printer size={15} />
            </button>

            <button
              onClick={handleSave}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
              title="Salvar Ficha"
            >
              <Save size={15} />
            </button>
          </div>

        </div>
      </header>

      {/* ============================================================ */}
      {/* CONTEÚDO PRINCIPAL: FICHA OFICIAL OU MODO TÁTICO */}
      {/* ============================================================ */}
      <main className="p-2 sm:p-4 overflow-x-auto flex justify-center">
        {viewMode === "official" ? (
          <div className="py-2">
            <OfficialSheet 
              character={character}
              setCharacter={setCharacter}
              currentTheme={currentTheme}
              onQuickRoll={handleQuickRoll}
              zoomScale={zoomScale}
            />
          </div>
        ) : (
          <div className="w-full max-w-4xl space-y-4">
            {/* Navegador de Abas Táticas */}
            <div className="flex gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/10">
              {[
                { id: "combat", label: "Combate & PV" },
                { id: "stats", label: "Atributos & Perícias" },
                { id: "spells", label: "Grimório de Magias" },
                { id: "inventory", label: "Inventário" },
                { id: "bio", label: "Biografia & Traços" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setTacticalTab(tab.id)}
                  className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition-all ${
                    tacticalTab === tab.id ? "bg-white text-black shadow" : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {tacticalTab === "combat" && (
              <CombatTab 
                character={character}
                setCharacter={setCharacter}
                currentTheme={currentTheme}
                onOpenCompendium={() => setIsCompendiumOpen(true)}
                onQuickRoll={handleQuickRoll}
              />
            )}
            {tacticalTab === "stats" && (
              <StatsTab 
                character={character}
                setCharacter={setCharacter}
                currentTheme={currentTheme}
                onQuickRoll={handleQuickRoll}
              />
            )}
            {tacticalTab === "spells" && (
              <SpellsTab 
                character={character}
                setCharacter={setCharacter}
                currentTheme={currentTheme}
                onOpenCompendium={() => setIsCompendiumOpen(true)}
                onQuickRoll={handleQuickRoll}
              />
            )}
            {tacticalTab === "inventory" && (
              <InventoryTab 
                character={character}
                setCharacter={setCharacter}
                currentTheme={currentTheme}
                onOpenCompendium={() => setIsCompendiumOpen(true)}
              />
            )}
            {tacticalTab === "bio" && (
              <BioTab 
                character={character}
                setCharacter={setCharacter}
                currentTheme={currentTheme}
              />
            )}
          </div>
        )}
      </main>

      {/* Notificação Flutuante de Rolagem Rápida */}
      {quickRollNotification && (
        <div 
          className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-black/95 border shadow-2xl backdrop-blur-md animate-bounce text-center"
          style={{ borderColor: currentTheme.border }}
        >
          <span className="text-[11px] uppercase tracking-wider text-white/60 font-bold block">
            {quickRollNotification.label} (d{quickRollNotification.sides} {quickRollNotification.mod >= 0 ? `+ ${quickRollNotification.mod}` : quickRollNotification.mod})
          </span>
          <div className="flex items-center justify-center gap-2 mt-0.5">
            <span 
              className={`text-3xl font-black font-mono ${
                quickRollNotification.isCrit ? "text-amber-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" :
                quickRollNotification.isFumble ? "text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" : "text-white"
              }`}
            >
              {quickRollNotification.total}
            </span>
            <span className="text-xs text-white/50 font-mono">
              [Dado: {quickRollNotification.roll}]
            </span>
          </div>
          {quickRollNotification.isCrit && (
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block mt-0.5">
              ⭐ CRÍTICO NATURAL (20)!
            </span>
          )}
          {quickRollNotification.isFumble && (
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block mt-0.5">
              💀 FALHA CRÍTICA (1)!
            </span>
          )}
        </div>
      )}

      {/* Toast de Salvo com Sucesso */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-xl bg-emerald-950/90 border border-emerald-600/50 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-2xl backdrop-blur-md animate-fadeIn">
          <Check size={16} className="text-emerald-400" />
          Ficha salva com sucesso!
        </div>
      )}

      {/* Modais Integrados */}
      <CompendiumModal 
        isOpen={isCompendiumOpen}
        onClose={() => setIsCompendiumOpen(false)}
        currentTheme={currentTheme}
        onAddWeapon={(wpn) => {
          setCharacter(prev => ({
            ...prev,
            attacks: [
              ...prev.attacks,
              {
                id: "atk-" + Date.now(),
                name: wpn.name,
                bonus: "+5",
                damage: `${wpn.damage} ${wpn.damageType}`,
                notes: wpn.properties || ""
              }
            ]
          }));
        }}
        onAddSpell={(spell) => {
          setCharacter(prev => ({
            ...prev,
            spellcasting: {
              ...prev.spellcasting,
              spells: [
                ...prev.spellcasting.spells,
                {
                  id: "sp-" + Date.now(),
                  name: spell.name,
                  level: spell.level,
                  prepared: true,
                  desc: `${spell.castingTime} | ${spell.range} | ${spell.duration}\n${spell.desc}`
                }
              ]
            }
          }));
        }}
      />

      <DiceRoller 
        isOpen={isDiceRollerOpen}
        onClose={() => setIsDiceRollerOpen(false)}
        currentTheme={currentTheme}
      />

      <ShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        character={character}
        currentTheme={currentTheme}
        onImportCharacter={(imported) => setCharacter(imported)}
      />

    </div>
  );
}
