// Vercel Serverless Function: Cloud Party Sync
const GIST_ID = '8c6b991167bae758b14fc2d129107f16';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // 1. GET: Fetch all characters from the cloud party
    if (req.method === 'GET') {
      const response = await fetch('https://api.github.com/gists/' + GIST_ID, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'DnD5e-Nexus'
        }
      });
      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch party data' });
      }
      const data = await response.json();
      const contentStr = data.files['party.json']?.content || '{"characters":[]}';
      const parsed = JSON.parse(contentStr);
      return res.status(200).json(parsed);
    }

    // 2. POST: Save or update a character in the cloud party
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const character = body.character || body;

      if (!character || !character.name) {
        return res.status(400).json({ error: 'Character data with name required' });
      }

      // Fetch current party
      const getRes = await fetch('https://api.github.com/gists/' + GIST_ID, {
        headers: {
          'Authorization': 'token ' + GITHUB_TOKEN,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'DnD5e-Nexus'
        }
      });
      const currentGist = await getRes.json();
      const currentContent = JSON.parse(currentGist.files['party.json']?.content || '{"characters":[]}');
      
      let chars = currentContent.characters || [];
      const charId = character.id || character.name.toLowerCase().replace(/\s+/g, '_');
      character.id = charId;
      character.updatedAt = new Date().toISOString();

      const existingIndex = chars.findIndex(c => c.id === charId || c.name.toLowerCase() === character.name.toLowerCase());
      if (existingIndex >= 0) {
        chars[existingIndex] = character;
      } else {
        chars.push(character);
      }

      currentContent.characters = chars;

      // Save back to Gist
      const patchRes = await fetch('https://api.github.com/gists/' + GIST_ID, {
        method: 'PATCH',
        headers: {
          'Authorization': 'token ' + GITHUB_TOKEN,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'User-Agent': 'DnD5e-Nexus'
        },
        body: JSON.stringify({
          files: {
            'party.json': {
              content: JSON.stringify(currentContent, null, 2)
            }
          }
        })
      });

      if (!patchRes.ok) {
        const errText = await patchRes.text();
        return res.status(patchRes.status).json({ error: 'Failed to update Gist', detail: errText });
      }

      return res.status(200).json({ success: true, character, totalCharacters: chars.length, characters: chars });
    }

    // 3. DELETE: Remove a character by id or name
    if (req.method === 'DELETE') {
      const charId = req.query?.id || (req.body && (typeof req.body === 'string' ? JSON.parse(req.body).id : req.body.id));
      const charName = req.query?.name || (req.body && (typeof req.body === 'string' ? JSON.parse(req.body).name : req.body.name));

      if (!charId && !charName) {
        return res.status(400).json({ error: 'Character id or name required for deletion' });
      }

      const getRes = await fetch('https://api.github.com/gists/' + GIST_ID, {
        headers: {
          'Authorization': 'token ' + GITHUB_TOKEN,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'DnD5e-Nexus'
        }
      });
      const currentGist = await getRes.json();
      const currentContent = JSON.parse(currentGist.files['party.json']?.content || '{"characters":[]}');
      
      let chars = currentContent.characters || [];
      chars = chars.filter(c => {
        if (charId && (c.id === charId || c.name?.toLowerCase().replace(/\s+/g, '_') === charId)) return false;
        if (charName && c.name?.toLowerCase() === charName.toLowerCase()) return false;
        return true;
      });

      currentContent.characters = chars;

      const patchRes = await fetch('https://api.github.com/gists/' + GIST_ID, {
        method: 'PATCH',
        headers: {
          'Authorization': 'token ' + GITHUB_TOKEN,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'User-Agent': 'DnD5e-Nexus'
        },
        body: JSON.stringify({
          files: {
            'party.json': {
              content: JSON.stringify(currentContent, null, 2)
            }
          }
        })
      });

      if (!patchRes.ok) {
        const errText = await patchRes.text();
        return res.status(patchRes.status).json({ error: 'Failed to update Gist', detail: errText });
      }

      return res.status(200).json({ success: true, totalCharacters: chars.length, characters: chars });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: err.message });
  }
}
