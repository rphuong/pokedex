// Copyright 2020, Rachel Phuong

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateQuery, fetchPokemon, filterOptions} from "../actions/actions";

class List extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.pokemon !== prevProps.pokemon) {
      this.props.filterOptions("", this.props.pokemon);
    }
  }

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
  query: state.query,
  pokemon: state.pokemon,
  options: state.options
});

export default connect(mapStateToProps, {updateQuery, fetchPokemon, filterOptions})(List);