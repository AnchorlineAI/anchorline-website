// Progressive visual enhancement only. Intake, receipt and analytics live in site.js.
const toggle = document.querySelector("[data-motion-toggle]");
if (toggle) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = matchMedia("(min-width: 1081px) and (pointer: fine)");
  const layers = [...document.querySelectorAll("[data-depth]")];
  let paused = false;
  try {
    paused = sessionStorage.getItem("anchorline-motion-paused") === "true";
  } catch {}
  let queued = false;
  const updateDepth = () => {
    queued = false;
    layers.forEach((layer) => {
      if (paused || reduce.matches || !desktop.matches) {
        layer.style.removeProperty("translate");
        return;
      }
      const rect = layer.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > innerHeight) return;
      const progress = Math.max(
        -1,
        Math.min(1, (rect.top - innerHeight / 2) / innerHeight),
      );
      layer.style.translate = `0 ${progress * Number(layer.dataset.depth)}px`;
    });
  };
  const queueDepth = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(updateDepth);
    }
  };
  const sync = () => {
    document.body.toggleAttribute(
      "data-motion-paused",
      paused || reduce.matches,
    );
    toggle.setAttribute("aria-pressed", String(paused || reduce.matches));
    toggle.textContent = reduce.matches
      ? "Device preference: reduced motion"
      : paused
        ? "Resume page motion"
        : "Pause page motion";
    toggle.disabled = reduce.matches;
    queueDepth();
  };
  toggle.addEventListener("click", () => {
    paused = !paused;
    try {
      sessionStorage.setItem("anchorline-motion-paused", String(paused));
    } catch {}
    sync();
  });
  reduce.addEventListener("change", sync);
  desktop.addEventListener("change", queueDepth);
  addEventListener("scroll", queueDepth, { passive: true });
  addEventListener("resize", queueDepth, { passive: true });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
  }
  sync();
}
