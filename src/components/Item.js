import React, { Component } from 'react';
import { ItemError } from './ItemError';
import '../styles/Item.css';

export class Item extends Component {
    onClickItem = () => {
        const { value, onClickItem } = this.props;
        const quantity = value.quantity || 0;
        if (quantity < value.left) {
            onClickItem(value);
        }
    }

    render() {
        const { value } = this.props;
        return (
            <div 
                className="item-wrapper"
                onClick={this.onClickItem}        
            >
                <div className="item-name">{value.name}</div>
                <div className="item-price">{value.price}€</div>
                <div className="item-quantity">{value.quantity || 0}</div>
                { value.quantity >= value.left && (
                    <ItemError max={value.left} />
                )}
            </div>
        );
    }
}
