(function () {
    const STORAGE_KEY = "site-theme";
    const DEFAULT_THEME = "light";

    function getSavedTheme() {
        const savedTheme = localStorage.getItem(STORAGE_KEY);

        if (savedTheme === "light" || savedTheme === "dark") {
            return savedTheme;
        }

        return DEFAULT_THEME;
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-bs-theme", theme);

        const toggleButton = document.querySelector("[data-theme-toggle]");
        if (toggleButton) {
            toggleButton.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
            toggleButton.setAttribute("title", theme === "dark" ? "Light mode" : "Dark mode");
            toggleButton.textContent = theme === "dark" ? "☀️" : "🌙";
        }
    }

    function setTheme(theme) {
        localStorage.setItem(STORAGE_KEY, theme);
        applyTheme(theme);
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute("data-bs-theme") || DEFAULT_THEME;
        const nextTheme = currentTheme === "dark" ? "light" : "dark";

        setTheme(nextTheme);
    }

    function initTheme() {
        const savedTheme = getSavedTheme();
        applyTheme(savedTheme);

        const toggleButton = document.querySelector("[data-theme-toggle]");
        if (toggleButton) {
            toggleButton.addEventListener("click", toggleTheme);
        }
    }

    document.addEventListener("DOMContentLoaded", initTheme);

    window.themeToggle = {
        setTheme,
        toggleTheme,
    };
})();