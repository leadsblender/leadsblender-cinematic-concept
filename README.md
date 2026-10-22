# LeadsBlender · Cinematic concept

An independent design preview inspired by the supplied Digital Archive reference, adapted to LeadsBlender's dark / white / electric-aqua identity. It does **not** replace `trial.leadsblender.com`.

## This revision

- A recognizable chrome-and-glass blender anchors the hero; scroll-linked depth and a continuous cross-dissolving backdrop connect the approved scenes without cloud cutouts.
- Interior chapters have tighter rhythm, authentic screen previews, a labelled connection map, an illustrated toolkit and a compact editorial Q&A.
- All authored page copy, navigation, captions, metadata and accessibility labels are English.
- The five approved atmospheric background scenes are unchanged. Removed the separate foreground cloudbank transitions and decorative mist layers; the artwork itself was not replaced or regenerated.
- AI Studio remains the lead product story, followed by Workflow AI, Claude/OpenAI connection routes, the wider AI toolkit, funnels and checkout.
- Added five existing backend screenshots: AI Studio, a workflow canvas, Conversation AI, funnels and courses. The latter four are browsable in an accessible tabbed gallery.
- Added two customer-facing examples rendered from the existing LeadsBlender project: its homepage and initial checkout/details screen.
- Every product screenshot can be enlarged in a keyboard-accessible viewer. Mobile users can scroll inside the full-size image.

## Product imagery and provenance

See `assets/product/SOURCES.md`. Backend images came from the existing `shots` entries in `leadsblender/leadsblender-trial/src/site/assets.ts`. Account avatars and unrelated project names were obscured where appropriate. These are not generated dashboard mockups.

Frontend examples were rendered locally from **unmodified** repository source at `d51c74c4d904329a94f839343419152704ea34f6`. The English homepage and checkout routes were captured without filling or submitting any fields, activating payment, or modifying the connected AI Studio project. They show an existing source-project example, not proof of what is deployed on the trial domain. Prices and promotional copy within those screenshots are not a current offer.

The five background scenes in use were originally generated through Higgsfield MCP and remain unchanged in `assets/v3/`. The unused cloudbank asset is retained in version history/assets but is not rendered. A shared fixed backdrop now cross-dissolves between those exact images with native scrolling. Served pages use a small WebGL image-displacement/camera renderer; file previews and unavailable/lost WebGL contexts fall back to composited CSS images. This is motion applied to the approved still artwork, not generated video.

A recognizable chrome-and-glass blender illustration now anchors the hero, with restrained float, pointer parallax and scroll-linked movement. It is a generated brand object, not a live 3D model or hardware offer; see `assets/brand/SOURCES.md`. AI Studio and Workflow AI chapters include depth-framed previews of their existing, real screenshots, in addition to the seven enlargeable product examples.

Ambient motion has a keyboard-accessible pause/resume control. Reduced-motion preferences disable ambient rendering and scroll-linked transforms. Rendering pauses when the tab is hidden or the scenic world is fully covered by editorial content. Native scrolling and anchor navigation are not intercepted. Instrument Serif and Montserrat load from Google Fonts.

## Product scope

Descriptions are grounded in the official HighLevel support articles linked under **Product sources** in the footer. The page distinguishes AI Studio from Agent Studio, Claude's authorized MCP connection from Workflow AI Agent model selection, and AI Studio Payments from classic funnel order forms.

This is a concept, not a live AI Studio, integration, automation or checkout implementation. Account permissions, model access, supported payments and usage costs require separate configuration and testing. The closing CTA links to the existing trial homepage, not an assumed checkout route.

## Verification

Chrome/Playwright coverage at 1440×900, 1024×768, 768×1024, 390×844 and 320×700 checks layout overflow. Dedicated scene-overlap checks protect copy from product previews at tablet/laptop/desktop widths. Existing product checks cover image loading, English document language, absence of cloud overlay elements, preserved background hashes, correct anchors and reveals, all seven screenshot viewers, tab keyboard navigation, Escape and focus return.

Motion checks exercise scroll-linked blender and product-screen movement, interpolated scene crossfades, pause/resume, reduced-motion preferences, actual changing WebGL frames, frozen frames while paused, and graceful image fallback after a lost WebGL context.

Environment test scripts live under `/Users/orlandowatson/.hermes/cache/scratch/leadsblender-qa/`: `verify-v4.cjs`, `test-v5-motion.cjs`, `verify-v5-renderer.cjs`, `verify-v5-layout.cjs` and `test-v5-scene-overlap.cjs`. Tests accepting a URL can also be run against the published deployment. The integrated editorial layer is additionally covered by `test-editorial-v5.cjs` (nine Node/browser tests; use `PREVIEW_URL` to test a served deployment). Illustrations have explicit captions and are separate from authentic product screenshots.
