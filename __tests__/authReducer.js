import subject from '../client/reducers/authReducer';
import { SIGN_IN, REGISTER, LOGOUT } from '../client/constants/actionTypes';
import { TRUE } from 'node-sass';


describe('Authentication reducer', () => {
  let state;

  beforeEach(() => {
    state = {
      currentUser: null,
      isLogged: false,
    };
  });

  describe('SIGN_IN, but account doesnt exist', () => {
    const actionNoAccount = {
      type: SIGN_IN,
      payload: null,
    };

    it('should return a default state', () => {
      expect(subject(state, actionNoAccount)).toEqual(state);
    });

  });

  describe('SIGN_IN, has an acount', () => {
    const actionWithAccount = {
      type: SIGN_IN,
      payload: { name: 'cb', email: 'cb@gmail.com' },
    };

    const reduced = subject(state, actionWithAccount);

    const expectedState = { 
        currentUser: { name: 'cb', email: 'cb@gmail.com' },
        isLogged: true,
    }


    it('should have a currentUser.name eqal to cb, () => {
      expect(reduced.currentUser.name).toEqual('cb');
    });

    it('should have a currentUser.email eqal to email, () => {
        expect(reduced.currentUser.email).toEqual('cb@gmail.com');
      });

    it('isLogged in to be true', () => {
      expect(reduced.isLogged).toBe(true);
    });

    it('test all of them', () => {
    expect(expectedState).toEqual(reduced)
    });

  });

  describe('REGISTER', () => {
    const actionRegister = {
        type: REGISTER,
        payload: { name: 'cb', email: 'cb@gmail.com' },
    };
  
    const newReduced = subject(state, actionRegister);
  
    const expectedState = { 
        currentUser: { name: 'cb', email: 'cb@gmail.com' },
        isLogged: true,
    }

    it('test all of them', () => {
        expect(expectedState).toEqual(newReduced)
    });
  });

  describe('LOGOUT', () => {
    const actionLogout = {
        type: LOGOUT,
        payload: [],
    }

    const newlyReduced = subject(state, actionLogout);

    it('test logout', () => {
        expect(state).toEqual(newlyReduced);
    })
  })
});
