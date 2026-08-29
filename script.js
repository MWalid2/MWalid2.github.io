// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle: cycles between explicit light/dark, persisted in localStorage.
// Falls back to system preference (prefers-color-scheme) when nothing is stored.
(function () {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("themeToggle");
  const iconSun = document.getElementById("iconSun");
  const iconMoon = document.getElementById("iconMoon");

  function getStored() {
    try {
      return localStorage.getItem("theme");
    } catch (e) {
      return null;
    }
  }

  function apply(theme) {
    if (theme === "dark" || theme === "light") {
      root.setAttribute("data-theme", theme);
    } else {
      root.removeAttribute("data-theme");
    }
    const isDark =
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    iconSun.hidden = isDark;
    iconMoon.hidden = !isDark;
  }

  const stored = getStored();
  apply(stored);

  toggleBtn.addEventListener("click", function () {
    const current =
      root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    apply(next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  });
})();
