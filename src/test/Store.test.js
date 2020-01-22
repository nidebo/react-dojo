import React from 'react';
import { Store } from '../components/Store';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// REMINDER: 
// Let's try to pass the tests in order.
// As a tip: We can do as minimum as necessary to make the test pass :)

describe('Store', () => {
    let wrapper;

    const catalog = [
        {
            id: 1,
            name: 'Apple',
            price: 2,
            left: 2,
        },
        {
            id: 2,
            name: 'Orange',
            price: 5,
            left: 3,
        },
        {
            id: 3,
            name: 'Pear',
            price: 4,
            left: 2,
        }
    ];

    const codes = [{ code: 'awesome', discountPercentage: 10 }]
    
    beforeEach(() => {
        wrapper = render(<Store catalog={catalog} promoCodes={codes} />);
    });

    it('should display the name of an item in the catalog', () => {
        expect(wrapper.getByText('Apple')).toBeTruthy()
    });

    it('should display the item of each item type in the catalog', () => {
        catalog.map(item => expect(wrapper.getByText(item.name)).toBeTruthy());
    });

    it('should display the price of each item type in the catalog', () => {
        catalog.map(item => expect(wrapper.getByText(`${item.price}€`)).toBeTruthy());
    });
 
    it('should display the initial item quantity correctly', () => {
        const quantity = wrapper.getAllByText('0')[0];
        expect(quantity).toBeTruthy();
    });

    it('should update the item quantity display when the item is clicked', () => {
        const quantity = wrapper.getAllByText('0')[0];
        fireEvent.click(quantity);
        fireEvent.click(quantity);
        expect(quantity.textContent).toEqual('2');
    });

    it('should not display item quantity bigger than stock left', () => {
        const { left } = catalog[0];
        const quantity = wrapper.getAllByText('0')[0];
        Array.from(Array(left + 10).keys()).forEach(() => {
            fireEvent.click(quantity);
        });
        expect(quantity.textContent).toEqual(left.toString());
    });

    it('should display the initial total price correctly', () => {
        expect(wrapper.container).toHaveTextContent('Total 0€');
    });

    it('should display the initial total products correctly', () => {
        expect(wrapper.container).toHaveTextContent('Total Productos 0');
    });

    it('should update the product total when an item is clicked', () => {
        const item = wrapper.getByText('Apple');
        fireEvent.click(item);
        expect(wrapper.container).toHaveTextContent('Total Productos 1');
    });

    it('should update the price total when an item is clicked', () => {
        const item = wrapper.getByText('Apple');
        fireEvent.click(item);
        fireEvent.click(item);
        
        const { price } = catalog[0];
        const totalPrice = price * 2;
        expect(wrapper.container).toHaveTextContent(`Total ${totalPrice}€`);
    });

    it('should update the price total respecting item max stock', () => {
        const { price, left } = catalog[0];
        const item = wrapper.getByText('Apple');
        Array.from(Array(left + 10).keys()).forEach(() => {
            fireEvent.click(item);
        });

        const totalPrice = price * left;
        expect(wrapper.container).toHaveTextContent(`Total ${totalPrice}€`);
    });

    it('should update the price total when many items are clicked', () => {
        const apple = wrapper.getByText('Apple');
        const orange = wrapper.getByText('Orange');
        fireEvent.click(apple);
        fireEvent.click(orange);
        
        const { price: applePrice } = catalog[0];
        const { price: orangePrice } = catalog[1];
        const totalPrice = applePrice + orangePrice;
        expect(wrapper.container).toHaveTextContent(`Total ${totalPrice}€`);
    });

    it('should display an error when item selection count is max allowed', () => {
        const apple = wrapper.getByText('Apple');
        const { left } = catalog[0];
        Array.from(Array(left + 10).keys()).forEach(() => {
            fireEvent.click(apple);
        });
        expect(wrapper.container).toHaveTextContent(`${left} máximo`);
    });

    it('should not display an error when item selection count is less than max allowed', () => {
        expect(wrapper.container).not.toHaveTextContent('máximo');
    })

    /* BONUS TRACK */
    it('should allow to input a discount code', () => {
        const input = wrapper.getByPlaceholderText('Código Promocional');
        const newValue = 'ABCD';
        fireEvent.change(input, { target: { value: newValue }});
        expect(input.value).toEqual(newValue);
    });

    it('should display the percentage discount when valid discount code is supplied', () => {
        const { code, discountPercentage } = codes[0];
        const input = wrapper.getByPlaceholderText('Código Promocional');
        fireEvent.change(input, { target: { value: code }});
        expect(wrapper.container).toHaveTextContent(`Descuento Promo (${discountPercentage}%)`);
    });

    it('should display the discounted amount when valid discount code is supplied', () => {
        const { code, discountPercentage } = codes[0];
        const input = wrapper.getByPlaceholderText('Código Promocional');
        fireEvent.change(input, { target: { value: code }});

        const apple = wrapper.getByText('Apple');
        fireEvent.click(apple);
        
        const { price: applePrice } = catalog[0];
        const discount = discountPercentage * applePrice / 100;
        expect(wrapper.container).toHaveTextContent(`-${discount}€`);
    });

    it('should display the discounted total when valid discount code is supplied', () => {
        const { code, discountPercentage } = codes[0];
        const input = wrapper.getByPlaceholderText('Código Promocional');
        fireEvent.change(input, { target: { value: code }});

        const apple = wrapper.getByText('Apple');
        fireEvent.click(apple);
        fireEvent.click(apple);
        
        const { price: applePrice } = catalog[0];
        const total = applePrice * 2;
        const discount = discountPercentage * applePrice * 2 / 100;
        const discountedTotal = total - discount;
        expect(wrapper.container).toHaveTextContent(`Total con Descuento Promo ${discountedTotal}€`);
    });
});
