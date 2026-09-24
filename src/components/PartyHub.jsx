import React, { useState, useEffect } from "react";
import { Users, Plus, Shield, Heart, Zap, Sparkles, RefreshCw, ChevronRight, User, Sword, Trash2 } from "lucide-react";
import { fetchPartyFromCloud, saveCharacterToCloud, deleteCharacterFromCloud } from "../utils/cloudSync";
import { createCleanCharacter } from "../utils/characterTemplates";
import { DEFAULT_CHARACTER } from "../data/initialCharacter";
import { getThemeForClass } from "../utils/theme";

export default function PartyHub({ onSelectCharacter }) {
  const [party, setParty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);

  // Formulário de Criação
  const [name, setName] = useState("");
  const [className, setClassName] = useState("Guerreiro");
  const [race, setRace] = useState("Humano");
  const [level, setLevel] = useState(1);
  const [playerName, setPlayerName] = useState("");

  const loadCharacters = async () => {
    setLoading(true);
    const chars = await fetchPartyFromCloud();
    if (chars && chars.length > 0) {
      setParty(chars);
    } else {
      setParty([DEFAULT_CHARACTER]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setCreating(true);
    // Cria ficha 100% LIMPA e Nova com regras automáticas da Raça e Classe do D&D 5e
    const newChar = createCleanCharacter({
      name: name.trim(),
      race,
      className,
      level: Number(level) || 1,
      playerName: playerName.trim()
    });

    await saveCharacterToCloud(newChar);
    await loadCharacters();
    setCreating(false);
    setShowCreateModal(false);
    setName("");
    setPlayerName("");
    onSelectCharacter(newChar);
  };

  const handleDeleteCharacter = async (char, e) => {
    e.stopPropagation();
    if (!window.confirm(`Tem certeza que deseja excluir permanentemente a ficha de "${char.name}"?`)) {
      return;
    }
    const targetId = char.id;
    const targetName = char.name;
    setParty(prev => prev.filter(c => (targetId ? c.id !== targetId : c.name !== targetName)));
    await deleteCharacterFromCloud(targetId, targetName);
    try {
      const active = localStorage.getItem("dnd5e_nexus_character_v3");
      if (active) {
        const parsed = JSON.parse(active);
        if (parsed.id === targetId || parsed.name === targetName) {
          localStorage.removeItem("dnd5e_nexus_character_v3");
        }
      }
    } catch (err) {}
  };

  const classesList = [
    "Paladino", "Guerreiro", "Mago", "Ladino", "Clérigo", "Bárbaro",
    "Druida", "Bardo", "Monge", "Ranger", "Bruxo", "Feiticeiro"
  ];

  const racesList = [
    "Meio-Orc", "Draconato", "Elfo", "Anão", "Humano",
    "Halfling", "Gnomo", "Meio-Elfo", "Tiefling"
  ];

  return (
    <div className="min-h-screen bg-[#0c0a09] text-white selection:bg-amber-400 selection:text-black pb-16 font-sans">
      {/* Background Decorativo Épico */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-25 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600 via-transparent to-transparent"
      />

      {/* Barra de Topo do Hub */}
      <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-white/10 px-4 py-3 shadow-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-serif font-black text-black text-lg shadow-md">
              &
            </div>
            <div>
              <h1 className="font-serif font-black text-lg tracking-wider text-white uppercase flex items-center gap-2">
                D&D 5e • Salão dos Heróis
                <span className="text-[9px] px-2 py-0.5 rounded-full font-sans uppercase tracking-widest font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  🟢 Mesa Online
                </span>
              </h1>
              <p className="text-[10px] text-white/50">Selecione sua ficha para entrar na sessão de jogo</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadCharacters}
              disabled={loading}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all border border-white/10"
              title="Recarregar fichas da nuvem"
            >
              <RefreshCw size={15} className={loading ? "animate-spin text-amber-400" : ""} />
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              className="px-3.5 py-1.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-lg hover:from-amber-400 hover:to-amber-300 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Plus size={15} />
              <span>Criar Nova Ficha</span>
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal do Hub */}
      <main className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        
        {/* Banner de Boas-Vindas */}
        <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-neutral-900/90 via-neutral-900/50 to-neutral-900/90 border border-amber-500/20 shadow-2xl backdrop-blur-sm text-center">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
            Mesa de Aventura Multidispositivos
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-white mb-2">
            Escolha sua Ficha de Personagem
          </h2>
          <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto">
            Cada jogador da sua casa pode abrir o mesmo link no celular, escolher sua respectiva ficha ou criar uma nova. Todas as alterações são salvas na nuvem em tempo real.
          </p>
        </div>

        {/* Grade de Personagens */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <RefreshCw size={32} className="animate-spin text-amber-400" />
            <span className="text-xs text-white/60">Buscando aventureiros na nuvem...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {party.map((char) => {
              const theme = getThemeForClass(char.className);
              return (
                <div
                  key={char.id || char.name}
                  className="rounded-2xl border border-white/10 bg-neutral-900/70 hover:bg-neutral-900 transition-all p-5 shadow-xl hover:shadow-2xl flex flex-col justify-between group hover:border-amber-400/50 relative overflow-hidden"
                  style={{
                    boxShadow: `0 8px 30px -10px ${theme.primary}22`
                  }}
                >
                  {/* Linha de Destaque Superior Colorida pela Classe */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ backgroundColor: theme.primary }}
                  />

                  <div>
                    {/* Header do Card */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">
                          {char.race || "Meio-Orc"}
                        </span>
                        <h3 
                          className="font-serif font-black text-xl text-white group-hover:text-amber-300 transition-colors"
                          style={{ color: theme.primaryLight }}
                        >
                          {char.name}
                        </h3>
                      </div>

                      {/* Badge da Classe */}
                      <div 
                        className="px-2.5 py-1 rounded-xl text-xs font-serif font-black shadow-md border"
                        style={{
                          backgroundColor: `${theme.primary}20`,
                          borderColor: `${theme.primary}50`,
                          color: theme.primaryLight || "#fef08a"
                        }}
                      >
                        {char.className} {char.level || 1}
                      </div>
                    </div>

                    {/* Detalhes do Jogador & Antecedente */}
                    <div className="flex items-center gap-2 text-xs text-white/60 mb-4 pb-3 border-b border-white/10">
                      <span className="flex items-center gap-1">
                        <User size={12} className="text-white/40" />
                        {char.playerName || "Aventureiro"}
                      </span>
                      <span>•</span>
                      <span>{char.background || "Soldado"}</span>
                    </div>

                    {/* Estatísticas de Combate Resumidas */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-center">
                        <span className="text-[9px] text-white/40 uppercase font-bold block">CA</span>
                        <span className="font-mono font-bold text-sm text-white">{char.armorClass || 16}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-center">
                        <span className="text-[9px] text-white/40 uppercase font-bold block">PV</span>
                        <span className="font-mono font-bold text-sm text-emerald-400">
                          {char.hpCurrent !== undefined ? char.hpCurrent : char.hpMax || 13}/{char.hpMax || 13}
                        </span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-center">
                        <span className="text-[9px] text-white/40 uppercase font-bold block">Desloc.</span>
                        <span className="font-mono font-bold text-sm text-white">{char.speed || "9m"}</span>
                      </div>
                    </div>

                    {/* Prévia de Armas / Ataques */}
                    {char.attacks && char.attacks.length > 0 && (
                      <div className="mb-4 p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs text-white/70">
                        <div className="flex items-center gap-1.5 text-amber-300/80 font-bold text-[10px] uppercase mb-1">
                          <Sword size={11} />
                          <span>Arma Principal:</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-bold text-white">{char.attacks[0].name}</span>
                          <span className="font-mono text-red-400 font-bold">{char.attacks[0].bonus} ({char.attacks[0].damage})</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Botões de Ação: Entrar na Ficha + Excluir */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onSelectCharacter(char)}
                      className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md group-hover:scale-[1.01] active:scale-95 text-black"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <span>⚔️ Jogar com esta Ficha</span>
                      <ChevronRight size={14} />
                    </button>
                    
                    <button
                      onClick={(e) => handleDeleteCharacter(char, e)}
                      className="py-2.5 px-3 rounded-xl font-bold text-xs bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-500/30 transition-all shadow-sm flex items-center justify-center active:scale-95"
                      title={`Excluir a ficha de ${char.name}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* Modal / Formulário de Criação de Nova Ficha */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl border border-amber-500/40 bg-neutral-950 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚔️</span>
                <h3 className="font-serif font-black text-lg text-white">Criar Nova Ficha de Personagem</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-white/60 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-bold text-white/60 uppercase block mb-1">
                  Nome do Personagem:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Thokk, Elora, Valerius..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-white/60 uppercase block mb-1">
                  Nome do Jogador (Dono da Ficha):
                </label>
                <input
                  type="text"
                  placeholder="Ex: Guilherme, Lucas, Sarah..."
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-3.5 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="text-[10px] font-bold text-white/60 uppercase block mb-1">Classe:</label>
                  <select
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/20 rounded-xl p-2 text-xs text-white"
                  >
                    {classesList.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-white/60 uppercase block mb-1">Raça:</label>
                  <select
                    value={race}
                    onChange={(e) => setRace(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/20 rounded-xl p-2 text-xs text-white"
                  >
                    {racesList.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-white/60 uppercase block mb-1">Nível:</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/20 rounded-xl p-2 text-xs text-white font-mono text-center"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-black shadow-lg"
                >
                  {creating ? "Criando e Salvando..." : "Criar e Entrar na Ficha"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
