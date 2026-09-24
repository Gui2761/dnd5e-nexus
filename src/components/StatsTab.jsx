import React from "react";
import { Sparkles, Dices, Eye, ShieldCheck } from "lucide-react";
import { ABILITIES, SKILLS, getAbilityModifier, formatModifier, getProficiencyBonus } from "../utils/dndCalc";

export default function StatsTab({ character, setCharacter, currentTheme, onQuickRoll }) {
  const profBonus = getProficiencyBonus(character.level);

  // Manipuladores de Atributo
  const handleScoreChange = (abId, val) => {
    const num = Math.max(1, Math.min(30, parseInt(val, 10) || 10));
    setCharacter(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [abId]: num
      }
    }));
  };

  const toggleSavingProf = (abId) => {
    setCharacter(prev => ({
      ...prev,
      savingProficiencies: {
        ...prev.savingProficiencies,
        [abId]: !prev.savingProficiencies[abId]
      }
    }));
  };

  const toggleSkillProf = (skillId) => {
    setCharacter(prev => ({
      ...prev,
      skillsProficiencies: {
        ...prev.skillsProficiencies,
        [skillId]: !prev.skillsProficiencies[skillId]
      }
    }));
  };

  // Cálculo da Percepção Passiva
  const wisMod = getAbilityModifier(character.stats.wis);
  const isPerceptionProf = character.skillsProficiencies.perception;
  const passivePerception = 10 + wisMod + (isPerceptionProf ? profBonus : 0);

  return (
    <div className="space-y-6">
      
      {/* Barra de Inspiração & Bônus de Proficiência */}
      <div className="grid grid-cols-2 gap-3">
        <div 
          onClick={() => setCharacter({ ...character, inspiration: !character.inspiration })}
          className={`p-3.5 rounded-2xl border cursor-pointer select-none transition-all flex items-center justify-between shadow-lg ${
            character.inspiration ? "border-amber-400 bg-amber-950/40" : "bg-black/30 border-white/10"
          }`}
        >
          <div className="flex items-center gap-2">
            <Sparkles size={18} className={character.inspiration ? "text-amber-400 animate-spin" : "text-white/40"} />
            <span className="text-xs font-bold uppercase tracking-wider text-white">Inspiração</span>
          </div>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${character.inspiration ? "bg-amber-400 text-black" : "bg-white/10 text-white/50"}`}>
            {character.inspiration ? "Ativa" : "Não"}
          </span>
        </div>

        <div 
          className="p-3.5 rounded-2xl border text-center flex items-center justify-between shadow-lg"
          style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-white/70">Bônus de Proficiência</span>
          <span className="text-xl font-black font-mono" style={{ color: currentTheme.primaryLight }}>
            +{profBonus}
          </span>
        </div>
      </div>

      {/* Grade dos 6 Atributos Principais */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3 flex items-center gap-1.5">
          <ShieldCheck size={14} style={{ color: currentTheme.primary }} />
          Valores de Habilidade & Modificadores
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ABILITIES.map((ab) => {
            const score = character.stats[ab.id] || 10;
            const mod = getAbilityModifier(score);
            return (
              <div
                key={ab.id}
                className="p-3.5 rounded-2xl border flex flex-col items-center justify-between shadow-lg relative group transition-all hover:scale-[1.02]"
                style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
              >
                <span className="text-[11px] font-bold font-serif tracking-widest uppercase text-white/80">
                  {ab.name}
                </span>

                {/* Modificador Grande Clicável para Rolar */}
                <button
                  onClick={() => onQuickRoll(`Teste de ${ab.name}`, 20, mod)}
                  className="my-1.5 w-16 h-16 rounded-full flex flex-col items-center justify-center border-2 border-white/10 hover:border-amber-400 transition-all bg-black/40 shadow-inner group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] active:scale-95"
                  title="Clique para rolar teste deste atributo"
                >
                  <span className="text-2xl font-black font-mono text-white group-hover:text-amber-300">
                    {formatModifier(mod)}
                  </span>
                  <span className="text-[9px] uppercase text-white/40 flex items-center gap-0.5">
                    <Dices size={8} /> Rolar
                  </span>
                </button>

                {/* Input de Valor Base */}
                <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-2 py-0.5">
                  <span className="text-[10px] text-white/50">Valor:</span>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={score}
                    onChange={(e) => handleScoreChange(ab.id, e.target.value)}
                    className="w-10 text-center font-mono font-bold text-xs bg-transparent text-white focus:outline-none"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Testes de Resistência & Percepção Passiva */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Salvaguardas */}
        <div 
          className="p-4 rounded-2xl border shadow-lg space-y-3"
          style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
        >
          <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2 flex items-center justify-between">
            <span>Testes de Resistência</span>
            <span className="text-[10px] text-white/40">Proficiência = ●</span>
          </h4>

          <div className="space-y-1.5">
            {ABILITIES.map((ab) => {
              const mod = getAbilityModifier(character.stats[ab.id]);
              const isProf = character.savingProficiencies[ab.id];
              const total = mod + (isProf ? profBonus : 0);

              return (
                <div 
                  key={ab.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all text-xs"
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSavingProf(ab.id)}
                      className={`w-3.5 h-3.5 rounded-full border transition-all ${
                        isProf ? "bg-amber-400 border-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.8)]" : "border-white/20 hover:border-white/40"
                      }`}
                      title={isProf ? "Proficiente (clique para remover)" : "Não proficiente (clique para marcar)"}
                    />
                    <span className="font-semibold text-white/90">{ab.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-sm w-8 text-right">
                      {formatModifier(total)}
                    </span>
                    <button
                      onClick={() => onQuickRoll(`Salvaguarda de ${ab.name}`, 20, total)}
                      className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
                      title="Rolar Salvaguarda"
                    >
                      <Dices size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Percepção Passiva & Idiomas */}
        <div className="space-y-4">
          <div 
            className="p-4 rounded-2xl border shadow-lg flex items-center justify-between"
            style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="p-2.5 rounded-xl shadow-inner"
                style={{ backgroundColor: currentTheme.primaryDark, color: currentTheme.primaryLight }}
              >
                <Eye size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Sabedoria Passiva</h4>
                <p className="text-[11px] text-white/50">Percepção passiva sem rolagem ativa</p>
              </div>
            </div>
            <span className="text-3xl font-black font-mono text-white">
              {passivePerception}
            </span>
          </div>

          <div 
            className="p-4 rounded-2xl border shadow-lg space-y-2"
            style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
          >
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Outras Proficiências & Idiomas
            </h4>
            <textarea
              value={character.otherProficiencies}
              onChange={(e) => setCharacter({ ...character, otherProficiencies: e.target.value })}
              rows={4}
              placeholder="Armas, armaduras, ferramentas, idiomas falados..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white/90 placeholder-white/30 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

      </div>

      {/* Lista das 18 Perícias Oficiais */}
      <div 
        className="p-4 rounded-2xl border shadow-lg space-y-3"
        style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
      >
        <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-2 flex items-center justify-between">
          <span>Perícias (18 Oficiais)</span>
          <span className="text-[10px] text-white/40">Clique no dado para rolar teste</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {SKILLS.map((sk) => {
            const statMod = getAbilityModifier(character.stats[sk.stat]);
            const isProf = character.skillsProficiencies[sk.id];
            const total = statMod + (isProf ? profBonus : 0);
            const statShort = ABILITIES.find(a => a.id === sk.stat)?.short;

            return (
              <div 
                key={sk.id}
                className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all text-xs"
              >
                <div className="flex items-center gap-2 truncate">
                  <button
                    onClick={() => toggleSkillProf(sk.id)}
                    className={`w-3.5 h-3.5 rounded-full border transition-all flex-shrink-0 ${
                      isProf ? "bg-amber-400 border-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.8)]" : "border-white/20 hover:border-white/40"
                    }`}
                  />
                  <span className="font-semibold text-white/90 truncate">{sk.name}</span>
                  <span className="text-[9px] text-white/40 font-mono">({statShort})</span>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                  <span className="font-mono font-bold text-white text-xs w-6 text-right">
                    {formatModifier(total)}
                  </span>
                  <button
                    onClick={() => onQuickRoll(`Perícia: ${sk.name}`, 20, total)}
                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
                  >
                    <Dices size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
