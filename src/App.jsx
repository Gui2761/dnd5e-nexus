import React, { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
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
import { Sword, BarChart2, Sparkles, Backpack, Scroll, Dices, BookOpen, Share2, Check } from "lucide-react";

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
      // 2. Tenta carregar do localStorage
      const saved = localStorage.getItem("dnd5e_nexus_character");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return DEFAULT_CHARACTER;
  });

  const [activeTab, setActiveTab] = useState("combat");
  const [isCompendiumOpen, setIsCompendiumOpen] = useState(false);
  const [isDiceRollerOpen, setIsDiceRollerOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [quickRollNotification, setQuickRollNotification] = useState(null);

  // Calcula o tema dinâmico baseado na classe atual do personagem
  const currentTheme = useMemo(() => {
    return getThemeForClass(character.className);
  }, [character.className]);

  // Salva no localStorage e atualiza título
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dnd5e_nexus_character", JSON.stringify(character));
      document.title = `${character.name || "Personagem"} — D&D 5e Companion`;
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

  const tabs = [
    { id: "combat", label: "Combate", icon: Sword },
    { id: "stats", label: "Atributos", icon: BarChart2 },
    { id: "spells", label: "Magias", icon: Sparkles },
    { id: "inventory", label: "Inventário", icon: Backpack },
    { id: "bio", label: "Traços & Bio", icon: Scroll }
  ];

  return (
    <div 
      className="min-h-screen text-slate-100 selection:bg-amber-400 selection:text-black font-sans pb-24 md:pb-12"
      style={{
        backgroundColor: currentTheme.bgDark,
        backgroundImage: `radial-gradient(ellipse at 50% -20%, ${currentTheme.primary}18, transparent 70%)`
      }}
    >
      <div className="max-w-5xl mx-auto p-3 sm:p-6 space-y-6">
        
        {/* Cabeçalho do Personagem */}
        <Header 
          character={character}
          setCharacter={setCharacter}
          currentTheme={currentTheme}
          onOpenCompendium={() => setIsCompendiumOpen(true)}
          onOpenDiceRoller={() => setIsDiceRollerOpen(true)}
          onOpenShareModal={() => setIsShareModalOpen(true)}
          onSave={handleSave}
        />

        {/* Abas Superiores (Desktop e Tablet) */}
        <nav className="hidden md:flex gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/10 shadow-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  isActive 
                    ? "text-black shadow-lg scale-[1.02]" 
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
                style={isActive ? { backgroundColor: currentTheme.primary, color: "#000" } : {}}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Conteúdo da Aba Ativa */}
        <main className="animate-fadeIn">
          {activeTab === "combat" && (
            <CombatTab 
              character={character}
              setCharacter={setCharacter}
              currentTheme={currentTheme}
              onOpenCompendium={() => setIsCompendiumOpen(true)}
              onQuickRoll={handleQuickRoll}
            />
          )}

          {activeTab === "stats" && (
            <StatsTab 
              character={character}
              setCharacter={setCharacter}
              currentTheme={currentTheme}
              onQuickRoll={handleQuickRoll}
            />
          )}

          {activeTab === "spells" && (
            <SpellsTab 
              character={character}
              setCharacter={setCharacter}
              currentTheme={currentTheme}
              onOpenCompendium={() => setIsCompendiumOpen(true)}
              onQuickRoll={handleQuickRoll}
            />
          )}

          {activeTab === "inventory" && (
            <InventoryTab 
              character={character}
              setCharacter={setCharacter}
              currentTheme={currentTheme}
              onOpenCompendium={() => setIsCompendiumOpen(true)}
            />
          )}

          {activeTab === "bio" && (
            <BioTab 
              character={character}
              setCharacter={setCharacter}
              currentTheme={currentTheme}
            />
          )}
        </main>

      </div>

      {/* Barra de Navegação Inferior Fixa para Mobile (Experiência Celular de Primeira Linha) */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 flex justify-around shadow-2xl"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all relative ${
                isActive ? "scale-105" : "text-white/50"
              }`}
              style={isActive ? { color: currentTheme.primary } : {}}
            >
              <Icon size={18} />
              <span className="text-[10px] font-bold mt-0.5">{tab.label}</span>
              {isActive && (
                <span 
                  className="w-1.5 h-1.5 rounded-full absolute -bottom-0.5" 
                  style={{ backgroundColor: currentTheme.primary }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Notificação Flutuante de Rolagem Rápida */}
      {quickRollNotification && (
        <div 
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-black/90 border shadow-2xl backdrop-blur-md animate-bounce text-center"
          style={{ borderColor: currentTheme.border, boxShadow: currentTheme.glow }}
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
              ⭐ CRÍTICO NATURAL!
            </span>
          )}
          {quickRollNotification.isFumble && (
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block mt-0.5">
              💀 FALHA CRÍTICA!
            </span>
          )}
        </div>
      )}

      {/* Toast de Salvo com Sucesso */}
      {saveToast && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 px-4 py-2 rounded-xl bg-emerald-950/90 border border-emerald-600/50 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-2xl backdrop-blur-md animate-fadeIn">
          <Check size={16} className="text-emerald-400" />
          Ficha salva com sucesso!
        </div>
      )}

      {/* Modais do Sistema */}
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
