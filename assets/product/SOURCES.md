# Product screenshot sources

Source repository: `leadsblender/leadsblender-trial`.
Source revision: `d51c74c4d904329a94f839343419152704ea34f6`.

## Backend

All five files are existing screenshot assets referenced in `src/site/assets.ts`, not newly generated interfaces. Originals are on the project's existing CDN:

`https://d2ol7oe51mr4n9.cloudfront.net/user_37buk0epg7Sjqx73iZku2txAL6q/`

| File in this directory | Existing source asset | Treatment |
| --- | --- | --- |
| `studio.webp` | `3a725133-ac39-4fa8-a1b3-5894ab35a8cd.jpg` | WebP conversion; no content edits |
| `workflow.webp` | `c771246c-b24d-43ac-b3ca-96dd0ee2436a.jpg` | WebP conversion; account avatar obscured |
| `agents.webp` | `b00e6e8a-59a3-416f-a634-fdcee169a2ad.jpg` | WebP conversion; account avatar obscured |
| `funnels.webp` | `86f02781-7a29-41ed-a628-ec9a5788e394.jpg` | WebP conversion; account avatar and unrelated project names obscured |
| `courses.webp` | `a9ca450e-02de-475b-a7c7-b1037f861b9a.jpg` | WebP conversion; account avatar obscured |

The workflow screenshot shows the standard canvas of an existing trial conversion sequence, not the Workflow AI Builder chat. Conversation dashboard numbers are existing UI content, not performance promises.

## Frontend

The existing application was rendered locally without modifying its tracked source:

- `frontend-home.webp`: existing `/` route at 1440×1000.
- `frontend-checkout.webp`: complete initial `/checkout` route at 1440×1385, blank customer fields, source-default yearly plan selected.

These files are WebP conversions of browser screenshots, not reconstructed mockups. No forms were submitted and no payment was activated. Prices and promotional statements shown inside the screenshots belong to the existing example, not a current offer. A local source render is not a claim that the same route is live at `trial.leadsblender.com`.
