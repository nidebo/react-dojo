import React from 'react';
import '../styles/Shop.css';

import { ItemList } from './ItemList';
import { CheckoutSummary } from './CheckoutSummary';

const getStockItems = (stock) => stock.map(item => ({ ...item, quantity: 0 }));

export const Shop = ({ stock }) => {
    const [currentStock, setCurrentStock] = React.useState(getStockItems(stock));
    const onClickItem = (id) => {
        setCurrentStock(items => items.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity < item.left ? item.quantity + 1 : item.left,
        } : item));
    }

    return (
        <div className="shop-wrapper">
            <div className="shop-name">¡Bienvenido a mi tienda online!</div>
            <div>
                <ItemList items={currentStock} onClickItem={onClickItem} />
                <CheckoutSummary items={currentStock} />
            </div>
        </div>
    )
}
