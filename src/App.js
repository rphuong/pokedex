// Copyright 2020, Rachel Phuong

import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import "./App.css"
import List from "./components/List";
import Detail from "./components/Detail";
import {fetchPokemon} from "./actions/actions";

/*
 * The number of pokemon to display and cache for this app
 */
const NUM_POKEMON = 151;

/*
 * A pokedex which has a list view to search pokemon and has detail view for each
 * pokemon included in the list view
 */
class App extends Component {

  /*
   * Sets up the initial pokemon list
   */
  componentDidMount() {
    this.props.fetchPokemon(NUM_POKEMON);
  }

  /*
   * Renders this with routes to either the list view or detail view
   */
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/pokemon/:pokemon_id" component={Detail}/>
          <Route path="/" component={List}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(null, {fetchPokemon})(App);