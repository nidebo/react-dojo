import React, { Component } from 'react';
import '../styles/Shop.css';
import { ItemList } from './ItemList';
import { CheckoutSummary } from './CheckoutSummary';
import { stock } from '../stock/stock';
import _ from 'lodash';

export class Shop extends Component {
    state = {
        pickedItems: stock,
    }

    onClickItem = (item) => {
        const currentItemQuantity = this.state.pickedItems[item.id-1].quantity || 0;
        const picked = _.cloneDeep(this.state.pickedItems);
        picked[item.id-1].quantity = currentItemQuantity + 1;
        this.setState({ pickedItems: picked });
    }

    render() {
        const { pickedItems } = this.state;
        return (
            <div className="shop-wrapper">
                <div className="shop-name">Bienvenido a mi tienda online!</div>
                <ItemList
                    items={pickedItems}
                    onClickItem={this.onClickItem}
                />
                <CheckoutSummary items={pickedItems} />
            </div>
        );
    }
}
