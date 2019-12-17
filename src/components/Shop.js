import React from 'react';
import '../styles/Shop.css';

import { ItemList } from './ItemList';
import { CheckoutSummary } from './CheckoutSummary';
import { stock } from '../stock/stock';

const getStockItems = () => stock.map(item => ({ ...item, quantity: 0 }));

export const Shop = () => {
    const [currentStock, setCurrentStock] = React.useState(getStockItems());
    const onClickItem = (id) => {
        setCurrentStock(items => items.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity < item.left ? item.quantity + 1 : item.left,
        } : item));
    }

    return (
        <div className="shop-wrapper">
            <div className="shop-name">Bienvenido a mi tienda online!</div>
            <ItemList items={currentStock} onClickItem={onClickItem} />
            <CheckoutSummary items={currentStock} />
        </div>
    )
}
