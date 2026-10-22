# LeadsBlender · Cinematic concept

An independent design preview inspired by the supplied Digital Archive reference, adapted to LeadsBlender's dark / white / electric-aqua identity. It does **not** replace `trial.leadsblender.com`.

## This revision

- The approved hero/blender composition remains, with a real atmospheric sky film derived from the existing artwork. There is no parallax, scroll-linked camera, shader displacement or floating-screen treatment.
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

The five background scenes in use were originally generated through Higgsfield MCP and remain unchanged in `assets/v3/`. The unused cloudbank asset is retained in version history/assets but is not rendered. The hero now uses a generated image-to-video derivative of its original still, with a locked-off camera and evolving clouds. It is delivered as an optimized silent loop, while the unchanged hero image remains the poster/fallback. Other scene images are ordinary section-local backgrounds in document flow. There is no fixed backdrop or WebGL renderer. See `assets/motion/SOURCES.md`.

The chrome-and-glass blender is a stationary generated brand illustration, not a live 3D model or hardware offer; see `assets/brand/SOURCES.md`. AI Studio and Workflow AI chapters use flat, aligned screenshot compositions with their copy, in addition to the seven enlargeable product examples. Screens are not tilted, skewed or independently moved on scroll.

The background film has a keyboard-accessible pause/resume control and remembers that choice. Reduced-motion preferences prevent the video from being requested or played. Playback pauses when the hero is offscreen or the tab is hidden; the original poster remains if playback fails. Saved pause does not freeze entrance copy invisibly. Scroll events update only navigation and the small reading indicator, never scene geometry. Instrument Serif and Montserrat load from Google Fonts.

## Product scope

Descriptions are grounded in the official HighLevel support articles linked under **Product sources** in the footer. The page distinguishes AI Studio from Agent Studio, Claude's authorized MCP connection from Workflow AI Agent model selection, and AI Studio Payments from classic funnel order forms.

This is a concept, not a live AI Studio, integration, automation or checkout implementation. Account permissions, model access, supported payments and usage costs require separate configuration and testing. The closing CTA links to the existing trial homepage, not an assumed checkout route.

## Verification

Chrome/Playwright coverage at 1440×900, 1024×768, 768×1024, 390×844 and 320×700 checks layout overflow. Dedicated scene-overlap checks protect copy from product previews at tablet/laptop/desktop widths. Existing product checks cover image loading, English document language, absence of cloud overlay elements, preserved background hashes, correct anchors and reveals, all seven screenshot viewers, tab keyboard navigation, Escape and focus return.

Current motion checks assert that product screens have no transform/perspective and that artwork, copy, screens and blender stay in normal document flow as the pointer and scroll position change. Film checks verify actual changing cloud pixels without scrolling, autoplay, pause/resume and persistence, visible copy after paused reload, offscreen pausing, reduced-motion network suppression, and static poster fallback.

Environment test scripts live under `/Users/orlandowatson/.hermes/cache/scratch/leadsblender-qa/`: `verify-v4.cjs`, `test-v6-flat.cjs`, `test-v6-video.cjs`, `verify-v5-layout.cjs` and `test-v5-scene-overlap.cjs`. The older v5 motion/renderer scripts document the superseded parallax implementation and are not acceptance tests for this revision. Tests accepting a URL can also be run against the published deployment. The integrated editorial layer is additionally covered by `test-editorial-v5.cjs` (nine Node/browser tests; use `PREVIEW_URL` to test a served deployment). Illustrations have explicit captions and are separate from authentic product screenshots.
