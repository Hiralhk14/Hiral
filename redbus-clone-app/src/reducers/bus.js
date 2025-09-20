import { SEARCH_BUSES, SET_SEARCH_PARAMS, SET_LOADING, CLEAR_SEARCH } from '../actions/constants';

const initialBusState = {
  searchResults: [],
  searchParams: {
    from: '',
    to: '',
    date: ''
  },
  isLoading: false,
  totalBuses: 0
};

export const bus = (state = initialBusState, action) => {
  switch (action.type) {
    case SEARCH_BUSES:
      return {
        ...state,
        searchResults: action.payload?.results || [],
        totalBuses: action.payload?.total || 0,
        isLoading: false
      };

    case SET_SEARCH_PARAMS:
      return {
        ...state,
        searchParams: action.payload
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case CLEAR_SEARCH:
      return {
        ...state,
        searchResults: [],
        totalBuses: 0,
        searchParams: {
          from: '',
          to: '',
          date: ''
        }
      };

    default:
      return state;
  }
};
