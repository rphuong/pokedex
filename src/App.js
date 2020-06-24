import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import "./App.css"
import List from "./components/List";
import Detail from "./components/Detail";
import {fetchPokemon} from "./actions/actions";

class App extends Component {

  /*
   * Sets up the initial list of options based on the initial pokemon list
   */
  componentDidMount() {
    this.props.fetchPokemon(151);
  }

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