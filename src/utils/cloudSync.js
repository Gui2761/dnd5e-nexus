const GIST_ID = "8c6b991167bae758b14fc2d129107f16";

export async function fetchPartyFromCloud() {
  try {
    // 1. Tenta via endpoint Vercel Serverless
    const res = await fetch("/api/sync");
    if (res.ok) {
      const data = await res.json();
      return data.characters || [];
    }
  } catch (e) {
    console.warn("Falha no /api/sync, tentando fallback direto no Gist:", e);
  }

  // 2. Fallback: Leitura pública direta do Gist
  try {
    const resGist = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: { Accept: "application/vnd.github.v3+json" }
    });
    if (resGist.ok) {
      const gistData = await resGist.json();
      const contentStr = gistData.files["party.json"]?.content || "{}";
      const parsed = JSON.parse(contentStr);
      return parsed.characters || [];
    }
  } catch (err) {
    console.error("Erro ao buscar grupo na nuvem:", err);
  }

  return [];
}

export async function saveCharacterToCloud(character) {
  try {
    const res = await fetch("/api/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ character })
    });
    if (res.ok) {
      const result = await res.json();
      return { success: true, characters: result.characters };
    }
    const errText = await res.text();
    return { success: false, error: errText };
  } catch (err) {
    console.error("Erro ao salvar personagem na nuvem:", err);
    return { success: false, error: err.message };
  }
}
