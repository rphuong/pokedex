// Copyright 2020, Rachel Phuong

import React, {Component} from 'react';
import {connect} from "react-redux";
import {getPokemon} from "../actions/actions";

class Detail extends Component {

  /*
   * Constructs a new Detail component
   * @param props: properties passed from parent
   */
  constructor(props) {
    super(props);
    this.pokemonId = this.props.match.params.pokemon_id;
  }

  componentDidMount() {
    this.props.getPokemon(this.pokemonId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pokemon !== this.props.pokemon) {
      this.props.getPokemon(this.pokemonId);
    }
  }

  render()  {
    if (!this.props.detail)
      return null;
    return (
      <div id="detail">
        <div id="detail-top">
          <img src={this.props.detail.sprites.front_default}
               alt={this.props.detail.name}/>
          <h1>{this.props.detail.name}</h1>
          <p>
            ID# {"0".repeat(3 - this.props.detail.id.toString().length)}
            {this.props.detail.id}
          </p>
          <ul id="types">
            {this.props.detail.types.map(type => <li id="type">{type.type.name}</li>)}
          </ul>
          <p>height: {this.props.detail.height}</p>
          <p>weight: {this.props.detail.weight}</p>
        </div>
        <div id="detail-bot">
          <span id="moves">
          <h2>Moves</h2>
          <ul id="moves">
            {this.props.detail.moves.map(move => <li>{move.move.name}</li>)}
          </ul>
          </span>
          <span id="abilities">
          <h2>Abilities</h2>
          <ul id="abilities">
            {this.props.detail.abilities.map(ability => <li>{ability.ability.name}</li>)}
          </ul>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  detail: state.detail,
  pokemon: state.pokemon
});

export default connect(mapStateToProps, {getPokemon})(Detail);