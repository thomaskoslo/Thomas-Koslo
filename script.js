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
  window.location.href = `mailto:hello@tomjkoslo.com?subject=${subject}&body=${body}`;
});
