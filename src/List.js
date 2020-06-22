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

    componentDidMount() {
        this.setState({options: this.filter("", this.state.pokemon)});
    }

    getPokemon = () => {
        return ["Bulbasaur", "Pikachu", "Meowth", "Mew"];
    };

    filter = (query, pokemon) => {
        let options = [];
        for (let currPoke of pokemon) {
            if (currPoke.toLowerCase().includes(query)) {
                options.push(<li>{currPoke}</li>);
            }
        }
        return options;
    };

    render() {
        console.log(this.state);
        return (
            <div>
                <input type="text" value={this.state.query}
                       onChange={(event) => {
                           let query = event.target.value;
                           this.setState({
                               options: this.filter(query.toLowerCase(), this.state.pokemon),
                               query: query
                           });
                       }}/>
                <ul>
                    {this.state.options}
                </ul>
            </div>
        );
    }
}

export default List;