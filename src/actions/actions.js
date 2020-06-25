import {UPDATE_QUERY, FETCH_POKEMON, FILTER_OPTIONS} from './types';
import {Link} from "react-router-dom";
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

export const filterOptions = (query, pokeList) => {
  let queryLow = query.toLowerCase();
  let options =
    pokeList.filter(pokemon => pokemon.name.toLowerCase().includes(queryLow))
            .map(pokemon =>
              <li id="poke-item">
                <Link to={"/pokemon/" + pokemon.id}>
                  <img src={pokemon.sprites.front_default} alt={pokemon.name}
                  width={125} height={125}/>
                  <br />{pokemon.name}<br/>
                  {"#" + "0".repeat(3 - pokemon.id.toString().length)
                    + pokemon.id.toString()}
                </Link>
              </li>);
  return {
    type: FILTER_OPTIONS,
    data: options
  };
};