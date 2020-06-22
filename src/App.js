import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import "./App.css"
import List from "./List";

class App extends Component {

    render() {
        return (
        <div>
            <List/>
        </div>
        );
    }
}

export default App;