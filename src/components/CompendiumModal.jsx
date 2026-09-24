import React, { useState, useMemo } from "react";
import { 
  BookOpen, Search, X, Shield, Sword, Sparkles, Award, 
  AlertCircle, PlusCircle, Compass, HelpCircle, Package, Check, ArrowRight 
} from "lucide-react";
import { 
  WEAPONS, ARMORS, GEAR_DB, BACKGROUNDS_DB, CORE_RULES_DB, 
  SPELLS_DATABASE, CLASS_FEATURES_DB, FEATS_DB, CONDITIONS_DB 
} from "../data/compendium";

export default function CompendiumModal({ 
  isOpen, 
  onClose, 
  onAddWeapon, 
  onAddSpell, 
  onAddEquipment,
  onApplyBackground, 
  currentTheme 
}) {
  const [activeTab, setActiveTab] = useState("spells");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [actionFeedback, setActionFeedback] = useState(null);

  const tabs = [
    { id: "spells", label: "Magias", icon: Sparkles },
    { id: "weapons", label: "Armas", icon: Sword },
    { id: "armors", label: "Armaduras", icon: Shield },
    { id: "gear", label: "Equipamento & Itens", icon: Package },
    { id: "backgrounds", label: "Antecedentes", icon: Compass },
    { id: "rules", label: "Regras de Jogo", icon: HelpCircle },
    { id: "features", label: "Poderes de Classe", icon: Award },
    { id: "feats", label: "Talentos", icon: BookOpen },
    { id: "conditions", label: "Condições", icon: AlertCircle }
  ];

  // Dispara feedback visual rápido quando uma ação for executada
  const triggerFeedback = (msg) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 2500);
  };

  // Filtra itens com base no termo de busca e na aba ativa
  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    if (activeTab === "spells") {
      return (SPELLS_DATABASE || []).filter(s => 
        s.name.toLowerCase().includes(term) || 
        (s.school && s.school.toLowerCase().includes(term)) ||
        (s.desc && s.desc.toLowerCase().includes(term))
      );
    }
    if (activeTab === "weapons") {
      return (WEAPONS || []).filter(w => 
        w.name.toLowerCase().includes(term) || 
        w.type.toLowerCase().includes(term) ||
        (w.properties && w.properties.toLowerCase().includes(term))
      );
    }
    if (activeTab === "armors") {
      return (ARMORS || []).filter(a => 
        a.name.toLowerCase().includes(term) || 
        a.category.toLowerCase().includes(term)
      );
    }
    if (activeTab === "gear") {
      return (GEAR_DB || []).filter(g => 
        g.name.toLowerCase().includes(term) || 
        (g.category && g.category.toLowerCase().includes(term)) ||
        (g.desc && g.desc.toLowerCase().includes(term))
      );
    }
    if (activeTab === "backgrounds") {
      return (BACKGROUNDS_DB || []).filter(b => 
        b.name.toLowerCase().includes(term) || 
        (b.skills && b.skills.toLowerCase().includes(term)) || 
        (b.feature && b.feature.toLowerCase().includes(term))
      );
    }
    if (activeTab === "rules") {
      return (CORE_RULES_DB || []).filter(r => 
        r.name.toLowerCase().includes(term) || 
        (r.category && r.category.toLowerCase().includes(term)) || 
        (r.desc && r.desc.toLowerCase().includes(term))
      );
    }
    if (activeTab === "features") {
      const allFeatures = [];
      Object.entries(CLASS_FEATURES_DB || {}).forEach(([cls, list]) => {
        list.forEach(item => allFeatures.push({ ...item, className: cls }));
      });
      return allFeatures.filter(f => 
        f.name.toLowerCase().includes(term) || 
        f.className.toLowerCase().includes(term) || 
        (f.desc && f.desc.toLowerCase().includes(term))
      );
    }
    if (activeTab === "feats") {
      return (FEATS_DB || []).filter(f => 
        f.name.toLowerCase().includes(term) || 
        (f.desc && f.desc.toLowerCase().includes(term))
      );
    }
    if (activeTab === "conditions") {
      return (CONDITIONS_DB || []).filter(c => 
        c.name.toLowerCase().includes(term) || 
        (c.desc && c.desc.toLowerCase().includes(term))
      );
    }
    return [];
  }, [activeTab, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden"
        style={{
          backgroundColor: currentTheme.bgDark,
          borderColor: currentTheme.border,
          boxShadow: currentTheme.glow
        }}
      >
        {/* Header do Compêndio Oficial */}
        <div 
          className="flex items-center justify-between p-4 border-b border-white/10"
          style={{ background: currentTheme.gradient }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="p-2.5 rounded-xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: currentTheme.primaryDark, color: currentTheme.primaryLight }}
            >
              <BookOpen size={24} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold font-serif text-white tracking-wide">
                  Compêndio D&D 5ª Edição
                </h2>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-sans uppercase tracking-widest font-extrabold bg-amber-400 text-black shadow-sm">
                  Livro do Jogador (PHB Oficial • 315 Págs)
                </span>
              </div>
              <p className="text-xs text-white/70 mt-0.5">
                Regras completas, magias, armas, armaduras, equipamentos, antecedentes e mecânicas da Biblioteca Élfica
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Fechar compêndio"
          >
            <X size={22} />
          </button>
        </div>

        {/* FEEDBACK TOAST DE AÇÃO */}
        {actionFeedback && (
          <div className="bg-emerald-900/90 border-b border-emerald-500/50 py-2 px-4 text-emerald-200 text-xs font-bold flex items-center justify-center gap-2 animate-fadeIn">
            <Check size={16} className="text-emerald-400" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* CONTROLES: LINHA 1 (BUSCA TOTALMENTE EXPANDIDA) + LINHA 2 (ABAS WRAP SEM SCROLLBAR) */}
        <div className="p-3.5 bg-black/50 border-b border-white/10 space-y-2.5">
          {/* Linha 1: Campo de Busca com largura total 100% */}
          <div className="relative w-full">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400/80 pointer-events-none" />
            <input 
              type="text" 
              placeholder={`Pesquisar em ${tabs.find(t => t.id === activeTab)?.label}... (ex: Poção, Fogo, Furtividade, Espada Longa)`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-28 py-2.5 text-sm rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/35 focus:outline-none focus:border-amber-400 focus:bg-white/10 transition-all shadow-inner"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-14 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white transition-colors"
                title="Limpar pesquisa"
              >
                <X size={15} />
              </button>
            )}
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-amber-300 pointer-events-none">
              {filteredData.length} {filteredData.length === 1 ? "item" : "itens"}
            </span>
          </div>

          {/* Linha 2: Abas com Quebra Natural (Flex Wrap) — ZERO barras de rolagem cinza feias! */}
          <div className="flex flex-wrap items-center gap-1.5">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSelectedItem(null); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? "shadow-md scale-[1.02] ring-1 ring-amber-400/50 font-bold" 
                      : "text-white/70 hover:text-white bg-white/[0.03] hover:bg-white/10 border border-white/5"
                  }`}
                  style={isActive ? { backgroundColor: currentTheme.primary, color: "#000" } : {}}
                >
                  <Icon size={14} className={isActive ? "text-black" : "text-amber-400/80"} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Conteúdo: Lista de itens (Esquerda) + Detalhes Completos (Direita) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 overflow-hidden">
          
          {/* Coluna Esquerda: Lista de Resultados */}
          <div className="overflow-y-auto max-h-[48vh] md:max-h-[58vh] p-3 space-y-2">
            {filteredData.length === 0 ? (
              <div className="text-center py-12 text-white/40 text-sm">
                Nenhum resultado encontrado para "{searchTerm}" nesta categoria.
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
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-white tracking-wide truncate">{item.name}</h3>
                    <div className="flex items-center gap-1 shrink-0">
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
                      {item.cost && !item.damage && !item.acFormula && (
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-500/20">
                          {item.cost}
                        </span>
                      )}
                      {item.skills && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-emerald-950/70 text-emerald-300 border border-emerald-500/30">
                          {item.skills.split(",")[0]}
                        </span>
                      )}
                      {item.category && !item.acFormula && !item.cost && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-amber-950/50 text-amber-300">
                          {item.category.split("(")[0]}
                        </span>
                      )}
                      {item.className && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-purple-900/50 text-purple-300">
                          {item.className}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-white/60 line-clamp-2 mt-1">
                    {item.desc || item.properties || item.feature || item.damageType || "Clique para ver detalhes completos."}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Coluna Direita: Painel de Detalhes Completo */}
          <div className="overflow-y-auto max-h-[48vh] md:max-h-[58vh] p-4 flex flex-col justify-between bg-black/20">
            {selectedItem ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-bold font-serif text-white">{selectedItem.name}</h3>
                    {selectedItem.level !== undefined && (
                      <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase shadow-sm" style={{ backgroundColor: currentTheme.primary, color: "#000" }}>
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
                    <p className="text-xs text-sky-300 uppercase tracking-wider">{selectedItem.category}</p>
                  )}
                  {selectedItem.className && (
                    <p className="text-xs text-purple-300 uppercase tracking-wider">Habilidade de {selectedItem.className} (Nível {selectedItem.level})</p>
                  )}
                </div>

                {/* Bloco de Atributos Chave */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {selectedItem.damage && (
                    <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-900/50">
                      <span className="text-red-300/70 block">Dano / Tipo:</span>
                      <span className="font-bold text-red-200 text-sm">{selectedItem.damage} {selectedItem.damageType || ""}</span>
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
                  {selectedItem.weight && (
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-white/50 block">Peso:</span>
                      <span className="font-bold text-white">{selectedItem.weight}</span>
                    </div>
                  )}
                  {selectedItem.skills && (
                    <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-900/40 col-span-2">
                      <span className="text-emerald-300/70 block">Perícias Concedidas:</span>
                      <span className="font-bold text-emerald-200">{selectedItem.skills}</span>
                    </div>
                  )}
                  {selectedItem.tools && selectedItem.tools !== "Nenhuma" && (
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                      <span className="text-white/50 block">Ferramentas:</span>
                      <span className="font-bold text-white">{selectedItem.tools}</span>
                    </div>
                  )}
                  {selectedItem.languages && selectedItem.languages !== "Nenhum" && (
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                      <span className="text-white/50 block">Idiomas:</span>
                      <span className="font-bold text-white">{selectedItem.languages}</span>
                    </div>
                  )}
                </div>

                {/* Característica de Antecedente */}
                {selectedItem.feature && (
                  <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
                      <Award size={14} />
                      Característica de Antecedente:
                    </h4>
                    <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-serif">
                      {selectedItem.feature}
                    </p>
                  </div>
                )}

                {/* Equipamento Inicial de Antecedente */}
                {selectedItem.equipment && (
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs">
                    <span className="text-white/50 block font-bold uppercase mb-1">Equipamento Inicial Concedido:</span>
                    <p className="text-white/80">{selectedItem.equipment}</p>
                  </div>
                )}

                {/* Descrição Completa das Regras Oficiais */}
                {selectedItem.desc && (
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1">
                      Regra Oficial (Livro do Jogador 5e):
                    </h4>
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed whitespace-pre-line font-serif">
                      {selectedItem.desc}
                    </p>
                  </div>
                )}

                {/* Botões de Ação Direta para a Ficha */}
                <div className="pt-3 flex flex-wrap gap-2">
                  {/* Botão de Adicionar Arma aos Ataques */}
                  {onAddWeapon && selectedItem.damage && (
                    <button
                      onClick={() => {
                        onAddWeapon(selectedItem);
                        triggerFeedback(`"${selectedItem.name}" adicionada aos Ataques da ficha!`);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg hover:scale-[1.02] active:scale-95"
                      style={{ backgroundColor: currentTheme.primary, color: "#000" }}
                    >
                      <Sword size={15} />
                      Adicionar aos Ataques
                    </button>
                  )}

                  {/* Botão de Adicionar ao Equipamento (para Armas, Armaduras e Itens de Aventura) */}
                  {onAddEquipment && (selectedItem.cost || selectedItem.weight || selectedItem.damage || selectedItem.acFormula) && (
                    <button
                      onClick={() => {
                        onAddEquipment(selectedItem);
                        triggerFeedback(`"${selectedItem.name}" adicionado à mochila de Equipamento!`);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white active:scale-95"
                    >
                      <Package size={15} className="text-amber-400" />
                      Adicionar ao Equipamento
                    </button>
                  )}

                  {/* Botão de Aprender Magia */}
                  {onAddSpell && selectedItem.castingTime && (
                    <button
                      onClick={() => {
                        onAddSpell(selectedItem);
                        triggerFeedback(`Magia "${selectedItem.name}" adicionada ao Grimório da ficha!`);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg hover:scale-[1.02] active:scale-95"
                      style={{ backgroundColor: currentTheme.primary, color: "#000" }}
                    >
                      <Sparkles size={15} />
                      Aprender Magia
                    </button>
                  )}

                  {/* Botão de Aplicar Antecedente */}
                  {onApplyBackground && selectedItem.skills && selectedItem.feature && (
                    <button
                      onClick={() => {
                        onApplyBackground(selectedItem);
                        triggerFeedback(`Antecedente "${selectedItem.name}" aplicado à ficha com perícias e equipamentos!`);
                      }}
                      className="w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg hover:scale-[1.01] active:scale-95 text-black"
                      style={{ backgroundColor: currentTheme.primary }}
                    >
                      <Compass size={15} />
                      Aplicar este Antecedente à Ficha
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 text-white/40">
                <BookOpen size={48} className="mb-3 opacity-30" />
                <p className="text-sm font-semibold text-white/70">Nenhum item selecionado</p>
                <p className="text-xs mt-1 max-w-xs">
                  Selecione qualquer elemento na lista para ler suas regras oficiais completas, dados de dano, fórmulas de CA e adicionar à sua ficha.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
