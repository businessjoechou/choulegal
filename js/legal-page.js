const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-nav");

toggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open") ?? false;
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
  toggle?.setAttribute("aria-expanded", "false");
  toggle?.focus();
});

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());
