import { recordEvent } from "./diagnostics.js";
const page = document.body.dataset.page;
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const systemVisuals = document.querySelectorAll(".engine-visual");
const visualObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.dataset.active = String(
        entry.isIntersecting && !motionPreference.matches,
      );
    });
  },
  { threshold: 0.15 },
);
systemVisuals.forEach((visual) => {
  visualObserver.observe(visual);
  visual.addEventListener("pointermove", (event) => {
    if (
      motionPreference.matches ||
      !window.matchMedia("(min-width: 1081px) and (pointer: fine)").matches
    )
      return;
    const rect = visual.getBoundingClientRect();
    visual.style.setProperty(
      "--system-tilt",
      `${((event.clientX - rect.left) / rect.width - 0.5) * 5}deg`,
    );
  });
  visual.addEventListener("pointerleave", () =>
    visual.style.setProperty("--system-tilt", "0deg"),
  );
});
motionPreference.addEventListener("change", () => {
  systemVisuals.forEach((visual) => {
    visual.dataset.active = "false";
    visual.style.setProperty("--system-tilt", "0deg");
    visualObserver.unobserve(visual);
    visualObserver.observe(visual);
  });
});
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#mobile-navigation");
function closeMenu() {
  menu.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}
menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menu.hidden = !open;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu && !menu.hidden) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener("click", (e) => {
  if (menu && !menu.hidden && !e.target.closest(".site-header")) closeMenu();
  const cta = e.target.closest('a[data-cta="audit"]');
  if (cta)
    recordEvent("audit_cta_click", {
      page,
      location: cta.dataset.location || "body",
      pathway: cta.dataset.pathway || "unspecified",
    });
});
window.matchMedia("(min-width: 1081px)").addEventListener("change", (e) => {
  if (e.matches && menu) closeMenu();
});
if (page === "b2b" || page === "local")
  recordEvent("pathway_engagement", { page, pathway: page });

const form = document.querySelector("[data-audit-form]");
if (form) {
  const type = form.querySelector('[name="business_type"]');
  const pathway = new URLSearchParams(location.search).get("pathway");
  if (pathway === "b2b") type.value = "B2B";
  if (pathway === "local") type.value = "Local Business";
  const getPathway = () =>
    type.value === "B2B"
      ? "b2b"
      : type.value === "Local Business"
        ? "local"
        : type.value === "Other"
          ? "other"
          : "unspecified";
  let started = false;
  form.addEventListener("input", () => {
    if (!started) {
      started = true;
      recordEvent("form_start", { page, pathway: getPathway() });
    }
  });
  const status = document.querySelector("#form-status");
  const button = form.querySelector("[data-form-submit]");
  const fields = [...form.querySelectorAll("input[required],select[required]")];
  function validate() {
    let firstInvalid = null;
    for (const field of fields) {
      const error = document.getElementById(
        field.getAttribute("aria-describedby"),
      );
      const missing = !field.value.trim();
      const valid =
        !missing &&
        field.checkValidity() &&
        (field.type !== "url" || /^https?:\/\//i.test(field.value));
      field.setAttribute("aria-invalid", String(!valid));
      error.textContent = valid
        ? ""
        : missing
          ? "Please complete this field."
          : field.type === "email"
            ? "Enter a valid email address."
            : field.type === "url"
              ? "Enter a website beginning with https:// or http://."
              : "Please review this field.";
      if (!valid && !firstInvalid) firstInvalid = field;
    }
    if (firstInvalid) {
      recordEvent("form_error", {
        page,
        pathway: getPathway(),
        reason: "validation",
      });
      status.textContent =
        "Please review the highlighted fields. Nothing has been submitted.";
      firstInvalid.focus();
      return false;
    }
    return true;
  }
  let sending = false;
  async function submitPreview(e) {
    e.preventDefault();
    if (sending) return;
    status.classList.remove("is-success");
    if (!validate()) return;
    if (form.dataset.submissionEnabled !== "true") {
      recordEvent("form_error", {
        page,
        pathway: getPathway(),
        reason: "isolation_pending",
      });
      status.textContent =
        "Submission is temporarily unavailable. Please try again later or email hello@anchorlineai.com.";
      status.focus();
      return;
    }
    if (form.elements["bot-field"].value) {
      recordEvent("form_error", { page, reason: "honeypot" });
      status.textContent =
        "Your request could not be submitted. Please try again.";
      return;
    }
    sending = true;
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    status.textContent = "Sending your Growth Audit request…";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const body = new URLSearchParams();
      for (const [key, value] of new FormData(form))
        body.append(key, String(value));
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        signal: controller.signal,
      });
      if (!response.ok) {
        recordEvent("form_error", {
          page,
          pathway: getPathway(),
          reason: "backend",
        });
        throw new Error("backend");
      }
      const confirmedPathway = getPathway();
      recordEvent("audit_request_success", {
        page,
        pathway: confirmedPathway,
      });
      if (typeof window.gtag === "function")
        window.gtag("event", "growth_audit_submit", {
          pathway: confirmedPathway,
        });
      const receipt = { form: "growth-audit", receivedAt: Date.now() };
      try {
        sessionStorage.setItem(
          "anchorline-preview-receipt",
          JSON.stringify(receipt),
        );
      } catch {}
      status.textContent = "Growth Audit request received.";
      status.classList.add("is-success");
      location.assign("/growth-audit/received/");
    } catch (error) {
      if (error.message !== "backend")
        recordEvent("form_error", {
          page,
          pathway: getPathway(),
          reason: error.name === "AbortError" ? "timeout" : "network",
        });
      status.textContent =
        "We could not confirm your request. Your fields remain here. Please wait a moment before retrying to avoid a duplicate.";
      status.focus();
    } finally {
      clearTimeout(timeout);
      sending = false;
      button.disabled = false;
      button.removeAttribute("aria-busy");
    }
  }
  button.addEventListener("click", submitPreview);
  form.addEventListener("submit", submitPreview);
}
if (page === "receipt") {
  try {
    const receipt = JSON.parse(
      sessionStorage.getItem("anchorline-preview-receipt") || "null",
    );
    if (
      receipt?.form === "growth-audit" &&
      Date.now() - receipt.receivedAt < 10 * 60 * 1000
    ) {
      document.querySelector("[data-receipt-title]").textContent =
        "Growth Audit request received.";
      document.querySelector("[data-receipt-message]").textContent =
        "Your Growth Audit request was received.";
    }
  } catch {}
  // Receipt page visits do not fire conversion events.
}
