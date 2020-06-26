// Copyright 2020, Rachel Phuong

import {UPDATE_QUERY, FETCH_POKEMON, FILTER_OPTIONS, GET_POKEMON} from '../actions/types';
import {Link} from "react-router-dom";
import React from "react";

const initialState = {
  query: "",
  pokemon: [],
  options: [],
  detail: {}
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
        options: state.pokemon
                   .filter(pokemon => pokemon.name.toLowerCase().includes(action.data))
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
      if (state.pokemon && state.pokemon.length >= action.data) {
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