// Copyright 2020, Rachel Phuong

import {UPDATE_QUERY, FETCH_POKEMON, FILTER_OPTIONS, GET_POKEMON} from './types';
import React from "react";

export const updateQuery = (query) => {
  return {type: UPDATE_QUERY, data: query};
};

export const fetchPokemon = (numPokemon) => dispatch => {
  let pokeDetails = [];
  let promises = [];
  for (let i = 1; i <= numPokemon; i++) {
    promises.push(fetch("https://pokeapi.co/api/v2/pokemon/" + i)
      .then(response => response.json())
      .then(pokemon => pokeDetails[i - 1] = pokemon));
  }
  Promise.all(promises)
    .then(() => {dispatch({
      type: FETCH_POKEMON,
      data: pokeDetails
    })});
};

export const filterOptions = (query) => {
  return {
    type: FILTER_OPTIONS,
    data: query.toLowerCase()
  };
};