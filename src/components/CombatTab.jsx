import React, { useState } from "react";
import { Shield, Zap, Footprints, Heart, Plus, Minus, Trash2, PlusCircle, Dices, Sparkles } from "lucide-react";
import { WEAPONS } from "../data/compendium";

export default function CombatTab({ character, setCharacter, currentTheme, onOpenCompendium, onQuickRoll }) {
  const [weaponQuery, setWeaponQuery] = useState("");
  const [showWeaponDropdown, setShowWeaponDropdown] = useState(false);

  // Manipuladores de PV
  const modifyHP = (amount) => {
    setCharacter(prev => {
      const current = parseInt(prev.hpCurrent, 10) || 0;
      const max = parseInt(prev.hpMax, 10) || 1;
      const newHp = Math.max(0, Math.min(max, current + amount));
      return { ...prev, hpCurrent: newHp };
    });
  };

  const modifyTempHP = (amount) => {
    setCharacter(prev => {
      const current = parseInt(prev.hpTemp, 10) || 0;
      return { ...prev, hpTemp: Math.max(0, current + amount) };
    });
  };

  // Ataques
  const handleAddWeaponFromSearch = (weapon) => {
    const newAtk = {
      id: "atk-" + Date.now(),
      name: weapon.name,
      bonus: "+5",
      damage: `${weapon.damage} ${weapon.damageType}`,
      notes: weapon.properties || ""
    };
    setCharacter(prev => ({
      ...prev,
      attacks: [...prev.attacks, newAtk]
    }));
    setWeaponQuery("");
    setShowWeaponDropdown(false);
  };

  const handleAddEmptyAttack = () => {
    const newAtk = {
      id: "atk-" + Date.now(),
      name: "Novo Ataque",
      bonus: "+5",
      damage: "1d8+3",
      notes: ""
    };
    setCharacter(prev => ({
      ...prev,
      attacks: [...prev.attacks, newAtk]
    }));
  };

  const handleUpdateAttack = (id, field, value) => {
    setCharacter(prev => ({
      ...prev,
      attacks: prev.attacks.map(atk => atk.id === id ? { ...atk, [field]: value } : atk)
    }));
  };

  const handleRemoveAttack = (id) => {
    setCharacter(prev => ({
      ...prev,
      attacks: prev.attacks.filter(atk => atk.id !== id)
    }));
  };

  // Testes contra a Morte
  const toggleDeathSave = (type, index) => {
    setCharacter(prev => {
      const currentVal = prev.deathSaves[type] || 0;
      const newVal = currentVal === index ? index - 1 : index;
      return {
        ...prev,
        deathSaves: {
          ...prev.deathSaves,
          [type]: Math.max(0, Math.min(3, newVal))
        }
      };
    });
  };

  const filteredWeapons = weaponQuery.trim() 
    ? WEAPONS.filter(w => w.name.toLowerCase().includes(weaponQuery.toLowerCase())).slice(0, 6)
    : [];

  return (
    <div className="space-y-6">
      
      {/* Grade de Estatísticas Rápidas de Combate */}
      <div className="grid grid-cols-3 gap-3">
        {/* Classe de Armadura */}
        <div 
          className="p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center relative shadow-lg"
          style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
        >
          <Shield size={20} className="mb-1" style={{ color: currentTheme.primary }} />
          <span className="text-[10px] uppercase font-bold tracking-wider text-white/60">Classe de Armadura</span>
          <input 
            type="number" 
            value={character.armorClass}
            onChange={(e) => setCharacter({ ...character, armorClass: parseInt(e.target.value) || 10 })}
            className="w-16 text-center text-3xl font-black font-mono bg-transparent text-white focus:outline-none"
          />
          <span className="text-[10px] text-white/40 truncate max-w-full px-1">{character.armorName || "Sem armadura"}</span>
        </div>

        {/* Iniciativa */}
        <div 
          className="p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center relative shadow-lg"
          style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
        >
          <Zap size={20} className="mb-1" style={{ color: currentTheme.primary }} />
          <span className="text-[10px] uppercase font-bold tracking-wider text-white/60">Iniciativa</span>
          <input 
            type="number" 
            value={character.initiativeBonus}
            onChange={(e) => setCharacter({ ...character, initiativeBonus: parseInt(e.target.value) || 0 })}
            className="w-16 text-center text-3xl font-black font-mono bg-transparent text-white focus:outline-none"
          />
          <button 
            onClick={() => onQuickRoll("Iniciativa", 20, character.initiativeBonus)}
            className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white/10 hover:bg-white/20 text-white/80 flex items-center gap-1 mt-1"
          >
            <Dices size={10} /> Rolar
          </button>
        </div>

        {/* Deslocamento */}
        <div 
          className="p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center relative shadow-lg"
          style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
        >
          <Footprints size={20} className="mb-1" style={{ color: currentTheme.primary }} />
          <span className="text-[10px] uppercase font-bold tracking-wider text-white/60">Deslocamento</span>
          <input 
            type="text" 
            value={character.speed}
            onChange={(e) => setCharacter({ ...character, speed: e.target.value })}
            className="w-20 text-center text-2xl font-black font-mono bg-transparent text-white focus:outline-none"
          />
          <span className="text-[10px] text-white/40">30 ft (6 quadrados)</span>
        </div>
      </div>

      {/* Painel Tátil de Pontos de Vida (Mobile First) */}
      <div 
        className="p-5 rounded-2xl border shadow-xl space-y-4"
        style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-red-500 fill-red-500/20" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-white">Pontos de Vida (PV)</h3>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-white/60">Máximo:</span>
            <input 
              type="number" 
              value={character.hpMax}
              onChange={(e) => setCharacter({ ...character, hpMax: parseInt(e.target.value) || 1 })}
              className="w-14 text-center font-mono font-bold bg-white/5 border border-white/10 rounded-lg py-1 text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Display Central de PV com barra de progresso */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white">
              {character.hpCurrent}
            </span>
            <span className="text-xl sm:text-2xl font-mono text-white/40 font-bold">
              / {character.hpMax}
            </span>
          </div>

          {/* Barra de Vida Colorida */}
          <div className="w-full bg-black/40 h-3 rounded-full overflow-hidden mt-3 border border-white/10">
            <div 
              className="h-full transition-all duration-300 rounded-full"
              style={{
                width: `${Math.max(0, Math.min(100, (character.hpCurrent / character.hpMax) * 100))}%`,
                backgroundColor: character.hpCurrent <= character.hpMax * 0.25 ? "#ef4444" :
                                 character.hpCurrent <= character.hpMax * 0.5 ? "#f59e0b" : "#22c55e"
              }}
            />
          </div>
        </div>

        {/* Botões Táteis de Dano e Cura Rápida */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          <button 
            onClick={() => modifyHP(-5)}
            className="py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-200 font-mono font-bold text-sm active:scale-95 transition-all shadow"
          >
            -5 PV
          </button>
          <button 
            onClick={() => modifyHP(-1)}
            className="py-2.5 rounded-xl bg-red-950/30 hover:bg-red-900/50 border border-red-800/30 text-red-200 font-mono font-bold text-sm active:scale-95 transition-all shadow"
          >
            -1 PV
          </button>
          <button 
            onClick={() => modifyHP(1)}
            className="py-2.5 rounded-xl bg-emerald-950/30 hover:bg-emerald-900/50 border border-emerald-800/30 text-emerald-200 font-mono font-bold text-sm active:scale-95 transition-all shadow"
          >
            +1 PV
          </button>
          <button 
            onClick={() => modifyHP(5)}
            className="py-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/40 text-emerald-200 font-mono font-bold text-sm active:scale-95 transition-all shadow"
          >
            +5 PV
          </button>
        </div>

        {/* PV Temporários e Dados de Vida */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 text-xs">
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <span className="text-white/60">PV Temporários:</span>
            <div className="flex items-center gap-1">
              <button onClick={() => modifyTempHP(-1)} className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/70"><Minus size={12} /></button>
              <span className="font-mono font-bold text-amber-300 px-1">{character.hpTemp || 0}</span>
              <button onClick={() => modifyTempHP(1)} className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/70"><Plus size={12} /></button>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <span className="text-white/60">Dado de Vida:</span>
            <input 
              type="text" 
              value={character.hitDiceCurrent}
              onChange={(e) => setCharacter({ ...character, hitDiceCurrent: e.target.value })}
              className="w-16 text-right font-mono font-bold bg-transparent text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Testes Contra a Morte (Death Saves) */}
        <div className="p-3 rounded-xl bg-black/30 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white/80 uppercase tracking-wider">Testes contra a Morte</span>
            <button 
              onClick={() => onQuickRoll("Teste Contra a Morte", 20, 0)}
              className="px-2 py-0.5 rounded font-bold bg-white/10 text-[10px] text-white/80 hover:bg-white/20 flex items-center gap-1"
            >
              <Dices size={10} /> Rolar d20
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            {/* Sucessos */}
            <div className="flex items-center justify-between bg-emerald-950/20 px-3 py-1.5 rounded-lg border border-emerald-900/30">
              <span className="text-emerald-300 font-semibold">Sucessos</span>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => toggleDeathSave("successes", num)}
                    className={`w-4 h-4 rounded-full border transition-all ${
                      character.deathSaves.successes >= num 
                        ? "bg-emerald-400 border-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.8)]" 
                        : "border-white/20 hover:border-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Falhas */}
            <div className="flex items-center justify-between bg-red-950/20 px-3 py-1.5 rounded-lg border border-red-900/30">
              <span className="text-red-300 font-semibold">Falhas</span>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => toggleDeathSave("failures", num)}
                    className={`w-4 h-4 rounded-full border transition-all ${
                      character.deathSaves.failures >= num 
                        ? "bg-red-500 border-red-400 shadow-[0_0_8px_rgba(239,68,68,0.8)]" 
                        : "border-white/20 hover:border-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Seção de Ataques & Conjuradores */}
      <div 
        className="p-5 rounded-2xl border shadow-xl space-y-4"
        style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <h3 className="font-bold text-sm uppercase tracking-wider text-white flex items-center gap-2">
            Ataques & Ações de Combate
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCompendium}
              className="px-3 py-1 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-all"
            >
              <Sparkles size={13} style={{ color: currentTheme.primary }} />
              Ver Livro de Armas
            </button>
            <button
              onClick={handleAddEmptyAttack}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all shadow flex items-center gap-1"
              style={{ backgroundColor: currentTheme.primary, color: "#000" }}
            >
              <Plus size={13} />
              Personalizado
            </button>
          </div>
        </div>

        {/* Campo de Autocompletar Armas do Livro */}
        <div className="relative">
          <input 
            type="text"
            placeholder="Digite para buscar e adicionar arma oficial (ex: Espada Longa, Arco, Machado)..."
            value={weaponQuery}
            onChange={(e) => {
              setWeaponQuery(e.target.value);
              setShowWeaponDropdown(true);
            }}
            onFocus={() => setShowWeaponDropdown(true)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
          />
          {showWeaponDropdown && filteredWeapons.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-neutral-900 border border-amber-400/40 rounded-xl shadow-2xl z-30 overflow-hidden divide-y divide-white/10">
              {filteredWeapons.map((wpn, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleAddWeaponFromSearch(wpn)}
                  className="p-2.5 hover:bg-white/10 cursor-pointer flex items-center justify-between text-xs transition-colors"
                >
                  <div>
                    <span className="font-bold text-white block">{wpn.name}</span>
                    <span className="text-[10px] text-white/50">{wpn.properties}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-red-400 block">{wpn.damage}</span>
                    <span className="text-[10px] text-white/40">{wpn.type}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lista de Ataques */}
        <div className="space-y-2.5">
          {character.attacks.map((atk) => (
            <div 
              key={atk.id}
              className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all space-y-2 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <input 
                  type="text"
                  value={atk.name}
                  onChange={(e) => handleUpdateAttack(atk.id, "name", e.target.value)}
                  className="font-bold text-sm text-white bg-transparent border-b border-transparent hover:border-white/20 focus:border-amber-400 focus:outline-none flex-1"
                />
                
                {/* Botão de Rolar Ataque e Dano */}
                <button
                  onClick={() => onQuickRoll(atk.name, 20, parseInt(atk.bonus) || 0)}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white/90 flex items-center gap-1.5 transition-all shadow"
                >
                  <Dices size={13} style={{ color: currentTheme.primary }} />
                  Rolar ({atk.bonus})
                </button>

                <button
                  onClick={() => handleRemoveAttack(atk.id)}
                  className="p-1 rounded text-white/40 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-white/50 block">Bônus de Acerto:</span>
                  <input 
                    type="text"
                    value={atk.bonus}
                    onChange={(e) => handleUpdateAttack(atk.id, "bonus", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 font-mono font-bold text-white focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-white/50 block">Dano / Tipo:</span>
                  <input 
                    type="text"
                    value={atk.damage}
                    onChange={(e) => handleUpdateAttack(atk.id, "damage", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 font-mono font-bold text-red-300 focus:outline-none"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-white/50 block">Propriedades / Alcance:</span>
                  <input 
                    type="text"
                    value={atk.notes}
                    onChange={(e) => handleUpdateAttack(atk.id, "notes", e.target.value)}
                    placeholder="Versátil, arremesso..."
                    className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white/80 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
