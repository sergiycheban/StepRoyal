(function () {
    function formatRate(value, currencyCode, currencyMeta) {
        const symbol = currencyMeta[currencyCode]?.symbol || currencyCode;

        const formattedValue = Number(value).toLocaleString("ru-RU", {
            minimumFractionDigits: value < 1 ? 2 : 0,
            maximumFractionDigits: value < 1 ? 2 : 2,
        });

        if (currencyCode === "EUR" || currencyCode === "USD") {
            return `from ${symbol}${formattedValue} / km`;
        }

        return `от ${formattedValue} ${symbol} / км`;
    }

    function getLocalizedSuffix(currencyCode) {
        const lang = document.documentElement.lang || "ru";

        const suffixMap = {
            ru: {
                EUR: "/ км",
                USD: "/ км",
                UAH: "/ км",
                MDL: "/ км",
                default: "/ км",
                from: "от",
            },
            uk: {
                EUR: "/ км",
                USD: "/ км",
                UAH: "/ км",
                MDL: "/ км",
                default: "/ км",
                from: "від",
            },
        };

        const locale = lang.startsWith("uk") ? "uk" : "ru";
        return {
            suffix: suffixMap[locale][currencyCode] || suffixMap[locale].default,
            from: suffixMap[locale].from,
        };
    }

    function formatRateLocalized(value, currencyCode, currencyMeta) {
        const symbol = currencyMeta[currencyCode]?.symbol || currencyCode;
        const { suffix, from } = getLocalizedSuffix(currencyCode);

        const formattedValue = Number(value).toLocaleString("ru-RU", {
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