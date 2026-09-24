import React, { useState, useEffect } from "react";
import { Users, Plus, Cloud, RefreshCw, Check, Shield, UserCheck, X } from "lucide-react";
import { fetchPartyFromCloud, saveCharacterToCloud } from "../utils/cloudSync";
import { DEFAULT_CHARACTER } from "../data/initialCharacter";

export default function PartyMenu({ 
  isOpen, 
  onClose, 
  currentCharacter, 
  onSelectCharacter, 
  currentTheme 
}) {
  const [party, setParty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [newCharName, setNewCharName] = useState("");
  const [newCharClass, setNewCharClass] = useState("Guerreiro");
  const [newCharRace, setNewCharRace] = useState("Humano");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const loadParty = async () => {
    setLoading(true);
    const chars = await fetchPartyFromCloud();
    if (chars && chars.length > 0) {
      setParty(chars);
    } else {
      // Se a nuvem estiver vazia, garante ao menos o Thokk
      setParty([DEFAULT_CHARACTER]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadParty();
    }
  }, [isOpen]);

  const handleSaveCurrentToCloud = async () => {
    setSaving(true);
    const res = await saveCharacterToCloud(currentCharacter);
    if (res.success) {
      setSaveSuccess(true);
      if (res.characters) setParty(res.characters);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      alert("Erro ao salvar na nuvem: " + (res.error || "Tente novamente"));
    }
    setSaving(false);
  };

  const handleCreateNewCharacter = async (e) => {
    e.preventDefault();
    if (!newCharName.trim()) return;

    const newChar = {
      ...DEFAULT_CHARACTER,
      id: "char_" + Date.now(),
      name: newCharName.trim(),
      className: newCharClass,
      race: newCharRace,
      level: 1,
      playerName: "Amigo",
      hpMax: 10,
      hpCurrent: 10,
      attacks: [
        { id: "atk-1", name: "Arma Inicial", bonus: "+4", damage: "1d8+2", notes: "" }
      ],
      equipmentText: `• Roupas de aventureiro\n• Mochila com provisões\n• Riquezas: 10 PO`,
      coins: { cp: 0, sp: 0, ep: 0, gp: 10, pp: 0 }
    };

    setSaving(true);
    await saveCharacterToCloud(newChar);
    await loadParty();
    onSelectCharacter(newChar);
    setSaving(false);
    setShowCreateForm(false);
    setNewCharName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden flex flex-col"
        style={{
          backgroundColor: currentTheme.bgDark || "#18140c",
          borderColor: currentTheme.border || "#b45309",
          boxShadow: currentTheme.glow
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 border-b border-white/10"
          style={{ background: currentTheme.gradient }}
        >
          <div className="flex items-center gap-2.5">
            <div 
              className="p-2 rounded-xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: currentTheme.primaryDark, color: currentTheme.primaryLight }}
            >
              <Users size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                Mesa de Jogo Online
                <span className="text-[9px] px-2 py-0.5 rounded-full font-sans uppercase tracking-widest font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  🟢 Nuvem Conectada
                </span>
              </h3>
              <p className="text-[11px] text-white/60">Todos os celulares na casa acessam e editam estas fichas</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10">
            <X size={20} />
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="p-5 space-y-4 overflow-y-auto max-h-[70vh]">
          
          {/* Botões de Ação da Nuvem */}
          <div className="flex gap-2">
            <button
              onClick={handleSaveCurrentToCloud}
              disabled={saving}
              className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
              style={{ backgroundColor: currentTheme.primary, color: "#000" }}
            >
              {saveSuccess ? <Check size={16} /> : <Cloud size={16} />}
              {saving ? "Salvando..." : saveSuccess ? "Salvo na Nuvem!" : "Salvar Minha Ficha na Nuvem"}
            </button>

            <button
              onClick={loadParty}
              disabled={loading}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
              title="Recarregar fichas da nuvem"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          {/* Lista de Fichas do Grupo */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-white/70 uppercase tracking-wider">
              <span>Fichas dos Jogadores ({party.length})</span>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="text-amber-400 hover:underline flex items-center gap-1 text-[11px]"
              >
                <Plus size={13} /> {showCreateForm ? "Cancelar" : "Criar Nova Ficha"}
              </button>
            </div>

            {/* Formulário de Criação de Nova Ficha para Amigo */}
            {showCreateForm && (
              <form onSubmit={handleCreateNewCharacter} className="p-3 rounded-xl bg-black/40 border border-amber-400/40 space-y-2.5 animate-fadeIn">
                <span className="text-xs font-bold text-amber-300 block">Criar Nova Ficha para Amigo:</span>
                <div>
                  <input
                    type="text"
                    placeholder="Nome do Personagem (ex: Elora Solstício)..."
                    value={newCharName}
                    onChange={(e) => setNewCharName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-white/50 block">Classe:</label>
                    <select
                      value={newCharClass}
                      onChange={(e) => setNewCharClass(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/20 rounded-lg p-1.5 text-xs text-white"
                    >
                      {["Guerreiro", "Mago", "Ladino", "Clérigo", "Paladino", "Bárbaro", "Druida", "Bardo", "Monge", "Ranger", "Bruxo", "Feiticeiro"].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-white/50 block">Raça:</label>
                    <select
                      value={newCharRace}
                      onChange={(e) => setNewCharRace(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/20 rounded-lg p-1.5 text-xs text-white"
                    >
                      {["Humano", "Elfo", "Anão", "Meio-Orc", "Draconato", "Halfling", "Gnomo", "Meio-Elfo", "Tiefling"].map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-2 rounded-lg font-bold text-xs bg-amber-400 hover:bg-amber-300 text-black transition-all"
                >
                  {saving ? "Criando..." : "Confirmar e Abrir Nova Ficha"}
                </button>
              </form>
            )}

            {/* Itens da Lista */}
            <div className="space-y-1.5">
              {party.map((char) => {
                const isCurrent = currentCharacter.name === char.name;
                return (
                  <div
                    key={char.id || char.name}
                    onClick={() => {
                      onSelectCharacter(char);
                      onClose();
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isCurrent 
                        ? "border-amber-400 bg-amber-950/40 shadow-lg scale-[1.01]" 
                        : "border-white/10 bg-white/[0.03] hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center font-serif font-black text-amber-300 text-xs">
                        {char.name?.charAt(0) || "P"}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
                          {char.name}
                          {isCurrent && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded font-sans font-bold bg-amber-400 text-black">
                              Ativo
                            </span>
                          )}
                        </h4>
                        <p className="text-[10px] text-white/50">
                          {char.className || "Paladino"} {char.level || 1} • {char.race || "Meio-Orc"}
                        </p>
                      </div>
                    </div>

                    <button
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white/10 hover:bg-white/20 text-white transition-all"
                    >
                      Abrir Ficha
                    </button>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
