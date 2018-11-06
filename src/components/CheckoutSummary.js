import React, { Component } from 'react';
import '../styles/CheckoutSummary.css';

export class CheckoutSummary extends Component {
    getGrandTotal = () => {
        const { items } = this.props;
        return items.reduce((acc, item) => {
            const qty = item.quantity || 0;
            return acc + qty * item.price;
        }, 0);
    }

    getProductsTotal = () => {
        const { items } = this.props;
        return items.reduce((acc, item) => {
            const qty = item.quantity || 0;
            return acc + qty;
        }, 0);
    }

    render() {
        return (
            <div className="summary-wrapper">
                <div className="summary-box">
                    <div className="summary-title">
                        Resumen pedido
                    </div>
                    <hr />
                    <div className="summary-total">
                        <div className="summary-products">
                            Total Productos <span className="summary-number">{this.getProductsTotal()}</span>
                        </div>
                        <div className="summary-price">
                            Total <span className="summary-number">{this.getGrandTotal()}€</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
