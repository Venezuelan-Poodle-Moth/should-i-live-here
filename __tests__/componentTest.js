import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import MainContainer from '../client/components/MainContainer.jsx';
import SearchResult from '../client/components/SearchResult.jsx';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

const initialState = {
    auth: {
        currentUser: {
            email: 'test1234@gmail.com',
            hash: "1234",
            name: 'test'
        },
        isLogged: true
    }
};
const mockStore = configureStore();
// let wrapper;

describe('React unit tests', () => {
    
    // describe('MainContainer', () => {
    //     let wrapper;
    
    //     let store;
        
    //     beforeAll(() => {
    //         store = mockStore(initialState);
    //         wrapper = shallow(<MainContainer store={store} />)
    //     });

    //     it('Renders a Router', () => {
    //         expect(wrapper.type()).toEqual('Router')
    //     })

    // })

    describe('SearchResult', () => {
        let wrapper;
    
        // let store;
        const props = {
            date: 'date',
            address: 'address',
            borough: 'borough',
            complaintType: 'complaint',
            description: 'description'
        }
        
        beforeAll(() => {
            // store = mockStore(initialState);
            wrapper = shallow(<SearchResult {...props} />)
        });

        it('Renders a Div', () => {
            console.log("wrapper find p: ", wrapper.find('p'));
            expect(wrapper.type()).toEqual('div');
        })

        it('Renders (4) p elements', () => {
            expect(wrapper.find('p').length).toEqual(4);
        })

        it('Renders (1) h3 element', () => {
            expect(wrapper.find('h3').length).toEqual(1);
        })

    })

    // describe('SearchResultSSSS', () => {
    //     let wrapper;
    
    //     // let store;
    //     const props = {
    //         date: 'date',
    //         address: 'address',
    //         borough: 'borough',
    //         complaintType: 'complaint',
    //         description: 'description'
    //     }
        
    //     beforeAll(() => {
    //         // store = mockStore(initialState);
    //         wrapper = shallow(<SearchResult {...props} />)
    //     });

    //     it('Renders a Div', () => {
    //         // console.log("wrapper find p: ", wrapper.find('p').length);
    //         expect(wrapper.type()).toEqual('div');
    //     })

    //     it('Renders (4) p elements', () => {
    //         expect(wrapper.find('p').length).toEqual(4);
    //     })

    //     it('Renders (1) h3 element', () => {
    //         expect(wrapper.find('h3').length).toEqual(1);
    //     })

    // })

})


