const root = document.documentElement;

window.addEventListener("pointermove", (event) => {
  root.style.setProperty("--mouse-x", `${event.clientX}px`);
  root.style.setProperty("--mouse-y", `${event.clientY}px`);
});

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const sectionRail = document.querySelector(".section-rail");
const sectionRailLinks = [...document.querySelectorAll("[data-scroll-target]")];
const trackedSections = sectionRailLinks
  .map((link) => document.getElementById(link.dataset.scrollTarget))
  .filter(Boolean);
let scrollRailTimer;

const setActiveSection = (id) => {
  sectionRailLinks.forEach((link) => {
    const isActive = link.dataset.scrollTarget === id;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const updateScrollRail = () => {
  if (!sectionRail || !trackedSections.length) return;

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  const viewportPoint = window.innerHeight * 0.38;
  let activeId = trackedSections[0].id;

  trackedSections.forEach((section) => {
    if (section.getBoundingClientRect().top <= viewportPoint) {
      activeId = section.id;
    }
  });

  sectionRail.style.setProperty("--scroll-progress", `${Math.min(100, Math.max(0, progress))}%`);
  setActiveSection(activeId);
};

const wakeScrollRail = () => {
  if (!sectionRail) return;

  document.body.classList.add("is-using-scroll-rail");
  window.clearTimeout(scrollRailTimer);
  scrollRailTimer = window.setTimeout(() => {
    document.body.classList.remove("is-using-scroll-rail");
  }, 1100);
};

window.addEventListener(
  "scroll",
  () => {
    updateScrollRail();
    wakeScrollRail();
  },
  { passive: true }
);
window.addEventListener("resize", updateScrollRail);
sectionRail?.addEventListener("pointerenter", wakeScrollRail);
sectionRail?.addEventListener("focusin", wakeScrollRail);
updateScrollRail();

document.querySelector(".contact-card button")?.addEventListener("click", () => {
  const form = document.querySelector(".contact-card");
  const name = form?.querySelector("[name='name']")?.value || "your name";
  const email = form?.querySelector("[name='email']")?.value || "your email";
  const project = form?.querySelector("[name='project']")?.value || "project details";
  const subject = encodeURIComponent("Production inquiry for Thomas Koslo");
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject:\n${project}`);
  window.location.href = `mailto:tomjkoslo@gmail.com?subject=${subject}&body=${body}`;
});

const playReel = (reel) => {
  const src = reel.dataset.reelSrc;

  if (!src || reel.classList.contains("is-playing")) return;

  reel.classList.add("is-playing");
  reel.removeAttribute("role");
  reel.removeAttribute("tabindex");
  reel.removeAttribute("aria-label");
  reel.innerHTML = `
    <iframe
      src="${src}"
      title="Thomas Koslo 2026 reel"
      allow="autoplay; fullscreen"
      allowfullscreen></iframe>
  `;
};

document.querySelector(".reel-launch")?.addEventListener("click", (event) => {
  playReel(event.currentTarget);
});

document.querySelector(".reel-launch")?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  playReel(event.currentTarget);
});
