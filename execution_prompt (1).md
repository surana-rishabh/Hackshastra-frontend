# HackShastra Frontend — Master Execution Prompt

You are the frontend engineer responsible for executing the HackShastra frontend redesign.

You have three project-control files:

```text
plan.md
execution_state.md
reference_audit.md
```

Read all three before changing code.

---

# PRIMARY RULE

Do NOT write another plan.

Do NOT create a replacement plan.

Do NOT create architecture documentation unless explicitly requested.

`plan.md` is the plan.

`execution_state.md` is the live project state.

`reference_audit.md` contains the reference research.

Your job is to execute the current phase of `plan.md`, test it, update `execution_state.md`, and stop at the required approval gate.

---

# STEP 0 — READ THE PROJECT

Before changing anything:

1. Read `plan.md`.
2. Read `execution_state.md`.
3. Read `reference_audit.md`.
4. Inspect the frontend repository.
5. Inspect the backend repository if available.
6. Identify the real frontend framework/build system.
7. Identify the actual backend architecture.
8. Identify actual API routes.
9. Identify actual API response shapes.
10. Identify actual assets.

Do not assume the repository matches the documentation perfectly.

The repository and working implementation take precedence over guesses.

---

# BACKEND IMPORTANT RULE

The backend is an existing HackShastra backend using:

```text
Node.js
Express
EJS
ES-module / non-CommonJS architecture
PostgreSQL
Prisma
Nodemailer
Cloudflare Images
```

Do NOT convert it to CommonJS.

Do NOT rewrite EJS simply because the frontend is React.

Do NOT redesign backend architecture during frontend work unless explicitly requested.

The frontend must adapt to the backend's real API contract.

Remember:

EJS is the server-side view/template layer.

ES modules are the JavaScript module system.

Do not confuse the two.

---

# PHASE CONTROL

Read `execution_state.md`.

Only execute the phase listed as the current phase.

Do not jump ahead.

When the current phase is complete:

```text
IMPLEMENT
↓
TEST
↓
FIX
↓
RETEST
↓
PRODUCTION REVIEW
↓
UPDATE execution_state.md
↓
STOP
↓
ASK FOR APPROVAL
```

---

# PHASE 1 — EXISTING FRONTEND AUDIT

If Phase 1 is active, DO NOT redesign the website yet.

Inspect:

```text
Routes
Pages
Components
Layouts
Styles
Fonts
Colors
Images
Icons
Animations
Dependencies
API calls
Forms
Responsive behavior
SEO
Accessibility
```

Create a useful inventory in `execution_state.md`.

For every route record:

```text
Route
Purpose
Main sections
Components
Data source
Current problems
Content to preserve
Redesign opportunity
```

Inspect package.json.

Inspect the actual CSS/design system.

Inspect existing animation libraries.

Inspect current frontend/backend integration.

Do not guess.

At the end:

```text
Stage 1 complete
```

only if the repository has genuinely been audited.

Run available tests/build checks.

Update `execution_state.md`.

STOP.

Ask whether to continue to Phase 2.

---

# PHASE 2 — VISUAL SYSTEM

When Phase 2 is approved:

Lock the design system around:

```text
Primary:
#0DA5F0
```

Candidate final palette:

```text
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

Recommended typography:

```text
Space Grotesk
Inter
```

Do not add many fonts.

Define tokens for:

```text
Colors
Typography
Spacing
Grid
Borders
Radii
Motion
Breakpoints
Z-index
```

Design the component language.

Use:

```text
Editorial
Minimal
Bold
Technical
```

Avoid:

```text
Generic SaaS
Heavy glassmorphism
Excessive rounded cards
Random gradients
```

Implement only the design-system foundation.

Do not build every page yet.

Test visual tokens in representative components.

Update `execution_state.md`.

STOP.

Ask whether to continue.

---

# PHASE 3 — CORE SHELL

Build:

```text
Header
Desktop navigation
Mobile navigation
Mobile menu overlay
Footer
Global layout
Route transitions foundation
Motion primitives
```

Navigation should be editorial and minimal.

Mobile menu should be a large accessible overlay.

Build reusable motion primitives:

```text
SplitReveal
FadeReveal
MaskReveal
ImageStretch
ImageParallax
MagneticButton
PageCurtain
```

Do not implement every advanced motion effect yet.

Test:

```text
Desktop
Tablet
Mobile
Keyboard
Reduced motion
```

Update state.

STOP.

Ask whether to continue.

---

# PHASE 4 — HOMEPAGE

Build the homepage according to the approved audited information architecture.

Use the reference synthesis:

```text
HackShastra content
+
Vigilante editorial scale
+
Dragonfly chapter/index structure
+
#0DA5F0
+
controlled motion
```

Recommended sections:

```text
Hero
Community statement
Featured event
Community story
Events
Projects
Stories
People
CTA
Footer
```

Do not delete current content without checking the audit.

Motion candidates:

```text
SplitText hero
Image stretch
Pinned community statement
Horizontal projects
Staggered event index
Large CTA transition
```

Do not make everything animate.

Test all page states.

Update state.

STOP.

Ask whether to continue.

---

# PHASE 5 — PUBLIC PAGES

Implement:

```text
Events
Event Detail
Registration
Verification
Blogs
Blog Detail
Projects
About/Community
Contact
404
```

Match backend data structures.

Registration must remain accountless.

Registration UX:

```text
Form
→ submit
→ email verification required
→ check email
→ verification
→ confirmed
```

Support all states:

```text
loading
success
error
closed
full
already registered
expired
invalid
```

Contact:

```text
POST /api/contact
```

Projects:

```text
POST /api/projects
```

Do not invent backend fields.

Update state.

STOP.

Ask whether to continue.

---

# PHASE 6 — REAL BACKEND INTEGRATION

Before integration:

Inspect actual backend routes and response JSON.

Create a centralized frontend API layer.

Do not put raw fetch logic into every component.

Expected API concepts include:

```text
GET /api/events
GET /api/events/:slug
POST /api/events/:eventId/register
GET /api/registrations/verify/:token
GET /api/blogs
GET /api/blogs/:slug
GET /api/projects
POST /api/projects
POST /api/contact
GET /api/content/:key
```

These are expectations, not permission to assume exact implementations.

Handle:

```text
Loading
Success
Empty
Error
Retry
```

Test the actual backend.

Do not modify backend architecture to hide frontend integration problems.

If the backend API differs from the plan:

1. Record the discrepancy in `execution_state.md`.
2. Determine whether the frontend can adapt.
3. Ask before making a backend change.

Update state.

STOP.

Ask whether to continue.

---

# PHASE 7 — CMS COMPATIBILITY

Make designated content backend-driven.

Hard-coded source text should not replace CMS-managed values.

Potential CMS content:

```text
Hero
Announcements
About
Community
Footer
Social links
Featured content
```

Structured data remains structured:

```text
Events
Blogs
Projects
Team
```

Use backend data.

Test content loading.

Update state.

STOP.

Ask whether to continue.

---

# PHASE 8 — ADMIN FRONTEND

Do not start until explicitly approved.

Build operational UI separately from the public editorial site.

Potential:

```text
/admin/login
/admin
/admin/events
/admin/registrations
/admin/blogs
/admin/projects
/admin/content
/admin/images
/admin/team
/admin/audit
```

Use utility/data-interface patterns:

```text
Tables
Filters
Status
Progress
Search
Pagination
Forms
```

Do not turn the admin into a copy of the public site.

Update state.

STOP.

Ask whether to continue.

---

# PHASE 9 — MOTION PASS

Only after core content works.

Implement advanced motion:

```text
Scroll stretching
Image parallax
Pinned narrative
Horizontal scrolling
Clip-path transitions
Page curtain
Magnetic CTA
Marquee
Count-up
```

At least:

```text
1 pinned narrative
1 horizontal-scrolling showcase
3 stretch interactions
```

should exist if they survive performance/usability testing.

Use GSAP ScrollTrigger where appropriate. Its official documentation supports scrubbed animation, pinning, horizontal/vertical setups, resize recalculation, and responsive media-query configurations. citeturn880931search0

Use React Bits selectively.

Do not turn the site into a component demo.

Test:

```text
Desktop
Mobile
Touch
Reduced motion
Slow hardware
```

Update state.

STOP.

Ask whether to continue.

---

# PHASE 10 — ACCESSIBILITY / PERFORMANCE

Perform:

```text
Keyboard audit
Screen-reader audit where practical
Contrast
Reduced motion
Mobile
Slow network
Large viewport
Small viewport
```

Check:

```text
JS bundle
Images
Layout shifts
Long tasks
Scroll performance
Animation cleanup
Memory leaks
```

Remove unnecessary effects.

Update state.

STOP.

Ask whether to continue.

---

# PHASE 11 — FINAL VISUAL QA

Compare each route against:

```text
Current HackShastra content
Vigilante principles
Dragonfly principles
Dribbble utility patterns where relevant
#0DA5F0 design system
Approved motion language
```

Check:

```text
Typography
Spacing
Alignment
Color
Images
Transitions
Forms
Navigation
Responsive states
Accessibility
```

Fix inconsistencies.

Update state.

STOP.

Ask whether to continue.

---

# PHASE 12 — PRODUCTION BUILD

Run:

```text
install
lint if configured
test
build
```

Verify:

```text
API URL
environment variables
image URLs
routing
SEO
production assets
```

Do not deploy.

Update state.

STOP.

Ask for deployment approval.

---

# DEPLOYMENT APPROVAL

Only deploy after the user explicitly says to deploy.

Never interpret QA approval as deployment approval.

---

# FINAL PRODUCTION VERIFICATION

After deployment, verify:

```text
Home
Events
Event detail
Registration
Verification
Blogs
Projects
Contact
Images
CMS content
Admin if implemented
```

Check production logs and errors.

Update `execution_state.md`.

---

# DESIGN QUALITY RULES

The finished public site should NOT look like:

```text
A template
A SaaS landing page
A React Bits showcase
A generic college website
```

It should feel like:

```text
A serious technology community
with the visual confidence of a creative studio
and the information architecture of an editorial publication.
```

---

# NON-NEGOTIABLES

Never:

- Invent content.
- Invent statistics.
- Invent people.
- Copy reference sites.
- Copy source code.
- Rewrite backend from ESM/EJS to CommonJS.
- Add mandatory public accounts.
- Put participant authentication into event registration.
- Scatter API logic.
- Ignore mobile.
- Ignore reduced motion.
- Deploy without approval.
- Skip tests.
- Skip `execution_state.md`.
- Create another plan.
- Continue beyond a gate without approval.

---

# FIRST EXECUTION

Start with the current phase in `execution_state.md`.

If the current phase is Stage 1:

AUDIT ONLY.

Do not redesign.

Do not replace the homepage.

Do not install large animation/component libraries yet.

Inspect the actual repositories first.

Then update `execution_state.md`, report findings, and STOP for approval.
