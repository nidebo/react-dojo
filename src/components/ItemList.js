import React, { Component } from 'react';
import { Item } from './Item';
import '../styles/ItemList.css';

export class ItemList extends Component {
    render() {
        return (
            <div className="list-wrapper">
                {this.props.items.map(item => (
                    <Item
                        key={item.id}
                        value={item}
                        onClickItem={this.props.onClickItem}
                    />
                ))}
            </div>
        );
    }
}
