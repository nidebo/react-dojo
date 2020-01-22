import React from 'react';
import '../styles/PromoCodeInput.css';

export const PromoCodeInput = () => {
    return (
        <div className="promo-wrapper">
            <div className="promo-box">
                <span className="promo-description">¿Tienes un código promocional?</span>
                <input className="promo-input" placeholder="Código Promocional" />
            </div>
        </div>
    );
}
