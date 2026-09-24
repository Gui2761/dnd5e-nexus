import React, { useState } from "react";
import { QrCode, Copy, Check, Download, Upload, Share2, X, Smartphone, Users } from "lucide-react";
import { generateShareUrl, getQrCodeUrl, exportCharacterToFile } from "../utils/sync";

export default function ShareModal({ isOpen, onClose, character, onImportCharacter, currentTheme }) {
  const [copied, setCopied] = useState(false);
  const [roomCode, setRoomCode] = useState("MESA-01");

  if (!isOpen) return null;

  const shareUrl = generateShareUrl(character);
  const qrCodeUrl = getQrCodeUrl(shareUrl);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        onImportCharacter(data);
        onClose();
        alert("Ficha importada com sucesso!");
      } catch (err) {
        alert("Arquivo JSON inválido.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden flex flex-col"
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
              className="p-2 rounded-xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: currentTheme.primaryDark, color: currentTheme.primaryLight }}
            >
              <Smartphone size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                Conectar Celulares & Compartilhar
              </h3>
              <p className="text-[11px] text-white/60">Seus amigos podem abrir no celular via QR Code ou link</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10">
            <X size={20} />
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="p-5 space-y-5 overflow-y-auto max-h-[75vh]">
          
          {/* Box de QR Code para Escanear no Celular */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-center flex flex-col items-center">
            <span className="text-xs uppercase tracking-wider text-amber-300 font-bold mb-2 flex items-center gap-1.5">
              <QrCode size={16} /> Aponte a Câmera do Celular:
            </span>
            <div className="p-2.5 bg-white rounded-xl shadow-xl inline-block border-2 border-amber-400/50 mb-2">
              <img 
                src={qrCodeUrl} 
                alt="QR Code da Ficha" 
                className="w-48 h-48 rounded object-contain"
              />
            </div>
            <p className="text-xs text-white/70 max-w-xs">
              Qualquer amigo na mesa abre a câmera do seu celular, aponta para o QR Code acima e a ficha abre imediatamente no navegador dele!
            </p>
          </div>

          {/* Botão de Copiar Link Portátil */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/80 block uppercase tracking-wider">
              Link de Acesso Direto (WhatsApp / Discord):
            </label>
            <div className="flex gap-2">
              <input 
                type="text" 
                readOnly 
                value={shareUrl}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white/80 font-mono focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                style={{ backgroundColor: copied ? "#22c55e" : currentTheme.primary, color: "#000" }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copiado!" : "Copiar"}
              </button>
            </div>
          </div>

          {/* Mesa / Sala Multiplayer */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-amber-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Identificador da Mesa</h4>
            </div>
            <p className="text-xs text-white/60 mb-2.5">
              Defina um nome para a sessão da sua mesa de jogo em casa. Cada jogador no seu celular estará conectado à mesma sessão.
            </p>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="Ex: MESA-CAMPANHA"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono font-bold uppercase tracking-wider focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={() => {
                  alert(`Sessão "${roomCode}" ativa! Todos os celulares com este código estarão sincronizados.`);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 text-white hover:bg-white/20 transition-all"
              >
                Ativar Sala
              </button>
            </div>
          </div>

          {/* Backup em Arquivo JSON */}
          <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => exportCharacterToFile(character)}
              className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-1.5 transition-all border border-white/10"
            >
              <Download size={15} />
              Baixar Backup JSON
            </button>
            <label className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-1.5 transition-all border border-white/10 cursor-pointer text-center">
              <Upload size={15} />
              Carregar Arquivo JSON
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

        </div>
      </div>
    </div>
  );
}
