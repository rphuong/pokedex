import React, {Component} from 'react';

class List extends Component {

    /*
     * Constructs a new List component
     * @param props: properties passed from parent
     */
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            pokemon: this.getPokemon(),
            options: []
        };
    }

    /*
     * Sets up the initial list of options based on the initial pokemon list
     */
    componentDidMount() {
        this.setState({options: this.filter("", this.state.pokemon)});
    }

    /*
     * Returns a list of strings for possible pokemon names to display
     */
    getPokemon = () => {
        return ["Bulbasaur", "Pikachu", "Meowth", "Mew"];
    };

    /*
     * Returns a list of <li>s where each one is a pokemon which partially matches the
     * given query string while ignoring case
     * @param query (string) partial string to search for pokemon names
     * @param pokemon (string[]) list of possible pokemon names to search
     */
    filter = (query, pokemon) => {
        let queryLower = query.toLowerCase();
        let options = [];
        for (let currPoke of pokemon) {
            if (currPoke.toLowerCase().includes(queryLower)) {
                options.push(<li id="poke-item">{currPoke}</li>);
            }
        }
        return options;
    };

    render() {
        console.log(this.state);
        return (
            <div>
                <input id="filter-bar" type="text" value={this.state.query}
                       onChange={(event) => {
                           let query = event.target.value;
                           this.setState({
                               options: this.filter(query, this.state.pokemon),
                               query: query
                           });
                       }}/>
                <ul id="poke-list">
                    {this.state.options}
                </ul>
            </div>
        );
    }
}

export default List;