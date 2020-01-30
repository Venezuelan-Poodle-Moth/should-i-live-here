import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchResult from '../client/components/SearchResult';
configure({ adapter: new Adapter() });


/*
 use shallow for pure unit testing
*/

describe('react unit tests', () => {
    describe('SearchResult', () => {
        let wrapper;
        const props = {
            key: '24',
            address: '125 Lefferts Pl', 
            borough: 'Brooklyn',
            complaintType: 'Noise',
            date: 'Yesterday',
            description: 'Y\'all were annoying',
        };

        beforeAll(() => {
            wrapper = shallow(<SearchResult {...props} />);
        });

        // This component renders a div with the className "search-result"
        it('renders a div with the className \"search-result\"', () => {
            expect(wrapper.type()).toEqual('div');
            expect(wrapper.find('div').hasClass('search-result')).toBe(true);
        });
        // The div renders 5 children elements
        it('renders a div with 5 children elements', () => {
            expect(wrapper.find('div').children()).toHaveLength(5);
        });
        // renders an h3 element with the address props.address
        it('renders an h3 element with an address from props', () => {
            expect(wrapper.find('h3').text()).toEqual(props.address);
        });
    });
});