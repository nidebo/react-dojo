import React from 'react';
import '../styles/Item.css';

export const Item = () => {
    return (
        <div className="item-wrapper">
            <div className="item-name"></div>
            <div className="item-price"></div>
            <div className="item-quantity"></div>
        </div>
    );
}
