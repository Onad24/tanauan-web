# Wiki Log

> Chronological record of all wiki actions. Append-only.
> Format: `## [YYYY-MM-DD] action | subject`
> Actions: ingest, update, query, lint, create, archive, delete

## [2026-09-12] create | Wiki initialized
- Domain: Municipality of Tanauan, Leyte (AI assistant knowledge base)
- Created structure: SCHEMA.md, index.md, log.md, entities/, navigation.md
- Build script: scripts/build-knowledge-base.js (compiles wiki -> ragKnowledgeBase.json)

## [2026-09-12] create | Municipality core pages
- history.md, geography.md, demographics.md, language.md, religion.md, climate.md, vision-mission.md

## [2026-09-12] create | Culture & tourism pages
- assumption-church.md, culture-heritage.md, pasaka-festival.md, tanauan-airstrip.md, traditional-products.md, skimboarding.md, tourism-in-tanauan.md

## [2026-09-12] create | Governance & department pages
- municipal-government.md, mayors-office.md, departments-of-tanauan.md, dept-*.md (MSWDO, sanitation, assessors, GSO, vice-mayor-SB, licensing, treasurer, health), taxes-and-fees.md, barangays-of-tanauan.md, emergency-contacts.md

## [2026-09-12] create | Navigation reference
- navigation.md (site-page-to-topic map)

## [2026-09-12] build | Compiled ragKnowledgeBase.json
- Regenerated src/lib/ragKnowledgeBase.json from wiki via scripts/build-knowledge-base.js

## [2026-09-12] create | Remaining department pages
- dept-agriculture, dept-budget, dept-menro, dept-planning, dept-engineering, dept-accounting, dept-mdrrmo, dept-hrmo, dept-market, dept-procurement, dept-philhealth, dept-solo-parent, dept-pwd
- Updated departments-of-tanauan.md and index.md with new links
- Note: OSCA, Peso, LYDO, TAME, IT, Tourism, Cemetery, Dental, Day Care, Economic Enterprise, Slaughterhouse, Civil Registrar pages are empty stubs (no real content) — not authored to avoid inventing facts.

## [2026-09-12] build | Recompiled ragKnowledgeBase.json (29 -> 42 docs)