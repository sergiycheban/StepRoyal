(function () {
    function getCurrentLanguage() {
        const lang = document.documentElement.lang || "ru";

        if (lang.startsWith("uk")) {
            return "ua";
        }

        return "ru";
    }

    function formatPrice(price, currencies) {
        const currencyMeta = currencies[price.currency];

        if (!currencyMeta) {
            return `${price.amount} ${price.currency}`;
        }

        return `${price.amount}${" "}${currencyMeta.symbol}`;
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
                return `<span class="popular-destination-price">${formatPrice(price, currencies)}</span>`;
            }).join("");

            return `
                <div class="popular-destination-item">
                    <div class="popular-destination-route">${route}</div>
                    <div class="popular-destination-prices">${pricesHtml}</div>
                </div>
            `;
        }).join("");
    }

    document.addEventListener("DOMContentLoaded", renderPopularDestinations);
})();