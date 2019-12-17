import React from 'react';
import '../styles/Item.css';

import { ItemError } from './ItemError';

export const Item = ({ item, onClick }) => {
    return (
        <div className="item-wrapper" onClick={onClick}>
            <div className="item-name">{item.name}</div>
            <div className="item-price">{item.price}€</div>
            <div className="item-quantity">{item.quantity}</div>
            { item.quantity >= item.left && (
                <ItemError max={item.left} />
            )}
        </div>
    );
}
