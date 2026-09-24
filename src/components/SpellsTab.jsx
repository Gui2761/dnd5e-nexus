import React, { useState } from "react";
import { Sparkles, Plus, Trash2, BookOpen, Dices, Check } from "lucide-react";
import { SPELLS_DATABASE } from "../data/compendium";
import { getAbilityModifier, getProficiencyBonus } from "../utils/dndCalc";

export default function SpellsTab({ character, setCharacter, currentTheme, onOpenCompendium, onQuickRoll }) {
  const [spellSearch, setSpellSearch] = useState("");
  const [showSpellDropdown, setShowSpellDropdown] = useState(false);

  const profBonus = getProficiencyBonus(character.level);
  const spellAbilityId = character.spellcasting.ability || "cha";
  const spellMod = getAbilityModifier(character.stats[spellAbilityId] || 10);
  const spellSaveDC = 8 + profBonus + spellMod;
  const spellAttackBonus = profBonus + spellMod;

  // Adicionar magia oficial encontrada na busca
  const handleAddSpellFromSearch = (spell) => {
    const newSp = {
      id: "sp-" + Date.now(),
      name: spell.name,
      level: spell.level,
      prepared: true,
      desc: `${spell.castingTime} | ${spell.range} | ${spell.duration}\n${spell.desc}`
    };
    setCharacter(prev => ({
      ...prev,
      spellcasting: {
        ...prev.spellcasting,
        spells: [...prev.spellcasting.spells, newSp]
      }
    }));
    setSpellSearch("");
    setShowSpellDropdown(false);
  };

  const handleAddEmptySpell = (level = 1) => {
    const newSp = {
      id: "sp-" + Date.now(),
      name: "Nova Magia",
      level,
      prepared: true,
      desc: ""
    };
    setCharacter(prev => ({
      ...prev,
      spellcasting: {
        ...prev.spellcasting,
        spells: [...prev.spellcasting.spells, newSp]
      }
    }));
  };

  const handleTogglePrepared = (id) => {
    setCharacter(prev => ({
      ...prev,
      spellcasting: {
        ...prev.spellcasting,
        spells: prev.spellcasting.spells.map(s => s.id === id ? { ...s, prepared: !s.prepared } : s)
      }
    }));
  };

  const handleRemoveSpell = (id) => {
    setCharacter(prev => ({
      ...prev,
      spellcasting: {
        ...prev.spellcasting,
        spells: prev.spellcasting.spells.filter(s => s.id !== id)
      }
    }));
  };

  const handleSlotChange = (lvl, field, val) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    setCharacter(prev => ({
      ...prev,
      spellcasting: {
        ...prev.spellcasting,
        slots: {
          ...prev.spellcasting.slots,
          [lvl]: {
            ...prev.spellcasting.slots[lvl],
            [field]: num
          }
        }
      }
    }));
  };

  const toggleUsedSlot = (lvl, slotIndex) => {
    const currentUsed = character.spellcasting.slots[lvl]?.used || 0;
    const newUsed = currentUsed === slotIndex ? slotIndex - 1 : slotIndex;
    handleSlotChange(lvl, "used", newUsed);
  };

  const filteredSpells = spellSearch.trim()
    ? SPELLS_DATABASE.filter(s => s.name.toLowerCase().includes(spellSearch.toLowerCase())).slice(0, 6)
    : [];

  return (
    <div className="space-y-6">
      
      {/* Estatísticas de Conjuração */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Atributo de Conjuração */}
        <div 
          className="p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center shadow-lg"
          style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
        >
          <span className="text-[10px] uppercase font-bold tracking-wider text-white/60">Atributo Conjurador</span>
          <select
            value={character.spellcasting.ability}
            onChange={(e) => setCharacter({
              ...character,
              spellcasting: { ...character.spellcasting, ability: e.target.value }
            })}
            className="mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm font-bold text-white focus:outline-none"
          >
            <option value="cha" className="bg-neutral-900">Carisma (CAR)</option>
            <option value="wis" className="bg-neutral-900">Sabedoria (SAB)</option>
            <option value="int" className="bg-neutral-900">Inteligência (INT)</option>
          </select>
          <span className="text-[10px] text-white/40 mt-1">Mod: {spellMod >= 0 ? `+${spellMod}` : spellMod}</span>
        </div>

        {/* CD de Resistência à Magia */}
        <div 
          className="p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center shadow-lg"
          style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
        >
          <span className="text-[10px] uppercase font-bold tracking-wider text-white/60">CD Salvaguarda Magia</span>
          <span className="text-3xl font-black font-mono text-white mt-0.5">
            {spellSaveDC}
          </span>
          <span className="text-[10px] text-white/40">8 + Prof({profBonus}) + Mod({spellMod})</span>
        </div>

        {/* Bônus de Ataque Mágico */}
        <div 
          className="p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center shadow-lg"
          style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
        >
          <span className="text-[10px] uppercase font-bold tracking-wider text-white/60">Bônus de Ataque Mágico</span>
          <div className="flex items-center justify-center gap-2 mt-0.5">
            <span className="text-3xl font-black font-mono text-white">
              +{spellAttackBonus}
            </span>
            <button
              onClick={() => onQuickRoll("Ataque Mágico", 20, spellAttackBonus)}
              className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white"
              title="Rolar Ataque Mágico"
            >
              <Dices size={16} />
            </button>
          </div>
          <span className="text-[10px] text-white/40">Prof({profBonus}) + Mod({spellMod})</span>
        </div>
      </div>

      {/* Busca Rápida no Livro de Magias */}
      <div 
        className="p-4 rounded-2xl border shadow-lg space-y-3"
        style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
            <Sparkles size={14} style={{ color: currentTheme.primary }} />
            Grimório & Magias Conhecidas
          </h3>
          <button
            onClick={onOpenCompendium}
            className="px-3 py-1 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-all"
          >
            <BookOpen size={13} style={{ color: currentTheme.primary }} />
            Abrir Compêndio Completo
          </button>
        </div>

        <div className="relative">
          <input 
            type="text"
            placeholder="Digite o nome de uma magia para aprender (ex: Curar Ferimentos, Bênção, Bola de Fogo)..."
            value={spellSearch}
            onChange={(e) => {
              setSpellSearch(e.target.value);
              setShowSpellDropdown(true);
            }}
            onFocus={() => setShowSpellDropdown(true)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
          />
          {showSpellDropdown && filteredSpells.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-neutral-900 border border-amber-400/40 rounded-xl shadow-2xl z-30 overflow-hidden divide-y divide-white/10">
              {filteredSpells.map((sp, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleAddSpellFromSearch(sp)}
                  className="p-2.5 hover:bg-white/10 cursor-pointer flex items-center justify-between text-xs transition-colors"
                >
                  <div>
                    <span className="font-bold text-white block">{sp.name}</span>
                    <span className="text-[10px] text-white/50">{sp.castingTime} | {sp.range}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-white/10 text-amber-300">
                      {sp.level === 0 ? "Truque" : `${sp.level}º Nível`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Espaços de Magia (Spell Slots Níveis 1 a 5) */}
      <div 
        className="p-4 rounded-2xl border shadow-lg space-y-3"
        style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
      >
        <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
          Espaços de Magia (Slots por Nível)
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((lvl) => {
            const slotData = character.spellcasting.slots[lvl] || { total: 0, used: 0 };
            return (
              <div key={lvl} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{lvl}º Nível</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-white/40">Total:</span>
                    <input 
                      type="number"
                      min="0"
                      max="10"
                      value={slotData.total}
                      onChange={(e) => handleSlotChange(lvl, "total", e.target.value)}
                      className="w-8 text-center font-mono font-bold bg-white/10 rounded py-0.5 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Checkboxes de Espaços Gastos */}
                {slotData.total > 0 && (
                  <div className="flex gap-1.5 pt-1 flex-wrap">
                    {Array.from({ length: slotData.total }).map((_, i) => {
                      const isUsed = slotData.used > i;
                      return (
                        <button
                          key={i}
                          onClick={() => toggleUsedSlot(lvl, i + 1)}
                          className={`w-4 h-4 rounded-full border transition-all ${
                            isUsed 
                              ? "bg-red-500 border-red-400 opacity-60" 
                              : "bg-amber-400 border-amber-300 shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                          }`}
                          title={isUsed ? "Gasto (clique para restaurar)" : "Disponível (clique para gastar)"}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lista de Magias Cadastradas */}
      <div 
        className="p-4 rounded-2xl border shadow-lg space-y-3"
        style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Magias Aprendidas ({character.spellcasting.spells.length})
          </h4>
          <button
            onClick={() => handleAddEmptySpell(1)}
            className="px-2.5 py-1 rounded text-xs font-bold transition-all shadow flex items-center gap-1"
            style={{ backgroundColor: currentTheme.primary, color: "#000" }}
          >
            <Plus size={12} /> Nova Magia
          </button>
        </div>

        {character.spellcasting.spells.length === 0 ? (
          <div className="text-center py-8 text-white/40 text-xs">
            Nenhuma magia cadastrada ainda. Use a barra de busca acima ou consulte o Compêndio!
          </div>
        ) : (
          <div className="space-y-2">
            {character.spellcasting.spells.map((sp) => (
              <div 
                key={sp.id}
                className="p-3 rounded-xl border border-white/10 bg-white/[0.02] space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTogglePrepared(sp.id)}
                      className={`w-3.5 h-3.5 rounded border transition-all flex items-center justify-center ${
                        sp.prepared ? "bg-amber-400 border-amber-300 text-black" : "border-white/30"
                      }`}
                      title={sp.prepared ? "Preparada" : "Não preparada"}
                    >
                      {sp.prepared && <Check size={10} />}
                    </button>
                    <span className="font-bold text-sm text-white">{sp.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-white/10 text-amber-300">
                      {sp.level === 0 ? "Truque" : `${sp.level}º Nível`}
                    </span>
                    <button
                      onClick={() => handleRemoveSpell(sp.id)}
                      className="p-1 rounded text-white/40 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {sp.desc && (
                  <p className="text-xs text-white/70 whitespace-pre-line leading-relaxed pl-5 font-serif">
                    {sp.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
