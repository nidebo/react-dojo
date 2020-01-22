import React from 'react';
import '../styles/Store.css';
import { ItemList } from './ItemList';
import { CheckoutSummary } from './CheckoutSummary';
import { PromoCodeInput } from './PromoCodeInput';

const getCartItems = (catalog) => catalog.map(item => ({ ...item, quantity: 0 }));

export const Store = ({ catalog, promoCodes }) => {
    const [currentCart, setCurrentCart] = React.useState(getCartItems(catalog));
    const [currentDiscount, setCurrentDiscount] = React.useState(0);

    const onClickItem = (id) => {	
        setCurrentCart(items => items.map(item => item.id === id ? {	
            ...item,	
            quantity: item.quantity < item.left ? item.quantity + 1 : item.left,	
        } : item));	
    }

    const onChangePromoCode = (code) => {
        const matchDiscount = promoCodes.find(discount => discount.code === code);
        setCurrentDiscount(matchDiscount ? matchDiscount.discountPercentage : 0);
    } 

    return (
        <div className="store-wrapper">
            <div className="store-name">¡Bienvenido a mi tienda online!</div>
            <div>
                <ItemList items={currentCart} onClick={onClickItem} />
                <PromoCodeInput onChangePromoCode={onChangePromoCode} />
                <CheckoutSummary items={currentCart} discountPercentage={currentDiscount} />
            </div>
        </div>
    )
}
