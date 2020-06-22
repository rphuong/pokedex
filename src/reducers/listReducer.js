import {UPDATE_QUERY, FETCH_POKEMON, FILTER_OPTIONS} from '../actions/types';

const initialState = {
  query: "",
  pokemon: [],
  options: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_QUERY:
      return {
        ...state,
        query: action.data
      };
    case FETCH_POKEMON:
      return {
        ...state,
        pokemon: action.data
      };
    case FILTER_OPTIONS:
      return {
        ...state,
        options: action.data
      };
    default:
      return state;
  }
}