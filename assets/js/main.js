/* ============================================================
   Dilashma — Portfolio interactions
   Small, dependency-free enhancements on top of the static HTML.
   ============================================================ */

(() => {
  "use strict";

  window.__portfolioReady = true;

  const doc = document;
  const root = doc.documentElement;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ── Footer year ─────────────────────────────────────────── */

  const year = doc.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ── Header state + scroll progress ──────────────────────── */

  const header = doc.getElementById("siteHeader");
  const progress = doc.getElementById("scrollProgress");
  let ticking = false;

  const updateScrollUI = () => {
    const y = window.scrollY || root.scrollTop;
    if (header) header.classList.toggle("scrolled", y > 12);
    if (progress) {
      const max = root.scrollHeight - root.clientHeight;
      const ratio = max > 0 ? Math.min(y / max, 1) : 0;
      progress.style.transform = `scaleX(${ratio})`;
    }
    ticking = false;
  };

  const requestScrollUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateScrollUI);
  };

  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", requestScrollUpdate);
  updateScrollUI();

  /* ── Active navigation link ──────────────────────────────── */

  const navLinks = Array.from(doc.querySelectorAll('.nav-link[href^="#"]'));
  const sections = navLinks
    .map((link) => doc.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === id;
            link.classList.toggle("is-active", isActive);
            if (isActive) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-42% 0px -53% 0px", threshold: 0 }
    );
    sections.forEach((section) => activeObserver.observe(section));
  }

  /* ── Reveal on scroll ────────────────────────────────────── */

  const revealItems = Array.from(doc.querySelectorAll(".reveal"));

  // Light stagger for grouped cards.
  const staggerGroups = [
    [".skills-grid", ".skill-card", 55],
    [".project-grid", ".project-card", 80],
  ];

  staggerGroups.forEach(([groupSelector, itemSelector, step]) => {
    doc.querySelectorAll(groupSelector).forEach((group) => {
      group.querySelectorAll(itemSelector).forEach((item, index) => {
        item.style.setProperty("--delay", `${index * step}ms`);
      });
    });
  });

  if ("IntersectionObserver" in window && !prefersReducedMotion.matches) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  /* ── Mobile menu ─────────────────────────────────────────── */

  const menuToggle = doc.getElementById("menuToggle");
  const primaryNav = doc.getElementById("primaryNav");
  const scrim = doc.getElementById("menuScrim");
  const mobileBreakpoint = window.matchMedia("(max-width: 860px)");
  let lastFocused = null;

  const focusableInNav = () =>
    primaryNav
      ? Array.from(
          primaryNav.querySelectorAll('a[href], button:not([disabled])')
        ).filter((el) => el.offsetParent !== null)
      : [];

  const openMenu = () => {
    if (!primaryNav || !menuToggle) return;
    lastFocused = doc.activeElement;
    root.classList.add("menu-open");
    doc.body.classList.add("menu-open");
    primaryNav.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    if (scrim) scrim.hidden = false;

    window.setTimeout(() => {
      const first = focusableInNav()[0];
      if (first) first.focus({ preventScroll: true });
    }, 120);
  };

  const closeMenu = ({ restoreFocus = true } = {}) => {
    if (!primaryNav || !menuToggle) return;
    root.classList.remove("menu-open");
    doc.body.classList.remove("menu-open");
    primaryNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    if (scrim) scrim.hidden = true;

    if (restoreFocus) {
      const target = lastFocused && lastFocused.focus ? lastFocused : menuToggle;
      target.focus({ preventScroll: true });
    }
  };

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) closeMenu();
      else openMenu();
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        const href = link.getAttribute("href") || "";
        closeMenu({ restoreFocus: false });

        if (!href.startsWith("#") || href.length < 2) return;
        const target = doc.getElementById(href.slice(1));
        if (!target) return;

        // The clicked link is now hidden inside the closed panel, so move focus
        // to the destination instead of leaving it on an invisible element.
        if (!target.hasAttribute("tabindex")) {
          target.setAttribute("tabindex", "-1");
          target.addEventListener("blur", () => target.removeAttribute("tabindex"), {
            once: true,
          });
        }
        window.setTimeout(() => target.focus({ preventScroll: true }), 80);
      });
    });

    if (scrim) {
      scrim.addEventListener("click", () => closeMenu());
    }

    doc.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !primaryNav.classList.contains("is-open")) return;

      const focusable = focusableInNav();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && doc.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && doc.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    const handleBreakpointChange = () => {
      if (!mobileBreakpoint.matches && primaryNav.classList.contains("is-open")) {
        closeMenu({ restoreFocus: false });
      }
    };

    if (typeof mobileBreakpoint.addEventListener === "function") {
      mobileBreakpoint.addEventListener("change", handleBreakpointChange);
    } else if (typeof mobileBreakpoint.addListener === "function") {
      mobileBreakpoint.addListener(handleBreakpointChange);
    }
  }

  /* ── Copy email button ───────────────────────────────────── */

  const copyButton = doc.getElementById("copyEmail");

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const textarea = doc.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    doc.body.appendChild(textarea);
    textarea.select();

    try {
      doc.execCommand("copy");
    } finally {
      textarea.remove();
    }
    return true;
  };

  if (copyButton) {
    const label = copyButton.querySelector(".copy-text");
    let resetTimer = null;

    copyButton.addEventListener("click", async () => {
      const email = copyButton.getAttribute("data-copy");
      if (!email) return;

      try {
        await copyText(email);
        copyButton.classList.add("copied");
        if (label) label.textContent = "Copied!";
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => {
          copyButton.classList.remove("copied");
          if (label) label.textContent = "Copy email";
        }, 2200);
      } catch (error) {
        if (label) label.textContent = "Copy failed";
        window.setTimeout(() => {
          if (label) label.textContent = "Copy email";
        }, 2200);
      }
    });
  }

  /* ── CV viewer ───────────────────────────────────────────── */

  const cvModal = doc.getElementById("cvModal");
  const cvFrame = doc.getElementById("cvFrame");
  const cvOpenLink = doc.getElementById("openCvBtn");

  if (cvModal && cvOpenLink) {
    const cvCloseBtn = cvModal.querySelector(".cv-modal-close");
    let cvLastFocused = null;

    const cvFocusable = () =>
      Array.from(
        cvModal.querySelectorAll(
          'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el === cvFrame || el.offsetParent !== null);

    const openCvModal = () => {
      cvLastFocused = doc.activeElement;
      if (cvFrame && !cvFrame.getAttribute("src")) {
        cvFrame.setAttribute("src", cvFrame.dataset.src);
      }
      cvModal.hidden = false;
      root.classList.add("cv-open");
      doc.body.classList.add("cv-open");
      window.setTimeout(() => {
        if (cvCloseBtn) cvCloseBtn.focus({ preventScroll: true });
      }, 40);
    };

    const closeCvModal = () => {
      cvModal.hidden = true;
      root.classList.remove("cv-open");
      doc.body.classList.remove("cv-open");
      if (cvLastFocused && cvLastFocused.focus) {
        cvLastFocused.focus({ preventScroll: true });
      }
    };

    cvOpenLink.addEventListener("click", (event) => {
      // Let modified clicks open the standalone CV in a new tab as usual.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      openCvModal();
    });

    cvModal.querySelectorAll("[data-close-cv]").forEach((el) => {
      el.addEventListener("click", closeCvModal);
    });

    // The embedded CV asks the parent to close when Escape is pressed inside the frame.
    window.addEventListener("message", (event) => {
      if (event.origin !== window.location.origin) return;
      if (!cvFrame || event.source !== cvFrame.contentWindow) return;
      if (event.data && event.data.type === "cv:close") closeCvModal();
    });

    doc.addEventListener("keydown", (event) => {
      if (cvModal.hidden) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeCvModal();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = cvFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && doc.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && doc.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  /* ── Hero spotlight (fine pointers only) ─────────────────── */

  const spotlight = doc.getElementById("spotlight");
  const hero = doc.getElementById("top");
  const finePointer = window.matchMedia("(pointer: fine)");

  if (spotlight && hero && finePointer.matches && !prefersReducedMotion.matches) {
    let spotRaf = null;
    let pointerX = 52;
    let pointerY = 40;

    const paintSpotlight = () => {
      spotlight.style.setProperty("--mx", `${pointerX}%`);
      spotlight.style.setProperty("--my", `${pointerY}%`);
      spotRaf = null;
    };

    hero.addEventListener(
      "pointermove",
      (event) => {
        const rect = hero.getBoundingClientRect();
        pointerX = ((event.clientX - rect.left) / rect.width) * 100;
        pointerY = ((event.clientY - rect.top) / rect.height) * 100;
        if (!spotRaf) spotRaf = window.requestAnimationFrame(paintSpotlight);
      },
      { passive: true }
    );
  }
})();
