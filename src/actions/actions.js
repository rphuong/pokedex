// Copyright 2020, Rachel Phuong

import {UPDATE_QUERY, FETCH_POKEMON, FILTER_OPTIONS, GET_POKEMON} from './types';

/*
 * Returns an object to update the query as the given query
 */
export const updateQuery = (query) => {
  return {type: UPDATE_QUERY, data: query};
};

/*
 * Returns an object to cache the details of first numPokemon pokemon.
 * Fetches the detail data from the pokemon API
 */
export const fetchPokemon = (numPokemon) => dispatch => {
  let pokeDetails = [];
  let promises = [];
  for (let i = 1; i <= numPokemon; i++) {
    promises.push(fetch("https://pokeapi.co/api/v2/pokemon/" + i)
                   .then(response => response.json())
                   .then(pokemon => pokeDetails[i - 1] = pokemon)
    );
  }
  // When we have finished mutating pokeDetails, return it to cache in immutable state
  Promise.all(promises).then(() => {dispatch({type: FETCH_POKEMON, data: pokeDetails})});
};

/*
 * Returns an object indicating to filter the pokemon options by the current query
 */
export const filterOptions = () => {
  return {type: FILTER_OPTIONS};
};

/*
 * Returns an object to update the current pokemon details to that of the pokemon which
 * has the given id
 */
export const getPokemon = (id) => {
  return {type: GET_POKEMON, data: id};
};