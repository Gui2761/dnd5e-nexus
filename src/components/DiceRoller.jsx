import React, { useState } from "react";
import { Dices, RotateCcw, X, History, Sparkles } from "lucide-react";

export default function DiceRoller({ isOpen, onClose, currentTheme }) {
  const [history, setHistory] = useState([]);
  const [modifier, setModifier] = useState(0);
  const [rollMode, setRollMode] = useState("normal"); // "normal", "adv", "disadv"
  const [lastResult, setLastResult] = useState(null);

  const diceTypes = [
    { label: "d4", sides: 4 },
    { label: "d6", sides: 6 },
    { label: "d8", sides: 8 },
    { label: "d10", sides: 10 },
    { label: "d12", sides: 12 },
    { label: "d20", sides: 20 },
    { label: "d100", sides: 100 }
  ];

  const rollDie = (sides) => {
    let roll1 = Math.floor(Math.random() * sides) + 1;
    let roll2 = Math.floor(Math.random() * sides) + 1;
    let finalRoll = roll1;
    let details = `${roll1}`;

    if (sides === 20) {
      if (rollMode === "adv") {
        finalRoll = Math.max(roll1, roll2);
        details = `Vantagem: [${roll1}, ${roll2}] → ${finalRoll}`;
      } else if (rollMode === "disadv") {
        finalRoll = Math.min(roll1, roll2);
        details = `Desvantagem: [${roll1}, ${roll2}] → ${finalRoll}`;
      }
    }

    const total = finalRoll + modifier;
    const isCrit = sides === 20 && finalRoll === 20;
    const isFumble = sides === 20 && finalRoll === 1;

    const resultObj = {
      id: Date.now(),
      sides,
      finalRoll,
      modifier,
      total,
      details,
      isCrit,
      isFumble,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setLastResult(resultObj);
    setHistory(prev => [resultObj, ...prev.slice(0, 19)]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden flex flex-col"
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
          <div className="flex items-center gap-2.5">
            <div 
              className="p-2 rounded-xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: currentTheme.primaryDark, color: currentTheme.primaryLight }}
            >
              <Dices size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-white">Rolador de Dados D&D 5e</h3>
              <p className="text-[11px] text-white/60">Rolagens com vantagem, desvantagem e modificador</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Display do Resultado Atual */}
        <div className="p-6 bg-black/40 text-center border-b border-white/10 flex flex-col items-center justify-center min-h-[140px]">
          {lastResult ? (
            <div className="space-y-1 animate-scaleUp">
              <span className="text-xs uppercase tracking-widest text-white/50 font-bold block">
                Resultado ({lastResult.details} {lastResult.modifier >= 0 ? `+ ${lastResult.modifier}` : `${lastResult.modifier}`})
              </span>
              <div className="flex items-center justify-center gap-2">
                <span 
                  className={`text-6xl font-black font-mono tracking-tight ${
                    lastResult.isCrit ? "text-amber-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" :
                    lastResult.isFumble ? "text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" : "text-white"
                  }`}
                >
                  {lastResult.total}
                </span>
              </div>
              {lastResult.isCrit && (
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/50">
                  <Sparkles size={12} /> CRÍTICO NATURAL (20)!
                </div>
              )}
              {lastResult.isFumble && (
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/50">
                  FALHA CRÍTICA (1)!
                </div>
              )}
            </div>
          ) : (
            <div className="text-white/40 text-sm">
              <Dices size={36} className="mx-auto mb-2 opacity-40" />
              Selecione um dado abaixo para rolar
            </div>
          )}
        </div>

        {/* Controles de Modificador e Vantagem (d20) */}
        <div className="p-3 bg-black/20 border-b border-white/10 flex items-center justify-between gap-2 text-xs">
          {/* Vantagem / Normal / Desvantagem */}
          <div className="flex rounded-lg bg-white/5 p-1 border border-white/10">
            <button
              onClick={() => setRollMode("normal")}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${rollMode === "normal" ? "bg-white/20 text-white" : "text-white/50"}`}
            >
              Normal
            </button>
            <button
              onClick={() => setRollMode("adv")}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${rollMode === "adv" ? "bg-green-500/30 text-green-300 border border-green-500/40" : "text-white/50"}`}
            >
              Vantagem
            </button>
            <button
              onClick={() => setRollMode("disadv")}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${rollMode === "disadv" ? "bg-red-500/30 text-red-300 border border-red-500/40" : "text-white/50"}`}
            >
              Desvantagem
            </button>
          </div>

          {/* Seletor de Modificador */}
          <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
            <span className="text-white/60">Mod:</span>
            <input 
              type="number"
              value={modifier}
              onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
              className="w-12 text-center bg-black/40 border border-white/20 rounded py-0.5 text-xs text-white font-mono font-bold"
            />
          </div>
        </div>

        {/* Grade de Dados Interativos */}
        <div className="p-4 grid grid-cols-4 gap-2.5 bg-black/10">
          {diceTypes.map((die) => (
            <button
              key={die.sides}
              onClick={() => rollDie(die.sides)}
              className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber-400 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 group shadow-md"
            >
              <span className="text-base font-bold font-mono text-white group-hover:text-amber-300">
                {die.label}
              </span>
              <span className="text-[10px] text-white/40">1-{die.sides}</span>
            </button>
          ))}
          <button
            onClick={() => { setLastResult(null); setHistory([]); }}
            className="p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 active:scale-95 transition-all flex flex-col items-center justify-center text-white/40 hover:text-white"
            title="Limpar Histórico"
          >
            <RotateCcw size={16} />
            <span className="text-[10px] mt-1">Limpar</span>
          </button>
        </div>

        {/* Histórico Recente */}
        {history.length > 0 && (
          <div className="p-3 bg-black/30 border-t border-white/10 max-h-36 overflow-y-auto">
            <div className="flex items-center justify-between text-[11px] text-white/50 mb-1.5 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1"><History size={12} /> Histórico de Rolagens</span>
              <span>{history.length} rolagens</span>
            </div>
            <div className="space-y-1">
              {history.map((h) => (
                <div key={h.id} className="flex items-center justify-between text-xs py-1 px-2 rounded bg-white/[0.03] border border-white/5">
                  <span className="text-white/60">d{h.sides} {h.details}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">{h.total}</span>
                    <span className="text-[10px] text-white/40">{h.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
