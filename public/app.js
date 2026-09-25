(() => {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector("#mobile-nav");
  const copyButton = document.querySelector("[data-copy-email]");
  const copyLabel = copyButton?.querySelector(".copy-email-label");
  const copyStatus = document.querySelector(".copy-status");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const observedSections = ["on-demand", "process"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const setMenu = (open) => {
    if (!menuButton || !mobileNav) return;

    menuButton.setAttribute("aria-expanded", String(open));
    mobileNav.hidden = !open;
    document.body.classList.toggle("menu-open", open);
    const label = menuButton.querySelector(".menu-toggle-label");
    if (label) label.textContent = open ? "Close" : "Menu";
  };

  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    setMenu(open);
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) setMenu(false);
  });

  if ("IntersectionObserver" in window && observedSections.length) {
    const linkById = new Map(
      navLinks.map((link) => [link.getAttribute("href")?.replace("#", ""), link])
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        navLinks.forEach((link) => {
          link.classList.remove("is-active");
          link.removeAttribute("aria-current");
        });

        const active = linkById.get(visible.target.id);
        if (active) {
          active.classList.add("is-active");
          active.setAttribute("aria-current", "location");
        }
      },
      {
        rootMargin: "-22% 0px -58% 0px",
        threshold: [0, .15, .3, .6]
      }
    );

    observedSections.forEach((section) => observer.observe(section));
  }

  if (copyButton && copyLabel && copyStatus) {
    const email = copyButton.dataset.copyEmail;

    const copyFallback = () => {
      const area = document.createElement("textarea");
      area.value = email;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    };

    copyButton.addEventListener("click", async () => {
      let copied = false;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
          copied = true;
        } else {
          copied = copyFallback();
        }
      } catch {
        copied = copyFallback();
      }

      copyStatus.textContent = copied ? "Email copied." : email;
      copyLabel.textContent = copied ? "Copied" : "Copy email";

      window.setTimeout(() => {
        copyStatus.textContent = "";
        copyLabel.textContent = "Copy email";
      }, 2200);
    });
  }
})();
