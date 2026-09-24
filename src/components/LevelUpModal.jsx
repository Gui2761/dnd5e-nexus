import React, { useState, useEffect } from "react";
import { 
  Award, TrendingUp, Heart, Sparkles, Shield, Sword, 
  X, Check, ChevronRight, Zap, BookOpen, Plus, Trash2,
  Layers, AlertTriangle, CheckCircle2, Info
} from "lucide-react";
import { 
  getProficiencyBonus, CLASS_HIT_DICE, XP_TABLE, getNextLevelXP,
  MULTICLASS_PREREQUISITES, MULTICLASS_PROFICIENCIES, checkMulticlassPrerequisites,
  calculateMulticlassHitDice, calculateMulticlassHP, calculateCombinedSpellSlots,
  formatClassString, parseClassString, ABILITIES
} from "../utils/dndCalc";
import { CLASS_FEATURES_DB } from "../data/compendium";

const ALL_DND_CLASSES = [
  "Bárbaro", "Bardo", "Bruxo", "Clérigo", "Druida", 
  "Feiticeiro", "Guerreiro", "Ladino", "Mago", "Monge", 
  "Paladino", "Ranger"
];

export default function LevelUpModal({
  isOpen,
  onClose,
  character,
  setCharacter,
  currentTheme
}) {
  const [activeTab, setActiveTab] = useState("multiclass"); // "multiclass" ou "features"
  const [classList, setClassList] = useState([]);
  const [newClassToAdd, setNewClassToAdd] = useState("");
  const [includeFeatures, setIncludeFeatures] = useState(true);
  const [appliedToast, setAppliedToast] = useState(false);

  useEffect(() => {
    if (isOpen && character) {
      if (Array.isArray(character.classes) && character.classes.length > 0) {
        setClassList(character.classes.map(c => ({ ...c })));
      } else {
        const parsed = parseClassString(character.className, character.level || 1);
        setClassList(parsed);
      }
      setAppliedToast(false);
      setNewClassToAdd("");
    }
  }, [isOpen, character]);

  if (!isOpen) return null;

  // Cálculos Consolidados de Multiclasse
  const totalLevel = Math.min(20, Math.max(1, classList.reduce((acc, c) => acc + (parseInt(c.level, 10) || 1), 0)));
  const currentProf = getProficiencyBonus(character.level || 1);
  const targetProf = getProficiencyBonus(totalLevel);
  const combinedHitDice = calculateMulticlassHitDice(classList);
  const canonicalHP = calculateMulticlassHP(classList, character.stats?.con || 10);
  const currentHP = character.hpMax || canonicalHP;
  const hpDifference = canonicalHP - currentHP;
  const targetMinXP = XP_TABLE[totalLevel] || 0;
  const nextTargetXP = getNextLevelXP(totalLevel);
  const combinedClassName = formatClassString(classList);

  // Classes ainda disponíveis para adicionar
  const existingClassNames = classList.map(c => c.className);
  const availableClassesToAdd = ALL_DND_CLASSES.filter(c => !existingClassNames.includes(c));

  // Poderes desbloqueados para as classes no nível atual da lista
  const unlockedFeatures = [];
  classList.forEach(c => {
    const db = CLASS_FEATURES_DB[c.className] || [];
    const feats = db.filter(f => f.level === c.level);
    feats.forEach(f => {
      unlockedFeatures.push({ ...f, sourceClass: c.className, classLevel: c.level });
    });
  });

  // Manipuladores de Classes
  const handleUpdateClassLevel = (className, delta) => {
    setClassList(prev => {
      const currentTotal = prev.reduce((acc, c) => acc + (parseInt(c.level, 10) || 1), 0);
      if (delta > 0 && currentTotal >= 20) return prev; // Limite de 20 níveis
      
      return prev.map(c => {
        if (c.className === className) {
          const nextLvl = Math.max(1, Math.min(20, (parseInt(c.level, 10) || 1) + delta));
          return { ...c, level: nextLvl };
        }
        return c;
      });
    });
  };

  const handleAddClass = () => {
    if (!newClassToAdd) return;
    const currentTotal = classList.reduce((acc, c) => acc + (parseInt(c.level, 10) || 1), 0);
    if (currentTotal >= 20) return;

    setClassList(prev => [
      ...prev,
      { className: newClassToAdd, level: 1 }
    ]);
    setNewClassToAdd("");
  };

  const handleRemoveClass = (className) => {
    if (classList.length <= 1) return; // Não remove a única classe
    setClassList(prev => prev.filter(c => c.className !== className));
  };

  const handleConfirmLevelUp = () => {
    const updatedSlots = calculateCombinedSpellSlots(classList, character.spellcasting?.slots);

    let updatedFeaturesText = character.featuresText || "";
    if (includeFeatures && unlockedFeatures.length > 0) {
      unlockedFeatures.forEach(f => {
        if (!updatedFeaturesText.includes(f.name)) {
          const entry = `\n\n• ${f.name} (${f.sourceClass} - Nível ${f.classLevel})\n${f.desc}`;
          updatedFeaturesText = (updatedFeaturesText.trim() + entry).trim();
        }
      });
    }

    const currentXP = character.xp || 0;
    const finalXP = currentXP < targetMinXP ? targetMinXP : currentXP;

    setCharacter(prev => ({
      ...prev,
      classes: classList,
      level: totalLevel,
      className: combinedClassName,
      profBonusOverride: undefined, // Recálculo canônico
      hitDiceTotal: combinedHitDice,
      hitDiceCurrent: combinedHitDice,
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
        className="w-full max-w-3xl flex flex-col rounded-2xl border shadow-2xl overflow-hidden max-h-[90vh]"
        style={{
          backgroundColor: currentTheme.bgDark || "#18181b",
          borderColor: currentTheme.border || "#3f3f46",
          boxShadow: currentTheme.glow || "0 20px 25px -5px rgba(0, 0, 0, 0.5)"
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 border-b border-white/10"
          style={{ background: currentTheme.gradient || "linear-gradient(to right, #27272a, #18181b)" }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="p-2.5 rounded-xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: currentTheme.primaryDark || "#991b1b", color: "#fff" }}
            >
              <TrendingUp size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-white tracking-wide flex items-center gap-2">
                Gestor de Nível & Multiclasse
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-sans uppercase font-extrabold bg-amber-400 text-black shadow-sm">
                  D&D 5e Oficial
                </span>
              </h2>
              <p className="text-xs text-white/70">
                Adicione classes, combine dados de vida, calcule espaços de magia e valide pré-requisitos canônicos
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
            <span>Ficha atualizada com sucesso para {combinedClassName} (Nível {totalLevel})!</span>
          </div>
        )}

        {/* Abas Superiores */}
        <div className="flex items-center border-b border-white/10 px-4 bg-black/30">
          <button
            type="button"
            onClick={() => setActiveTab("multiclass")}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "multiclass" 
                ? "border-amber-400 text-amber-300 bg-white/[0.04]" 
                : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            <Layers size={15} />
            <span>Classes & Níveis ({classList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("features")}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "features" 
                ? "border-amber-400 text-amber-300 bg-white/[0.04]" 
                : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            <Award size={15} />
            <span>Poderes Desbloqueados ({unlockedFeatures.length})</span>
          </button>
        </div>

        {/* Conteúdo Principal Scrollável */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto max-h-[65vh]">

          {/* Comparativo de Atributos e Estatísticas Canônicas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Nível Global */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <span className="text-[10px] text-white/50 uppercase font-bold block mb-1">Nível Total</span>
              <div className="flex items-center justify-center gap-1.5 font-mono text-base font-bold">
                <span className="text-white/60">Nv {character.level || 1}</span>
                <ChevronRight size={14} className="text-amber-400" />
                <span className="text-lg font-black text-amber-300">Nv {totalLevel}</span>
              </div>
              <span className="text-[9px] text-white/40 block mt-0.5 truncate">{combinedClassName}</span>
            </div>

            {/* Bônus de Proficiência */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <span className="text-[10px] text-white/50 uppercase font-bold block mb-1">Proficiência</span>
              <div className="flex items-center justify-center gap-1.5 font-mono text-base font-bold">
                <span className="text-white/60">+{currentProf}</span>
                <ChevronRight size={14} className="text-amber-400" />
                <span className={`text-lg font-black ${targetProf > currentProf ? "text-amber-300" : "text-white"}`}>
                  +{targetProf}
                </span>
              </div>
              <span className="text-[9px] text-white/40 block mt-0.5">Global para perícias</span>
            </div>

            {/* Dados de Vida Combinados */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <span className="text-[10px] text-white/50 uppercase font-bold block mb-1">Dados de Vida</span>
              <div className="font-mono text-base font-black text-amber-300 truncate" title={combinedHitDice}>
                {combinedHitDice}
              </div>
              <span className="text-[9px] text-white/40 block mt-0.5">Poço combinado</span>
            </div>

            {/* PV Máximos */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
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
          </div>

          {activeTab === "multiclass" && (
            <div className="space-y-4">
              {/* Lista de Classes Atuais */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Sword size={15} />
                    Classes do Personagem ({totalLevel}/20 níveis totais)
                  </span>
                  <span className="text-[11px] text-white/50 font-mono">
                    XP Mínimo: {targetMinXP.toLocaleString("pt-BR")} XP
                  </span>
                </div>

                <div className="space-y-2">
                  {classList.map((cls, idx) => {
                    const hitDie = CLASS_HIT_DICE[cls.className] || "d8";
                    const isPrimary = idx === 0;

                    return (
                      <div 
                        key={cls.className}
                        className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3 transition-all hover:border-white/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center font-bold text-amber-300 text-xs">
                            {hitDie}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-white tracking-wide">
                                {cls.className}
                              </span>
                              {isPrimary && (
                                <span className="text-[9px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold uppercase">
                                  Classe Primária
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-white/50">
                              Dado de Vida: {hitDie} • Nível individual nesta classe
                            </span>
                          </div>
                        </div>

                        {/* Controles de Nível da Classe */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleUpdateClassLevel(cls.className, -1)}
                            disabled={cls.level <= 1}
                            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-20 text-white font-black text-sm flex items-center justify-center transition-all active:scale-95"
                            title="Diminuir nível nesta classe"
                          >
                            -
                          </button>
                          
                          <div className="w-12 text-center">
                            <span className="font-mono font-black text-base text-amber-300">
                              Nv. {cls.level}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleUpdateClassLevel(cls.className, 1)}
                            disabled={totalLevel >= 20}
                            className="w-8 h-8 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 disabled:opacity-20 text-amber-300 border border-amber-500/30 font-black text-sm flex items-center justify-center transition-all active:scale-95"
                            title="Aumentar nível nesta classe"
                          >
                            +
                          </button>

                          {/* Botão de Remover (Apenas para classes secundárias) */}
                          {!isPrimary && (
                            <button
                              type="button"
                              onClick={() => handleRemoveClass(cls.className)}
                              className="p-2 ml-1 rounded-lg text-red-400/70 hover:text-red-300 hover:bg-red-500/20 transition-colors"
                              title="Remover esta classe secundária"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Adicionar Nova Multiclasse com Validação Canônica */}
              {availableClassesToAdd.length > 0 && totalLevel < 20 && (
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Plus size={15} />
                    Adicionar Nova Multiclasse (Livro do Jogador p. 163-167)
                  </span>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <select
                      value={newClassToAdd}
                      onChange={(e) => setNewClassToAdd(e.target.value)}
                      className="flex-1 bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="">Selecione uma classe para ingressar...</option>
                      {availableClassesToAdd.map(cls => (
                        <option key={cls} value={cls}>
                          {cls} ({CLASS_HIT_DICE[cls] || "d8"})
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={handleAddClass}
                      disabled={!newClassToAdd}
                      className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shrink-0"
                    >
                      <Plus size={15} />
                      Ingressar na Classe
                    </button>
                  </div>

                  {/* Detalhes da Classe Selecionada (Pré-requisitos e Proficiências) */}
                  {newClassToAdd && (
                    <div className="p-3 rounded-lg bg-black/40 border border-white/10 space-y-2 text-xs animate-fadeIn">
                      {/* Validação de Pré-requisito de Atributo */}
                      {(() => {
                        const check = checkMulticlassPrerequisites(newClassToAdd, character.stats);
                        return (
                          <div className="flex items-center gap-2">
                            {check.meets ? (
                              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                            ) : (
                              <AlertTriangle size={16} className="text-amber-400 shrink-0" />
                            )}
                            <span className={check.meets ? "text-emerald-300 font-semibold" : "text-amber-300 font-semibold"}>
                              Pré-requisito Canônico: {check.label} {check.meets ? "— ✅ Atributos Atendidos!" : "— ⚠️ Atenção aos atributos!"}
                            </span>
                          </div>
                        );
                      })()}

                      {/* Proficiências Concedidas */}
                      <div className="text-white/70">
                        <span className="font-bold text-amber-200">Proficiências Adquiridas: </span>
                        <span>{MULTICLASS_PROFICIENCIES[newClassToAdd] || "Conforme tabela oficial do PHB"}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "features" && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Award size={16} />
                  Poderes Concedidos por Nível ({unlockedFeatures.length})
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
                <div className="space-y-2 pt-1 max-h-60 overflow-y-auto pr-1">
                  {unlockedFeatures.map((feat, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-amber-200">{feat.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">
                          {feat.sourceClass} • Nv {feat.classLevel}
                        </span>
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed font-serif">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-white/50 italic py-2">
                  Nenhum poder especial catalogado especificamente para estes níveis no banco básico do PHB.
                </p>
              )}
            </div>
          )}

        </div>

        {/* Rodapé / Ações */}
        <div className="p-4 bg-black/50 border-t border-white/10 flex items-center justify-between gap-3">
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
            style={{ backgroundColor: currentTheme.primary || "#f59e0b" }}
          >
            <Check size={16} />
            Aplicar Multiclasse: {combinedClassName} (Nv {totalLevel})
          </button>
        </div>

      </div>
    </div>
  );
}
