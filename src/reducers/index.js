// Copyright 2020, Rachel Phuong

import {UPDATE_QUERY, FETCH_POKEMON, FILTER_OPTIONS, GET_POKEMON} from '../actions/types';
import {Link} from "react-router-dom";
import React from "react";

/*
 * Initial state of the pokedex app.
 */
const initialState = {
  query: "",  // query for the filter ba
  pokemon: [],  // list of pokemon details as fetched from the pokemon api
  options: [],  // list of pokemon options to display after filtering by the query
  detail: {}  // detail of pokemon to display for the detail view
};

/*
 * root reducer to update the state of the pokedex app.
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_QUERY:
      // action.data is the new query to store
      return {
        ...state,
        query: action.data
      };
    case FETCH_POKEMON:
      // action.data is the fetched pokemon list
      return {
        ...state,
        pokemon: action.data
      };
    case FILTER_OPTIONS:
      // state.query will be used if defined; empty string otherwise
      let query = state.query;
      if (!query)
        query = "";
      query.toLowerCase();
      return {
        ...state,
        options: state.pokemon
                   .filter(pokemon => pokemon.name.toLowerCase().includes(query))
                   .map(pokemon =>
                     <li id="poke-item">
                       <Link to={"/pokemon/" + pokemon.id}>
                         <img src={pokemon.sprites.front_default} alt={pokemon.name}
                           width={125} height={125}/>
                         <br/>{pokemon.name}<br/>
                         {"#" + "0".repeat(3 - pokemon.id.toString().length)
                          + pokemon.id.toString()}
                       </Link>
                     </li>)
      };
    case GET_POKEMON:
      // action.data is the pokemon id of the pokemon detail to display
      if (state.pokemon && state.pokemon.length >= action.data) {
        // only update the state if the pokemon id was previously fetched and cached
        return {
          ...state,
          detail: state.pokemon[action.data - 1]
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}