import React, { useState, useMemo } from "react";
import { BookOpen, Search, X, Shield, Sword, Sparkles, Award, AlertCircle, PlusCircle } from "lucide-react";
import { WEAPONS, ARMORS, SPELLS_DATABASE, CLASS_FEATURES_DB, FEATS_DB, CONDITIONS_DB } from "../data/compendium";

export default function CompendiumModal({ isOpen, onClose, onAddWeapon, onAddSpell, currentTheme }) {
  const [activeTab, setActiveTab] = useState("spells");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const tabs = [
    { id: "spells", label: "Magias", icon: Sparkles },
    { id: "weapons", label: "Armas", icon: Sword },
    { id: "armors", label: "Armaduras", icon: Shield },
    { id: "features", label: "Habilidades", icon: Award },
    { id: "feats", label: "Talentos", icon: BookOpen },
    { id: "conditions", label: "Condições", icon: AlertCircle }
  ];

  // Filtra itens com base no termo de busca
  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    if (activeTab === "spells") {
      return SPELLS_DATABASE.filter(s => s.name.toLowerCase().includes(term) || (s.desc && s.desc.toLowerCase().includes(term)));
    }
    if (activeTab === "weapons") {
      return WEAPONS.filter(w => w.name.toLowerCase().includes(term) || w.type.toLowerCase().includes(term));
    }
    if (activeTab === "armors") {
      return ARMORS.filter(a => a.name.toLowerCase().includes(term) || a.category.toLowerCase().includes(term));
    }
    if (activeTab === "features") {
      const allFeatures = [];
      Object.entries(CLASS_FEATURES_DB).forEach(([cls, list]) => {
        list.forEach(item => allFeatures.push({ ...item, className: cls }));
      });
      return allFeatures.filter(f => f.name.toLowerCase().includes(term) || f.className.toLowerCase().includes(term) || f.desc.toLowerCase().includes(term));
    }
    if (activeTab === "feats") {
      return FEATS_DB.filter(f => f.name.toLowerCase().includes(term) || f.desc.toLowerCase().includes(term));
    }
    if (activeTab === "conditions") {
      return CONDITIONS_DB.filter(c => c.name.toLowerCase().includes(term) || c.desc.toLowerCase().includes(term));
    }
    return [];
  }, [activeTab, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden"
        style={{
          backgroundColor: currentTheme.bgDark,
          borderColor: currentTheme.border,
          boxShadow: currentTheme.glow
        }}
      >
        {/* Header do Compêndio */}
        <div 
          className="flex items-center justify-between p-4 border-b border-white/10"
          style={{ background: currentTheme.gradient }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: currentTheme.primaryDark, color: currentTheme.primaryLight }}
            >
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-white tracking-wide flex items-center gap-2">
                Compêndio D&D 5e
                <span className="text-xs px-2 py-0.5 rounded-full font-sans uppercase tracking-widest font-semibold" style={{ backgroundColor: currentTheme.primaryDark, color: currentTheme.primaryLight }}>
                  SRD Oficial 2024
                </span>
              </h2>
              <p className="text-xs text-white/60">Consulte regras, magias, armas e habilidades completas</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Abas e Campo de Busca */}
        <div className="p-3 bg-black/40 border-b border-white/10 flex flex-col sm:flex-row gap-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSelectedItem(null); }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive 
                      ? "text-black shadow-md scale-105" 
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                  style={isActive ? { backgroundColor: currentTheme.primary, color: "#000" } : {}}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder={`Pesquisar em ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Conteúdo: Lista de itens + Detalhes */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 overflow-hidden">
          
          {/* Coluna Esquerda: Lista de Resultados */}
          <div className="overflow-y-auto max-h-[50vh] md:max-h-[60vh] p-3 space-y-2">
            {filteredData.length === 0 ? (
              <div className="text-center py-12 text-white/40 text-sm">
                Nenhum resultado encontrado para "{searchTerm}".
              </div>
            ) : (
              filteredData.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedItem(item)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedItem?.name === item.name 
                      ? "border-amber-400 bg-white/10 shadow-lg scale-[1.01]" 
                      : "border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white tracking-wide">{item.name}</h3>
                    {item.level !== undefined && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-white/10 text-amber-300">
                        {item.level === 0 ? "Truque" : `${item.level}º Nível`}
                      </span>
                    )}
                    {item.damage && (
                      <span className="text-xs font-mono font-bold text-red-400">{item.damage}</span>
                    )}
                    {item.acFormula && (
                      <span className="text-xs font-mono font-bold text-sky-400">{item.acFormula}</span>
                    )}
                    {item.className && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-purple-900/50 text-purple-300">
                        {item.className}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/60 line-clamp-2 mt-1">
                    {item.desc || item.properties || item.damageType || "Clique para ver detalhes."}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Coluna Direita: Painel de Detalhes Completo */}
          <div className="overflow-y-auto max-h-[50vh] md:max-h-[60vh] p-4 flex flex-col justify-between bg-black/20">
            {selectedItem ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-bold font-serif text-white">{selectedItem.name}</h3>
                    {selectedItem.level !== undefined && (
                      <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase" style={{ backgroundColor: currentTheme.primary, color: "#000" }}>
                        {selectedItem.level === 0 ? "Truque (Nível 0)" : `Magia de ${selectedItem.level}º Nível`}
                      </span>
                    )}
                  </div>
                  {selectedItem.school && (
                    <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider">{selectedItem.school}</p>
                  )}
                  {selectedItem.type && (
                    <p className="text-xs text-white/60 uppercase tracking-wider">{selectedItem.type}</p>
                  )}
                  {selectedItem.category && (
                    <p className="text-xs text-sky-300 uppercase tracking-wider">Armadura {selectedItem.category}</p>
                  )}
                  {selectedItem.className && (
                    <p className="text-xs text-purple-300 uppercase tracking-wider">Habilidade de {selectedItem.className} (Nível {selectedItem.level})</p>
                  )}
                </div>

                {/* Bloco de Atributos Chave */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {selectedItem.damage && (
                    <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-900/50">
                      <span className="text-red-300/70 block">Dano / Efeito:</span>
                      <span className="font-bold text-red-200 text-sm">{selectedItem.damage}</span>
                    </div>
                  )}
                  {selectedItem.castingTime && (
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-white/50 block">Tempo de Conjuração:</span>
                      <span className="font-bold text-white">{selectedItem.castingTime}</span>
                    </div>
                  )}
                  {selectedItem.range && (
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-white/50 block">Alcance:</span>
                      <span className="font-bold text-white">{selectedItem.range}</span>
                    </div>
                  )}
                  {selectedItem.duration && (
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-white/50 block">Duração:</span>
                      <span className="font-bold text-white">{selectedItem.duration}</span>
                    </div>
                  )}
                  {selectedItem.components && (
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-white/50 block">Componentes:</span>
                      <span className="font-bold text-white">{selectedItem.components}</span>
                    </div>
                  )}
                  {selectedItem.properties && (
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 col-span-2">
                      <span className="text-white/50 block">Propriedades:</span>
                      <span className="font-bold text-amber-200">{selectedItem.properties}</span>
                    </div>
                  )}
                  {selectedItem.acFormula && (
                    <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-900/50">
                      <span className="text-sky-300/70 block">Proteção de CA:</span>
                      <span className="font-bold text-sky-200 text-sm">{selectedItem.acFormula}</span>
                    </div>
                  )}
                  {selectedItem.cost && (
                    <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-900/40">
                      <span className="text-amber-300/70 block">Preço de Mercado:</span>
                      <span className="font-bold text-amber-200">{selectedItem.cost}</span>
                    </div>
                  )}
                </div>

                {/* Descrição Completa das Regras */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">Regra Oficial:</h4>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed whitespace-pre-line font-serif">
                    {selectedItem.desc}
                  </p>
                </div>

                {/* Botões de Ação Direta para a Ficha */}
                <div className="pt-2 flex gap-2">
                  {onAddWeapon && selectedItem.damage && (
                    <button
                      onClick={() => {
                        onAddWeapon(selectedItem);
                        onClose();
                      }}
                      className="flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg hover:scale-[1.02]"
                      style={{ backgroundColor: currentTheme.primary, color: "#000" }}
                    >
                      <PlusCircle size={15} />
                      Adicionar aos Ataques
                    </button>
                  )}
                  {onAddSpell && selectedItem.castingTime && (
                    <button
                      onClick={() => {
                        onAddSpell(selectedItem);
                        onClose();
                      }}
                      className="flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg hover:scale-[1.02]"
                      style={{ backgroundColor: currentTheme.primary, color: "#000" }}
                    >
                      <PlusCircle size={15} />
                      Aprender Magia
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 text-white/40">
                <BookOpen size={48} className="mb-3 opacity-30" />
                <p className="text-sm font-semibold text-white/70">Nenhum item selecionado</p>
                <p className="text-xs mt-1 max-w-xs">Clique em qualquer magia, arma, armadura ou talento na lista ao lado para ver todas as regras e estatísticas detalhadas.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
