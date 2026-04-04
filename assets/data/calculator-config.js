window.SITE_CALCULATOR_CONFIG = {
    rates: {
        comfort: {
            UAH: 20,
            MDL: 8.8,
            EUR: 0.45,
            USD: 0.49
        },
        business: {
            UAH: 35,
            MDL: 15.4,
            EUR: 0.79,
            USD: 0.86
        },
        minivan: {
            UAH: 28,
            MDL: 12.3,
            EUR: 0.63,
            USD: 0.69
        }
    },

    borderFee: {
        UAH: 500,
        MDL: 220,
        EUR: 11,
        USD: 12
    },

    currencyMeta: {
        UAH: { label: "грн", symbol: "грн" },
        MDL: { label: "лей", symbol: "лей" },
        EUR: { label: "€", symbol: "€" },
        USD: { label: "$", symbol: "$" }
    },

    defaults: {
        distance: 300,
        borders: 0,
        transport: "comfort",
        currency: "UAH"
    }
};