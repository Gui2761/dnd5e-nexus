import React, { useState, useMemo } from "react";
import { getAbilityModifier, formatModifier, getProficiencyBonus, ABILITIES, SKILLS } from "../utils/dndCalc";
import { WEAPONS, CLASS_FEATURES_DB, SPELLS_DATABASE } from "../data/compendium";
import { Trash2, Plus, Sparkles, BookOpen, Edit3, Check } from "lucide-react";

// Helper para parser de Habilidades
function parseFeatures(text) {
  if (!text) return [];
  const blocks = text.split(/(?:^|\n)•\s+/).filter(b => b.trim());
  return blocks.map((block, idx) => {
    const lines = block.trim().split("\n");
    const firstLine = lines[0] || "";
    const desc = lines.slice(1).join("\n").trim();
    const match = firstLine.match(/^(.*?)(?:\s*\((.*?)\))?$/);
    return {
      id: "feat-" + idx,
      title: match ? match[1].trim() : firstLine,
      tag: match && match[2] ? match[2].trim() : "",
      desc: desc || ""
    };
  });
}

function serializeFeatures(items) {
  return items.map(f => `• ${f.title}${f.tag ? ` (${f.tag})` : ""}\n${f.desc}`).join("\n\n");
}

// Helper para parser de Equipamento
function parseEquipment(text) {
  if (!text) return [];
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  return lines.map((line, idx) => ({
    id: "eq-" + idx,
    text: line.replace(/^[•\-\*]\s*/, "")
  }));
}

function serializeEquipment(items) {
  return items.map(e => `• ${e.text}`).join("\n");
}

export default function OfficialSheet({
  character,
  setCharacter,
  currentTheme,
  onQuickRoll,
  zoomScale
}) {
  const profBonus = getProficiencyBonus(character.level);
  const [weaponSearchQuery, setWeaponSearchQuery] = useState("");
  const [activeWeaponSearchRowId, setActiveWeaponSearchRowId] = useState(null);
  const [featureSearchQuery, setFeatureSearchQuery] = useState("");
  const [showFeatureDropdown, setShowFeatureDropdown] = useState(false);
  const [isEditingEquipmentText, setIsEditingEquipmentText] = useState(false);
  const [isEditingProficienciesText, setIsEditingProficienciesText] = useState(false);
  const [isEditingFeaturesText, setIsEditingFeaturesText] = useState(false);

  const parsedFeaturesList = useMemo(() => {
    return parseFeatures(character.featuresText);
  }, [character.featuresText]);

  const parsedEquipList = useMemo(() => {
    return parseEquipment(character.equipmentText);
  }, [character.equipmentText]);

  const parsedProfList = useMemo(() => {
    if (!character.otherProficiencies) return [];
    return character.otherProficiencies
      .split("\n\n")
      .map(b => b.trim())
      .filter(Boolean)
      .map((block, idx) => {
        const colonIdx = block.indexOf(":");
        if (colonIdx !== -1) {
          const cat = block.slice(0, colonIdx).trim();
          const items = block.slice(colonIdx + 1).split(/[,;.]/).map(s => s.trim()).filter(Boolean);
          return { id: "cat-" + idx, title: cat, items, raw: block };
        }
        return { id: "cat-" + idx, title: "Geral", items: [block], raw: block };
      });
  }, [character.otherProficiencies]);

  const handleDeleteFeature = (idxToDelete) => {
    const next = parsedFeaturesList.filter((_, idx) => idx !== idxToDelete);
    setCharacter(prev => ({ ...prev, featuresText: serializeFeatures(next) }));
  };

  const handleAddCustomFeature = () => {
    const next = [...parsedFeaturesList, { id: "feat-" + Date.now(), title: "Nova Habilidade", tag: "Personalizada", desc: "Descreva os efeitos e regras desta habilidade." }];
    setCharacter(prev => ({ ...prev, featuresText: serializeFeatures(next) }));
  };

  const handleDeleteEquipItem = (idxToDelete) => {
    const next = parsedEquipList.filter((_, idx) => idx !== idxToDelete);
    setCharacter(prev => ({ ...prev, equipmentText: serializeEquipment(next) }));
  };

  const handleAddEquipItem = () => {
    const next = [...parsedEquipList, { id: "eq-" + Date.now(), text: "Novo Item (1x)" }];
    setCharacter(prev => ({ ...prev, equipmentText: serializeEquipment(next) }));
  };

  // Manipuladores de Atributos
  const handleScoreChange = (abId, val) => {
    const num = parseInt(val, 10);
    setCharacter(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [abId]: isNaN(num) ? 10 : num
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

  const toggleDeathSave = (type, index) => {
    setCharacter(prev => {
      const current = prev.deathSaves[type] || 0;
      const next = current === index ? index - 1 : index;
      return {
        ...prev,
        deathSaves: {
          ...prev.deathSaves,
          [type]: Math.max(0, Math.min(3, next))
        }
      };
    });
  };

  // Sincronização automática de Moedas e Equipamento
  const handleCoinChange = (coinKey, val) => {
    const num = parseInt(val, 10) || 0;
    setCharacter(prev => {
      const newCoins = { ...prev.coins, [coinKey]: num };
      // Atualiza a linha de riquezas no texto de equipamento se existir
      let eqText = prev.equipmentText || "";
      const richesRegex = /(•?\s*Riquezas:?\s*)(.*)/i;
      const richesLine = `• Riquezas: ${newCoins.gp || 0} PO${newCoins.sp ? `, ${newCoins.sp} PP` : ""}${newCoins.cp ? `, ${newCoins.cp} PC` : ""}`;
      
      if (richesRegex.test(eqText)) {
        eqText = eqText.replace(richesRegex, richesLine);
      } else {
        eqText = eqText.trim() + `\n${richesLine}`;
      }

      return {
        ...prev,
        coins: newCoins,
        equipmentText: eqText
      };
    });
  };

  // Manipuladores de Ataques
  const handleAttackChange = (id, field, value) => {
    setCharacter(prev => ({
      ...prev,
      attacks: prev.attacks.map(a => a.id === id ? { ...a, [field]: value } : a)
    }));
  };

  const handleAddAttack = () => {
    setCharacter(prev => ({
      ...prev,
      attacks: [
        ...prev.attacks,
        {
          id: "atk-" + Date.now(),
          name: "Novo Ataque",
          bonus: "+5",
          damage: "1d8 + 3 cortante",
          notes: ""
        }
      ]
    }));
  };

  const handleRemoveAttack = (id) => {
    setCharacter(prev => ({
      ...prev,
      attacks: prev.attacks.filter(a => a.id !== id)
    }));
  };

  const handleSelectWeaponForAttack = (atkId, weapon) => {
    const strMod = getAbilityModifier(character.stats.str);
    const bonusVal = `+${profBonus + strMod}`;
    const damageVal = `${weapon.damage} + ${strMod} ${weapon.damageType}`;
    
    setCharacter(prev => {
      let notes = prev.attackNotes || "";
      if (weapon.properties && !notes.includes(weapon.name)) {
        notes += `\n• ${weapon.name}: ${weapon.properties}`;
      }
      return {
        ...prev,
        attacks: prev.attacks.map(a => a.id === atkId ? {
          ...a,
          name: weapon.name,
          bonus: bonusVal,
          damage: damageVal,
          notes: weapon.properties
        } : a),
        attackNotes: notes.trim()
      };
    });
    setActiveWeaponSearchRowId(null);
  };

  // Inserir Habilidade do Livro no texto de Características
  const handleInsertFeature = (feature) => {
    const textToAppend = `\n\n• ${feature.name} (${feature.className ? feature.className : "Geral"})\n${feature.desc}`;
    setCharacter(prev => ({
      ...prev,
      featuresText: (prev.featuresText || "").trim() + textToAppend
    }));
    setShowFeatureDropdown(false);
    setFeatureSearchQuery("");
  };

  // Percepção Passiva
  const wisMod = getAbilityModifier(character.stats.wis);
  const isPrcProf = character.skillsProficiencies.perception;
  const passivePerception = 10 + wisMod + (isPrcProf ? profBonus : 0);

  // Filtro de armas para autocompletar
  const filteredWeapons = weaponSearchQuery.trim()
    ? WEAPONS.filter(w => w.name.toLowerCase().includes(weaponSearchQuery.toLowerCase())).slice(0, 5)
    : [];

  // Filtro de habilidades para autocompletar
  const allFeatures = [];
  Object.entries(CLASS_FEATURES_DB).forEach(([cls, list]) => {
    list.forEach(item => allFeatures.push({ ...item, className: cls }));
  });
  SPELLS_DATABASE.slice(0, 15).forEach(sp => {
    allFeatures.push({ name: `Magia: ${sp.name}`, desc: `${sp.castingTime} | ${sp.range}\n${sp.desc}`, className: "Magia" });
  });

  const filteredFeatures = featureSearchQuery.trim()
    ? allFeatures.filter(f => f.name.toLowerCase().includes(featureSearchQuery.toLowerCase())).slice(0, 6)
    : [];

  return (
    <div 
      className="official-sheet-wrapper transition-transform duration-200 origin-top"
      style={{
        transform: `scale(${zoomScale})`,
        width: "840px",
        minWidth: "840px",
        margin: "0 auto"
      }}
    >
      <div className="sheet-page shadow-2xl rounded-sm p-6 bg-white text-neutral-900 border border-neutral-400 select-text">
        
        {/* ============================================================ */}
        {/* CABEÇALHO SUPERIOR (DUNGEONS & DRAGONS + NOME + DADOS) */}
        {/* ============================================================ */}
        <div className="flex gap-4 items-stretch mb-2 pb-2 border-b-2 border-neutral-800">
          
          {/* Lado Esquerdo: Logo & Nome do Personagem */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-1">
              <div 
                className="w-7 h-7 rounded-full flex items-center justify-center font-serif font-black text-white text-base shadow"
                style={{ backgroundColor: currentTheme.primaryDark || "#991b1b" }}
              >
                &
              </div>
              <span className="font-serif font-black text-lg tracking-widest text-neutral-900 uppercase">
                DUNGEONS & DRAGONS
              </span>
            </div>

            <div className="border-2 border-neutral-800 rounded-md px-3 py-1 bg-neutral-50 flex flex-col justify-center h-14">
              <input
                type="text"
                value={character.name}
                onChange={(e) => setCharacter({ ...character, name: e.target.value })}
                placeholder="Nome do Personagem"
                className="font-serif font-black text-base sm:text-lg tracking-wide bg-transparent border-none focus:outline-none w-full"
                style={{ color: currentTheme.primaryDark || "#991b1b" }}
              />
              <span className="text-[7.5px] font-extrabold uppercase text-neutral-500 tracking-wider">
                NOME DO PERSONAGEM
              </span>
            </div>
          </div>

          {/* Lado Direito: Quadro de Informações do Personagem (2x3) */}
          <div className="w-[500px] border-2 border-neutral-800 rounded-md p-2 bg-neutral-50 grid grid-cols-3 grid-rows-2 gap-x-3 gap-y-1">
            {/* Classe e Nível */}
            <div className="flex flex-col justify-end border-b border-neutral-400 pb-0.5">
              <input
                type="text"
                value={`${character.className} ${character.level}`}
                onChange={(e) => {
                  const parts = e.target.value.split(" ");
                  const lvl = parseInt(parts[parts.length - 1], 10);
                  if (!isNaN(lvl)) {
                    setCharacter({ ...character, level: lvl, className: parts.slice(0, -1).join(" ") });
                  } else {
                    setCharacter({ ...character, className: e.target.value });
                  }
                }}
                className="text-xs font-bold text-neutral-900 bg-transparent focus:outline-none truncate"
              />
              <span className="text-[7.5px] font-extrabold uppercase text-neutral-500">CLASSE E NÍVEL</span>
            </div>

            {/* Antecedente */}
            <div className="flex flex-col justify-end border-b border-neutral-400 pb-0.5">
              <input
                type="text"
                value={character.background}
                onChange={(e) => setCharacter({ ...character, background: e.target.value })}
                className="text-xs font-bold text-neutral-900 bg-transparent focus:outline-none truncate"
              />
              <span className="text-[7.5px] font-extrabold uppercase text-neutral-500">ANTECEDENTE</span>
            </div>

            {/* Nome do Jogador */}
            <div className="flex flex-col justify-end border-b border-neutral-400 pb-0.5">
              <input
                type="text"
                value={character.playerName}
                onChange={(e) => setCharacter({ ...character, playerName: e.target.value })}
                className="text-xs font-bold text-neutral-900 bg-transparent focus:outline-none truncate"
              />
              <span className="text-[7.5px] font-extrabold uppercase text-neutral-500">NOME DO JOGADOR</span>
            </div>

            {/* Raça */}
            <div className="flex flex-col justify-end border-b border-neutral-400 pb-0.5">
              <input
                type="text"
                value={character.race}
                onChange={(e) => setCharacter({ ...character, race: e.target.value })}
                className="text-xs font-bold text-neutral-900 bg-transparent focus:outline-none truncate"
              />
              <span className="text-[7.5px] font-extrabold uppercase text-neutral-500">RAÇA</span>
            </div>

            {/* Tendência */}
            <div className="flex flex-col justify-end border-b border-neutral-400 pb-0.5">
              <input
                type="text"
                value={character.alignment}
                onChange={(e) => setCharacter({ ...character, alignment: e.target.value })}
                className="text-xs font-bold text-neutral-900 bg-transparent focus:outline-none truncate"
              />
              <span className="text-[7.5px] font-extrabold uppercase text-neutral-500">TENDÊNCIA</span>
            </div>

            {/* Pontos de Experiência */}
            <div className="flex flex-col justify-end border-b border-neutral-400 pb-0.5">
              <input
                type="number"
                value={character.xp}
                onChange={(e) => setCharacter({ ...character, xp: parseInt(e.target.value, 10) || 0 })}
                className="text-xs font-bold text-neutral-900 bg-transparent focus:outline-none truncate font-mono"
              />
              <span className="text-[7.5px] font-extrabold uppercase text-neutral-500">PONTOS DE EXPERIÊNCIA</span>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* CORPO DA FICHA: 3 COLUNAS OFICIAIS COM NÚMEROS RETOS E ALINHADOS */}
        {/* ============================================================ */}
        <div className="grid grid-cols-[246px_260px_260px] gap-3">
          
          {/* ---------------------------------------------------------- */}
          {/* COLUNA 1: ATRIBUTOS, SALVAGUARDAS, PERÍCIAS, PROFICIÊNCIAS */}
          {/* ---------------------------------------------------------- */}
          <div className="flex flex-col gap-2">
            
            <div className="flex gap-2">
              {/* 6 Caixas de Atributos Verticais (Alinhamento Laser) */}
              <div className="w-[66px] flex flex-col gap-1.5">
                {ABILITIES.map(ab => {
                  const score = character.stats[ab.id] || 10;
                  const mod = getAbilityModifier(score);
                  return (
                    <div 
                      key={ab.id}
                      className="border-[1.5px] border-neutral-800 rounded-lg p-1 text-center bg-neutral-50 flex flex-col items-center justify-between h-[68px]"
                    >
                      <span className="text-[7px] font-black uppercase tracking-wider text-neutral-700">
                        {ab.name}
                      </span>
                      
                      {/* Modificador Centralizado Reto */}
                      <button 
                        onClick={() => onQuickRoll(`Teste de ${ab.name}`, 20, mod)}
                        className="text-xl font-black font-mono leading-none my-0.5 hover:text-amber-600 transition-colors w-full text-center"
                        title="Clique para rolar teste"
                      >
                        {formatModifier(mod)}
                      </button>

                      {/* Bolha Oval do Valor Base */}
                      <div className="border border-neutral-700 rounded-full px-1 py-0.5 bg-white w-10 flex items-center justify-center">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={score}
                          onChange={(e) => handleScoreChange(ab.id, e.target.value)}
                          className="w-full text-center font-bold text-[11px] leading-none bg-transparent border-none p-0 outline-none font-mono"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coluna Direita dos Atributos: Inspiração, Proficiência, Salvaguardas, Perícias */}
              <div className="flex-1 flex flex-col gap-1.5">
                
                {/* Inspiração */}
                <div 
                  onClick={() => setCharacter({ ...character, inspiration: !character.inspiration })}
                  className="border-[1.5px] border-neutral-800 rounded-md px-2 py-1 flex items-center gap-2 bg-neutral-50 cursor-pointer h-7 select-none"
                >
                  <div className={`w-4 h-4 rounded-full border border-neutral-800 flex items-center justify-center ${character.inspiration ? "bg-neutral-900" : "bg-white"}`}>
                    {character.inspiration && <span className="text-white text-[9px]">●</span>}
                  </div>
                  <span className="text-[7.5px] font-extrabold uppercase text-neutral-600">INSPIRAÇÃO</span>
                </div>

                {/* Bônus de Proficiência */}
                <div className="border-[1.5px] border-neutral-800 rounded-md px-2 py-1 flex items-center gap-2 bg-neutral-50 h-7">
                  <input
                    type="text"
                    value={character.profBonusOverride !== undefined ? character.profBonusOverride : `+${profBonus}`}
                    onChange={(e) => {
                      const val = parseInt(e.target.value.replace("+", ""), 10);
                      setCharacter({ ...character, profBonusOverride: isNaN(val) ? e.target.value : val });
                    }}
                    className="w-7 h-5 rounded-full border border-neutral-800 text-center font-bold text-xs bg-white font-mono focus:outline-none"
                    title="Bônus de Proficiência (editável)"
                  />
                  <span className="text-[7.5px] font-extrabold uppercase text-neutral-600">BÔNUS DE PROFICIÊNCIA</span>
                </div>

                {/* Testes de Resistência (Grade com Alinhamento Perfeito) */}
                <div className="border-[1.5px] border-neutral-800 rounded-lg p-1.5 bg-neutral-50">
                  <div className="space-y-0.5">
                    {ABILITIES.map(ab => {
                      const mod = getAbilityModifier(character.stats[ab.id]);
                      const isProf = character.savingProficiencies[ab.id];
                      const total = mod + (isProf ? profBonus : 0);
                      return (
                        <div key={ab.id} className="grid grid-cols-[12px_22px_1fr] items-center gap-1 text-[9px] leading-tight">
                          <button
                            onClick={() => toggleSavingProf(ab.id)}
                            className={`w-2.5 h-2.5 rounded-full border border-neutral-800 flex items-center justify-center transition-colors ${
                              isProf ? "bg-neutral-900" : "bg-white"
                            }`}
                          />
                          <span 
                            onClick={() => onQuickRoll(`Salvaguarda de ${ab.name}`, 20, total)}
                            className="w-full text-center font-bold border-b border-neutral-300 font-mono cursor-pointer hover:text-amber-600"
                          >
                            {formatModifier(total)}
                          </span>
                          <span className={`truncate pl-0.5 ${isProf ? "font-bold text-neutral-950" : "text-neutral-700"}`}>
                            {ab.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-[7px] font-extrabold uppercase text-center text-neutral-500 border-t border-neutral-300 mt-1 pt-0.5 tracking-wider">
                    TESTES DE RESISTÊNCIA
                  </div>
                </div>

                {/* Perícias (Grade com Alinhamento Perfeito) */}
                <div className="border-[1.5px] border-neutral-800 rounded-lg p-1.5 bg-neutral-50">
                  <div className="space-y-0.5">
                    {SKILLS.map(sk => {
                      const statMod = getAbilityModifier(character.stats[sk.stat]);
                      const isProf = character.skillsProficiencies[sk.id];
                      const total = statMod + (isProf ? profBonus : 0);
                      const statShort = ABILITIES.find(a => a.id === sk.stat)?.name.slice(0, 3);
                      return (
                        <div key={sk.id} className="grid grid-cols-[12px_22px_1fr] items-center gap-1 text-[8.5px] leading-tight">
                          <button
                            onClick={() => toggleSkillProf(sk.id)}
                            className={`w-2.5 h-2.5 rounded-full border border-neutral-800 flex items-center justify-center transition-colors ${
                              isProf ? "bg-neutral-900" : "bg-white"
                            }`}
                          />
                          <span 
                            onClick={() => onQuickRoll(`Perícia ${sk.name}`, 20, total)}
                            className="w-full text-center font-bold border-b border-neutral-300 font-mono cursor-pointer hover:text-amber-600"
                          >
                            {formatModifier(total)}
                          </span>
                          <span className={`truncate pl-0.5 ${isProf ? "font-bold text-neutral-950" : "text-neutral-700"}`}>
                            {sk.name} <span className="text-[6.5px] text-neutral-400 font-normal">({statShort})</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-[7px] font-extrabold uppercase text-center text-neutral-500 border-t border-neutral-300 mt-1 pt-0.5 tracking-wider">
                    PERÍCIAS
                  </div>
                </div>

              </div>
            </div>

            {/* Sabedoria Passiva (Percepção) */}
            <div className="border-[1.5px] border-neutral-800 rounded-md p-1 px-2 flex items-center gap-2 bg-neutral-50 h-7">
              <input
                type="text"
                value={character.passivePerceptionOverride !== undefined ? character.passivePerceptionOverride : passivePerception}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setCharacter({ ...character, passivePerceptionOverride: isNaN(val) ? e.target.value : val });
                }}
                className="w-6 h-5 rounded border border-neutral-800 text-center font-bold text-xs bg-white font-mono focus:outline-none"
                title="Sabedoria Passiva (editável)"
              />
              <span className="text-[7.5px] font-extrabold uppercase text-neutral-600">
                SABEDORIA PASSIVA (PERCEPÇÃO)
              </span>
            </div>

            {/* Idiomas e Outras Proficiências */}
            <div className="border-[1.5px] border-neutral-800 rounded-lg p-2 bg-neutral-50 flex flex-col justify-between h-auto min-h-[140px]">
              <div className="space-y-1.5 mb-1 text-left">
                {isEditingProficienciesText ? (
                  <textarea
                    value={character.otherProficiencies}
                    onChange={(e) => setCharacter({ ...character, otherProficiencies: e.target.value })}
                    rows={6}
                    className="w-full text-[8px] leading-relaxed bg-white p-1.5 rounded border border-neutral-300 focus:outline-none font-sans"
                  />
                ) : (
                  <div className="space-y-1.5">
                    {parsedProfList.map((cat) => (
                      <div key={cat.id} className="p-1 rounded bg-white border border-neutral-200 shadow-sm">
                        <span className="text-[6.5px] font-black uppercase text-amber-800 tracking-wider block mb-0.5">
                          {cat.title}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {cat.items.map((it, i) => (
                            <span 
                              key={i} 
                              className="text-[7px] font-semibold bg-neutral-100 text-neutral-800 px-1.5 py-0.2 rounded border border-neutral-300"
                            >
                              {it}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-neutral-300 pt-0.5 mt-1">
                <button
                  type="button"
                  onClick={() => setIsEditingProficienciesText(!isEditingProficienciesText)}
                  className="text-[7px] text-amber-700 hover:underline font-bold flex items-center gap-0.5"
                >
                  <Edit3 size={8} /> {isEditingProficienciesText ? "Ver Banners" : "Editar"}
                </button>
                <span className="text-[7px] font-extrabold uppercase text-neutral-500 tracking-wider">
                  IDIOMAS E PROFICIÊNCIAS
                </span>
              </div>
            </div>

          </div>

          {/* ---------------------------------------------------------- */}
          {/* COLUNA 2: COMBATE, PONTOS DE VIDA, ATAQUES, EQUIPAMENTO */}
          {/* ---------------------------------------------------------- */}
          <div className="flex flex-col gap-2">
            
            {/* Topo Combate: CA, Iniciativa, Deslocamento */}
            <div className="grid grid-cols-3 gap-1.5">
              {/* Classe de Armadura */}
              <div className="border-2 border-neutral-800 rounded-lg p-1 bg-neutral-50 text-center flex flex-col items-center justify-center h-14">
                <input
                  type="text"
                  inputMode="numeric"
                  value={character.armorClass}
                  onChange={(e) => setCharacter({ ...character, armorClass: parseInt(e.target.value, 10) || 10 })}
                  className="font-black text-xl text-center bg-transparent w-full focus:outline-none leading-none font-mono"
                />
                <span className="text-[6.5px] font-extrabold uppercase text-neutral-600 tracking-wider">
                  CLASSE DE ARMADURA
                </span>
              </div>

              {/* Iniciativa */}
              <div className="border-[1.5px] border-neutral-800 rounded-lg p-1 bg-neutral-50 text-center flex flex-col items-center justify-center h-14">
                <div className="flex items-center justify-center gap-0.5">
                  <input
                    type="text"
                    value={character.initiativeBonus !== undefined ? character.initiativeBonus : formatModifier(getAbilityModifier(character.stats.dex))}
                    onChange={(e) => {
                      const raw = e.target.value;
                      const val = parseInt(raw.replace("+", ""), 10);
                      setCharacter({ ...character, initiativeBonus: isNaN(val) ? raw : val });
                    }}
                    className="font-black text-xl text-center bg-transparent w-10 focus:outline-none leading-none font-mono"
                    title="Bônus de Iniciativa (editável)"
                  />
                  <button
                    type="button"
                    onClick={() => onQuickRoll("Iniciativa", 20, parseInt(character.initiativeBonus, 10) || getAbilityModifier(character.stats.dex))}
                    className="text-xs hover:scale-125 transition-transform text-neutral-400 hover:text-amber-600 select-none cursor-pointer"
                    title="Rolar Teste de Iniciativa (d20)"
                  >
                    🎲
                  </button>
                </div>
                <span className="text-[6.5px] font-extrabold uppercase text-neutral-600 tracking-wider">
                  INICIATIVA
                </span>
              </div>

              {/* Deslocamento */}
              <div className="border-[1.5px] border-neutral-800 rounded-lg p-1 bg-neutral-50 text-center flex flex-col items-center justify-center h-14">
                <input
                  type="text"
                  value={character.speed}
                  onChange={(e) => setCharacter({ ...character, speed: e.target.value })}
                  className="font-black text-base text-center bg-transparent w-full focus:outline-none leading-none"
                />
                <span className="text-[6.5px] font-extrabold uppercase text-neutral-600 tracking-wider">
                  DESLOCAMENTO
                </span>
              </div>
            </div>

            {/* Pontos de Vida Atuais */}
            <div className="border-[1.5px] border-neutral-800 rounded-lg p-1.5 bg-neutral-50 flex flex-col">
              <div className="flex justify-end items-center gap-1 text-[8px] text-neutral-600 border-b border-neutral-300 pb-0.5">
                <span>Pontos de Vida Máximos:</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={character.hpMax}
                  onChange={(e) => setCharacter({ ...character, hpMax: parseInt(e.target.value, 10) || 1 })}
                  className="w-8 font-bold text-neutral-900 bg-transparent text-right focus:outline-none font-mono"
                />
              </div>
              <div className="flex items-center justify-center gap-2 py-1">
                <button 
                  type="button"
                  onClick={() => setCharacter(p => ({ ...p, hpCurrent: Math.max(0, p.hpCurrent - 1) }))}
                  className="w-5 h-5 rounded-full bg-red-100 hover:bg-red-200 text-red-700 text-xs font-black flex items-center justify-center transition-all select-none shadow-sm"
                  title="-1 PV"
                >
                  -
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  value={character.hpCurrent}
                  onChange={(e) => setCharacter({ ...character, hpCurrent: parseInt(e.target.value, 10) || 0 })}
                  className="font-black text-3xl text-center text-emerald-800 bg-transparent focus:outline-none font-mono w-14"
                />
                <button 
                  type="button"
                  onClick={() => setCharacter(p => ({ ...p, hpCurrent: Math.min(p.hpMax, p.hpCurrent + 1) }))}
                  className="w-5 h-5 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-xs font-black flex items-center justify-center transition-all select-none shadow-sm"
                  title="+1 PV"
                >
                  +
                </button>
              </div>
              <span className="text-[7.5px] font-extrabold uppercase text-center text-neutral-500 tracking-wider">
                PONTOS DE VIDA ATUAIS
              </span>
            </div>

            {/* Pontos de Vida Temporários */}
            <div className="border-[1.5px] border-neutral-800 rounded-lg p-1 bg-neutral-50 text-center">
              <input
                type="text"
                inputMode="numeric"
                value={character.hpTemp || ""}
                placeholder="—"
                onChange={(e) => setCharacter({ ...character, hpTemp: parseInt(e.target.value, 10) || 0 })}
                className="font-bold text-sm text-center py-0.5 bg-transparent w-full focus:outline-none font-mono"
              />
              <span className="text-[7.5px] font-extrabold uppercase text-neutral-500 tracking-wider">
                PONTOS DE VIDA TEMPORÁRIOS
              </span>
            </div>

            {/* Dados de Vida & Testes Contra a Morte */}
            <div className="grid grid-cols-2 gap-1.5">
              {/* Dados de Vida */}
              <div className="border-[1.5px] border-neutral-800 rounded-lg p-1.5 bg-neutral-50 flex flex-col justify-between h-16">
                <div className="flex justify-between items-center text-[7.5px] text-neutral-500 border-b border-neutral-300 pb-0.5">
                  <span>Total:</span>
                  <input
                    type="text"
                    value={character.hitDiceTotal}
                    onChange={(e) => setCharacter({ ...character, hitDiceTotal: e.target.value })}
                    className="w-12 text-right font-bold text-neutral-800 bg-transparent focus:outline-none font-mono"
                  />
                </div>
                <input
                  type="text"
                  value={character.hitDiceCurrent}
                  onChange={(e) => setCharacter({ ...character, hitDiceCurrent: e.target.value })}
                  className="font-black text-base text-center py-0.5 bg-transparent focus:outline-none font-mono"
                />
                <span className="text-[7px] font-extrabold uppercase text-center text-neutral-500 tracking-wider">
                  DADOS DE VIDA
                </span>
              </div>

              {/* Testes Contra a Morte */}
              <div className="border-[1.5px] border-neutral-800 rounded-lg p-1.5 bg-neutral-50 flex flex-col justify-between h-16">
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between text-[7.5px] font-bold text-neutral-700">
                    <span>Sucessos</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(n => (
                        <button
                          key={n}
                          onClick={() => toggleDeathSave("successes", n)}
                          className={`w-2.5 h-2.5 rounded-full border border-neutral-800 ${
                            character.deathSaves.successes >= n ? "bg-neutral-900" : "bg-white"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[7.5px] font-bold text-neutral-700">
                    <span>Falhas</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(n => (
                        <button
                          key={n}
                          onClick={() => toggleDeathSave("failures", n)}
                          className={`w-2.5 h-2.5 rounded-full border border-neutral-800 ${
                            character.deathSaves.failures >= n ? "bg-neutral-900" : "bg-white"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-[7px] font-extrabold uppercase text-center text-neutral-500 tracking-wider">
                  TESTES CONTRA A MORTE
                </span>
              </div>
            </div>

            {/* Tabela de Ataques e Magias com Banners Estilizados */}
            <div className="border-[1.5px] border-neutral-800 rounded-lg p-2 bg-neutral-50 flex flex-col justify-between h-auto min-h-[185px] overflow-visible relative">
              <div className="w-full min-w-0">
                {/* Autocomplete de Armas do Livro */}
                {activeWeaponSearchRowId && filteredWeapons.length > 0 && (
                  <div className="absolute left-2 right-2 top-10 bg-neutral-900 text-white rounded-xl shadow-2xl border border-amber-400 z-30 p-1.5 text-[8px] max-h-44 overflow-y-auto">
                    <span className="text-[6.5px] text-amber-300 font-bold block mb-1 uppercase tracking-wider">
                      Sugestões do Livro de Regras:
                    </span>
                    {filteredWeapons.map((wpn, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectWeaponForAttack(activeWeaponSearchRowId, wpn)}
                        className="p-1 hover:bg-neutral-800 cursor-pointer rounded flex justify-between items-center"
                      >
                        <span className="font-bold text-amber-200">{wpn.name}</span>
                        <span className="text-red-300 font-mono">{wpn.damage} {wpn.damageType}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Lista de Banners de Ataque */}
                <div className="space-y-1.5 mb-2 w-full min-w-0">
                  {character.attacks.map(atk => {
                    const isAxe = atk.name.toLowerCase().includes("machado");
                    const isRanged = atk.name.toLowerCase().includes("azagaia") || atk.name.toLowerCase().includes("arco");
                    const isSword = atk.name.toLowerCase().includes("espada") || atk.name.toLowerCase().includes("lâmina");

                    return (
                      <div 
                        key={atk.id}
                        className="rounded-lg border border-neutral-300 bg-gradient-to-r from-red-50/70 via-white to-amber-50/50 p-1.5 shadow-sm hover:border-red-400 transition-all w-full min-w-0 box-border text-left"
                      >
                        {/* Linha Superior: Ícone, Nome e Excluir */}
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <div className="flex items-center gap-1.5 min-w-0 flex-1">
                            <span className="text-[10px] select-none">
                              {isAxe ? "🪓" : isRanged ? "🎯" : isSword ? "⚔️" : "🗡️"}
                            </span>
                            <input
                              type="text"
                              value={atk.name}
                              onChange={(e) => {
                                handleAttackChange(atk.id, "name", e.target.value);
                                setWeaponSearchQuery(e.target.value);
                                setActiveWeaponSearchRowId(atk.id);
                              }}
                              onFocus={() => {
                                setWeaponSearchQuery(atk.name);
                                setActiveWeaponSearchRowId(atk.id);
                              }}
                              className="font-serif font-black text-[9px] text-neutral-900 bg-transparent focus:outline-none w-full truncate"
                              placeholder="Nome da Arma"
                            />
                          </div>

                          <button
                            onClick={() => handleRemoveAttack(atk.id)}
                            className="text-neutral-400 hover:text-red-600 transition-colors p-0.5"
                            title="Excluir este ataque"
                          >
                            <Trash2 size={9} />
                          </button>
                        </div>

                        {/* Linha Inferior: Bônus de Ataque Editável + Rolador & Dano Editável + Rolador */}
                        <div className="flex items-center gap-1.5 text-[7.5px]">
                          {/* Bônus de Ataque com Rolador d20 */}
                          <div className="flex items-center bg-red-100/90 border border-red-300 rounded px-1 py-0.5 shadow-xs">
                            <button
                              type="button"
                              onClick={() => onQuickRoll(`Ataque com ${atk.name || "Arma"}`, 20, parseInt(atk.bonus, 10) || 0)}
                              className="text-[9px] hover:scale-125 transition-transform mr-1 text-red-900 select-none cursor-pointer"
                              title="Rolar d20 + Bônus de Ataque"
                            >
                              🎲
                            </button>
                            <input
                              type="text"
                              value={atk.bonus || ""}
                              onChange={(e) => handleAttackChange(atk.id, "bonus", e.target.value)}
                              className="w-7 font-black font-mono text-[8px] bg-transparent text-red-950 focus:outline-none text-center"
                              placeholder="+0"
                              title="Bônus de Ataque (ex: +7)"
                            />
                            <span className="text-[6.5px] uppercase font-bold text-red-800 ml-0.5 select-none">Atq</span>
                          </div>

                          {/* Dano Editável com Rolador de Dados */}
                          <div className="flex-1 min-w-0 flex items-center bg-white border border-neutral-300 rounded px-1.5 py-0.5 shadow-xs">
                            <button
                              type="button"
                              onClick={() => onQuickRoll(`Dano de ${atk.name || "Arma"}`, 8, 0, atk.damage)}
                              className="text-[9px] hover:scale-125 transition-transform mr-1.5 text-amber-700 select-none cursor-pointer"
                              title="Rolar dados de dano da arma"
                            >
                              💥
                            </button>
                            <input
                              type="text"
                              value={atk.damage || ""}
                              onChange={(e) => handleAttackChange(atk.id, "damage", e.target.value)}
                              className="w-full font-bold text-neutral-800 bg-transparent focus:outline-none font-mono text-[7.5px] truncate"
                              placeholder="Dano / Tipo (ex: 1d12 + 5 cortante)"
                              title="Fórmula do Dado de Dano e Tipo"
                            />
                          </div>
                        </div>

                        {/* Propriedades / Notas Editáveis */}
                        <div className="mt-1 flex items-center gap-1 bg-black/5 rounded px-1 py-0.5">
                          <span className="text-[6.5px] text-neutral-500 font-bold uppercase select-none">Obs:</span>
                          <input
                            type="text"
                            value={atk.notes || ""}
                            onChange={(e) => handleAttackChange(atk.id, "notes", e.target.value)}
                            className="w-full text-[7px] text-neutral-700 bg-transparent italic focus:outline-none truncate"
                            placeholder="Propriedades da arma (ex: Pesada, duas mãos, alcance)"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bloco de Anotações de Combate sem Scrollbar */}
                {character.attackNotes && (
                  <div className="mt-1 p-1.5 bg-white border border-neutral-300 rounded text-[7px] text-neutral-700 leading-snug space-y-0.5 text-left">
                    {character.attackNotes.split("\n").filter(Boolean).map((line, i) => (
                      <div key={i} className="flex items-start gap-1">
                        <span className="text-amber-600 text-[8px] leading-none">⚡</span>
                        <span className="flex-1">{line.replace(/^[•\-\*]\s*/, "")}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-neutral-300 pt-0.5 mt-1">
                <button
                  onClick={handleAddAttack}
                  className="text-[7.5px] text-amber-700 hover:underline font-bold flex items-center gap-0.5"
                >
                  <Plus size={9} /> Adicionar Ataque
                </button>
                <span className="text-[7.5px] font-extrabold uppercase text-neutral-500 tracking-wider">
                  ATAQUES E MAGIAS
                </span>
              </div>
            </div>

            {/* Equipamento & Moedas (Sincronizado & Banners Perfeitos) */}
            <div className="border-[1.5px] border-neutral-800 rounded-lg p-2 bg-neutral-50 flex flex-col justify-between h-auto min-h-[170px] overflow-hidden">
              <div className="flex gap-1.5 w-full min-w-0 overflow-hidden">
                {/* Coluna de Moedas */}
                <div className="w-9 flex-shrink-0 flex flex-col gap-1">
                  {[
                    { key: "cp", label: "PC" },
                    { key: "sp", label: "PP" },
                    { key: "ep", label: "PE" },
                    { key: "gp", label: "PO" },
                    { key: "pp", label: "PL" }
                  ].map(coin => (
                    <div key={coin.key} className="border border-neutral-700 rounded p-0.5 text-center bg-white">
                      <span className="text-[6px] font-extrabold text-neutral-500 block leading-none">{coin.label}</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={character.coins[coin.key] !== undefined && character.coins[coin.key] !== 0 ? character.coins[coin.key] : (character.coins[coin.key] === 0 ? "0" : "")}
                        placeholder="-"
                        onChange={(e) => handleCoinChange(coin.key, e.target.value)}
                        className="w-full text-center font-bold text-[9px] leading-none bg-transparent focus:outline-none font-mono"
                      />
                    </div>
                  ))}
                </div>

                {/* Lista de Equipamentos em Banners Sem Vazamentos */}
                <div className="flex-1 min-w-0 overflow-hidden flex flex-col justify-between">
                  {isEditingEquipmentText ? (
                    <textarea
                      value={character.equipmentText}
                      onChange={(e) => setCharacter({ ...character, equipmentText: e.target.value })}
                      rows={8}
                      className="w-full text-[8px] leading-relaxed bg-white p-1 rounded border border-neutral-300 focus:outline-none font-sans"
                    />
                  ) : (
                    <div className="space-y-1 mb-1 text-left w-full min-w-0 overflow-hidden">
                      {parsedEquipList.map((item, idx) => {
                        const t = item.text.toLowerCase();
                        const isRiches = t.includes("riqueza") || t.includes("po");
                        const isArmor = t.includes("armadura") || t.includes("malha") || t.includes("escudo");
                        const isWeapon = t.includes("machado") || t.includes("espada") || t.includes("azagaia") || t.includes("arco");
                        const isHoly = t.includes("símbolo") || t.includes("amuleto");

                        return (
                          <div 
                            key={item.id || idx}
                            className={`flex items-center justify-between gap-1 p-1 rounded border text-[7.5px] leading-tight text-neutral-800 transition-all w-full min-w-0 overflow-hidden box-border ${
                              isRiches ? "bg-amber-100/70 border-amber-300 font-bold" :
                              isArmor ? "bg-slate-100 border-slate-300 font-semibold" :
                              isWeapon ? "bg-red-50/70 border-red-200" :
                              isHoly ? "bg-yellow-50/80 border-yellow-200" :
                              "bg-white border-neutral-200"
                            }`}
                          >
                            <div className="flex items-center gap-1 min-w-0 flex-1 overflow-hidden">
                              <span className="text-[8.5px] flex-shrink-0 select-none">
                                {isRiches ? "🪙" : isArmor ? "🛡️" : isWeapon ? "⚔️" : isHoly ? "☀️" : "🎒"}
                              </span>
                              <span className="truncate flex-1 min-w-0 text-[7px] font-medium">{item.text}</span>
                            </div>
                            {!isRiches && (
                              <button
                                type="button"
                                onClick={() => handleDeleteEquipItem(idx)}
                                className="text-neutral-400 hover:text-red-600 transition-colors p-0.5 flex-shrink-0"
                                title="Remover item"
                              >
                                <Trash2 size={8} />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-neutral-200 pt-1 mt-1">
                    <button
                      type="button"
                      onClick={handleAddEquipItem}
                      className="text-[7px] text-amber-700 hover:underline font-bold flex items-center gap-0.5"
                    >
                      <Plus size={8} /> Adicionar Item
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingEquipmentText(!isEditingEquipmentText)}
                      className="text-[7px] text-neutral-500 hover:text-neutral-800 flex items-center gap-0.5"
                    >
                      <Edit3 size={8} /> {isEditingEquipmentText ? "Ver Banners" : "Texto"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-[7.5px] font-extrabold uppercase text-center text-neutral-500 border-t border-neutral-300 pt-0.5 tracking-wider mt-1">
                EQUIPAMENTO
              </div>
            </div>

          </div>

          {/* ---------------------------------------------------------- */}
          {/* COLUNA 3: ROLEPLAY, PERSONALIDADE, CARACTERÍSTICAS */}
          {/* ---------------------------------------------------------- */}
          <div className="flex flex-col gap-2">
            
            {/* Traços de Personalidade */}
            <div className="border-[1.5px] border-neutral-800 rounded-lg p-2 bg-neutral-50 min-h-[62px] flex flex-col justify-between">
              <textarea
                value={character.personality.traits}
                onChange={(e) => setCharacter({
                  ...character,
                  personality: { ...character.personality, traits: e.target.value }
                })}
                rows={2}
                className="w-full text-[8px] italic leading-tight bg-transparent border-none focus:outline-none resize-none"
              />
              <span className="text-[7px] font-extrabold uppercase text-center text-neutral-500 border-t border-neutral-300 pt-0.5 tracking-wider">
                TRAÇOS DE PERSONALIDADE
              </span>
            </div>

            {/* Ideais */}
            <div className="border-[1.5px] border-neutral-800 rounded-lg p-2 bg-neutral-50 min-h-[62px] flex flex-col justify-between">
              <textarea
                value={character.personality.ideals}
                onChange={(e) => setCharacter({
                  ...character,
                  personality: { ...character.personality, ideals: e.target.value }
                })}
                rows={2}
                className="w-full text-[8px] italic leading-tight bg-transparent border-none focus:outline-none resize-none"
              />
              <span className="text-[7px] font-extrabold uppercase text-center text-neutral-500 border-t border-neutral-300 pt-0.5 tracking-wider">
                IDEAIS
              </span>
            </div>

            {/* Vínculos */}
            <div className="border-[1.5px] border-neutral-800 rounded-lg p-2 bg-neutral-50 min-h-[62px] flex flex-col justify-between">
              <textarea
                value={character.personality.bonds}
                onChange={(e) => setCharacter({
                  ...character,
                  personality: { ...character.personality, bonds: e.target.value }
                })}
                rows={2}
                className="w-full text-[8px] italic leading-tight bg-transparent border-none focus:outline-none resize-none"
              />
              <span className="text-[7px] font-extrabold uppercase text-center text-neutral-500 border-t border-neutral-300 pt-0.5 tracking-wider">
                VÍNCULOS
              </span>
            </div>

            {/* Defeitos */}
            <div className="border-[1.5px] border-neutral-800 rounded-lg p-2 bg-neutral-50 min-h-[62px] flex flex-col justify-between">
              <textarea
                value={character.personality.flaws}
                onChange={(e) => setCharacter({
                  ...character,
                  personality: { ...character.personality, flaws: e.target.value }
                })}
                rows={2}
                className="w-full text-[8px] italic leading-tight bg-transparent border-none focus:outline-none resize-none"
              />
              <span className="text-[7px] font-extrabold uppercase text-center text-neutral-500 border-t border-neutral-300 pt-0.5 tracking-wider">
                DEFEITOS
              </span>
            </div>

            {/* Características e Habilidades com Busca do Livro */}
            <div className="border-[1.5px] border-neutral-800 rounded-lg p-2 bg-neutral-50 flex flex-col justify-between h-auto min-h-[300px] overflow-visible relative">
              {/* Barra de Busca de Regras para Inserção Instantânea */}
              <div className="mb-1.5 relative">
                <div className="flex items-center gap-1 bg-white border border-neutral-300 rounded px-1.5 py-0.5">
                  <Sparkles size={11} className="text-amber-600" />
                  <input
                    type="text"
                    placeholder="Digitar poder/magia do livro (ex: Destruição Divina, Fúria)..."
                    value={featureSearchQuery}
                    onChange={(e) => {
                      setFeatureSearchQuery(e.target.value);
                      setShowFeatureDropdown(true);
                    }}
                    onFocus={() => setShowFeatureDropdown(true)}
                    className="w-full text-[7.5px] bg-transparent border-none focus:outline-none text-neutral-900 placeholder-neutral-400"
                  />
                </div>

                {showFeatureDropdown && filteredFeatures.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-neutral-900 text-white rounded-md shadow-2xl border border-amber-400 z-30 p-1 text-[8px] max-h-48 overflow-y-auto">
                    <span className="text-[7px] text-amber-300 font-bold block mb-1 uppercase">Clique para Inserir na Ficha:</span>
                    {filteredFeatures.map((f, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleInsertFeature(f)}
                        className="p-1.5 hover:bg-neutral-800 cursor-pointer rounded border-b border-white/5 last:border-none"
                      >
                        <div className="font-bold text-amber-200">{f.name}</div>
                        <div className="text-[7px] text-neutral-400 line-clamp-1">{f.desc}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {isEditingFeaturesText ? (
                <textarea
                  value={character.featuresText}
                  onChange={(e) => setCharacter({ ...character, featuresText: e.target.value })}
                  rows={14}
                  className="w-full text-[8px] leading-relaxed bg-white p-1.5 rounded border border-neutral-300 focus:outline-none font-sans mb-1"
                />
              ) : (
                <div className="space-y-1.5 mb-2 text-left">
                  {parsedFeaturesList.map((f, idx) => (
                    <div 
                      key={f.id || idx}
                      className="rounded-lg border border-neutral-300 bg-gradient-to-r from-amber-50/80 to-white p-1.5 shadow-sm hover:border-amber-400 transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-neutral-200/80 pb-0.5 mb-1">
                        <div className="flex items-center gap-1">
                          <span className="text-[9px]">✨</span>
                          <span className="font-serif font-black text-[8.5px] text-neutral-900 tracking-wide">
                            {f.title}
                          </span>
                          {f.tag && (
                            <span className="text-[6.5px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider bg-amber-200/70 text-amber-950 border border-amber-300/80">
                              {f.tag}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteFeature(idx)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-0.5"
                          title="Excluir habilidade"
                        >
                          <Trash2 size={9} />
                        </button>
                      </div>
                      <p className="text-[7.5px] leading-relaxed text-neutral-700 whitespace-pre-line font-sans">
                        {f.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between border-t border-neutral-300 pt-1 mt-1">
                <button
                  type="button"
                  onClick={handleAddCustomFeature}
                  className="text-[7.5px] text-amber-700 hover:underline font-bold flex items-center gap-0.5"
                >
                  <Plus size={9} /> Nova Habilidade
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingFeaturesText(!isEditingFeaturesText)}
                  className="text-[7px] text-neutral-500 hover:text-neutral-800 flex items-center gap-0.5"
                >
                  <Edit3 size={8} /> {isEditingFeaturesText ? "Ver Banners" : "Texto Livre"}
                </button>
              </div>

              <div className="text-[7.5px] font-extrabold uppercase text-center text-neutral-500 border-t border-neutral-300 pt-0.5 mt-1 tracking-wider">
                CARACTERÍSTICAS E HABILIDADES
              </div>
            </div>

          </div>

        </div>

        {/* Rodapé Oficial Wizards of the Coast */}
        <div className="mt-3 pt-1 border-t border-neutral-300 text-center text-[7px] text-neutral-400">
          TM & © 2014 Wizards of the Coast LLC. Ficha de Personagem Oficial D&D 5ª Edição adaptada para português. Permissão concedida para fotocopiar e imprimir para uso pessoal.
        </div>

      </div>
    </div>
  );
}
