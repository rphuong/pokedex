import {UPDATE_QUERY, FETCH_POKEMON, FILTER_OPTIONS} from './types';
import {Link} from "react-router-dom";
import React from "react";

export const updateQuery = (query) => dispatch => {
  dispatch({type: UPDATE_QUERY, data: query});
};

export const fetchPokemon = () => dispatch => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then(response => response.json())
    .then(pokemon => dispatch({
      type: FETCH_POKEMON,
      data: pokemon.results
    }));
};

export const filterOptions = (query, pokeList) => dispatch => {
  let queryLow = query.toLowerCase();
  let pokemon = pokeList.map(pokemon => pokemon.name);
  let options =
    pokemon.filter(pokemon => pokemon.toLowerCase().includes(queryLow))
            .map(pokemon =>
              <li id="poke-item"><Link to={"/pokemon/" + pokemon}>{pokemon}</Link></li>);
  dispatch({
    type: FILTER_OPTIONS,
    data: options
  });
};