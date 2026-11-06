const fs = require('fs');
const path = require('path');

function findMetadataFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findMetadataFiles(fullPath, files);
    } else if (entry.name === 'metadata.json') {
      files.push(fullPath);
    }
  }
  return files;
}

function generateManifest() {
  const rootDir = process.cwd();
  const metadataFiles = findMetadataFiles(rootDir);
  const notes = [];

  for (const file of metadataFiles) {
    try {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      const dir = path.dirname(file);
      
      if (!data.id || !data.title || !data.filePath) {
        console.warn(`⚠️ Skipping invalid metadata: ${file}`);
        continue;
      }

      const htmlPath = path.join(dir, data.filePath);
      if (!fs.existsSync(htmlPath)) {
        console.warn(`⚠️ HTML file missing for ${data.id}: ${htmlPath}`);
        continue;
      }

      notes.push({ ...data, slug: data.slug || data.id, published: data.published !== false });
    } catch (err) {
      console.error(`❌ Error parsing ${file}:`, err.message);
    }
  }

  notes.sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0) || a.title.localeCompare(b.title));

  const manifest = {
    schemaVersion: 1,
    lastUpdated: new Date().toISOString(),
    notes
  };

  fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2));
  console.log(`✅ Manifest generated with ${notes.length} notes.`);
}

generateManifest();
