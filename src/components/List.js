// Copyright 2020, Rachel Phuong

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateQuery, fetchPokemon, filterOptions} from "../actions/actions";

/*
 * List view for pokedex. Displays pokemon options with an filter bar at the top to
 * search by certain pokemon names
 */
class List extends Component {

  /*
   * If the pokemon list has already been cached, filter the preliminary options
   */
  componentDidMount() {
    if (this.props.pokemon)
      this.props.filterOptions();
  }

  /*
   * Filter options again if there is a new pokemon list or query
   */
  componentDidUpdate(prevProps) {
    if (this.props.pokemon !== prevProps.pokemon || this.props.query !== prevProps.query)
      this.props.filterOptions();
  }

  /*
   * Renders this with a filter bar followed by all the pokemon options
   */
  render() {
    return (
      <div>
        <input id="filter-bar" type="text" value={this.props.query}
               onChange={(event) => {
                 this.props.updateQuery(event.target.value);
               }}
        />
        <ul id="poke-list">
          {this.props.options}
        </ul>
      </div>
    );
  }
}

/*
 * Maps the redux state to this.props
 */
const mapStateToProps = state => ({
  query: state.query,
  pokemon: state.pokemon,
  options: state.options
});

export default connect(mapStateToProps, {updateQuery, fetchPokemon, filterOptions})(List);