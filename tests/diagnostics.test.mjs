import { test } from "node:test";
import assert from "node:assert/strict";
import { safeEvent } from "../src/scripts/diagnostics.js";
test("analytics drops all personal data and unknown values", () => {
  const result = safeEvent("form_start", {
    page: "audit",
    pathway: "b2b",
    email: "synthetic@example.com",
    name: "Private Name",
    website: "https://private.example.com",
    growth_problem: "private",
    location: "user-supplied value",
  });
  assert.deepEqual(result, {
    event: "form_start",
    mode: "local-preview-diagnostic",
    page: "audit",
    pathway: "b2b",
  });
});
test("unknown events are rejected", () =>
  assert.equal(safeEvent("page_view", { url: "private" }), null));
test("only enumerated error reasons survive", () =>
  assert.deepEqual(safeEvent("form_error", { reason: "private email" }), {
    event: "form_error",
    mode: "local-preview-diagnostic",
  }));
test("approved CTA context survives", () =>
  assert.deepEqual(
    safeEvent("audit_cta_click", {
      page: "home",
      location: "hero",
      pathway: "local",
    }),
    {
      event: "audit_cta_click",
      mode: "local-preview-diagnostic",
      page: "home",
      pathway: "local",
      location: "hero",
    },
  ));
