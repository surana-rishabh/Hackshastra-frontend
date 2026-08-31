# HackShastra Frontend — Master Design, Architecture & Execution Plan

## 0. Objective

Redesign the existing HackShastra frontend into a high-end interactive technology/community website.

The redesign must preserve:

- HackShastra's real content
- Existing business purpose
- Existing public information
- Event discovery and registration
- Blogs
- Projects
- Community information
- Contact flows
- Future CMS-driven content

while replacing the current visual language with a more editorial, experimental, technology-focused identity.

The design direction is a synthesis of:

```text
CURRENT HACKSHASTRA
content + information architecture

+

VIGILANTE
editorial scale + cinematic pacing + image-led storytelling

+

DRAGONFLY
numbered chapters + indexes + filters + structured lists + team presentation

+

DRIBBBLE
selective utility/data-interface patterns for dashboards and status UI

+

HACKSHASTRA BRAND
#0DA5F0

+

INTERACTIVE MOTION
scrolling + stretching + parallax + pinned scenes + transitions
```

The reference sites are inspiration only. Do not copy their branding, content, source code, imagery, or exact layouts.

---

# 1. Current Reference Audit

## 1.1 Existing HackShastra

The current site is the source of truth for the existing community story and content structure.

Observed content includes:

- HackShastra / SRM University-AP identity
- Community introduction
- Mission
- Student/community builder positioning
- Upcoming events
- Completed events
- Event cards/details
- Join/contact-oriented CTAs

Known event examples include:

- Block Forge — Blockchain Workshop & Hackathon
- AI Innovators Meetup
- TEXPO'26 — Student Innovation & Industry Technology Expo

The live page does not expose the complete underlying implementation to the web crawler, so the actual repository/source must be inspected before changing anything.

Source:
https://www.hackshastrasrmuap.dev/

---

# 2. Vigilante Reference

Vigilante uses a strongly art-directed production-studio presentation.

The current homepage exposes:

```text
Film
Directors
Post
Stills
Photographers
Immersive
About
Contact
```

followed by a large statement-led hero, featured work/case study, image-heavy work presentation, about copy, contact CTA, and footer/contact information.

Useful principles:

- Minimal navigation
- Oversized headline
- Short powerful statements
- Image-led sections
- Case-study treatment
- Large whitespace
- Strong vertical pacing
- Clear CTA moments
- Editorial rather than dashboard-like composition

Source:
https://vigilante.group/

---

# 3. Dragonfly Reference

Dragonfly is especially valuable for information architecture.

Its current site uses large numbered chapters such as:

```text
01 About
02 Writing
03 Team
04 Portfolio
05 Careers
```

It also has:

- Content category filtering
- Editorial writing index
- Team directory
- Expandable "Show Bio" interactions
- Portfolio spotlight
- A large alphabetical/indexed portfolio
- Careers CTA
- Structured footer navigation

Sources:
https://www.dragonfly.xyz/

The current page explicitly exposes content categories such as:

```text
all
comment-letter
legal
opinion
recruiting
research
```

and portfolio filters such as:

```text
all
cefi
defi
infrastructure
l1-l2s
nft
stablecoin
```

This makes Dragonfly a strong reference for HackShastra's:

```text
Event index
Project index
Blog/story index
Community people
Numbered sections
Filters
```

---

# 4. Dribbble Reference

Use:

https://dribbble.com/tags/web-scraping

only as a secondary inspiration source.

The collection contains data/interface work with:

- Status indicators
- Progress
- Dashboard layouts
- Structured data
- Filters
- Utility labels
- Tables
- Analytics-like presentation

These patterns should primarily inform the future:

```text
/admin
registration management
event capacity
project moderation
analytics
```

They should not dominate the public site.

---

# 5. Final Design Direction

The target is:

```text
Technology collective
+
Editorial magazine
+
Creative studio
+
Interactive portfolio
```

The public website should feel:

- Experimental
- Intelligent
- Human
- Technical
- Energetic
- Premium
- Editorial
- Confident
- Community-driven

Avoid:

- Generic SaaS design
- Generic college club templates
- Excessive glassmorphism
- Huge glowing gradients
- Card grids everywhere
- Excessive border-radius
- Random 3D effects
- Animation for decoration alone
- Generic "AI generated" visual effects

---

# 6. Brand Color System

The primary HackShastra color is locked:

```text
#0DA5F0
```

## Final initial palette

```text
BRAND BLUE       #0DA5F0
DEEP INK         #071014
PAPER            #F4F7F8
WHITE            #FFFFFF
COOL GREY        #A8B3BA
DARK GREY        #35434B

LIGHT BLUE       #8DD9FA
BLUE TINT        #E8F7FE
DEEP BLUE        #0877AF
DARKEST BLUE     #03415F
```

## Functional colors

```text
SUCCESS          #16A34A
WARNING          #F59E0B
ERROR            #DC2626
INFO             #0DA5F0
```

## Usage ratio

Start approximately at:

```text
60% neutral/light
30% deep dark/ink
10% blue
```

Blue is the brand accent, not the default fill for everything.

---

# 7. Light and Dark Modes

Use two art-directed surface modes.

## Light

```text
background: #F4F7F8
foreground: #071014
accent:     #0DA5F0
```

## Dark

```text
background: #071014
foreground: #F4F7F8
accent:     #0DA5F0
```

Do not alternate light/dark sections mechanically.

Use them to control visual pacing.

Good candidates for dark treatment:

- Hero
- Major statement sections
- Featured work
- CTA
- Footer

---

# 8. Typography

Recommended final direction:

## Display

```text
Space Grotesk
```

## Body/UI

```text
Inter
```

Optional experimental alternative after visual testing:

```text
Bricolage Grotesque
```

Use at most two active families.

## Scale

Use `clamp()`.

Starting ranges:

```text
Hero / Display XL   72–140px
Display L            56–96px
Heading              36–64px
Subheading           22–32px
Body                 16–20px
Meta                 12–14px
```

These are fluid targets rather than fixed device sizes.

---

# 9. Typography Behavior

Large text should act like a design surface.

Use:

- Intentional line breaks
- Different weights
- Blue emphasis
- Masked reveals
- Variable sizing
- Asymmetric alignment
- Occasional oversized single words

Do not use display effects on every heading.

Body copy must remain calm and readable.

---

# 10. React Bits Strategy

React Bits is a component/effect library, not the site's visual identity.

Use only effects that improve the experience.

Preferred mapping:

## SplitText

Use for:

- Hero title
- Major section titles
- Page titles

## BlurText

Use for:

- Supporting intro text
- Secondary statements

## TextPressure

Use extremely selectively for:

- Hero word
- Signature HackShastra statement

Do not use for body copy.

## VariableProximity

Use for:

- Special interactive brand text
- Hero
- Occasional navigation experiments

## TrueFocus

Use for:

- Rotating hero words
- A small number of thematic statements

## TextType

Use only when the message genuinely benefits from a typed effect.

## ShinyText

Use for:

- Small announcement
- Featured/new badge
- Occasional accent

## SplitFlap

Use only for:

- Registration count
- Event countdown
- Statistics

Never use every effect on one page.

---

# 11. GSAP Strategy

Use GSAP for advanced motion.

Use ScrollTrigger for:

- Scroll-linked animation
- Scrub
- Pinning
- Horizontal sections
- Pinned story sequences
- Enter/leave transitions

GSAP ScrollTrigger explicitly supports scrub, pin, snap, callbacks, responsive setups, and horizontal/vertical scroll-linked animation; use those capabilities selectively rather than building a custom scroll engine. citeturn880931search0turn880931search2

Use CSS transitions for simple:

- Hover
- Focus
- Opacity
- Transform
- Color

---

# 12. Signature Motion Language

The user explicitly wants:

```text
scrolling
stretching
transitions
```

The final system should include:

## A. Scroll reveals

```text
fade
translate
clip-path
scale
```

## B. Image stretching

Images subtly grow while entering/leaving the viewport.

Target:

```text
1.00 → 1.04/1.08 → 1.00
```

Never over-distort.

## C. Typography stretch

Only for signature display type:

```text
scaleX
scaleY
font variation where supported
```

Body text is never stretched.

## D. Section unfolding

A section/image enters from a clipped rectangle/polygon and expands to full size.

## E. Pinned storytelling

One major story section can remain pinned while multiple statements/images change.

## F. Horizontal scrolling

Use for:

- Projects
- Builds
- Featured events
- Stories

Vertical scroll controls horizontal movement.

On mobile it becomes a regular horizontal swipe or vertical list.

## G. Parallax

Small foreground/background movement.

Never overdo it.

## H. Curtain transitions

Selected route changes use:

```text
current page
→ blue/dark curtain
→ next page
```

Keep transitions short enough to preserve usability.

## I. Masked text

Large headings reveal from a clipped container.

## J. Marquees

Use sparingly for:

```text
BUILD • HACK • LEARN • SHIP
```

or community/event announcements.

---

# 13. Motion Intensity

Use:

```text
LEVEL 1
Utility
Buttons / links / menu / forms

LEVEL 2
Editorial
Images / titles / cards / sections

LEVEL 3
Signature
Hero / pinned story / project showcase / page transition
```

Only a small number of Level 3 effects should exist.

---

# 14. Reduced Motion

Support:

```css
prefers-reduced-motion: reduce
```

Disable or simplify:

- Parallax
- Stretch
- Character animation
- Long transitions
- Cursor effects
- Pinned animation
- Infinite marquees

Content must remain accessible.

---

# 15. Cursor Interactions

Desktop-only optional interactions:

- Magnetic CTA
- Custom cursor ring
- Cursor labels
- Image-follow cursor
- Hover previews

Rules:

- Never require cursor effects to understand the page.
- Never break the native keyboard focus experience.
- Remove or simplify on touch devices.

---

# 16. Global Layout

Use a responsive editorial container.

Suggested starting grid:

Desktop:

```text
12 columns
large outer margins
```

Tablet:

```text
8 columns
```

Mobile:

```text
4 columns
```

Use CSS Grid.

Avoid arbitrary absolute positioning for normal content.

Absolute positioning is allowed for decorative/controlled art direction only.

---

# 17. Spacing System

Use design tokens.

Starting scale:

```text
4
8
12
16
24
32
48
64
96
128
160
192
```

Large sections should generally use generous vertical rhythm.

---

# 18. Header

The header should feel more like an editorial navigation than a generic SaaS navbar.

Desktop:

```text
HACKSHASTRA                         MENU
```

or logo + sparse navigation.

Potential links:

```text
Events
Builds
Stories
Community
About
Contact
```

The exact links must follow the audited existing frontend.

Use:

- Minimal chrome
- Strong type
- Active indicator
- Blue hover
- Thin rules where appropriate

Mobile:

```text
Logo                     MENU
```

Open a large editorial menu.

---

# 19. Mobile Navigation

Do not use a tiny default dropdown.

Use a full-screen or large overlay.

Animation:

```text
overlay appears
↓
large menu items stagger in
↓
active route highlighted
```

Support:

- ESC
- focus trap
- keyboard navigation
- close button
- body scroll lock

---

# 20. Homepage

Recommended narrative structure:

```text
01 HERO

02 WHAT WE BUILD

03 FEATURED / CURRENT EVENT

04 COMMUNITY STORY

05 EVENTS INDEX

06 PROJECTS / BUILDS

07 STORIES / BLOG

08 PEOPLE / LEADS

09 JOIN THE COMMUNITY

10 FOOTER
```

This is a target structure, not permission to delete existing content.

Map it against the actual current site before implementation.

---

# 21. Hero

The hero should be the site's strongest visual statement.

Potential structure:

```text
HACK
SHASTRA

BUILD.
BREAK.
REBUILD.

A community of builders, hackers,
designers and technologists.
```

Hero may include:

- Dark background
- Blue accent
- Oversized type
- SplitText
- One primary image/video
- Event/status marker
- CTA
- Subtle scroll cue

Do not make the hero dependent on WebGL.

---

# 22. Community Statement

Use a large editorial statement.

Example structure:

```text
WE DON'T JUST
LEARN TECHNOLOGY.

WE BUILD WITH IT.
```

Then explain the community in calmer body text.

Use pinned/reveal motion here.

---

# 23. Featured Event

Treat the featured event like a case study.

Layout:

```text
EVENT / 01

Large title
Large visual
Date
Location
Status
Short description

VIEW EVENT →
REGISTER →
```

The image can stretch/parallax.

---

# 24. Events Index

Instead of relying only on cards:

```text
01  BLOCK FORGE            HACKATHON
02  AI INNOVATORS          MEETUP
03  TEXPO'26               EXPO
```

Include:

- Event type
- Date
- Status
- Registration state
- Arrow

Hover:

```text
image preview
metadata shift
blue rule
```

---

# 25. Event Filters

Potential:

```text
ALL
HACKATHONS
WORKSHOPS
MEETUPS
COMPETITIONS
PAST
```

Filters should be:

- Keyboard usable
- Accessible
- Fast
- Minimal
- Visually consistent

---

# 26. Event Detail

Structure:

```text
Event type
Event title
Hero
Date / time
Location
Description
What to expect
Requirements
Schedule
FAQ
Registration
```

Registration CTA should stay visible.

---

# 27. Registration Flow

Visitor provides registration data.

No account.

Flow:

```text
Form
↓
Submit
↓
Validation
↓
"Check your email"
↓
Nodemailer verification
↓
Verified
↓
Registration confirmed
```

Frontend states:

```text
Open
Submitting
Verification email sent
Verified
Already registered
Event full
Event closed
Expired link
Invalid link
Server error
```

Do not conceal important errors in toast messages only.

---

# 28. Verification Page

Create a dedicated route such as:

```text
/registration/verify/:token
```

The frontend should call the backend verification endpoint.

Display:

```text
Verifying...
Success
Already verified
Invalid/expired
Server unavailable
```

Do not expose the raw verification token in analytics/events.

---

# 29. Blog / Stories

Treat blogs as editorial content.

Potential naming:

```text
Stories
Writing
Notes
Build Logs
```

Do not rename existing public concepts without checking the current content model.

Listing:

- Featured story
- Editorial index
- Category filters
- Date
- Author
- Reading time if backend supports it

Article:

- Category
- Title
- Hero
- Metadata
- Content
- Related stories

Use constrained reading width.

---

# 30. Projects / Builds

Treat community projects as a portfolio.

Potential naming:

```text
Builds
Projects
Made by the Community
```

Use:

- Large image
- Project title
- Description
- Tech stack
- Contributors
- Links

Use a Dragonfly-style index concept without copying it.

---

# 31. Community / About

Use chapter-like structure:

```text
01 WHO WE ARE
02 WHAT WE DO
03 WHY WE BUILD
04 OUR PEOPLE
05 WHAT'S NEXT
```

The actual content should come from the existing website/backend.

Large statements can alternate with smaller explanatory text.

---

# 32. People / Community Leads

Use the team's real content.

Potential presentation:

```text
01 Name
   Role
   Show bio

02 Name
   Role
   Show bio
```

Borrow Dragonfly's expandable bio concept.

Do not fabricate bios.

---

# 33. Community Statistics

Potential stats:

```text
Events
Projects
Workshops
Members
Hackathons
```

Only display numbers if backed by real data.

Use:

- Animated counters
- Split-flap effect selectively
- Large typography

Never invent metrics just for visual impact.

---

# 34. Contact

The contact page should feel like a major CTA, not a generic form.

Potential:

```text
LET'S BUILD
SOMETHING.

Name
Email
Subject
Message

SEND →
```

Use backend:

```text
POST /api/contact
```

Handle:

```text
Submitting
Success
Validation error
Rate limited
Server error
```

---

# 35. Footer

Large editorial footer.

Potential sections:

```text
HACKSHASTRA

BUILD WITH US.

Events
Projects
Stories
Community
About
Contact

Socials

© HackShastra
```

Use a large closing CTA before the small legal footer.

---

# 36. Admin Frontend

The admin frontend can eventually live under:

```text
/admin
```

It should not be confused with public visual design.

Use more data-oriented patterns inspired by Dribbble:

- Tables
- Filters
- Status badges
- Search
- Pagination
- Capacity indicators
- Registration counts
- Content editing panels

The public site remains editorial.

The admin remains operational.

---

# 37. CMS Compatibility

The frontend must be capable of consuming backend-controlled content.

Avoid duplicating CMS content in hard-coded components.

Examples:

```text
Homepage hero
Announcements
Event data
Blog data
Project data
Team data
Footer data
```

The public frontend should render backend data.

---

# 38. Backend Compatibility

The existing backend architecture is:

```text
Node.js
Express
EJS
ES-module style / non-CommonJS
PostgreSQL
Prisma
Nodemailer
Cloudflare Images
```

Important:

Do NOT convert the backend to CommonJS.

Do NOT replace the backend's EJS architecture.

Do NOT rewrite backend architecture merely to make the React frontend convenient.

The frontend should consume the backend's API contract.

If the backend repository reveals a different exact module configuration, adapt the integration to the repository rather than making assumptions.

---

# 39. Frontend Stack

Preferred public frontend implementation:

```text
React
Vite
JavaScript
CSS / CSS Modules or the existing project's sound styling system
GSAP
React Bits components where justified
```

Do not add Tailwind or another styling system if the repository already has a strong styling architecture unless there is a concrete reason.

The actual repository should be inspected before committing to a migration.

---

# 40. API Layer

Centralize API logic:

```text
src/services/api.js
```

or the project's equivalent.

Do not scatter raw `fetch()` calls throughout components.

Create services for:

```text
events
registrations
blogs
projects
contact
content
images
admin
```

The actual service names should match the backend's final API.

---

# 41. API Contract

Expected public APIs based on the backend plan:

```text
GET    /api/health

GET    /api/events
GET    /api/events/:slug

POST   /api/events/:eventId/register
GET    /api/registrations/verify/:token

GET    /api/blogs
GET    /api/blogs/:slug

GET    /api/projects
POST   /api/projects

POST   /api/contact

GET    /api/content/:key
```

Admin APIs remain authenticated.

Do not assume response fields without checking the actual backend.

---

# 42. Data Loading

Every API-driven view must support:

```text
Loading
Success
Empty
Error
Retry
```

Use skeletons only where they improve perceived performance.

Do not block the entire page when one non-critical section fails.

---

# 43. Image Integration

Production image URLs should come from Cloudflare Images through the backend.

Frontend must support:

- Responsive sizing
- Lazy loading
- Aspect ratio
- `object-fit`
- Alt text
- Loading fallback
- Error fallback

Do not depend on local `/uploads` paths for production.

---

# 44. SEO

Each public route should have:

- Title
- Description
- Canonical
- Open Graph image
- Open Graph title/description

Where appropriate:

```text
Event structured data
Article structured data
Organization structured data
WebSite data
```

If the chosen frontend stack is SPA-based, implement the appropriate metadata strategy available to the chosen deployment architecture.

---

# 45. Accessibility

Required:

- Semantic HTML
- Keyboard navigation
- Visible focus
- Accessible menu
- Modal/dialog semantics
- Form labels
- Form error association
- Alt text
- Reduced motion
- Contrast
- Touch-friendly targets

Primary blue `#0DA5F0` should not be used as low-contrast text on light backgrounds.

---

# 46. Responsive Design

Test:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
1920px
```

Layouts must not simply shrink desktop.

Mobile may change:

- Grid
- Typography
- Navigation
- Motion
- Ordering
- Horizontal sections
- Image crop

---

# 47. Performance

Target:

- Fast initial render
- Minimal layout shifts
- Optimized images
- Lazy loading
- Code splitting where appropriate
- Limited JavaScript
- Efficient animation

Avoid unnecessary:

- WebGL
- particle effects
- giant libraries
- infinite animation loops
- expensive DOM updates

---

# 48. Browser / Device QA

Test at least:

```text
Chrome
Firefox
Safari
Edge
Android Chrome
iOS Safari
```

where practical.

Test mouse, trackpad, touch, keyboard, and reduced motion.

---

# 49. Project Structure

Target:

```text
src/
├── assets/
├── components/
│   ├── layout/
│   │   ├── Header/
│   │   ├── MobileMenu/
│   │   └── Footer/
│   │
│   ├── ui/
│   │   ├── Button/
│   │   ├── Link/
│   │   ├── Badge/
│   │   ├── SectionLabel/
│   │   └── Image/
│   │
│   ├── motion/
│   │   ├── SplitReveal/
│   │   ├── BlurReveal/
│   │   ├── Magnetic/
│   │   ├── Stretch/
│   │   ├── Parallax/
│   │   ├── PageTransition/
│   │   └── HorizontalScroll/
│   │
│   ├── events/
│   ├── blogs/
│   ├── projects/
│   ├── community/
│   └── forms/
│
├── pages/
├── services/
├── hooks/
├── lib/
├── styles/
└── main.jsx
```

Do not blindly restructure the existing repository if its architecture is already sound.

---

# 50. Motion Components

Build reusable motion primitives.

Examples:

```text
SplitReveal
FadeReveal
MaskReveal
ImageStretch
ImageParallax
HorizontalScroller
PinnedStory
MagneticButton
PageCurtain
CountUp
Marquee
```

Do not copy-paste GSAP code between pages.

---

# 51. State Architecture

Use local state by default.

Introduce global state only where needed.

Potential global state:

```text
navigation
theme
CMS cache
```

Do not add Redux or another large state system without a demonstrated need.

---

# 52. Forms Architecture

Create reusable:

```text
Field
Input
Textarea
Select
FieldError
SubmitButton
FormStatus
```

Forms must preserve user input after recoverable errors.

---

# 53. Error Pages

Create:

```text
404
500/failure fallback
```

404 can have an experimental visual statement but must remain useful.

---

# 54. Final Page Map

The exact routes must be discovered from the current frontend first.

Expected public pages:

```text
/
events
/events/:slug
/registration/verify/:token
/blogs
/blogs/:slug
/projects
/about
/contact
404
```

Potential future/admin:

```text
/admin
/admin/login
/admin/events
/admin/registrations
/admin/blogs
/admin/projects
/admin/content
/admin/images
/admin/team
/admin/audit
```

Do not add public routes without confirming the current frontend information architecture.

---

# 55. Development Execution Order

## Phase 1 — Audit

Inspect:

- Existing frontend
- Routes
- Components
- Styling
- Assets
- Dependencies
- Current API use
- Current responsive behavior

Do NOT redesign.

### Output

Update `execution_state.md`.

Stop.

Ask for approval.

---

## Phase 2 — Final Design System

Define:

- Palette
- Typography
- Spacing
- Grid
- Components
- Motion tokens
- React Bits usage
- GSAP usage
- Accessibility rules

The primary blue is already fixed:

```text
#0DA5F0
```

The remaining palette should be reviewed against actual screenshots/assets and can only be changed with the user's approval.

Stop.

Ask for approval.

---

## Phase 3 — Shell

Build:

- Global styles
- Header
- Navigation
- Mobile menu
- Footer
- Base route system
- Motion primitives

Test responsive states.

Stop.

Ask for approval.

---

## Phase 4 — Homepage

Build homepage narrative.

Test:

- Desktop
- Tablet
- Mobile
- Motion
- Performance

Stop.

Ask for approval.

---

## Phase 5 — Public Content

Build:

- Events
- Event detail
- Registration
- Verification
- Blogs
- Blog detail
- Projects
- About/community
- Contact
- 404

Stop.

Ask for approval.

---

## Phase 6 — Backend Integration

Connect actual backend APIs.

Do not guess response structures.

Test:

- Event retrieval
- Event registration
- Verification
- Blogs
- Projects
- Contact
- CMS content
- Image delivery

Stop.

Ask for approval.

---

## Phase 7 — CMS Compatibility

Make all designated dynamic content backend-driven.

Stop.

Ask for approval.

---

## Phase 8 — Admin Frontend

Only when requested/approved.

Build:

- Login
- Dashboard
- Events
- Registrations
- Blogs
- Projects
- Content
- Images
- Team/leads
- Audit

Stop.

Ask for approval.

---

## Phase 9 — QA

Run:

- Accessibility
- Responsive
- Performance
- Browser
- API failure-state
- Visual consistency
- Motion
- SEO

Fix issues.

Stop.

Ask for approval.

---

## Phase 10 — Production

Build:

```text
production build
```

Verify environment/API URLs.

Do not deploy automatically.

Stop.

Ask for production deployment approval.

---

# 56. Approval Gate Protocol

After every phase:

```text
IMPLEMENTED
↓
TESTED
↓
FIXED
↓
PRODUCTION REVIEWED
↓
DOCUMENTED
↓
UPDATE execution_state.md
↓
STOP
↓
ASK
```

An approval only applies to the next phase.

Never assume approval for all future work.

---

# 57. State Tracking Requirements

`execution_state.md` must record:

```text
Current phase
Current task
Previous phase
Completed work
Files changed
Dependencies
Design decisions
Backend assumptions
Tests performed
Test results
Issues
Resolved issues
Known blockers
Approval status
Next action
```

When something is uncertain, record it as uncertain.

Never fabricate completion.

---

# 58. Questions Before Design-System Lock

These must be answered before Phase 2 is considered locked.

1. Confirm public frontend stack:
   `React + Vite + JavaScript`?

2. Confirm styling:
   `CSS / CSS Modules` or another system?

3. Confirm backend integration:
   React frontend consumes the existing Express API while the backend continues using EJS and ES modules?

4. Should EJS remain responsible for any server-rendered pages such as email verification fallback/error pages, or should verification always route into the React frontend?

5. Should the public site use:
   - Mostly light
   - Mostly dark
   - Alternating light/dark

Recommended:
`Alternating`

6. Motion intensity:
   - Premium controlled
   - Highly interactive
   - Experimental

Recommended:
`Highly interactive with selected experimental moments`

7. Should the public homepage use one major pinned storytelling sequence?

Recommended:
`Yes`

8. Should projects or events use a horizontal scroll section?

Recommended:
`Yes`

9. Should a custom cursor/magnetic interaction system be included?

Recommended:
`Desktop only, subtle`

10. Confirm font direction:
   `Space Grotesk + Inter`?

11. Approve the proposed palette:

```text
#0DA5F0
#071014
#F4F7F8
#FFFFFF
#A8B3BA
#35434B
#8DD9FA
#E8F7FE
#0877AF
#03415F
```

12. What existing HackShastra assets should be preserved exactly?

---

# 59. Non-Negotiable Rules

Do not:

- Copy reference websites.
- Invent community statistics.
- Invent team bios.
- Remove current functionality without review.
- Convert the backend from ESM/EJS to CommonJS.
- Assume backend response structures.
- Add authentication to public registration.
- Make animation required for navigation.
- Add effects solely because they are available in React Bits.
- Deploy without approval.
- Continue past an approval gate without approval.
- Mark a stage complete without testing.
- Create a second plan document.

The implementation source of truth is:

```text
plan.md
execution_state.md
actual repository
actual backend API
```
