import React from 'react';
import '../styles/PromoCodeInput.css';

export const PromoCodeInput = ({ onChangePromoCode }) => {
    const onChange = (event) => {
        onChangePromoCode(event.target.value);
    }

    return (
        <div className="promo-wrapper">
            <div className="promo-box">
                <span className="promo-description">¿Tienes un código promocional?</span>
                <input className="promo-input" onChange={onChange} placeholder="Código Promocional" />
            </div>
        </div>
    );
}
