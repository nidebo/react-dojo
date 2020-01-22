import React from 'react';
import '../styles/ItemList.css';
import { Item } from './Item';

export const ItemList = ({ items, onClick }) => (
    <div className="list-wrapper">
        { items.map(item => (	
            <Item key={item.id} item={item} onClick={() => onClick(item.id)} />	
        ))}
    </div>
);
