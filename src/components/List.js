import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateQuery, fetchPokemon, filterOptions} from "../actions/actions";

class List extends Component {

  /*
   * Constructs a new List component
   * @param props: properties passed from parent
   */
  constructor(props) {
    super(props);
  }

  /*
   * Sets up the initial list of options based on the initial pokemon list
   */
  componentDidMount() {
    this.props.fetchPokemon();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pokemon !== nextProps.pokemon) {
       this.props.filterOptions(nextProps.query, nextProps.pokemon);
    }
  }

  /*
   * Stores a list of strings for possible pokemon names to display
   */
  getPokemon = async () => {
    try {
      let response = await fetch("https://pokeapi.co/api/v2/pokemon");
      if (!response.ok) {
        alert("The status is wrong! Expected: 200, Was: " + response.status);
        return;
      }
      let pokemon = await response.json();
      let names = pokemon.results.map(result => result.name);
      this.setState({pokemon: names}, () => {
        this.filter("")
      });
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
    let queryLow = query.toLowerCase();
    let options =
      this.props.pokemon.filter(pokemon => pokemon.name.toLowerCase().includes(queryLow))
                        .map(pokemon =>
                          <li id="poke-item">
                            <Link to={"/pokemon/" + pokemon}>{pokemon}</Link>
                          </li>);
    this.setState({options: options});
  };

  render() {
    return (
      <div>
        <input id="filter-bar" type="text" value={this.props.query}
               onChange={(event) => {
                 let query = event.target.value;
                 this.props.filterOptions(query, this.props.pokemon);
                 this.props.updateQuery(query);
               }}/>
        <ul id="poke-list">
          {this.props.options}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  query: state.list.query,
  pokemon: state.list.pokemon,
  options: state.list.options
});

export default connect(mapStateToProps, {updateQuery, fetchPokemon, filterOptions})(List);