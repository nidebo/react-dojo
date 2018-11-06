import React, { Component } from 'react';
import { Item } from './Item';
import '../styles/StoreList.css';

export class StoreList extends Component {
    render() {
        console.log(this.props.items);
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
