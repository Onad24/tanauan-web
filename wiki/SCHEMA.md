# Wiki Schema — Municipality of Tanauan, Leyte (AI Assistant Knowledge Base)

> This wiki is the **single source of truth** for the TANI AI assistant chatbox on the
> Tanauan, Leyte municipal website. It compiles the website's real page content into
> interlinked markdown. A build script (`scripts/build-knowledge-base.js`) compiles the
> wiki into `src/lib/ragKnowledgeBase.json`, which the `/api/rag-search` endpoint serves
> to the chatbox.

## Domain
Official information about the Municipality of **Tanauan, Leyte**, Philippines: history,
geography, demographics, language, religion, culture & tourism, governance (officials,
departments, services), taxes & fees, and emergency/contact information.

## Location
`wiki/` in the project root of `tanauan-leyte-clone`. Build output:
`src/lib/ragKnowledgeBase.json`.

## Conventions
- File names: lowercase, hyphens, no spaces (e.g. `pasaka-festival.md`).
- Every page starts with YAML frontmatter.
- Use `[[wikilinks]]` to cross-link pages (minimum 2 outbound links per page).
- Every page carries a `url:` (the website route it describes) so the assistant can cite it.
- Bump `updated` when editing.
- Register every page in `index.md` under its section; append actions to `log.md`.
- **Fact discipline:** Never invent facts. Only assert what the website pages state.
  Where the website seed data is clearly placeholder/dummy (e.g. generic barangay
  contacts, DRAM-filled company names), omit or flag it rather than propagate.
- **Currency:** Philippine Pesos (₱). Never use `$`.
- The assistant may hold only what this wiki contains plus its system prompt rules.

## Frontmatter
```yaml
---
title: Page Title
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: entity | concept | place | department | service | fest | page
tags: [from taxonomy below]
url: /website-route
---
```

## Tag Taxonomy
Define new tags in this list **before** using them.
- **Place/Geography:** geography, location, climate, barangay, infrastructure
- **Culture:** history, language, religion, tourism, festival, food, heritage, music, sport
- **Governance:** government, official, department, service, tax, finance, transparency
- **Meta:** reference, navigation, directory, contact

## Layer layout
- `wiki/entities/` — entity/topic pages (history, departments, festivals, officials, products)
- `wiki/navigation.md` — site navigation & directory reference (kept separate so the
  assistant can always guide visitors to the right page)
- `wiki/index.md` — catalog
- `wiki/log.md` — action log
- `wiki/SCHEMA.md` — this file
- `scripts/build-knowledge-base.js` — compiles wiki → `ragKnowledgeBase.json`

## Page Thresholds
- Create a page for any real municipal topic/site page.
- Don't create pages for placeholder/fabricated specifics (dummy barangay contacts).

## Update Policy
- Newer website content supersedes older.
- Flag contradictions with dates rather than silently overwriting.