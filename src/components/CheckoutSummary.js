import React, { Component } from 'react';
import '../styles/CheckoutSummary.css';

export class CheckoutSummary extends Component {
    getGrandTotal = () => {
        return 20;
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
                        Total {this.getGrandTotal()}€
                    </div>
                </div>
            </div>
        );
    }
}
