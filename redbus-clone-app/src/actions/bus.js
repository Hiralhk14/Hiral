import { SEARCH_BUSES, SET_SEARCH_PARAMS, SET_LOADING, CLEAR_SEARCH } from './constants';

export const searchBuses = (searchResults) => {
  return {
    type: SEARCH_BUSES,
    payload: {
      results: searchResults.results || searchResults,
      total: searchResults.total || searchResults.length || 0,
      searchParams: searchResults.searchParams
    }
  };
};

export const setSearchParams = (params) => {
  return {
    type: SET_SEARCH_PARAMS,
    payload: params
  };
};

export const setLoading = (loading) => {
  return {
    type: SET_LOADING,
    payload: loading
  };
};

export const clearSearch = () => {
  return {
    type: CLEAR_SEARCH
  };
};
