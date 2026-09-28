#!/usr/bin/env node
/**
 * build-knowledge-base.js
 *
 * Compiles the Karpathy-style LLM wiki (`wiki/`) into `src/lib/ragKnowledgeBase.json`,
 * which the TANI AI assistant consumes via the `/api/rag-search` endpoint.
 *
 * Usage:  node scripts/build-knowledge-base.js
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const WIKI_DIR = join(ROOT, 'wiki');
const ENTITIES_DIR = join(WIKI_DIR, 'entities');
const OUT = join(ROOT, 'src', 'lib', 'ragKnowledgeBase.json');

const SITE_BASE = 'https://tanauan-leyte-gov-locale.vercel.app';

function parseFrontmatter(raw) {
  const fm = {};
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (m) {
    for (const line of m[1].split('\n')) {
      const idx = line.indexOf(':');
      if (idx === -1) continue;
      const k = line.slice(0, idx).trim();
      let v = line.slice(idx + 1).trim();
      v = v.replace(/^['"]|['"]$/g, '');
      fm[k] = v;
    }
  }
  return fm;
}

function markdownBody(raw) {
  // Everything after the closing '---' of frontmatter
  const m = raw.match(/^---\n[\s\S]*?\n---\n?([\s\S]*)$/);
  return m ? m[1].trim() : raw.trim();
}

// Strip markdown formatting for clean tokenization (keep it readable though)
function toCleanText(md) {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')        // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')       // inline links -> text
    .replace(/#{1,6}\s*/g, '')                     // heading markers
    .replace(/\[\[([^\]|]+)(\|[^\]]*)?\]\]/g, '$1') // wikilinks -> text
    .replace(/^\s*[-*]\s+/gm, '')                  // list bullets
    .replace(/\*\*|__/g, '')                       // bold
    .replace(/\*/g, '')                            // italic
    .replace(/`/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function build() {
  const files = readdirSync(ENTITIES_DIR).filter((f) => f.endsWith('.md')).sort();
  const documents = [];
  const usedUrls = new Set();

  for (const f of files) {
    const raw = readFileSync(join(ENTITIES_DIR, f), 'utf8');
    const fm = parseFrontmatter(raw);
    const body = markdownBody(raw);
    const title = fm.title || f.replace('.md', '');

    // Real content = body (clean text); wikilinks become plain page titles
    const content = toCleanText(body);

    let url = fm.url || '/';
    if (url === '/') url = `${SITE_BASE}/`;
    else url = `${SITE_BASE}${url.startsWith('/') ? url : '/' + url}`;

    documents.push({
      id: f.replace('.md', ''),
      title,
      content,
      url,
      tags: (fm.tags || '')
        .replace(/[[\]]/g, '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    });
    usedUrls.add(url);
  }

  // Navigation map is a separate reference document (not an entity)
  const navRaw = readFileSync(join(WIKI_DIR, 'navigation.md'), 'utf8');
  const navFm = parseFrontmatter(navRaw);
  const navBody = markdownBody(navRaw);
  documents.push({
    id: 'website-navigation',
    title: navFm.title || 'Website Navigation Map',
    content: toCleanText(navBody),
    url: `${SITE_BASE}/`,
    tags: ['navigation', 'reference', 'directory'],
  });

  const knowledgeBase = {
    metadata: {
      municipality: 'Tanauan',
      province: 'Leyte',
      region: 'Eastern Visayas',
      country: 'Philippines',
      primaryLanguage: 'Waray-Waray',
      website: SITE_BASE,
      totalPages: documents.length,
      note:
        'This knowledge base is compiled from the Karpathy-style LLM wiki in /wiki. It contains verified information from the official Tanauan website. The AI assistant must only use this information and cite source URLs. Do not add unverified claims or hallucinated facts. Always provide actual links to users.',
    },
    documents,
  };

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(knowledgeBase, null, 2));
  console.log(`Wrote ${documents.length} documents to ${OUT}`);
  return knowledgeBase;
}

// Also print a quick sanity summary
const kb = build();
console.log('Total chars of content:', kb.documents.reduce((s, d) => s + d.content.length, 0));