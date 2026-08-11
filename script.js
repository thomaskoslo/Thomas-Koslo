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

document.querySelector(".contact-card button")?.addEventListener("click", () => {
  const form = document.querySelector(".contact-card");
  const name = form?.querySelector("[name='name']")?.value || "your name";
  const email = form?.querySelector("[name='email']")?.value || "your email";
  const project = form?.querySelector("[name='project']")?.value || "project details";
  const subject = encodeURIComponent("Production inquiry for Thomas Koslo");
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject:\n${project}`);
  window.location.href = `mailto:tomjkoslo@gmail.com?subject=${subject}&body=${body}`;
});

const reelLaunch = document.querySelector(".reel-launch");
const reelModal = document.querySelector(".reel-modal");
const reelModalFrame = document.querySelector(".reel-modal-frame");
const reelCloseButton = document.querySelector(".reel-close");

const closeReel = () => {
  if (!reelModal || !reelModalFrame) return;

  reelModal.hidden = true;
  reelModalFrame.innerHTML = "";
  document.body.classList.remove("has-reel-modal");
  reelLaunch?.focus();
};

const openReel = (reel) => {
  const src = reel.dataset.reelSrc;

  if (!src || !reelModal || !reelModalFrame) return;

  reelModal.hidden = false;
  document.body.classList.add("has-reel-modal");
  reelModalFrame.innerHTML = `
    <iframe
      src="${src}"
      title="Thomas Koslo 2026 reel"
      allow="autoplay; fullscreen; picture-in-picture"
      allowfullscreen></iframe>
  `;
  reelCloseButton?.focus();
};

reelLaunch?.addEventListener("click", (event) => {
  openReel(event.currentTarget);
});

reelLaunch?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  openReel(event.currentTarget);
});

document.querySelectorAll("[data-reel-close]").forEach((control) => {
  control.addEventListener("click", closeReel);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && reelModal && !reelModal.hidden) {
    closeReel();
  }
});
