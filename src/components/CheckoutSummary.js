import React from 'react';
import '../styles/CheckoutSummary.css';

export const CheckoutSummary = ({ items }) => {
    const getTotalProducts = () => items.reduce((acc, item) => acc + item.quantity, 0);

    const getGrandTotal = () => items.reduce((acc, item) => acc + item.quantity * item.price, 0);

    return (
        <div className="summary-wrapper">
            <div className="summary-box">
                <div className="summary-title">
                    Resumen pedido
                </div>
                <hr />
                <div className="summary-total">
                    <div className="summary-products">
                        Total Productos <span className="summary-number">{getTotalProducts()}</span>
                    </div>
                    <div className="summary-price">
                        Total <span className="summary-number">{getGrandTotal()}€</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
