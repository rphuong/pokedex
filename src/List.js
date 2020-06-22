import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class List extends Component {

    /*
     * Constructs a new List component
     * @param props: properties passed from parent
     */
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            pokemon: [],
            options: []
        };
    }

    /*
     * Sets up the initial list of options based on the initial pokemon list
     */
    componentDidMount() {
        this.getPokemon();
    }

    /*
     * Stores a list of strings for possible pokemon names to display
     */
    getPokemon = async () => {
        try {
            let response = await fetch("https://pokeapi.co/api/v2/pokemon");
            if(!response.ok) {
                alert("The status is wrong! Expected: 200, Was: " + response.status);
                return;
            }
            let pokemon = await response.json();
            let names = [];
            for(const name of pokemon.results) {
                names.push(name.name);
            }
            this.setState({pokemon: names}, () => {this.filter("")});
        } catch (e) {
            alert("There was an error contacting the server.");
            console.log(e);
        }
    };

    /*
     * Stores a list of <li>s where each one is a pokemon which partially matches the
     * given query string while ignoring case. Will search all pokemon stored in
     * this.state.pokemon
     * @param query (string) partial string to search for pokemon names
     */
    filter = (query) => {
        let queryLower = query.toLowerCase();
        let options = [];
        for (let currPoke of this.state.pokemon) {
            if (currPoke.toLowerCase().includes(queryLower)) {
                options.push(<li id="poke-item">
                    <Link to={"/pokemon/" + currPoke}>{currPoke}</Link></li>);
            }
        }
        this.setState({options: options});
    };

    render() {
        console.log(this.state);
        return (
            <div>
                <input id="filter-bar" type="text" value={this.state.query}
                       onChange={(event) => {
                           let query = event.target.value;
                           this.filter(query);
                           this.setState({query: query});
                       }}/>
                <ul id="poke-list">
                    {this.state.options}
                </ul>
            </div>
        );
    }
}

export default List;