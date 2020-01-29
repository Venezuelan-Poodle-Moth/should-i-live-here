import authReducer from '../client/reducers/authReducer';

describe('Auth Reducer', () => {
    let state;
  
    // reset state to initial state before each test
    beforeEach(() => {
      state = {
        currentUser: null,
        isLogged: false,
      };
    });
  
    describe('default state', () => {
      it('should return default state when both inputs are undefined', () => {
        expect(authReducer(undefined, { type: undefined })).toEqual(state);
      });
    });
  
    describe('unrecognized action type', () => {
      it('should return state unchanged when the action type is unrecognized', () => {
          expect(authReducer(state, { type: 'dsgdsgds' })).toBe(state);
      });
    });

    // test all functionality of auth SIGN_IN
    describe('action type SIGN_IN', () => {
        const action = {
            type: 'SIGN_IN',
            payload: {
                id: '12432',
                email: 'ben@gmail.com',
                hash: 'hashashash24982riweuhf',
                name: 'Benny',
            },
        };

        // returns a state that is not strictly equal to original
        it('should return the state that is not strictly equal to the original', () => {
            expect(authReducer(state, action)).not.toBe(state);
        });

        // check that state updates with the action.payload data
        it('should update state with correct payload data', () => {
            const { currentUser, isLogged } = authReducer(state, action);
            expect(currentUser).not.toBe(null);
            expect(isLogged).toBe(true);
        });
    });

    describe('action type REGISTER', () => {
        const action = {
            type: 'REGISTER',
            payload: {
                id: '12432',
                email: 'ben@gmail.com',
                hash: 'hashashash24982riweuhf',
                name: 'Benny',
            },
        };

        // returns a state that is not strictly equal to original
        it('should return the state that is not strictly equal to the original', () => {
            expect(authReducer(state, action)).not.toBe(state);
        });

        // check that state updates with the action.payload data
        it('should update state with correct payload data', () => {
            const { currentUser, isLogged } = authReducer(state, action);
            expect(currentUser).not.toBe(null);
            expect(isLogged).toBe(true);
        });
    });

    // testing functionality for action type LOGOUT
    describe('action type LOGOUT', () => {
        const action = {
            type: 'LOGOUT',
        };

        // returns a state that is not strictly equal to original
        it('should return the state that is not strictly equal to the original', () => {
            expect(authReducer(state, action)).not.toBe(state);
        });

        // check that state updates with the action.payload data
        it('should update state with correct payload data', () => {
            const { currentUser, isLogged } = authReducer(state, action);
            expect(currentUser).toBe(null);
            expect(isLogged).toBe(false);
        });
    });

});