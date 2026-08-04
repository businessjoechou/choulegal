document.documentElement.classList.add("js");

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-nav");
toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});
nav?.addEventListener("click", (event) => {
  if (!event.target.closest("a")) return;
  nav.classList.remove("is-open");
  toggle?.setAttribute("aria-expanded", "false");
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !nav?.classList.contains("is-open")) return;
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.focus();
});

if (window.gsap && window.ScrollTrigger) {
  window.gsap.registerPlugin(window.ScrollTrigger);
  const mm = window.gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    window.gsap.timeline({ defaults: { duration: .72, ease: "power3.out" } })
      .from(".hero-copy > *", { autoAlpha: 0, y: 28, stagger: .08 })
      .from(".hero-note", { autoAlpha: 0, y: 32 }, "<.18");
    window.ScrollTrigger.batch(".motion-item", {
      start: "top 88%", once: true, batchMax: 3,
      onEnter: (items) => window.gsap.fromTo(items, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: .8, ease: "power3.out", stagger: .08, overwrite: "auto" })
    });
    window.addEventListener("load", () => window.ScrollTrigger.refresh(), { once: true });
  });
}
