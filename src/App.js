import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import "./App.css"
import List from "./List";
import Detail from "./Detail";

class App extends Component {

    render() {
        return (
        <div>
            <Switch>
                <Route path="/pokemon/:pokemon_name" component={Detail}/>
                <Route path="/" component={List} />
            </Switch>
        </div>
        );
    }
}

export default App;