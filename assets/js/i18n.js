(function () {
    function getNestedValue(obj, path) {
        return path.split('.').reduce((acc, part) => {
            if (acc === undefined || acc === null) return undefined;
            return acc[part];
        }, obj);
    }

    function applyTextTranslations(translations) {
        const textNodes = document.querySelectorAll('[data-i18n]');

        textNodes.forEach((node) => {
            const key = node.getAttribute('data-i18n');
            const value = getNestedValue(translations, key);

            if (value !== undefined) {
                node.textContent = value;
            }
        });
    }

    function applyHtmlTranslations(translations) {
        const htmlNodes = document.querySelectorAll('[data-i18n-html]');

        htmlNodes.forEach((node) => {
            const key = node.getAttribute('data-i18n-html');
            const value = getNestedValue(translations, key);

            if (value !== undefined) {
                node.innerHTML = value;
            }
        });
    }

    function applyPlaceholderTranslations(translations) {
        const placeholderNodes = document.querySelectorAll('[data-i18n-placeholder]');

        placeholderNodes.forEach((node) => {
            const key = node.getAttribute('data-i18n-placeholder');
            const value = getNestedValue(translations, key);

            if (value !== undefined) {
                node.setAttribute('placeholder', value);
            }
        });
    }

    function applyAttributeTranslations(translations) {
        const attrNodes = document.querySelectorAll('[data-i18n-attr]');

        attrNodes.forEach((node) => {
            const config = node.getAttribute('data-i18n-attr');
            if (!config) return;

            const parts = config.split(';').map((item) => item.trim()).filter(Boolean);

            parts.forEach((part) => {
                const [attrName, key] = part.split(':').map((item) => item.trim());
                if (!attrName || !key) return;

                const value = getNestedValue(translations, key);

                if (value !== undefined) {
                    node.setAttribute(attrName, value);
                }
            });
        });
    }

    function applySeoTranslations(translations) {
        const title = getNestedValue(translations, 'seo.title');
        const description = getNestedValue(translations, 'seo.description');

        if (title) {
            document.title = title;
        }

        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta && description) {
            descriptionMeta.setAttribute('content', description);
        }
    }

    function renderTranslations() {
        if (!window.SITE_TRANSLATIONS) {
            console.error('SITE_TRANSLATIONS is not defined');
            return;
        }

        applySeoTranslations(window.SITE_TRANSLATIONS);
        applyTextTranslations(window.SITE_TRANSLATIONS);
        applyHtmlTranslations(window.SITE_TRANSLATIONS);
        applyPlaceholderTranslations(window.SITE_TRANSLATIONS);
        applyAttributeTranslations(window.SITE_TRANSLATIONS);
    }

    window.applySiteTranslations = renderTranslations;

    document.addEventListener("DOMContentLoaded", renderTranslations);
})();