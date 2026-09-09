// DATA LAYER: raw fetch calls against the static JSON/Markdown files under data/.
// No caching beyond the browser's — cache: 'no-cache' forces revalidation on every call.

// MANIFEST FETCH: loads the ordered list of navigable sections.
export async function loadManifest() {
  const res = await fetch('data/manifest.json', { cache: 'no-cache' });
  if (!res.ok) throw new Error(`data/manifest.json : HTTP ${res.status}. Vérifiez que le dossier "data" existe à côté d'index.html et que le site est servi en HTTP (pas file://).`);
  return res.json();
}

// SITE FETCH: loads the site-wide identity block (name, role, contacts).
export async function loadSite() {
  const res = await fetch('data/site.json', { cache: 'no-cache' });
  if (!res.ok) throw new Error(`data/site.json : HTTP ${res.status}. Fichier manquant ou nom incorrect (la casse compte sur GitHub Pages).`);
  return res.json();
}

// SECTION FETCH: loads one section's Markdown file and converts it to HTML.
export async function loadSection(section) {
  const res = await fetch('data/' + section.file, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`data/${section.file} : HTTP ${res.status}. Fichier manquant ou nom incorrect (la casse compte sur GitHub Pages).`);
  return marked.parse(await res.text());
}

// SECTION DATA FETCH: loads a structured section (JSON), e.g. the projects list.
// Used for sections that declare `data` instead of `file` in the manifest and
// are rendered by an Alpine template rather than injected as raw HTML.
export async function loadSectionData(section) {
  const res = await fetch('data/' + section.data, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`data/${section.data} : HTTP ${res.status}. Fichier manquant ou nom incorrect (la casse compte sur GitHub Pages).`);
  return res.json();
}
