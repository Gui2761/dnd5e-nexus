import React from "react";
import { User, Award, Scroll, HeartHandshake } from "lucide-react";
import { CLASS_FEATURES_DB } from "../data/compendium";

export default function BioTab({ character, setCharacter, currentTheme }) {
  const classFeatures = CLASS_FEATURES_DB[character.className] || [];

  const handleInsertClassFeature = (feat) => {
    const textToAdd = `\n\n[${feat.name.toUpperCase()} - Nível ${feat.level}]\n${feat.desc}`;
    setCharacter(prev => ({
      ...prev,
      featuresText: (prev.featuresText || "") + textToAdd
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Características & Habilidades Especiais */}
      <div 
        className="p-4 rounded-2xl border shadow-lg space-y-3"
        style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
            <Award size={16} style={{ color: currentTheme.primary }} />
            Habilidades de Classe & Características
          </h3>
          <span className="text-[10px] text-white/50">
            Adicione traços raciais, talentos e poderes de arquétipo
          </span>
        </div>

        {/* Sugestões rápidas da classe atual */}
        {classFeatures.length > 0 && (
          <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-amber-300 block">
              Sugestões Rápidas para {character.className}:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {classFeatures.map((feat, idx) => (
                <button
                  key={idx}
                  onClick={() => handleInsertClassFeature(feat)}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-white/10 hover:bg-white/20 text-white/80 transition-all flex items-center gap-1"
                  title="Clique para inserir na caixa abaixo"
                >
                  + {feat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <textarea
          rows={10}
          value={character.featuresText}
          onChange={(e) => setCharacter({ ...character, featuresText: e.target.value })}
          placeholder="Sentido Divino, Cura pelas Mãos, Ataques Selvagens, etc..."
          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white/90 placeholder-white/30 focus:outline-none focus:border-amber-400 leading-relaxed font-mono"
        />
      </div>

      {/* Traços de Personalidade & Roleplay */}
      <div 
        className="p-4 rounded-2xl border shadow-lg space-y-3"
        style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
      >
        <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2 border-b border-white/10 pb-2">
          <HeartHandshake size={16} style={{ color: currentTheme.primary }} />
          Personalidade & Vínculos
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-white/60 font-bold block mb-1">Traços de Personalidade:</label>
            <textarea
              rows={3}
              value={character.personality.traits}
              onChange={(e) => setCharacter({
                ...character,
                personality: { ...character.personality, traits: e.target.value }
              })}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white/90 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-white/60 font-bold block mb-1">Ideais:</label>
            <textarea
              rows={3}
              value={character.personality.ideals}
              onChange={(e) => setCharacter({
                ...character,
                personality: { ...character.personality, ideals: e.target.value }
              })}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white/90 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-white/60 font-bold block mb-1">Vínculos:</label>
            <textarea
              rows={3}
              value={character.personality.bonds}
              onChange={(e) => setCharacter({
                ...character,
                personality: { ...character.personality, bonds: e.target.value }
              })}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white/90 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-white/60 font-bold block mb-1">Defeitos:</label>
            <textarea
              rows={3}
              value={character.personality.flaws}
              onChange={(e) => setCharacter({
                ...character,
                personality: { ...character.personality, flaws: e.target.value }
              })}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white/90 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Detalhes Físicos & História */}
      <div 
        className="p-4 rounded-2xl border shadow-lg space-y-3"
        style={{ backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }}
      >
        <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2 border-b border-white/10 pb-2">
          <User size={16} style={{ color: currentTheme.primary }} />
          Aparência Física & Biografia
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
          <div>
            <label className="text-white/50 block text-[10px]">Idade:</label>
            <input 
              type="text" 
              value={character.bio.age}
              onChange={(e) => setCharacter({ ...character, bio: { ...character.bio, age: e.target.value } })}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-1.5 text-white"
            />
          </div>
          <div>
            <label className="text-white/50 block text-[10px]">Altura:</label>
            <input 
              type="text" 
              value={character.bio.height}
              onChange={(e) => setCharacter({ ...character, bio: { ...character.bio, height: e.target.value } })}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-1.5 text-white"
            />
          </div>
          <div>
            <label className="text-white/50 block text-[10px]">Peso:</label>
            <input 
              type="text" 
              value={character.bio.weight}
              onChange={(e) => setCharacter({ ...character, bio: { ...character.bio, weight: e.target.value } })}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-1.5 text-white"
            />
          </div>
          <div>
            <label className="text-white/50 block text-[10px]">Olhos:</label>
            <input 
              type="text" 
              value={character.bio.eyes}
              onChange={(e) => setCharacter({ ...character, bio: { ...character.bio, eyes: e.target.value } })}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-1.5 text-white"
            />
          </div>
          <div>
            <label className="text-white/50 block text-[10px]">Pele:</label>
            <input 
              type="text" 
              value={character.bio.skin}
              onChange={(e) => setCharacter({ ...character, bio: { ...character.bio, skin: e.target.value } })}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-1.5 text-white"
            />
          </div>
          <div>
            <label className="text-white/50 block text-[10px]">Cabelo:</label>
            <input 
              type="text" 
              value={character.bio.hair}
              onChange={(e) => setCharacter({ ...character, bio: { ...character.bio, hair: e.target.value } })}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-1.5 text-white"
            />
          </div>
        </div>

        <div className="space-y-3 pt-2 text-xs">
          <div>
            <label className="text-white/60 font-bold block mb-1">Aparência Visual Completa:</label>
            <textarea
              rows={3}
              value={character.bio.appearance}
              onChange={(e) => setCharacter({ ...character, bio: { ...character.bio, appearance: e.target.value } })}
              placeholder="Descreva as feições, marcas, cicatrizes e vestimenta..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-white/90 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-white/60 font-bold block mb-1">História de Origem (Backstory):</label>
            <textarea
              rows={4}
              value={character.bio.backstory}
              onChange={(e) => setCharacter({ ...character, bio: { ...character.bio, backstory: e.target.value } })}
              placeholder="Onde nasceu, por que se tornou aventureiro, sua jornada..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-white/90 focus:outline-none font-serif leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-white/60 font-bold block mb-1">Aliados & Organizações:</label>
              <textarea
                rows={2}
                value={character.bio.allies}
                onChange={(e) => setCharacter({ ...character, bio: { ...character.bio, allies: e.target.value } })}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white/90 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-white/60 font-bold block mb-1">Tesouros Especiais & Heranças:</label>
              <textarea
                rows={2}
                value={character.bio.treasure}
                onChange={(e) => setCharacter({ ...character, bio: { ...character.bio, treasure: e.target.value } })}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-white/90 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
