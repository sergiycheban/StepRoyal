window.SITE_CALCULATOR_CONFIG = {
    rates: {
        comfort: {
            UAH: 35,
            MDL: 13.7,
            EUR: 0.88,
            USD: 0.95
        },
        business: {
            UAH: 40,
            MDL: 15.6,
            EUR: 1.00,
            USD: 1.08
        },
        minivan: {
            UAH: 55,
            MDL: 21.5,
            EUR: 1.38,
            USD: 1.49
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