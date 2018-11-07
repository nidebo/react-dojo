import React, { Component } from 'react';
import '../styles/Item.css';

export class Item extends Component {
    render() {
        return (
            <div className="item-wrapper">
                <div className="item-name"></div>
                <div className="item-price"></div>
                <div className="item-quantity"></div>
            </div>
        );
    }
}
