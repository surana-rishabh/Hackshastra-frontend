# DESIGN DECISION LOG

### Decision 1: Master Palette Centered on Official Electric Cyan (#0DA5F0)
- **Reason**: The official HackShastra emblem is vibrant cyan/electric blue. Legacy pages contained red fire artifacts that contradicted the primary brand identity.
- **Alternatives**: Retaining crimson or dual red/blue themes.
- **Tradeoffs**: Required full systematic conversion of all gradients, borders, glows, and badges to cyan/indigo/slate tokens.
- **Status**: APPROVED.

### Decision 2: Pure TypeScript Dynamic Asset Glob Map
- **Reason**: All 40+ member photos in `src/assets/` need instantaneous $O(1)$ resolution from JSON keys without manual import statements.
- **Alternatives**: Hardcoded relative imports in JSON or separate index file.
- **Tradeoffs**: Vite `import.meta.glob` requires eager resolution, handled cleanly in `src/lib/assets.ts`.
- **Status**: APPROVED.

### Decision 3: Custom Three.js Canvas Controller with Fallback & Reduced-Motion
- **Reason**: A custom vanilla Three.js WebGL canvas controller provides 60fps performance, complete DPR clamping, zero React 19 peer-dependency mismatch, and graceful fallback to an atmospheric 2D graphic when WebGL is unsupported or reduced motion is active.
- **Alternatives**: `@react-three/fiber` (can introduce peer dep issues with React 19) or video-only.
- **Tradeoffs**: Requires direct Three.js scene graph management and RAF cleanup.
- **Status**: APPROVED.
