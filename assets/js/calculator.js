// Transfer calculator modal logic

(function () {
    let calculatorInitialized = false;

    function formatPrice(value, currencyCode, currencyMeta, options = {}) {
        const symbol = currencyMeta[currencyCode]?.symbol || currencyCode;
        const { maximumFractionDigits = 2, minimumFractionDigits = 0 } = options;

        const formattedValue = Number(value).toLocaleString("ru-RU", {
            minimumFractionDigits,
            maximumFractionDigits,
        });

        if (currencyCode === "EUR" || currencyCode === "USD") {
            return `${symbol}${formattedValue}`;
        }

        return `${formattedValue} ${symbol}`;
    }

    function fillCurrencies(config) {
        const currencySelect = document.getElementById("currencySelect");
        if (!currencySelect) return;

        currencySelect.innerHTML = "";

        Object.entries(config.currencyMeta).forEach(([code, meta]) => {
            const option = document.createElement("option");
            option.value = code;
            option.textContent = meta.label;
            currencySelect.appendChild(option);
        });
    }

    function initCalculator() {
        if (calculatorInitialized) return;

        if (!window.SITE_CALCULATOR_CONFIG) {
            console.error("SITE_CALCULATOR_CONFIG is not defined");
            return;
        }

        const config = window.SITE_CALCULATOR_CONFIG;

        const distanceRange = document.getElementById("distanceRange");
        const bordersRange = document.getElementById("bordersRange");
        const transportSelect = document.getElementById("transportSelect");
        const currencySelect = document.getElementById("currencySelect");
        const calculateButton = document.getElementById("calculateButton");

        const distanceValue = document.getElementById("distanceValue");
        const bordersValue = document.getElementById("bordersValue");

        const resultPrice = document.getElementById("resultPrice");
        const resultRate = document.getElementById("resultRate");
        const resultBorderFee = document.getElementById("resultBorderFee");

        const contactButton = document.getElementById("calculatorContactButton");

        if (!distanceRange || !bordersRange || !transportSelect || !currencySelect || !calculateButton) {
            return;
        }

        fillCurrencies(config);

        distanceRange.value = config.defaults.distance;
        bordersRange.value = config.defaults.borders;
        transportSelect.value = config.defaults.transport;
        currencySelect.value = config.defaults.currency;

        function syncValues() {
            distanceValue.textContent = distanceRange.value;
            bordersValue.textContent = bordersRange.value;
        }

        function calculate() {
            const distance = Number(distanceRange.value);
            const borders = Number(bordersRange.value);
            const transport = transportSelect.value;
            const currency = currencySelect.value;

            const ratePerKm = config.rates?.[transport]?.[currency];
            const borderFee = config.borderFee?.[currency];

            if (ratePerKm === undefined || borderFee === undefined) {
                console.error("Calculator config is incomplete for:", { transport, currency });
                return;
            }

            const total = (distance * ratePerKm) + (borders * borderFee);

            resultPrice.textContent = formatPrice(total, currency, config.currencyMeta);
            resultRate.textContent = formatPrice(ratePerKm, currency, config.currencyMeta);
            resultBorderFee.textContent = formatPrice(borderFee, currency, config.currencyMeta);
        }

        distanceRange.addEventListener("input", syncValues);
        bordersRange.addEventListener("input", syncValues);
        calculateButton.addEventListener("click", calculate);

        if (contactButton) {
            contactButton.addEventListener("click", function (event) {
                event.preventDefault();

                const modalElement = document.getElementById("transferCalculatorModal");
                const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);

                modalInstance.hide();

                setTimeout(() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }, 250);
            });
        }

        syncValues();
        calculate();

        calculatorInitialized = true;
    }

    window.initTransferCalculator = initCalculator;

    document.addEventListener("DOMContentLoaded", initCalculator);
})();