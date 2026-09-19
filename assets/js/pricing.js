(function () {
    function getLocalizedSuffix(currencyCode) {
        const lang = (document.documentElement.lang || "ru").toLowerCase();

        const suffixMap = {
            ru: { suffix: "/ км", from: "от", locale: "ru-RU" },
            uk: { suffix: "/ км", from: "від", locale: "uk-UA" },
            en: { suffix: "/ km", from: "from", locale: "en-US" },
        };

        const localeKey = lang.startsWith("uk") ? "uk" : (lang.startsWith("en") ? "en" : "ru");
        return suffixMap[localeKey];
    }

    function formatRateLocalized(value, currencyCode, currencyMeta) {
        const symbol = currencyMeta[currencyCode]?.symbol || currencyCode;
        const { suffix, from, locale } = getLocalizedSuffix(currencyCode);

        const formattedValue = Number(value).toLocaleString(locale, {
            minimumFractionDigits: value < 1 ? 2 : 0,
            maximumFractionDigits: value < 1 ? 2 : 2,
        });

        if (currencyCode === "EUR" || currencyCode === "USD") {
            return `${from} ${symbol}${formattedValue} ${suffix}`;
        }

        return `${from} ${formattedValue} ${symbol} ${suffix}`;
    }

    function renderPlanPrices(containerId, rateMap, currencyMeta) {
        const container = document.getElementById(containerId);
        if (!container || !rateMap || !currencyMeta) return;

        container.innerHTML = "";

        Object.keys(currencyMeta).forEach((currencyCode) => {
            const rate = rateMap[currencyCode];
            if (rate === undefined) return;

            const item = document.createElement("div");
            item.className = "pricing-currency-line";
            item.textContent = formatRateLocalized(rate, currencyCode, currencyMeta);

            container.appendChild(item);
        });
    }

    function renderPricingCards() {
        if (!window.SITE_CALCULATOR_CONFIG) {
            console.error("SITE_CALCULATOR_CONFIG is not defined");
            return;
        }

        const config = window.SITE_CALCULATOR_CONFIG;

        renderPlanPrices("pricing-plan1-prices", config.rates?.comfort, config.currencyMeta);
        renderPlanPrices("pricing-plan2-prices", config.rates?.minivan, config.currencyMeta);
        renderPlanPrices("pricing-plan3-prices", config.rates?.business, config.currencyMeta);
    }

    document.addEventListener("DOMContentLoaded", renderPricingCards);
})();