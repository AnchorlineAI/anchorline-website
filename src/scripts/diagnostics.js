const names = new Set([
  "pathway_engagement",
  "audit_cta_click",
  "form_start",
  "form_error",
  "audit_request_success",
]);
const allowed = {
  page: new Set([
    "home",
    "engine",
    "b2b",
    "local",
    "about",
    "audit",
    "receipt",
    "not-found",
  ]),
  pathway: new Set(["b2b", "local", "other", "unspecified"]),
  location: new Set([
    "header",
    "hero",
    "body",
    "closing",
    "footer",
    "mobile-menu",
    "engine-hero",
    "b2b-hero",
    "local-hero",
  ]),
  reason: new Set([
    "validation",
    "isolation_pending",
    "backend",
    "network",
    "timeout",
    "honeypot",
  ]),
};
export function safeEvent(name, props = {}) {
  if (!names.has(name)) return null;
  const clean = { event: name, mode: "local-preview-diagnostic" };
  for (const [key, values] of Object.entries(allowed))
    if (values.has(props[key])) clean[key] = props[key];
  return clean;
}
export function recordEvent(name, props = {}) {
  const detail = safeEvent(name, props);
  if (!detail || typeof window === "undefined") return;
  window.__anchorlineDiagnostics ||= [];
  window.__anchorlineDiagnostics.push(detail);
  if (window.__anchorlineDiagnostics.length > 100)
    window.__anchorlineDiagnostics.shift();
  window.dispatchEvent(new CustomEvent("anchorline:analytics", { detail }));
  // No GA4, dataLayer, network request, persistence, PII, or production analytics.
}
