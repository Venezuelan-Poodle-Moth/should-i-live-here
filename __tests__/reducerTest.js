import authReducer from '../client/reducers/authReducer';
// const authReducer = require('../client/reducers/authReducer');

const initialState = {
    currentUser: null,
    isLogged: false,
}
describe('test bad action types', () => {

    describe('undefined type', () => {
        it('state should be unchanged for undefined action type', () => {
            expect(authReducer(initialState, {type: undefined})).toEqual(initialState);
        });
    });

    describe('invalid action type', () => {
        it('state should be unchanged for invalid action type', () => {
            expect(authReducer(initialState, {type: 'test'})).toEqual(initialState);
        });
    });
});

describe('test SIGN_IN action type', () => {
    const action = {
        type: 'SIGN_IN',
        payload: {
            email: 'test1234@gmail.com',
            hash: "1234",
            name: 'test'
        }
    }

    it('updates current user if valid', () => {
        expect(authReducer(initialState, action).currentUser).toEqual(action.payload);
    })

    it('when logged in islogged is true', () => {
        expect(authReducer(initialState, action).isLogged).toEqual(true);
    })

    it('state remains unchanged for null payload', () => {
        action.payload = null;
        expect(authReducer(initialState, action)).toEqual(initialState);
    })
});

describe('test REGISTER action type', () => {
    const action = {
        type: 'REGISTER',
        payload: {
            email: 'test1234@gmail.com',
            hash: "1234",
            name: 'test'
        }
    }

    it('updates current user if valid', () => {
        expect(authReducer(initialState, action).currentUser).toEqual(action.payload);
    })

    it('when logged in islogged is true', () => {
        expect(authReducer(initialState, action).isLogged).toEqual(true);
    })

});

describe('test LOGOUT action type', () => {
    const action = {
        type: 'LOGOUT',
        payload: {
            email: 'test1234@gmail.com',
            hash: "1234",
            name: 'test'
        }
    }

    it('updates current user to null', () => {
        expect(authReducer(initialState, action).currentUser).toEqual(null);
    })

    it('when logged in islogged is false', () => {
        expect(authReducer(initialState, action).isLogged).toEqual(false);
    })

});