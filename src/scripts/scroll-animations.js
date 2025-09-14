export function setupScrollAnimations(defaultOptions = { threshold: 0 }) {
    const targets = document.querySelectorAll("[data-animate]");
  
    targets.forEach((el) => {
      if (!(el instanceof HTMLElement)) return;
  
      // read per-element threshold
      const thresholdAttr = el.getAttribute("data-animate-threshold");
      const threshold = thresholdAttr ? parseFloat(thresholdAttr) : defaultOptions.threshold;
  
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
  
          const name = (el.getAttribute("data-animate") || "fade-in-up").trim();
          const delay = el.getAttribute("data-animate-delay");
          const duration = el.getAttribute("data-animate-duration");
          const once = el.getAttribute("data-animate-once");
  
          if (delay) el.style.animationDelay = delay;
          if (duration) el.style.animationDuration = duration;
  
          el.classList.remove("opacity-0");
          el.classList.add(`animate-${name}`);
  
          if (once !== "false") observer.unobserve(el);
        });
      }, { threshold });
  
      io.observe(el);
    });
  }
  
  // Auto-init
  if (typeof window !== "undefined") {
    window.addEventListener("DOMContentLoaded", () => setupScrollAnimations());
  }
  