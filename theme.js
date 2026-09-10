// ========================================================
// SAHAYTA 2.0 - DYNAMIC DARK & LIGHT THEME CONTROLLER
// ========================================================
(function () {
  const THEME_KEY = "sahayta_theme";

  function applyTheme(theme) {
    const isDark = theme === "dark";
    if (isDark) {
      document.documentElement.classList.add("dark");
      if (document.body) document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      if (document.body) document.body.classList.remove("dark");
    }
    updateToggleButtons(isDark);
  }

  function updateToggleButtons(isDark) {
    document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
      btn.innerHTML = isDark
        ? `<span>☀️</span> <span>Light Mode</span>`
        : `<span>🌙</span> <span>Dark Mode</span>`;
      btn.setAttribute("title", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
      btn.setAttribute("aria-label", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
    });
  }

  window.toggleTheme = function () {
    const current = localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  };

  // Immediate execution before DOM paint to prevent flash
  const saved = localStorage.getItem(THEME_KEY) || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  if (saved === "dark") {
    document.documentElement.classList.add("dark");
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(localStorage.getItem(THEME_KEY) || saved);
  });
})();
