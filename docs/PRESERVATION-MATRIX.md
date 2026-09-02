# PRESERVATION MATRIX

| Existing Feature | Existing Location (`frontend-old`) | New Location (`frontendbyantigravity`) | Preserved? | Verification Status |
|---|---|---|---|---|
| Entrance Splash Gate | `LoadingScreen.tsx` | `components/entrance/EntrancePortal.tsx` | YES | Upgraded to Cyan/Energy Portal + Session Gate |
| Global Navigation & Drawer | `Header.tsx` | `components/layout/Navbar.tsx` | YES | Editorial links, Back button, Mobile scroll lock |
| Hero Headline & Video Player | `Hero.tsx` | `components/hero/HeroSection.tsx` | YES | Split reveals, Video mute toggle, Session memory |
| 3D / Visual Interactive Object | `Hero.tsx` (Video) / `InfiniteMenu.tsx` | `components/three/HackShastraSculpture.tsx` | YES | Custom Three.js radial logo geometry |
| Mission & 4 Feature Pillars | `Mission.tsx` | `components/sections/MissionSection.tsx` | YES | Preserved copy, Lucide icons, staggered motion |
| Stats & Impact Counters | `AboutPage.tsx` | `components/sections/ImpactSection.tsx` & `AboutPage.tsx` | YES | Animated stats counters |
| Events Lineup & Cards | `Events.tsx`, `EventsPage.tsx` | `pages/EventsPage.tsx` & `components/events/` | YES | Upcoming + Completed + TechExpoCard |
| Texpo Registration Gateway | `TexpoRegisterPage.tsx` | `pages/TexpoRegisterPage.tsx` | YES | Instant redirect to Unstop |
| Photo Gallery Grid & Lightbox | `GalleryPage.tsx` | `pages/GalleryPage.tsx` | YES | High-res grid + full viewport lightbox |
| 29 Team Member Cards & 3D Tilt | `TeamPage.tsx`, `TiltedCard.tsx` | `pages/TeamPage.tsx`, `components/ui/TeamCard.tsx` | YES | 3D perspective spring tilt, all social links |
| Contact Form & Web3Forms API | `ContactPage.tsx` | `pages/ContactPage.tsx` | YES | Async submission, mailto fallback, copy feedback |
| Membership Status (Coming Soon) | `JoinPage.tsx` | `pages/JoinPage.tsx` | YES | State-driven notifications |
| 404 Error Screen | `NotFoundPage.tsx` | `pages/NotFoundPage.tsx` | YES | Editorial 404 with home redirect |
| Global Smooth Scrolling | `SmoothScroll.tsx` | `components/layout/SmoothScrollProvider.tsx` | YES | Lenis RAF scroll provider |
