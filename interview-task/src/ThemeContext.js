import React from 'react';

const CurrencyContext = React.createContext(null);
const useCurrency = () => {
    const [currency, setCurrency] = React.useContext(CurrencyContext);
    const handleCurrency = (value) => {
        setCurrency(value);
    };

    return { value: currency, onChange: handleCurrency}
};

const CURRENCIES = {
    Euro: {
        symbol: 'EUR',
        label: 'Euro',
        conversionRate: 1
    },
    Dollar: {
        symbol: 'USD',
        label: 'US Dollar',
        conversionRate: 1.19
    }
};

const CurrencyProvider = ({children}) => {
    const [currency, setCurrency] = React.useState(CURRENCIES.Euro);

    return (
        <CurrencyContext.Provider value={[currency, setCurrency]}>
            {children}
        </CurrencyContext.Provider>
    )
};

export { CurrencyProvider, useCurrency, CURRENCIES };