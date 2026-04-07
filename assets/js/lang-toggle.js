(function () {
    const SUPPORTED_LANGUAGES = ["ru", "ua", "en"];
    const DEFAULT_LANGUAGE = "ru";

    function getPathSegments() {
        return window.location.pathname.split("/").filter(Boolean);
    }

    function getCurrentLanguage() {
        const segments = getPathSegments();
        const firstSegment = (segments[0] || "").toLowerCase();

        if (SUPPORTED_LANGUAGES.includes(firstSegment)) {
            return firstSegment;
        }

        return DEFAULT_LANGUAGE;
    }

    function getTargetLanguage(currentLanguage) {
        const currentIndex = SUPPORTED_LANGUAGES.indexOf(currentLanguage);

        if (currentIndex === -1) {
            return DEFAULT_LANGUAGE;
        }

        const nextIndex = (currentIndex + 1) % SUPPORTED_LANGUAGES.length;
        return SUPPORTED_LANGUAGES[nextIndex];
    }

    function buildTargetUrl(targetLanguage) {
        const currentUrl = new URL(window.location.href);
        const segments = getPathSegments();

        if (segments.length > 0 && SUPPORTED_LANGUAGES.includes(segments[0].toLowerCase())) {
            segments[0] = targetLanguage;
        } else {
            segments.unshift(targetLanguage);
        }

        currentUrl.pathname = "/" + segments.join("/") + (window.location.pathname.endsWith("/") ? "/" : "");
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

        console.log("Current language:", currentLanguage);
        console.log("Target language:", targetLanguage);
        console.log("Redirecting to:", targetUrl);

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