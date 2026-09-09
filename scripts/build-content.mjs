// CONTENT BUILD: compiles the editable sources under content/ into the flat
// JSON files under data/ that the static SPA fetches at runtime.
//
// The SPA itself has no build step — this script only reshapes content so it
// can be edited as structured files (Pages CMS) instead of hand-written HTML.
// It runs in CI (see .github/workflows/build-content.yml); the produced
// data/*.json is committed so the site works without a local toolchain.

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const PROJECTS_SRC = 'content/projects';
const PROJECTS_OUT = 'data/projects.json';

// normalise: gray-matter yields '' for empty YAML scalars; treat as absent.
const clean = (v) => {
  const s = typeof v === 'string' ? v.trim() : v;
  return s === '' || s === undefined || s === null ? null : s;
};

const toTags = (v) => {
  if (Array.isArray(v)) return v.map((t) => String(t).trim()).filter(Boolean);
  if (typeof v === 'string')
    return v.split(',').map((t) => t.trim()).filter(Boolean);
  return [];
};

async function buildProjects() {
  const files = (await readdir(PROJECTS_SRC))
    .filter((f) => f.endsWith('.md'))
    .sort();

  const projects = [];
  for (const file of files) {
    const raw = await readFile(join(PROJECTS_SRC, file), 'utf8');
    const { data, content } = matter(raw);
    const body = content.trim();
    const title = clean(data.title) || file.replace(/\.md$/, '');

    projects.push({
      slug: file.replace(/\.md$/, ''),
      title,
      wordmark: clean(data.wordmark) || title,
      icon: clean(data.icon) || 'cube',
      image: clean(data.image),
      tags: toTags(data.tags),
      repo: clean(data.repo),
      demo: clean(data.demo),
      order: Number.isFinite(data.order) ? data.order : 99,
      featured: Boolean(data.featured),
      description: body,
      descriptionHtml: body ? marked.parse(body) : '',
    });
  }

  projects.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, 'fr'));

  await writeFile(PROJECTS_OUT, JSON.stringify(projects, null, 2) + '\n');
  console.log(`build-content: wrote ${projects.length} projects -> ${PROJECTS_OUT}`);
}

await buildProjects();
