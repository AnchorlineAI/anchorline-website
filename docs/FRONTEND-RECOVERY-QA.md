# Frontend recovery — PR #5

## Scope and authority

Prepared against `70630f1408114fd5df6d16448a6121d0cf592109` on `forge/growth-engine-preview`. This is a frontend reconstruction of the existing Astro project, not a replacement project or production release. Main, Netlify settings, routing, dependencies, and original assets are not changed.

The owner's written recovery brief controls copy and behavior. The supplied Anchorline mockup controls composition only. The 2ndBrainOS screenshots supplied privately are reference-only; none of those screenshots, proprietary graphics, code, or animations is included in this project.

## Implementation

- Original, responsive system-interface illustrations and a connected seven-stage Growth Engine sequence.
- Light environment, atmospheric blue, editorial typography, dimensional layering, and restrained progressive motion.
- Informational-page motion can be paused, responds to device reduced-motion settings, and never gates access to content.
- Distinct Home, Growth Engine, B2B Growth, Local Growth, Our Approach, About, and Growth Audit documents. Receipt and 404 routes remain.
- The repository founder photo exactly matches the owner's uploaded photograph. The About presentation uses the established WebP derivative with no CSS filter, overlay, or image crop.
- The existing Growth Audit page markup and behavior remain unchanged. Shared presentation is harmonized; no atmospheric, parallax, or reveal layers are added to Audit or receipt.
- Existing lower-page content, proof formats, FAQs, and reusable CTA component are retained where compatible with the approved handoff.

## Local checks

Run from the project directory:

```sh
npm ci
npm run build
npm run test:unit
npm test
```

In the recovery sandbox only, `CHROMIUM_EXECUTABLE=/tmp/chromium` selects the available QA browser through the repository's existing Playwright configuration. The QA browser and formatting tools were installed outside this repository; no project dependency or lockfile change was made.

The local verification suite covers:

- Nine generated HTML documents: seven required pages, receipt, and 404.
- Desktop accessibility/structure at 1440 px and mobile accessibility at 390 px using axe WCAG A/AA tags.
- Overflow and navigation at 320, 390, 768, and 1024 px.
- Real document navigation, pathway preselection, keyboard skip link and menu behavior.
- Visible content without JavaScript on desktop; the existing JavaScript-dependent form contract is not changed.
- Reduced motion, manual pause, and static interface visibility.
- Founder image identity/display and explicit illustrative interface labeling.
- Validation, intercepted mock error/success responses, and receipt safeguards.
- Local diagnostic events, PII exclusion, and absence of external analytics requests.
- SHA-256 preservation checks for 21 backend, configuration, routing, dependency, and original-asset files.

`tests/preservation-baseline.json` records the protected source baseline. `tests/reconstruction.spec.mjs` verifies it. The pre-existing output checker still has an older descriptive log phrase about page count; its actual generated-document count is nine, and required routes are independently verified by tests.

## Important outcome limits

No new synthetic request was sent to Netlify Forms, `hello@anchorlineai.com`, a production CRM, or live automation. Mock responses are intercepted locally and prove client behavior only. Existing owner-approved notification routing was not changed; fresh delivery to a mailbox has not been tested during this reconstruction.

Local browser observations are not deployed or field-performance measurements. Screenshots must wait for image decode before use as evidence. A passed local build/test run is not proof that a new Netlify Deploy Preview is ready.

## Release boundary

Changes require exact-payload approval before preview-branch writes. Use existing PR #5 and its existing Netlify relationship. Keep all intermediate staged previews out of owner visual review until the full prepared change set is committed and the final deployment is verified.

After the last approved preview commit: verify the fresh deployment's commit/status, inspect desktop and mobile, and report technical QA with any outcome limits. Owner visual approval remains pending. Do not merge main, release production, or begin production-readiness work.
