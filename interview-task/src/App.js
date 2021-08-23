import './App.css';
import { CurrencyProvider, useCurrency, CURRENCIES } from "./ThemeContext";

import React from 'react';

const DATA = [
    {
        id: '1',
        title: 'The Road to React',
        price: 19.99,
    },
    {
        id: '2',
        title: 'The Road to GraphQL',
        price: 29.99,
    },
];

const App = () => {
    return (
        <CurrencyProvider>
            <CurrencyButtons />
            <Books list={DATA} />
        </CurrencyProvider>
    );
};

const CurrencyButtons = () => {
    const { onChange } = useCurrency();
    return (
        Object.values(CURRENCIES).map((item) => (
            <button onClick={() => onChange(item)}>{item.label}</button>
        ))
    )
};

const Books = ({ list }) => {
    return (
        <ul>
            {list.map((item) => (
                <Book key={item.id} item={item} />
            ))}
        </ul>
    );
};

const Book = ({ item }) => {
    const { value } = useCurrency();

    const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: value.symbol,
    }).format(item.price * value.conversionRate);

    return (
        <li>
            {item.title} - {price}
        </li>
    );
};

export default App;
