import React from 'react';
import '../styles/CheckoutSummary.css';

export const CheckoutSummary = () => {
    return (
        <div className="summary-wrapper">
            <div className="summary-box">
                <div className="summary-title">
                    Resumen pedido
                </div>
                <hr />
                <div className="summary-info">
                    <div className="summary-products">
                        Total Productos <span className="summary-number"></span>
                    </div>
                    <div className="summary-price">
                        Total <span className="summary-number"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
