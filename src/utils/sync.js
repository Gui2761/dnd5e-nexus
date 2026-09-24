import LZString from "lz-string";

// Codifica a ficha em formato URL comprimido portátil
export function compressCharacterToUrl(character) {
  try {
    const jsonStr = JSON.stringify(character);
    return LZString.compressToEncodedURIComponent(jsonStr);
  } catch (err) {
    console.error("Erro ao comprimir ficha:", err);
    return null;
  }
}

// Decodifica a ficha a partir de uma string URL
export function decompressCharacterFromUrl(compressedStr) {
  try {
    if (!compressedStr) return null;
    const jsonStr = LZString.decompressFromEncodedURIComponent(compressedStr);
    if (!jsonStr) return null;
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error("Erro ao descomprimir ficha da URL:", err);
    return null;
  }
}

// Gera o link completo de compartilhamento
export function generateShareUrl(character) {
  const code = compressCharacterToUrl(character);
  if (!code) return window.location.href;
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set("sheet", code);
  return url.toString();
}

// Gera URL do gerador de QR Code gratuito e sem dependências pesadas
export function getQrCodeUrl(urlToEncode) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(urlToEncode)}&color=d4af37&bgcolor=18140c&margin=10`;
}

// Exporta como arquivo JSON
export function exportCharacterToFile(character) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(character, null, 2));
  const downloadAnchor = document.createElement("a");
  const fileName = (character.name || "personagem").toLowerCase().replace(/[^a-z0-9]/g, "_") + "_dnd5e.json";
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", fileName);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
