import React, { Component } from 'react';
import '../styles/ItemError.css';

export class ItemError extends Component {
    render() {
        const { max } = this.props;
        return (
            <div className="error-wrapper">
                {`${max} máximo`}
            </div>
        );
    }
}
