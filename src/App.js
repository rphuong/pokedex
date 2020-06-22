import React, {Component} from 'react';
import List from "./List";

class App extends Component {

    /*
     * Constructs a new App component
     * @param props: properties passed from parent
     */
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <List/>
        </div>
        );
    }
}

export default App;