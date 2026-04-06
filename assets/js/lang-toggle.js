(function () {
    function getCurrentLanguage() {
        const path = window.location.pathname.toLowerCase();

        if (path.includes("/ua/")) {
            return "ua";
        }

        return "ru";
    }

    function getTargetLanguage(currentLanguage) {
        return currentLanguage === "ru" ? "ua" : "ru";
    }

    function buildTargetUrl(targetLanguage) {
        const currentUrl = new URL(window.location.href);
        const currentPath = currentUrl.pathname;

        let newPath;

        if (currentPath.includes("/ru/")) {
            newPath = currentPath.replace("/ru/", `/${targetLanguage}/`);
        } else if (currentPath.includes("/ua/")) {
            newPath = currentPath.replace("/ua/", `/${targetLanguage}/`);
        } else {
            newPath = `/${targetLanguage}/`;
        }

        currentUrl.pathname = newPath;
        return currentUrl.toString();
    }

    function updateButtonLabel() {
        const button = document.querySelector("[data-lang-toggle]");
        if (!button) {
            return;
        }

        const currentLanguage = getCurrentLanguage();
        button.textContent = currentLanguage.toUpperCase();
    }

    function toggleLanguage() {
        const currentLanguage = getCurrentLanguage();
        const targetLanguage = getTargetLanguage(currentLanguage);
        const targetUrl = buildTargetUrl(targetLanguage);

        window.location.href = targetUrl;
    }

    function initLanguageToggle() {
        const button = document.querySelector("[data-lang-toggle]");
        if (!button) {
            return;
        }

        updateButtonLabel();
        button.addEventListener("click", toggleLanguage);
    }

    document.addEventListener("DOMContentLoaded", initLanguageToggle);
})();