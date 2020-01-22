import React from 'react';
import '../styles/CheckoutSummary.css';

export const CheckoutSummary = ({ items, discountPercentage }) => {
    const getTotalProducts = () => items.reduce((acc, item) => acc + item.quantity, 0);	

    const getGrandTotal = () => items.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const getDiscount = () => getGrandTotal() * discountPercentage / 100;

    return (
        <div className="summary-wrapper">
            <div className="summary-box">
                <div className="summary-title">
                    Resumen pedido
                </div>
                <hr />
                <div className="summary-info">
                    <div className="summary-products">
                        Total Productos <span className="summary-number">{getTotalProducts()}</span>
                    </div>
                    <div className="summary-price">
                        Total <span className="summary-number">{getGrandTotal()}€</span>
                    </div>
                    { discountPercentage > 0 && (
                        <>
                            <div className="summary-discount">
                                Descuento Promo <span>({discountPercentage}%) </span><span className="summary-number">-{getDiscount()}€</span>
                            </div>
                            <div className="summary-price">
                                Total con Descuento Promo <span className="summary-number">{getGrandTotal() - getDiscount()}€</span>
                            </div>
                        </>
                    )}
                    
                </div>
            </div>
        </div>
    );
}
