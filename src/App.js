import React from 'react';
import './styles/Shop.css';

import { Shop } from './components/Shop';
import { stock } from './stock/stock';

export const App = () => {
    return (
        <Shop stock={stock} />
    );
};
