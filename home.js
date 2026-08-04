document.documentElement.classList.add("js");
if (window.location.hash) document.documentElement.style.scrollBehavior = "auto";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
if (menuToggle && primaryNav) {
  const closeMenu = () => {
    primaryNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };
  menuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  primaryNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuToggle.focus();
    }
  });
}

const canUseGsap = Boolean(window.gsap && window.ScrollTrigger);

if (canUseGsap) {
  window.gsap.registerPlugin(window.ScrollTrigger);
  revealItems.forEach((item) => item.classList.add("is-reveal-ready"));

  const motion = window.gsap.matchMedia();
  motion.add(
    {
      allowMotion: "(prefers-reduced-motion: no-preference)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    },
    ({ conditions }) => {
      if (conditions.reduceMotion || window.location.hash) {
        window.gsap.set(revealItems, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        revealItems.forEach((item) => item.classList.add("is-visible"));
        return;
      }

      const heroTimeline = window.gsap.timeline({
        defaults: { duration: 0.72, ease: "power3.out" }
      });
      heroTimeline
        .from(".hero-copy", { autoAlpha: 0, y: 24 }, 0)
        .from(".navigator-preview", { autoAlpha: 0, y: 34 }, "<0.18")
        .from(".trust-strip p", { autoAlpha: 0, y: 16, stagger: 0.08 }, "<0.22");

      window.ScrollTrigger.batch(".reveal", {
        start: "top 88%",
        once: true,
        interval: 0.08,
        batchMax: 4,
        onEnter: (items) => {
          window.gsap.to(items, {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: "auto",
            onComplete: () => items.forEach((item) => item.classList.add("is-visible"))
          });
        }
      });

      window.addEventListener("load", () => window.ScrollTrigger.refresh(), { once: true });
    }
  );
} else if (reducedMotion || !("IntersectionObserver" in window) || window.location.hash) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8%" });
  revealItems.forEach((item) => {
    const box = item.getBoundingClientRect();
    if (box.top < window.innerHeight * 0.92 && box.bottom > 0) {
      item.classList.add("is-visible");
      return;
    }
    item.classList.add("is-reveal-ready");
    revealObserver.observe(item);
  });
}

const tagline = document.querySelector("[data-word-reveal]");
if (tagline) {
  const source = tagline.textContent.trim();
  const words = "Segmenter" in Intl
    ? [...new Intl.Segmenter("zh-Hant", { granularity: "word" }).segment(source)].map(({ segment }) => segment)
    : [...source];
  tagline.textContent = "";
  words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    tagline.append(span);
  });

  const wordItems = tagline.querySelectorAll(".word");
  if (reducedMotion) {
    wordItems.forEach((word) => word.classList.add("is-visible"));
  } else if (canUseGsap) {
    window.gsap.timeline({
      scrollTrigger: {
        trigger: tagline,
        start: "top 72%",
        once: true
      }
    }).to(wordItems, {
      color: "var(--ink)",
      duration: 0.55,
      ease: "power2.out",
      stagger: 0.055
    });
  } else if (!("IntersectionObserver" in window)) {
    wordItems.forEach((word) => word.classList.add("is-visible"));
  } else {
    const taglineObserver = new IntersectionObserver((entries, observer) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      wordItems.forEach((word) => word.classList.add("is-visible"));
      observer.disconnect();
    }, { threshold: 0.45 });
    taglineObserver.observe(tagline);
  }
}
