// ========================================================
// SAHAYTA 2.0 - DYNAMIC DARK & LIGHT THEME CONTROLLER
// ========================================================
(function () {
  const THEME_KEY = "sahayta_theme";

  function getTheme() {
    return localStorage.getItem(THEME_KEY) || "light";
  }

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
    window.dispatchEvent(new CustomEvent("sahayta:themechange", { detail: { theme, isDark } }));
  }

  function updateToggleButtons(isDark) {
    const isHi = window.SahaytaLang && window.SahaytaLang.getLanguage() === "hi";
    const lightText = isHi ? "लाइट मोड" : "Light Mode";
    const darkText = isHi ? "डार्क मोड" : "Dark Mode";

    document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
      btn.innerHTML = isDark
        ? `<span>☀️</span> <span>${lightText}</span>`
        : `<span>🌙</span> <span>${darkText}</span>`;
      btn.setAttribute("title", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
      btn.setAttribute("aria-label", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
    });
  }

  window.toggleTheme = function () {
    const current = getTheme();
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  };

  // Immediate execution before DOM paint to prevent flash
  const saved = localStorage.getItem(THEME_KEY) || "light";
  if (saved === "dark") {
    document.documentElement.classList.add("dark");
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(getTheme());
  });

  window.addEventListener("sahayta:langchange", () => {
    updateToggleButtons(getTheme() === "dark");
  });
})();
