(function () {
    function getCurrentLanguage() {
        const lang = (document.documentElement.lang || "ru").toLowerCase();

        if (lang.startsWith("uk") || lang.startsWith("ua")) {
            return "ua";
        }

        if (lang.startsWith("en")) {
            return "en";
        }

        return "ru";
    }

    function formatPrice(price, currencies, lang) {
        const currencyMeta = currencies[price.currency];

        if (!currencyMeta) {
            return `${price.amount} ${price.currency}`;
        }

        if (lang === "en" && (price.currency === "UAH" || price.currency === "MDL")) {
            return `${price.amount} ${price.currency}`;
        }

        if (price.currency === "EUR" || price.currency === "USD") {
            return `${currencyMeta.symbol}${price.amount}`;
        }

        return `${price.amount} ${currencyMeta.symbol}`;
    }

    function renderPopularDestinations() {
        const root = document.getElementById("popular-destinations-list");

        if (!root || !window.SITE_POPULAR_DESTINATIONS) {
            return;
        }

        const { items = [], currencies = {} } = window.SITE_POPULAR_DESTINATIONS;
        const lang = getCurrentLanguage();

        root.innerHTML = items.map((item) => {
            const route = item.route?.[lang] || item.route?.ru || "";
            const prices = Array.isArray(item.prices) ? item.prices : [];

            const pricesHtml = prices.map((price) => {
                return `<span class="popular-destination-price">${formatPrice(price, currencies, lang)}</span>`;
            }).join("");

            return `
                <div class="popular-destination-item">
                    <div class="popular-destination-route"><a href="/${lang}/${item.slug}/">${route}</a></div>
                    <div class="popular-destination-prices">${pricesHtml}</div>
                </div>
            `;
        }).join("");
    }

    document.addEventListener("DOMContentLoaded", renderPopularDestinations);
})();