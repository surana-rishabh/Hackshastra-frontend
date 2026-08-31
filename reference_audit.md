# HackShastra Frontend — Reference Audit

## Audit Date

2026-08-30

## References

### Existing HackShastra
https://www.hackshastrasrmuap.dev/

### Primary visual reference
https://vigilante.group/

### Secondary visual / interaction reference
https://www.dragonfly.xyz/

### Tertiary inspiration
https://dribbble.com/tags/web-scraping

---

# 1. Existing HackShastra Website

The current public site establishes the information/content baseline that the redesign must preserve.

Observed homepage content includes:

- HackShastra SRM-AP / Student Chapter identity
- Public navigation with Join Us / Contact
- Community introduction
- Events
- Upcoming Events
- Completed Events
- Mission
- Creator-led movement positioning
- Student empowerment
- Innovation first
- Builder culture
- SRM-AP chapter details
- Location information

Observed event content includes:

- Block Forge — Blockchain Workshop & Hackathon
- AI Innovators Meetup
- TEXPO'26 — Student Innovation & Industry Technology Expo

The homepage currently communicates HackShastra as a student-led technology community and launchpad for creators, coders, designers, and builders.

Important rule:

The redesign should preserve the actual information architecture/content intent, even where the visual composition changes substantially.

The live crawler does not expose the complete underlying CSS/JS/component implementation, so the repository remains the authoritative source for exact current styles and routes.

Source: https://www.hackshastrasrmuap.dev/

---

# 2. Vigilante Analysis

The current Vigilante website uses a highly editorial, art-directed production-studio language.

Observed structure:

- Compact navigation
- Film / Directors / Post
- Stills / Photographers
- Immersive
- About
- Contact
- Large statement-led hero
- Featured case study
- Large image-led work presentation
- Short editorial description
- Strong contact CTA
- Large footer/contact area

The homepage uses major statements rather than many UI cards. It treats work and imagery as the primary visual language.

Important patterns to borrow:

- Oversized display typography
- Strong vertical pacing
- Large image blocks
- Case-study-like content presentation
- Editorial whitespace
- Minimal but high-impact navigation
- Strong CTA moments
- Scroll-driven storytelling potential
- Repeated visual rhythm
- Content sections that feel like chapters

Do NOT copy its branding, copy, imagery, exact layouts, or source implementation.

Source: https://vigilante.group/

---

# 3. Dragonfly Analysis

Dragonfly provides a particularly useful reference for translating the editorial approach into a technology/community context.

Observed page structure:

- About
- Writing
- Team
- Portfolio
- Careers
- Contact
- Large numbered sections
- Short explanatory statements
- Editorial writing index
- Team directory with images and "Show Bio"
- Portfolio spotlight
- Portfolio filtering/index
- Careers CTA
- Strong footer navigation/connect area

Dragonfly's homepage is strongly information-architected while still feeling like an editorial publication rather than a conventional corporate site.

Useful patterns for HackShastra:

## Numbered section system

```text
01 About
02 Writing
03 Team
04 Portfolio
05 Careers
```

Adapt this to HackShastra:

```text
01 Community
02 Events
03 Builds
04 People
05 Stories
06 Contact
```

## Index / filtering

Dragonfly uses a portfolio index with categories and an alphabetic/list structure.

Potential HackShastra adaptation:

```text
ALL
HACKATHONS
WORKSHOPS
MEETUPS
COMPETITIONS
```

and/or a chronological event index.

## Team presentation

Team members are presented as a serious content layer rather than decorative profile cards.

For HackShastra:

- Lead/member image
- Name
- Role
- Bio
- Social links

A "Show Bio" interaction is a useful pattern.

## Writing section

Dragonfly treats writing as part of the organisation's identity rather than an isolated blog card grid.

HackShastra could use:

```text
Stories
Build Logs
Technical Articles
Event Recaps
Community Notes
```

## Portfolio concept

HackShastra's community projects can use the same conceptual treatment:

```text
Builds / Projects
```

with an index and project showcase rather than generic cards.

## Careers / participation equivalent

Instead of copying Careers:

```text
JOIN THE COMMUNITY
BECOME A LEAD
BUILD WITH US
CONTRIBUTE
```

could become a strong community CTA.

Source: https://www.dragonfly.xyz/

---

# 4. Dribbble Web Scraping Reference

Use this only for utility/data-interface ideas.

Useful patterns found in current Dribbble search results include:

- Structured dashboard information
- Clear status states
- Progress indicators
- Data tables
- Filters
- Selectors
- Usage/analytics display
- Dense metadata
- Developer-tool visual language

These are more appropriate for:

- Future admin dashboard
- Registration management
- Event capacity/status
- Project moderation
- Analytics

They should NOT dominate the public HackShastra website.

Source examples:
- https://dribbble.com/shots/26571321-Dashboard-UI-for-an-AI-Scraping-Tool
- https://dribbble.com/search/developer-dashboard

---

# 5. Combined Design Direction

The most promising synthesis is:

```text
HackShastra
content + community identity
        +
Vigilante
editorial / bold / cinematic pacing
        +
Dragonfly
numbered sections / indexes / people / writing / portfolio structure
        +
Dribbble
utility / data / status patterns where appropriate
        +
HackShastra Blue
#0DA5F0
```

This should not look like any one reference.

The intended result is:

```text
Experimental technology community
+
Editorial publication
+
Creative studio
+
Interactive portfolio
```

---

# 6. Motion Direction Identified

The redesign should consider:

- Scroll stretch
- Image parallax
- Headline reveal
- Mask/clip-path transitions
- Pinned storytelling
- Horizontal project/event rail
- Scale-and-settle image transitions
- Page curtains
- Magnetic CTA interactions
- Arrow/icon micro-motion
- Staggered lists
- Scroll-linked metadata
- Number counter animations
- Section chapter transitions
- Marquee/ticker used sparingly

Motion must remain subordinate to content and must degrade gracefully on mobile and reduced-motion settings.

---

# 7. Typography Direction Identified

Initial candidates:

Primary display:
`Space Grotesk`

Body/UI:
`Inter`

Alternative display:
`Bricolage Grotesque`

The final font selection is NOT yet locked.

Font choice will be finalized after the user's answers and visual-system pass.

---

# 8. Palette Direction Identified

The user has locked the primary brand color:

`#0DA5F0`

A neutral + blue system is preferable to a blue-heavy UI.

A likely palette family is:

```text
Brand Blue      #0DA5F0
Deep Ink        #071014
Paper           #F4F7F8
White           #FFFFFF
Cool Grey       #A8B3BA
Dark Grey       #35434B
Blue Tint       #E8F7FE
Light Blue      #8DD9FA
Deep Blue       #0877AF
Dark Blue       #03415F
```

This is a proposed starting palette, NOT finally locked until the user approves.

---

# 9. Backend Integration Constraint

The frontend must be designed around the already-developed HackShastra backend.

Important clarification:

"EJS" is a server-side templating engine and is not itself a JavaScript module system.

The frontend execution plan therefore needs to know whether the backend means:

1. Express + EJS views, or
2. Express using native ES modules (`import` / `export`), with EJS for server-rendered views, or
3. another EJS-based architecture.

The frontend API integration layer must match the actual backend endpoints and response shapes rather than assuming a generic REST structure.

---

# 10. Research Conclusion

The strongest direction is NOT "copy Vigilante".

Instead:

```text
HackShastra's real content
        ↓
Dragonfly's structured editorial storytelling
        ↓
Vigilante's art-directed visual intensity
        ↓
Selective Dribbble utility patterns
        ↓
#0DA5F0 brand system
        ↓
Scroll / stretch / transition-heavy interaction language
```

This is the basis for the next design-system phase once the outstanding questions are answered.
