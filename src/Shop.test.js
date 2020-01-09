import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { Shop } from './components/Shop';
import { ItemList } from './components/ItemList';
import { Item } from './components/Item';
import { CheckoutSummary } from './components/CheckoutSummary';

Enzyme.configure({ adapter: new Adapter() });

// REMINDER: 
// Let's try to pass the tests in order.
// As a tip: We can do as minimum as necessary to make the test pass :)

describe('App', () => {
    let wrapper;

    const stock = [
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
    
    const FIRST = 0;
    const SECOND = 1;
    const THIRD = 2;

    beforeEach(() => {
        wrapper = mount(<Shop stock={stock} />);
    });

    describe('Store', () => {
        test('should display an ItemList', () => {
            expect(wrapper.find(ItemList)).to.have.lengthOf(1);
        });
    
        test('should display a CheckoutSummary', () => {
            expect(wrapper.find(CheckoutSummary)).to.have.lengthOf(1);
        });
    });

    describe('ItemList', () => {
        test('should display a <Item /> per item type in the stock', () => {
            const itemList = wrapper.find(ItemList);
            expect(itemList.find(Item)).to.have.lengthOf(3);
        });
    });

    describe('Item', () => {
        test('should display first item name correctly', () => {
            const itemList = wrapper.find(ItemList);
            const firstItem = itemList.find(Item).at(FIRST);
            expect(firstItem.find('.item-name').text()).to.be.equal(stock[FIRST].name);
        });

        test('should display second item name correctly', () => {
            const itemList = wrapper.find(ItemList);
            const secondItem = itemList.find(Item).at(SECOND);
            expect(secondItem.find('.item-name').text()).to.be.equal(stock[SECOND].name);
        });

        test('should display the item price correctly', () => {
            const itemList = wrapper.find(ItemList);
            const firstItem = itemList.find(Item).at(FIRST);
            expect(firstItem.find('.item-price').text()).to.be.equal(`${stock[FIRST].price}€`);
        });

        test('should display the initial item quantity correctly', () => {
            const itemList = wrapper.find(ItemList);
            const firstItem = itemList.find(Item).at(FIRST);
            expect(firstItem.find('.item-quantity').text()).to.be.equal('0');
        });

        test('should update the item quantity display when the item is clicked', () => {
            const itemList = wrapper.find(ItemList);
            const firstItem = itemList.find(Item).at(FIRST);
            firstItem.simulate('click');
            expect(firstItem.find('.item-quantity').text()).to.be.equal('1');
        });

        test('item quantity can not be bigger than stock left', () => {
            const itemList = wrapper.find(ItemList);
            const thirdItem = itemList.find(Item).at(THIRD);
            const { left } = stock[THIRD];
            Array.from(Array(left + 10).keys()).forEach(() => {
                thirdItem.simulate('click');
            });
            expect(thirdItem.find('.item-quantity').text()).to.be.equal(left.toString());
        });
    });

    describe('CheckoutSummary', () => {
        test('should display the initial total price correctly', () => {
            const checkoutSummary = wrapper.find(CheckoutSummary);
            expect(checkoutSummary.find('.summary-price').text()).to.be.equal('Total 0€');
        });

        test('should display the initial total products correctly', () => {
            const checkoutSummary = wrapper.find(CheckoutSummary);
            expect(checkoutSummary.find('.summary-products').text()).to.be.equal('Total Productos 0');
        });

        test('should update the product total when an item is clicked', () => {
            const checkoutSummary = wrapper.find(CheckoutSummary);
            const itemList = wrapper.find(ItemList);
            const firstItem = itemList.find(Item).at(FIRST);
            firstItem.simulate('click');
            expect(checkoutSummary.find('.summary-products').text()).to.be.equal('Total Productos 1');
        });

        test('should update the price total when an item is clicked', () => {
            const checkoutSummary = wrapper.find(CheckoutSummary);
            const itemList = wrapper.find(ItemList);
            const firstItem = itemList.find(Item).at(FIRST);
            const clicks = 2;
            Array.from(Array(clicks).keys()).forEach(() => {
                firstItem.simulate('click');
            });
            
            const firstPrice = stock[FIRST].price;
            const totalPrice = firstPrice * clicks;
            expect(checkoutSummary.find('.summary-price').text()).to.be.equal(`Total ${totalPrice}€`);
        });

        test('should update the price total when many items are clicked', () => {
            const checkoutSummary = wrapper.find(CheckoutSummary);
            const itemList = wrapper.find(ItemList);
            const firstItem = itemList.find(Item).at(FIRST);
            const secondItem = itemList.find(Item).at(SECOND);
            firstItem.simulate('click');
            secondItem.simulate('click');
            const firstPrice = stock[FIRST].price;
            const secondPrice = stock[SECOND].price;
            const totalPrice = firstPrice + secondPrice;
            expect(checkoutSummary.find('.summary-price').text()).to.be.equal(`Total ${totalPrice}€`);
        });
    });

    describe('ItemError', () => {
        test('should display the error correctly', () => {
            const itemList = wrapper.find(ItemList);
            const thirdItem = itemList.find(Item).at(2);
            const { left } = stock[2];
            Array.from(Array(left + 10).keys()).forEach(() => {
                thirdItem.simulate('click');
            });
            expect(thirdItem.text().includes(`${left} máximo`)).to.be.equal(true);
        });
    });
});
