# LeadsBlender · Cinematic concept

An independent design preview inspired by the supplied Digital Archive reference, adapted to LeadsBlender's dark / white / electric-aqua identity. It does **not** replace `trial.leadsblender.com`.

## This revision

- All authored page copy, navigation, captions, metadata and accessibility labels are English.
- The five approved atmospheric background scenes are unchanged. Removed the separate foreground cloudbank transitions and decorative mist layers; the artwork itself was not replaced or regenerated.
- AI Studio remains the lead product story, followed by Workflow AI, Claude/OpenAI connection routes, the wider AI toolkit, funnels and checkout.
- Added five existing backend screenshots: AI Studio, a workflow canvas, Conversation AI, funnels and courses. The latter four are browsable in an accessible tabbed gallery.
- Added two customer-facing examples rendered from the existing LeadsBlender project: its homepage and initial checkout/details screen.
- Every product screenshot can be enlarged in a keyboard-accessible viewer. Mobile users can scroll inside the full-size image.

## Product imagery and provenance

See `assets/product/SOURCES.md`. Backend images came from the existing `shots` entries in `leadsblender/leadsblender-trial/src/site/assets.ts`. Account avatars and unrelated project names were obscured where appropriate. These are not generated dashboard mockups.

Frontend examples were rendered locally from **unmodified** repository source at `d51c74c4d904329a94f839343419152704ea34f6`. The English homepage and checkout routes were captured without filling or submitting any fields, activating payment, or modifying the connected AI Studio project. They show an existing source-project example, not proof of what is deployed on the trial domain. Prices and promotional copy within those screenshots are not a current offer.

The five background scenes in use were originally generated through Higgsfield MCP and remain in `assets/v3/`. The unused cloudbank asset is retained in version history/assets but is no longer rendered. The hero's motion is a CSS camera push over a **still image**, not generated video. Instrument Serif and Montserrat load from Google Fonts; reduced-motion preferences are respected.

## Product scope

Descriptions are grounded in the official HighLevel support articles linked under **Product sources** in the footer. The page distinguishes AI Studio from Agent Studio, Claude's authorized MCP connection from Workflow AI Agent model selection, and AI Studio Payments from classic funnel order forms.

This is a concept, not a live AI Studio, integration, automation or checkout implementation. Account permissions, model access, supported payments and usage costs require separate configuration and testing. The closing CTA links to the existing trial homepage, not an assumed checkout route.

## Verification

Chrome/Playwright coverage at 1440×900, 390×844 and 320×700 checks image loading, English document language, absence of cloud overlay elements, preserved background hashes, no horizontal overflow, correct anchors and reveals, screenshot tabs with keyboard navigation, and modal open/Escape/focus return. Reduced-motion rendering is also checked.

Current environment test script: `/Users/orlandowatson/.hermes/cache/scratch/leadsblender-qa/verify-v4.cjs` (outside this repository). Pass the published URL as its first argument to run the same checks against deployment.
