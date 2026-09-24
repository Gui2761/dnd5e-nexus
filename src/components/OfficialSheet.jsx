import React from "react";
import { getAbilityModifier, formatModifier, getProficiencyBonus, ABILITIES, SKILLS } from "../utils/dndCalc";

export default function OfficialSheet({
  character,
  setCharacter,
  currentTheme,
  onQuickRoll,
  zoomScale
}) {
  const profBonus = getProficiencyBonus(character.level);

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
          damage: "1d8+3",
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

  // Cálculo de Percepção Passiva
  const wisMod = getAbilityModifier(character.stats.wis);
  const isPrcProf = character.skillsProficiencies.perception;
  const passivePerception = 10 + wisMod + (isPrcProf ? profBonus : 0);

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
        <div className="flex gap-4 items-stretch mb-3 pb-2 border-b-2 border-neutral-800">
          
          {/* Lado Esquerdo: Logo & Nome do Personagem */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-1">
              {/* Ampersand estilizado do D&D */}
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
                className="text-xs font-bold text-neutral-900 bg-transparent focus:outline-none truncate"
              />
              <span className="text-[7.5px] font-extrabold uppercase text-neutral-500">PONTOS DE EXPERIÊNCIA</span>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* CORPO DA FICHA: 3 COLUNAS OFICIAIS */}
        {/* ============================================================ */}
        <div className="grid grid-cols-[246px_260px_260px] gap-3">
          
          {/* ---------------------------------------------------------- */}
          {/* COLUNA 1: ATRIBUTOS, SALVAGUARDAS, PERÍCIAS, PROFICIÊNCIAS */}
          {/* ---------------------------------------------------------- */}
          <div className="flex flex-col gap-2">
            
            <div className="flex gap-2">
              {/* 6 Caixas de Atributos Verticais */}
              <div className="w-[66px] flex flex-col gap-1.5">
                {ABILITIES.map(ab => {
                  const score = character.stats[ab.id] || 10;
                  const mod = getAbilityModifier(score);
                  return (
                    <div 
                      key={ab.id}
                      className="border-[1.5px] border-neutral-800 rounded-lg p-1 text-center bg-neutral-50 flex flex-col items-center shadow-xs"
                    >
                      <span className="text-[7.5px] font-extrabold uppercase tracking-wider text-neutral-700">
                        {ab.name}
                      </span>
                      {/* Modificador Clicável */}
                      <button 
                        onClick={() => onQuickRoll(`Teste de ${ab.name}`, 20, mod)}
                        className="text-lg font-black font-mono leading-none my-0.5 hover:text-amber-600 transition-colors"
                        title="Clique para rolar teste"
                      >
                        {formatModifier(mod)}
                      </button>
                      {/* Valor do Atributo */}
                      <div className="border border-neutral-700 rounded-full px-1.5 py-0 bg-white">
                        <input
                          type="number"
                          value={score}
                          onChange={(e) => handleScoreChange(ab.id, e.target.value)}
                          className="w-7 text-center font-bold text-[10px] bg-transparent focus:outline-none"
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
                  <div className="w-5 h-5 rounded-full border border-neutral-800 flex items-center justify-center font-bold text-xs bg-white font-mono">
                    +{profBonus}
                  </div>
                  <span className="text-[7.5px] font-extrabold uppercase text-neutral-600">BÔNUS DE PROFICIÊNCIA</span>
                </div>

                {/* Testes de Resistência */}
                <div className="border-[1.5px] border-neutral-800 rounded-lg p-1.5 bg-neutral-50">
                  <div className="space-y-0.5">
                    {ABILITIES.map(ab => {
                      const mod = getAbilityModifier(character.stats[ab.id]);
                      const isProf = character.savingProficiencies[ab.id];
                      const total = mod + (isProf ? profBonus : 0);
                      return (
                        <div key={ab.id} className="flex items-center gap-1.5 text-[9px] leading-tight">
                          <button
                            onClick={() => toggleSavingProf(ab.id)}
                            className={`w-2.5 h-2.5 rounded-full border border-neutral-800 flex-shrink-0 transition-colors ${
                              isProf ? "bg-neutral-900" : "bg-white"
                            }`}
                          />
                          <span 
                            onClick={() => onQuickRoll(`Salvaguarda de ${ab.name}`, 20, total)}
                            className="w-5 text-center font-bold border-b border-neutral-400 font-mono cursor-pointer hover:text-amber-600"
                          >
                            {formatModifier(total)}
                          </span>
                          <span className={`truncate ${isProf ? "font-bold text-neutral-950" : "text-neutral-700"}`}>
                            {ab.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-[7.5px] font-extrabold uppercase text-center text-neutral-500 border-t border-neutral-300 mt-1 pt-0.5 tracking-wider">
                    TESTES DE RESISTÊNCIA
                  </div>
                </div>

                {/* Perícias (18 Oficiais) */}
                <div className="border-[1.5px] border-neutral-800 rounded-lg p-1.5 bg-neutral-50">
                  <div className="space-y-0.5">
                    {SKILLS.map(sk => {
                      const statMod = getAbilityModifier(character.stats[sk.stat]);
                      const isProf = character.skillsProficiencies[sk.id];
                      const total = statMod + (isProf ? profBonus : 0);
                      const statShort = ABILITIES.find(a => a.id === sk.stat)?.name.slice(0, 3);
                      return (
                        <div key={sk.id} className="flex items-center gap-1.5 text-[8.5px] leading-tight">
                          <button
                            onClick={() => toggleSkillProf(sk.id)}
                            className={`w-2.5 h-2.5 rounded-full border border-neutral-800 flex-shrink-0 transition-colors ${
                              isProf ? "bg-neutral-900" : "bg-white"
                            }`}
                          />
                          <span 
                            onClick={() => onQuickRoll(`Perícia ${sk.name}`, 20, total)}
                            className="w-5 text-center font-bold border-b border-neutral-400 font-mono cursor-pointer hover:text-amber-600"
                          >
                            {formatModifier(total)}
                          </span>
                          <span className={`truncate ${isProf ? "font-bold text-neutral-950" : "text-neutral-700"}`}>
                            {sk.name} <span className="text-[7px] text-neutral-400 font-normal">({statShort})</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-[7.5px] font-extrabold uppercase text-center text-neutral-500 border-t border-neutral-300 mt-1 pt-0.5 tracking-wider">
                    PERÍCIAS
                  </div>
                </div>

              </div>
            </div>

            {/* Sabedoria Passiva (Percepção) */}
            <div className="border-[1.5px] border-neutral-800 rounded-md p-1 px-2 flex items-center gap-2 bg-neutral-50 h-7">
              <div className="w-5 h-5 rounded border border-neutral-800 flex items-center justify-center font-bold text-xs bg-white font-mono">
                {passivePerception}
              </div>
              <span className="text-[7.5px] font-extrabold uppercase text-neutral-600">
                SABEDORIA PASSIVA (PERCEPÇÃO)
              </span>
            </div>

            {/* Idiomas e Outras Proficiências */}
            <div className="border-[1.5px] border-neutral-800 rounded-lg p-2 bg-neutral-50 flex-1 flex flex-col justify-between min-h-[140px]">
              <textarea
                value={character.otherProficiencies}
                onChange={(e) => setCharacter({ ...character, otherProficiencies: e.target.value })}
                rows={7}
                className="w-full text-[8.5px] leading-relaxed bg-transparent border-none focus:outline-none resize-none font-sans"
              />
              <div className="text-[7.5px] font-extrabold uppercase text-center text-neutral-500 border-t border-neutral-300 pt-0.5 tracking-wider">
                IDIOMAS E OUTRAS PROFICIÊNCIAS
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
                  type="number"
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
                <button
                  onClick={() => onQuickRoll("Iniciativa", 20, character.initiativeBonus)}
                  className="font-black text-xl text-center bg-transparent w-full focus:outline-none leading-none font-mono hover:text-amber-600"
                >
                  {formatModifier(character.initiativeBonus)}
                </button>
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
                  type="number"
                  value={character.hpMax}
                  onChange={(e) => setCharacter({ ...character, hpMax: parseInt(e.target.value, 10) || 1 })}
                  className="w-8 font-bold text-neutral-900 bg-transparent text-right focus:outline-none"
                />
              </div>
              <input
                type="number"
                value={character.hpCurrent}
                onChange={(e) => setCharacter({ ...character, hpCurrent: parseInt(e.target.value, 10) || 0 })}
                className="font-black text-3xl text-center py-1 text-emerald-800 bg-transparent focus:outline-none font-mono"
              />
              <span className="text-[7.5px] font-extrabold uppercase text-center text-neutral-500 tracking-wider">
                PONTOS DE VIDA ATUAIS
              </span>
            </div>

            {/* Pontos de Vida Temporários */}
            <div className="border-[1.5px] border-neutral-800 rounded-lg p-1 bg-neutral-50 text-center">
              <input
                type="number"
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
                    className="w-12 text-right font-bold text-neutral-800 bg-transparent focus:outline-none"
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

            {/* Tabela de Ataques e Magias */}
            <div className="border-[1.5px] border-neutral-800 rounded-lg p-2 bg-neutral-50 flex flex-col justify-between min-h-[175px]">
              <div>
                <table className="w-full text-left border-collapse text-[8.5px]">
                  <thead>
                    <tr className="border-b border-neutral-400 text-[7px] font-extrabold uppercase text-neutral-600">
                      <th className="py-0.5 w-[45%]">NOME</th>
                      <th className="py-0.5 w-[20%] text-center">ATAQUE</th>
                      <th className="py-0.5 w-[35%]">DANO / TIPO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {character.attacks.map(atk => (
                      <tr key={atk.id} className="border-b border-neutral-200">
                        <td className="py-0.5">
                          <input
                            type="text"
                            value={atk.name}
                            onChange={(e) => handleAttackChange(atk.id, "name", e.target.value)}
                            className="w-full font-bold text-neutral-900 bg-transparent focus:outline-none"
                          />
                        </td>
                        <td className="py-0.5 text-center">
                          <button
                            onClick={() => onQuickRoll(atk.name, 20, parseInt(atk.bonus, 10) || 0)}
                            className="font-bold text-red-700 bg-transparent focus:outline-none font-mono hover:underline"
                          >
                            {atk.bonus}
                          </button>
                        </td>
                        <td className="py-0.5">
                          <input
                            type="text"
                            value={atk.damage}
                            onChange={(e) => handleAttackChange(atk.id, "damage", e.target.value)}
                            className="w-full text-neutral-800 bg-transparent focus:outline-none"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Bloco de Anotações de Ataques */}
                <div className="mt-1 p-1 bg-white border border-neutral-300 rounded">
                  <textarea
                    value={character.attackNotes || "• CD Resistência de Magia: 13 (8 + 2 Prof + 3 Car)\n• Bônus de Ataque Mágico: +5\n• Machado Grande: Pesada, duas mãos.\n• Azagaias: Arremesso (9m / 36m).\n• Cota de Malha: CA fixa 16 (desvantagem em Furtividade)."}
                    onChange={(e) => setCharacter({ ...character, attackNotes: e.target.value })}
                    rows={4}
                    className="w-full bg-transparent border-none focus:outline-none resize-none text-[7.5px] leading-tight font-sans text-neutral-800"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-neutral-300 pt-0.5 mt-1">
                <button
                  onClick={handleAddAttack}
                  className="text-[8px] text-amber-700 hover:underline font-bold"
                >
                  + Adicionar Ataque
                </button>
                <span className="text-[7.5px] font-extrabold uppercase text-neutral-500 tracking-wider">
                  ATAQUES E MAGIAS
                </span>
              </div>
            </div>

            {/* Equipamento & Moedas */}
            <div className="border-[1.5px] border-neutral-800 rounded-lg p-2 bg-neutral-50 flex-1 flex flex-col justify-between min-h-[170px]">
              <div className="flex gap-2 h-full">
                {/* Coluna de Moedas */}
                <div className="w-10 flex flex-col gap-1">
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
                        type="number"
                        value={character.coins[coin.key] || ""}
                        placeholder="-"
                        onChange={(e) => setCharacter({
                          ...character,
                          coins: { ...character.coins, [coin.key]: parseInt(e.target.value, 10) || 0 }
                        })}
                        className="w-full text-center font-bold text-[9px] bg-transparent focus:outline-none"
                      />
                    </div>
                  ))}
                </div>

                {/* Lista de Equipamentos */}
                <div className="flex-1">
                  <textarea
                    value={character.equipmentText}
                    onChange={(e) => setCharacter({ ...character, equipmentText: e.target.value })}
                    rows={8}
                    className="w-full text-[8px] leading-relaxed bg-transparent border-none focus:outline-none resize-none font-sans"
                  />
                </div>
              </div>

              <div className="text-[7.5px] font-extrabold uppercase text-center text-neutral-500 border-t border-neutral-300 pt-0.5 tracking-wider">
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

            {/* Características e Habilidades (Grande) */}
            <div className="border-[1.5px] border-neutral-800 rounded-lg p-2 bg-neutral-50 flex-1 flex flex-col justify-between min-h-[300px]">
              <textarea
                value={character.featuresText}
                onChange={(e) => setCharacter({ ...character, featuresText: e.target.value })}
                rows={16}
                className="w-full text-[8px] leading-relaxed bg-transparent border-none focus:outline-none resize-none font-sans"
              />
              <div className="text-[7.5px] font-extrabold uppercase text-center text-neutral-500 border-t border-neutral-300 pt-0.5 tracking-wider">
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
