import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import "./App.css"
import store from "./store";
import List from "./components/List";
import Detail from "./components/Detail";

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/pokemon/:pokemon_id" component={Detail}/>
            <Route path="/" component={List}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;