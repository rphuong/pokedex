// Copyright 2020, Rachel Phuong

import React, {Component} from 'react';
import {connect} from "react-redux";

class Detail extends Component {

  /*
   * Constructs a new Detail component
   * @param props: properties passed from parent
   */
  constructor(props) {
    super(props);
    this.pokemonId = this.props.match.params.pokemon_id;
    this.setDetails();
  }

  /*
   * Stores this pokemon's details if pokemon details cached
   */
  setDetails = () => {
    if (this.props.pokemon && this.props.pokemon.length >= this.pokemonId) {
      this.pokemonDetails = this.props.pokemon[this.pokemonId - 1];
    }
  };

  /*
   * Returns this pokemon's id with 0 fillers to make 3 digits
   */
  getThreeDigitId = () => {
    let id = "00" + this.pokemonId;
    return id.substring(id.length - 3, id.length);
  };

  render() {
    if (!this.pokemonDetails)
      return null;
    return (
      <div id="detail">
        <div id="detail-top">
          <img src={this.pokemonDetails.sprites.front_default}
               alt={this.pokemonDetails.name}/>
          <h1>{this.pokemonDetails.name}</h1>
          <p>ID# {this.getThreeDigitId()}</p>
          <ul id="types">
            {this.pokemonDetails.types.map(type => <li id="type">{type.type.name}</li>)}
          </ul>
          <p>height: {this.pokemonDetails.height}</p>
          <p>weight: {this.pokemonDetails.weight}</p>
        </div>
        <div id="detail-bot">
          <span id="moves">
          <h2>Moves</h2>
          <ul id="moves">
            {this.pokemonDetails.moves.map(move => <li>{move.move.name}</li>)}
          </ul>
          </span>
          <span id="abilities">
          <h2>Abilities</h2>
          <ul id="abilities">
            {this.pokemonDetails.abilities.map(ability => <li>{ability.ability.name}</li>)}
          </ul>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pokemon: state.pokemon,
});

export default connect(mapStateToProps)(Detail);