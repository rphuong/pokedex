import React, {Component} from 'react';

class Detail extends Component {

    /*
     * Constructs a new List component
     * @param props: properties passed from parent
     */
    constructor(props) {
        super(props);
        this.state = {
        };
        this.pokemonName = props.match.params.pokemon_name;
    }

    /*
     * Sets up the initial list of options based on the initial pokemon list
     */
    componentDidMount() {
    }

    render() {
        return (
            <div>
                Detail view for {this.pokemonName}
            </div>
        );
    }
}

export default Detail;