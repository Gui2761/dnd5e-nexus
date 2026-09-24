import React from "react";
import { BookOpen, Dices, Smartphone, Save, Sparkles } from "lucide-react";
import { CLASS_HIT_DICE, CLASS_SAVING_PROFS, CLASS_SPELL_ABILITY } from "../utils/dndCalc";

export default function Header({
  character,
  setCharacter,
  currentTheme,
  onOpenCompendium,
  onOpenDiceRoller,
  onOpenShareModal,
  onSave
}) {
  const handleClassChange = (newClass) => {
    const defaultHd = CLASS_HIT_DICE[newClass] || "d8";
    const defaultSaves = CLASS_SAVING_PROFS[newClass] || [];
    const defaultSpellAbil = CLASS_SPELL_ABILITY[newClass] || "cha";

    setCharacter(prev => {
      // Cria novas proficiências de salvaguarda padrão para a classe
      const newSavingProfs = {
        str: defaultSaves.includes("str"),
        dex: defaultSaves.includes("dex"),
        con: defaultSaves.includes("con"),
        int: defaultSaves.includes("int"),
        wis: defaultSaves.includes("wis"),
        cha: defaultSaves.includes("cha")
      };

      return {
        ...prev,
        className: newClass,
        hitDiceTotal: `${prev.level}${defaultHd}`,
        hitDiceCurrent: `${prev.level}${defaultHd}`,
        savingProficiencies: newSavingProfs,
        spellcasting: {
          ...prev.spellcasting,
          ability: defaultSpellAbil
        }
      };
    });
  };

  const handleLevelChange = (lvl) => {
    const levelNum = Math.max(1, Math.min(20, parseInt(lvl, 10) || 1));
    const hdType = CLASS_HIT_DICE[character.className] || "d8";
    setCharacter(prev => ({
      ...prev,
      level: levelNum,
      hitDiceTotal: `${levelNum}${hdType}`
    }));
  };

  const classesList = [
    "Paladino",
    "Feiticeiro",
    "Bárbaro",
    "Guerreiro",
    "Ladino",
    "Mago",
    "Clérigo",
    "Druida",
    "Bardo",
    "Monge",
    "Ranger",
    "Bruxo"
  ];

  const racesList = [
    "Meio-Orc",
    "Draconato",
    "Humano",
    "Elfo",
    "Anão",
    "Halfling",
    "Gnomo",
    "Meio-Elfo",
    "Tiefling",
    "Outra Raça..."
  ];

  return (
    <header 
      className="rounded-3xl border shadow-2xl p-4 sm:p-6 relative overflow-hidden transition-all duration-500"
      style={{
        backgroundColor: currentTheme.bgDark,
        borderColor: currentTheme.border,
        boxShadow: currentTheme.glow,
        background: currentTheme.gradient
      }}
    >
      {/* Barra de Ações Rápidas do Topo */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎲</span>
          <span 
            className="text-xs font-black tracking-widest uppercase font-serif px-2.5 py-1 rounded-full border shadow-sm"
            style={{ 
              backgroundColor: currentTheme.cardBg, 
              borderColor: currentTheme.border,
              color: currentTheme.primaryLight 
            }}
          >
            {currentTheme.badge}
          </span>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={onOpenCompendium}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-all shadow border border-white/10"
          >
            <BookOpen size={14} style={{ color: currentTheme.primary }} />
            <span className="hidden sm:inline">Livro / Compêndio</span>
          </button>

          <button
            onClick={onOpenDiceRoller}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-all shadow border border-white/10"
          >
            <Dices size={14} style={{ color: currentTheme.primary }} />
            <span>Dados</span>
          </button>

          <button
            onClick={onOpenShareModal}
            className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow flex items-center gap-1.5 active:scale-95"
            style={{ backgroundColor: currentTheme.primary, color: "#000" }}
          >
            <Smartphone size={14} />
            <span>Conectar Celular</span>
          </button>

          <button
            onClick={onSave}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
            title="Salvar Ficha"
          >
            <Save size={16} />
          </button>
        </div>
      </div>

      {/* Identificação Principal do Personagem */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Nome do Personagem */}
        <div className="lg:col-span-4 flex flex-col justify-end">
          <label className="text-[10px] uppercase font-bold tracking-widest text-white/50 block mb-1">
            Nome do Personagem
          </label>
          <input
            type="text"
            value={character.name}
            onChange={(e) => setCharacter({ ...character, name: e.target.value })}
            placeholder="Nome do seu herói..."
            className="w-full text-2xl sm:text-3xl font-black font-serif text-white bg-transparent border-b-2 border-white/20 hover:border-white/40 focus:border-amber-400 focus:outline-none transition-all py-1"
          />
        </div>

        {/* Campos Rápidos do Cabeçalho */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          {/* Classe */}
          <div className="p-2 rounded-xl bg-black/40 border border-white/10">
            <span className="text-[10px] text-white/50 block font-semibold">Classe:</span>
            <select
              value={character.className}
              onChange={(e) => handleClassChange(e.target.value)}
              className="w-full bg-transparent text-white font-bold font-serif focus:outline-none cursor-pointer mt-0.5"
            >
              {classesList.map(c => (
                <option key={c} value={c} className="bg-neutral-900 text-white">{c}</option>
              ))}
            </select>
          </div>

          {/* Nível */}
          <div className="p-2 rounded-xl bg-black/40 border border-white/10">
            <span className="text-[10px] text-white/50 block font-semibold">Nível:</span>
            <input
              type="number"
              min="1"
              max="20"
              value={character.level}
              onChange={(e) => handleLevelChange(e.target.value)}
              className="w-full bg-transparent text-white font-mono font-bold text-sm focus:outline-none mt-0.5"
            />
          </div>

          {/* Raça */}
          <div className="p-2 rounded-xl bg-black/40 border border-white/10">
            <span className="text-[10px] text-white/50 block font-semibold">Raça:</span>
            <input
              type="text"
              value={character.race}
              onChange={(e) => setCharacter({ ...character, race: e.target.value })}
              placeholder="Meio-Orc, Draconato..."
              className="w-full bg-transparent text-white font-bold focus:outline-none mt-0.5"
            />
          </div>

          {/* Arquétipo / Subclasse */}
          <div className="p-2 rounded-xl bg-black/40 border border-white/10">
            <span className="text-[10px] text-white/50 block font-semibold">Subclasse / Origem:</span>
            <input
              type="text"
              value={character.subclass}
              onChange={(e) => setCharacter({ ...character, subclass: e.target.value })}
              placeholder="Dracônico, Devoção..."
              className="w-full bg-transparent text-white font-semibold focus:outline-none mt-0.5"
            />
          </div>

          {/* Antecedente */}
          <div className="p-2 rounded-xl bg-black/40 border border-white/10">
            <span className="text-[10px] text-white/50 block font-semibold">Antecedente:</span>
            <input
              type="text"
              value={character.background}
              onChange={(e) => setCharacter({ ...character, background: e.target.value })}
              placeholder="Soldado, Acólito..."
              className="w-full bg-transparent text-white focus:outline-none mt-0.5"
            />
          </div>

          {/* Tendência */}
          <div className="p-2 rounded-xl bg-black/40 border border-white/10">
            <span className="text-[10px] text-white/50 block font-semibold">Tendência:</span>
            <input
              type="text"
              value={character.alignment}
              onChange={(e) => setCharacter({ ...character, alignment: e.target.value })}
              placeholder="Leal e Bom..."
              className="w-full bg-transparent text-white focus:outline-none mt-0.5"
            />
          </div>

          {/* Jogador */}
          <div className="p-2 rounded-xl bg-black/40 border border-white/10">
            <span className="text-[10px] text-white/50 block font-semibold">Jogador:</span>
            <input
              type="text"
              value={character.playerName}
              onChange={(e) => setCharacter({ ...character, playerName: e.target.value })}
              className="w-full bg-transparent text-white focus:outline-none mt-0.5"
            />
          </div>

          {/* XP */}
          <div className="p-2 rounded-xl bg-black/40 border border-white/10">
            <span className="text-[10px] text-white/50 block font-semibold">Pontos de XP:</span>
            <input
              type="number"
              value={character.xp}
              onChange={(e) => setCharacter({ ...character, xp: parseInt(e.target.value) || 0 })}
              className="w-full bg-transparent text-white font-mono focus:outline-none mt-0.5"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
