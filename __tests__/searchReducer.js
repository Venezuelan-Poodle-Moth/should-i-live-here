import searchReducer from '../client/reducers/searchReducer';

/**
 * Since the reducers are pure (in theory), we have to look at the inputs and outputs. We
 * can also add some tests to determine if the reducer really is pure!
 */

describe('Search Reducer', () => {
  let state;

  // reset state to initial state before each test
  beforeEach(() => {
    state = {
      address_search: '',
      previous_searches: [],
      current_results: null,
    };
  });

  describe('default state', () => {
    it('should return default state when both inputs are undefined', () => {
      expect(searchReducer(undefined, { type: undefined })).toEqual(state);
    });
  });

  describe('unrecognized action type', () => {
    it('should return state unchanged when the action type is unrecognized', () => {
        expect(searchReducer(state, { type: 'dsgdsgds' })).toBe(state);
    });
  });

  // test all functionality of search address action
  describe('action type SEARCH_ADDRESS', () => {
    const action = {
        type: 'SEARCH_ADDRESS',
        payload: {
            address_search: `125 Lefferts Pl Brooklyn`,
            current_results: {
                date: '1/29',
                borough: 'brooklyn',
                complaint: 'Noise',
            },
        },
    };

    // returns a state that is not strictly equal to original
    it('should return the state that is not strictly equal to the original', () => {
        expect(searchReducer(state, action)).not.toBe(state);
    });

    // check that state updates with the action.payload data
    // state.previous_searches.length is incremented by 1
    it('should update state with correct payload data', () => {
        const previousLength = state.previous_searches.length;
        const { address_search, previous_searches, current_results } = searchReducer(state, action);
        expect(address_search).toBe(action.payload.address_search);
        expect(previous_searches.length).toBe(previousLength + 1);
        expect(current_results).toEqual(action.payload.current_results);
    });
});

});
