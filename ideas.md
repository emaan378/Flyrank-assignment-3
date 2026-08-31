# CodeTrack Design Direction

## Three stylistic approaches

### Approach 1 — Quiet Systems
**Very Brief Intro:** A light, editorial productivity interface with warm paper tones, ink-like typography, and restrained green accents. It feels calm, reflective, and built for deliberate learning rather than speed.

**Probability:** 0.06

### Approach 2 — Signal Desk
**Very Brief Intro:** A dark, instrument-panel-inspired developer workspace with warm amber signal lights, crisp data cards, and subtle technical grid textures. It feels focused, precise, and quietly motivating.

**Probability:** 0.03

### Approach 3 — Field Notes
**Very Brief Intro:** A tactile notebook system with cream surfaces, cobalt annotations, paper-like layers, and a playful but mature study-room atmosphere. It makes revision feel personal and memorable.

**Probability:** 0.08

## Selected approach: Signal Desk

### Design Movement
Neo-industrial information design: a restrained developer-tool interface that borrows from observability dashboards, workshop labels, and instrument panels without becoming cyberpunk or overly futuristic.

### Core Principles
1. **Evidence over decoration.** Every visual treatment should help the user scan, classify, remember, or act on a problem.
2. **Warm precision.** Technical information is paired with a human, slightly tactile visual language so revision feels encouraging rather than clinical.
3. **Asymmetric hierarchy.** Use a persistent left rail, offset content groups, narrow labels, and wide reading surfaces instead of a generic centered SaaS grid.
4. **Quiet feedback.** Motion and color signal state changes with restraint; nothing competes with the user's notes.

### Color Philosophy
The interface uses a deep ink-blue foundation to create focus, with a warm amber signature color for active intent, review reminders, and primary actions. Muted mineral greens and clay reds distinguish progress states without relying on color alone. The palette should feel like a well-lit instrument panel at dusk: high contrast, calm, and readable.

### Layout Paradigm
A persistent sidebar anchors navigation and identity. Main content uses an offset two-column workspace: a wide reading/working surface on the left and compact evidence panels on the right. Landing sections use a diagonal editorial rhythm with a prominent hero module, staggered feature rows, and an anchored CTA rather than repeated centered cards.

### Signature Elements
- A small amber “signal dot” motif used for active navigation, review flags, and status markers.
- Technical eyebrow labels rendered in uppercase mono type, such as `01 / LIBRARY` and `FIELD NOTE`.
- Thin instrument-rule dividers and subtle blueprint grid textures in hero and dashboard surfaces.

### Interaction Philosophy
Interactions should feel like operating a dependable tool. Primary actions are direct and labeled. Destructive actions require a clear confirmation. Hover states reveal depth through a small lift and amber edge, while keyboard focus is obvious and never dependent on hover. Toasts confirm saves and deletes without interrupting the workflow.

### Animation
Use 160–220ms ease-out transitions for buttons, cards, drawers, and focus states. Page sections may enter with a small upward translate and opacity shift, staggered by 40ms, but the app should remain fully understandable without motion. Avoid animated layout shifts. Respect `prefers-reduced-motion` by disabling non-essential transforms and entrance animations.

### Typography System
Use **Space Grotesk** for display headings and navigation labels, paired with **DM Sans** for readable body copy. Use **IBM Plex Mono** for metadata, complexity notation, IDs, and technical eyebrow labels. Headings should be compact and confident; body text should remain relaxed at 1.55–1.7 line height.

### Brand Essence
CodeTrack is a personal revision console for developers who want to remember the reasoning behind every solved problem—not just collect checkmarks.

**Personality:** precise, reflective, quietly ambitious.

### Brand Voice
Headlines are concise and purposeful. CTAs are active and specific. Microcopy is candid, helpful, and never inflated.

Example lines:

> **Track the thinking, not just the answer.**

> **Put the hard ones somewhere you'll actually return to.**

### Wordmark & Logo
The mark is a compact amber square containing three offset horizontal “track” lines that step upward like a tiny progression chart. The wordmark uses a custom treatment of `CodeTrack` with the capital C and T slightly inset, suggesting a connected path. The symbol should work independently as the sidebar mark and favicon.

### Signature Brand Color
**Signal Amber — `#F4B942`**. It is warm enough to feel personal, distinct from default blue developer tooling, and reserved for moments that represent intention: add, review, active navigation, and progress.

## Product decisions

### Canonical problem record
```js
{
  id: "string",
  title: "string",
  platform: "string",
  url: "string",
  difficulty: "easy" | "medium" | "hard",
  status: "solved" | "in-progress",
  topic: "string",
  notes: "string",
  approach: "string",
  timeComplexity: "string",
  spaceComplexity: "string",
  mistakes: "string",
  reviewLater: boolean,
  createdAt: "ISO date string",
  updatedAt: "ISO date string"
}
```

The MVP will use client-side routing with Wouter, localStorage persistence with resilient parsing, derived statistics, accessible dialogs, and responsive layouts. Search will be case-insensitive and match title, topic, notes, and approach. Difficulty and status filters will combine with AND logic.

### Implementation scope

The first build prioritizes the library, CRUD flows, dashboard, Review Later, search/filtering, persistence, responsive behavior, and accessibility. The landing page and Signal Desk visual polish will be layered on after the core workflow is stable. Import/export and review history remain future enhancements rather than MVP requirements.
