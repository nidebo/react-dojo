import React, { Component } from 'react';
import '../styles/Store.css';
import { StoreList } from './StoreList';
import { CheckoutSummary } from './CheckoutSummary';
import stockItems from '../stock/stock';

export class Store extends Component {
    state = {
        pickedItems: stockItems,
    }

    onClickItem = (item) => {
        const currentItemQuantity = this.state.pickedItems[item.id-1].quantity || 0;
        const picked = Object.assign([], this.state.pickedItems);
        picked[item.id-1].quantity = currentItemQuantity + 1;
        this.setState({ pickedItems: picked });
    }

    render() {
        const { pickedItems } = this.state;
        return (
            <div className="store-wrapper">
                <div className="store-name">Bienvenido a mi tienda online!</div>
                <StoreList
                    items={pickedItems}
                    onClickItem={this.onClickItem}
                />
                <CheckoutSummary items={pickedItems} discounts={null} />
            </div>
        );
    }
}
