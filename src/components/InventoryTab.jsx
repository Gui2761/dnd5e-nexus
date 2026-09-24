import React from "react";
import { Shield, Coins, Backpack, Sparkles } from "lucide-react";
import { ARMORS } from "../data/compendium";
import { getAbilityModifier } from "../utils/dndCalc";

export default function InventoryTab({ character, setCharacter, currentTheme, onOpenCompendium }) {
  const dexMod = getAbilityModifier(character.stats.dex);

  const handleArmorSelect = (armorName) => {
    const armor = ARMORS.find(a => a.name === armorName);
    if (!armor) {
      setCharacter({ ...character, armorName: "Sem Armadura", armorClass: 10 + dexMod });
      return;
    }

    let calculatedAC = 10;
    if (armor.category === "Leve") {
      calculatedAC = armor.baseAC + dexMod;
    } else if (armor.category === "Média") {
      calculatedAC = armor.baseAC + Math.min(2, dexMod);
    } else if (armor.category === "Pesada") {
      calculatedAC = armor.baseAC;
    }

    setCharacter(prev => ({
      ...prev,
      armorName: armor.name,
      armorClass: calculatedAC
    }));
  };

  const handleCoinChange = (coin, val) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    setCharacter(prev => ({
      ...prev,
      coins: {
        ...prev.coins,
        [coin]: num
      }
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Seletor de Armadura Equipada & Cálculo Automático de CA */}
      <div 
        className="p-4 rounded-2xl border shadow-lg space-y-3"
        style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
            <Shield size={16} style={{ color: currentTheme.primary }} />
            Armadura & Proteção Equipada
          </h3>
          <button
            onClick={onOpenCompendium}
            className="text-xs text-amber-300 hover:underline flex items-center gap-1"
          >
            <Sparkles size={12} /> Consultar Tabela de Armaduras
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-white/60 block mb-1">Armadura Equipada:</label>
            <select
              value={character.armorName}
              onChange={(e) => handleArmorSelect(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-semibold"
            >
              <option value="Sem Armadura" className="bg-neutral-900">Sem Armadura (10 + DES)</option>
              {ARMORS.map((arm, idx) => (
                <option key={idx} value={arm.name} className="bg-neutral-900">
                  {arm.name} ({arm.category}) — CA: {arm.acFormula}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-white/60 block mb-1">CA Atual Calculada:</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={character.armorClass}
                onChange={(e) => setCharacter({ ...character, armorClass: parseInt(e.target.value) || 10 })}
                className="w-20 bg-white/5 border border-white/10 rounded-xl p-2 text-center text-lg font-black font-mono text-white focus:outline-none"
              />
              <span className="text-[11px] text-white/50">
                Você pode ajustar manualmente caso receba bônus de escudo (+2) ou itens mágicos.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bolsa de Moedas (PC, PP, PE, PO, PL) */}
      <div 
        className="p-4 rounded-2xl border shadow-lg space-y-3"
        style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
      >
        <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2 border-b border-white/10 pb-2">
          <Coins size={16} className="text-amber-400" />
          Riqueza & Moedas
        </h3>

        <div className="grid grid-cols-5 gap-2 text-center">
          <div className="p-2 rounded-xl bg-amber-950/20 border border-amber-900/30">
            <span className="text-[10px] font-bold text-amber-600 block">PC (Cobre)</span>
            <input 
              type="number" 
              value={character.coins.cp}
              onChange={(e) => handleCoinChange("cp", e.target.value)}
              className="w-full text-center font-mono font-bold text-sm bg-transparent text-white focus:outline-none mt-1"
            />
          </div>

          <div className="p-2 rounded-xl bg-slate-800/30 border border-slate-700/40">
            <span className="text-[10px] font-bold text-slate-300 block">PP (Prata)</span>
            <input 
              type="number" 
              value={character.coins.sp}
              onChange={(e) => handleCoinChange("sp", e.target.value)}
              className="w-full text-center font-mono font-bold text-sm bg-transparent text-white focus:outline-none mt-1"
            />
          </div>

          <div className="p-2 rounded-xl bg-cyan-950/20 border border-cyan-900/30">
            <span className="text-[10px] font-bold text-cyan-400 block">PE (Electro)</span>
            <input 
              type="number" 
              value={character.coins.ep}
              onChange={(e) => handleCoinChange("ep", e.target.value)}
              className="w-full text-center font-mono font-bold text-sm bg-transparent text-white focus:outline-none mt-1"
            />
          </div>

          <div className="p-2 rounded-xl bg-yellow-950/30 border border-yellow-700/50 shadow-sm">
            <span className="text-[10px] font-bold text-yellow-300 block">PO (Ouro)</span>
            <input 
              type="number" 
              value={character.coins.gp}
              onChange={(e) => handleCoinChange("gp", e.target.value)}
              className="w-full text-center font-mono font-black text-sm bg-transparent text-yellow-300 focus:outline-none mt-1"
            />
          </div>

          <div className="p-2 rounded-xl bg-indigo-950/30 border border-indigo-800/40">
            <span className="text-[10px] font-bold text-indigo-300 block">PL (Platina)</span>
            <input 
              type="number" 
              value={character.coins.pp}
              onChange={(e) => handleCoinChange("pp", e.target.value)}
              className="w-full text-center font-mono font-bold text-sm bg-transparent text-white focus:outline-none mt-1"
            />
          </div>
        </div>
      </div>

      {/* Mochila de Equipamentos e Itens */}
      <div 
        className="p-4 rounded-2xl border shadow-lg space-y-3"
        style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
            <Backpack size={16} style={{ color: currentTheme.primary }} />
            Mochila & Inventário de Aventura
          </h3>
        </div>

        <textarea
          rows={10}
          value={character.equipmentText}
          onChange={(e) => setCharacter({ ...character, equipmentText: e.target.value })}
          placeholder="Liste seus itens, tochas, cordas, poções de cura, rações..."
          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white/90 placeholder-white/30 focus:outline-none focus:border-amber-400 leading-relaxed font-mono"
        />
      </div>

    </div>
  );
}
