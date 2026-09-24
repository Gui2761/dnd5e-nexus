import React, { useState, useEffect } from "react";
import { 
  Award, TrendingUp, Heart, Sparkles, Shield, Sword, 
  X, Check, ChevronRight, Zap, BookOpen 
} from "lucide-react";
import { 
  getProficiencyBonus, calculateCanonicalHP, CLASS_HIT_DICE, 
  XP_TABLE, getNextLevelXP, getSlotsForClassAndLevel 
} from "../utils/dndCalc";
import { CLASS_FEATURES_DB } from "../data/compendium";

export default function LevelUpModal({
  isOpen,
  onClose,
  character,
  setCharacter,
  currentTheme
}) {
  const currentLevel = character?.level || 1;
  const [targetLevel, setTargetLevel] = useState(currentLevel);
  const [includeFeatures, setIncludeFeatures] = useState(true);
  const [appliedToast, setAppliedToast] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTargetLevel(character?.level || 1);
      setAppliedToast(false);
    }
  }, [isOpen, character?.level]);

  if (!isOpen) return null;

  const className = character.className || "Guerreiro";
  const hitDie = CLASS_HIT_DICE[className] || "d8";
  const currentProf = getProficiencyBonus(currentLevel);
  const targetProf = getProficiencyBonus(targetLevel);
  const targetHitDice = `${targetLevel}${hitDie}`;
  const canonicalHP = calculateCanonicalHP(className, targetLevel, character.stats?.con || 10);
  const currentHP = character.hpMax || calculateCanonicalHP(className, currentLevel, character.stats?.con || 10);
  const hpDifference = canonicalHP - currentHP;
  const targetMinXP = XP_TABLE[targetLevel] || 0;
  const nextTargetXP = getNextLevelXP(targetLevel);

  // Poderes desbloqueados no nível selecionado
  const classFeatures = CLASS_FEATURES_DB[className] || [];
  const unlockedFeatures = classFeatures.filter(f => f.level === targetLevel);

  const handleConfirmLevelUp = () => {
    const updatedSlots = getSlotsForClassAndLevel(className, targetLevel, character.spellcasting?.slots);
    
    let updatedFeaturesText = character.featuresText || "";
    if (includeFeatures && unlockedFeatures.length > 0) {
      unlockedFeatures.forEach(f => {
        // Verifica se já não foi adicionada
        if (!updatedFeaturesText.includes(f.name)) {
          const entry = `\n\n• ${f.name} (${className} - Nível ${targetLevel})\n${f.desc}`;
          updatedFeaturesText = (updatedFeaturesText.trim() + entry).trim();
        }
      });
    }

    const currentXP = character.xp || 0;
    const finalXP = currentXP < targetMinXP ? targetMinXP : currentXP;

    setCharacter(prev => ({
      ...prev,
      level: targetLevel,
      profBonusOverride: undefined, // Garante recálculo oficial dinâmico!
      hitDiceTotal: targetHitDice,
      hitDiceCurrent: targetHitDice,
      hpMax: canonicalHP,
      hpCurrent: prev.hpCurrent === prev.hpMax ? canonicalHP : Math.min(canonicalHP, prev.hpCurrent + Math.max(0, hpDifference)),
      xp: finalXP,
      featuresText: updatedFeaturesText,
      spellcasting: {
        ...prev.spellcasting,
        slots: updatedSlots
      }
    }));

    setAppliedToast(true);
    setTimeout(() => {
      setAppliedToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl flex flex-col rounded-2xl border shadow-2xl overflow-hidden"
        style={{
          backgroundColor: currentTheme.bgDark,
          borderColor: currentTheme.border,
          boxShadow: currentTheme.glow
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 border-b border-white/10"
          style={{ background: currentTheme.gradient }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="p-2.5 rounded-xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: currentTheme.primaryDark, color: currentTheme.primaryLight }}
            >
              <TrendingUp size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-white tracking-wide flex items-center gap-2">
                Subida de Nível & Progressão
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-sans uppercase font-extrabold bg-amber-400 text-black shadow-sm">
                  D&D 5ª Edição
                </span>
              </h2>
              <p className="text-xs text-white/70">
                Ajuste automático de proficiência, dados de vida, PV, espaços de magia e novos poderes
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Feedback Toast */}
        {appliedToast && (
          <div className="bg-emerald-900/90 border-b border-emerald-500/50 py-2 px-4 text-emerald-200 text-xs font-bold flex items-center justify-center gap-2 animate-fadeIn">
            <Check size={16} className="text-emerald-400" />
            <span>Ficha atualizada com sucesso para o Nível {targetLevel}!</span>
          </div>
        )}

        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Seletor Interativo de Nível */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center space-y-3">
            <span className="text-xs text-white/60 font-semibold uppercase tracking-wider block">
              Escolha o Nível de {character.name || "Personagem"} ({className})
            </span>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setTargetLevel(prev => Math.max(1, prev - 1))}
                disabled={targetLevel <= 1}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none text-white font-black text-xl flex items-center justify-center transition-all active:scale-95 shadow-md"
              >
                -
              </button>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-serif font-black text-amber-400 tracking-wider">
                  Nível {targetLevel}
                </span>
                <span className="text-[11px] text-white/50">
                  {targetLevel === currentLevel ? "(Nível Atual)" : targetLevel > currentLevel ? `(+${targetLevel - currentLevel} níveis)` : `(-${currentLevel - targetLevel} níveis)`}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setTargetLevel(prev => Math.min(20, prev + 1))}
                disabled={targetLevel >= 20}
                className="w-10 h-10 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 disabled:opacity-30 disabled:pointer-events-none text-amber-300 font-black text-xl flex items-center justify-center transition-all active:scale-95 border border-amber-500/30 shadow-md"
              >
                +
              </button>
            </div>

            {/* Slider de Nível */}
            <input 
              type="range" 
              min="1" 
              max="20" 
              value={targetLevel}
              onChange={(e) => setTargetLevel(parseInt(e.target.value, 10))}
              className="w-full max-w-md accent-amber-400 cursor-pointer h-2 bg-white/10 rounded-lg"
            />
            <div className="flex justify-between max-w-md mx-auto text-[9px] text-white/40 font-mono">
              <span>Nível 1</span>
              <span>Nível 5</span>
              <span>Nível 10</span>
              <span>Nível 15</span>
              <span>Nível 20</span>
            </div>
          </div>

          {/* Comparativo de Atributos Oficiais de Progressão */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Bônus de Proficiência */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-center">
              <span className="text-[10px] text-white/50 uppercase font-bold block mb-1">Bônus de Proficiência</span>
              <div className="flex items-center justify-center gap-1.5 font-mono text-base font-bold">
                <span className="text-white/60">+{currentProf}</span>
                <ChevronRight size={14} className="text-amber-400" />
                <span className={`text-lg font-black ${targetProf > currentProf ? "text-amber-300" : "text-white"}`}>
                  +{targetProf}
                </span>
              </div>
              <span className="text-[9px] text-white/40 block mt-0.5">Automático em testes</span>
            </div>

            {/* Dados de Vida */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-center">
              <span className="text-[10px] text-white/50 uppercase font-bold block mb-1">Dados de Vida</span>
              <div className="flex items-center justify-center gap-1.5 font-mono text-base font-bold">
                <span className="text-white/60">{character.hitDiceTotal || `${currentLevel}${hitDie}`}</span>
                <ChevronRight size={14} className="text-amber-400" />
                <span className="text-lg font-black text-amber-300">{targetHitDice}</span>
              </div>
              <span className="text-[9px] text-white/40 block mt-0.5">Recuperação em descanso</span>
            </div>

            {/* Pontos de Vida Máximos */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-center">
              <span className="text-[10px] text-white/50 uppercase font-bold block mb-1">PV Máximos</span>
              <div className="flex items-center justify-center gap-1.5 font-mono text-base font-bold">
                <span className="text-white/60">{currentHP}</span>
                <ChevronRight size={14} className="text-emerald-400" />
                <span className="text-lg font-black text-emerald-300">{canonicalHP} PV</span>
              </div>
              <span className="text-[9px] text-emerald-400/80 block mt-0.5">
                {hpDifference >= 0 ? `+${hpDifference} PV calculados` : `${hpDifference} PV`}
              </span>
            </div>

            {/* Experiência Mínima */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-center">
              <span className="text-[10px] text-white/50 uppercase font-bold block mb-1">XP Necessário</span>
              <div className="font-mono text-base font-bold text-amber-300">
                {targetMinXP.toLocaleString("pt-BR")} XP
              </div>
              <span className="text-[9px] text-white/40 block mt-0.5">
                Próximo: {nextTargetXP.toLocaleString("pt-BR")}
              </span>
            </div>
          </div>

          {/* Novos Poderes Desbloqueados para esta Classe */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Award size={16} />
                Poderes Canônicos de {className} (Nível {targetLevel}):
              </h3>
              {unlockedFeatures.length > 0 && (
                <label className="flex items-center gap-1.5 text-xs text-white/80 cursor-pointer select-none">
                  <input 
                    type="checkbox"
                    checked={includeFeatures}
                    onChange={(e) => setIncludeFeatures(e.target.checked)}
                    className="accent-amber-400 rounded"
                  />
                  <span>Adicionar à lista de Habilidades</span>
                </label>
              )}
            </div>

            {unlockedFeatures.length > 0 ? (
              <div className="space-y-2 pt-1">
                {unlockedFeatures.map((feat, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
                    <span className="font-bold text-xs text-amber-200 block">{feat.name}</span>
                    <p className="text-xs text-white/70 leading-relaxed font-serif">{feat.desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-white/50 italic py-1">
                {targetLevel === 4 || targetLevel === 8 || targetLevel === 12 || targetLevel === 16 || targetLevel === 19
                  ? "⭐ Este nível concede: 'Aumento no Valor de Atributo' (+2 em um atributo ou +1 em dois) ou a escolha de um Talento!"
                  : `Nenhum poder especial catalogado especificamente para o Nível ${targetLevel} no resumo básico do PHB.`}
              </p>
            )}
          </div>
        </div>

        {/* Ações Inferiores */}
        <div className="p-4 bg-black/40 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl text-xs font-bold text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleConfirmLevelUp}
            className="py-2.5 px-6 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg hover:scale-[1.02] active:scale-95 text-black"
            style={{ backgroundColor: currentTheme.primary }}
          >
            <Check size={16} />
            Confirmar e Aplicar Nível {targetLevel} à Ficha
          </button>
        </div>

      </div>
    </div>
  );
}
