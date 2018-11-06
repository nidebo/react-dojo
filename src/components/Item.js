import React, { Component } from 'react';
import { ItemError } from './ItemError';
import '../styles/Item.css';

export class Item extends Component {
    onClickItem = () => {
        this.props.onClickItem(this.props.value);
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
                <div className="item-quantity">{value.quantity}</div>
                <ItemError />
            </div>
        );
    }
}
