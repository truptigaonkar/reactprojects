import React, { Component } from "react";
import axios from "axios";
import Helmet from 'react-helmet'
import { TextField } from '@material-ui/core';

export default class Recipes extends Component {
  state = {
    recipes: []
  };

  //http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3
  getRecipe = e => {
    e.preventDefault();
    const ingredient = e.target.elements.ingredient.value;
    if (ingredient) {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?i=${ingredient}`
        ) //https://cors-anywhere.herokuapp.com/ is used to remove error Cross-Origin Read Blocking (CORB)
        .then(response => {
          console.log(response.data.results);
          this.setState({
            recipes: response.data.results,
            ingredient: response.data.ingredient,
            title: response.data.title
          });
        });
    }
    e.target.reset(); //making input empty
  };
  render() {
    return (
      <>
      <Helmet><title>Recipe</title></Helmet>
        <h3>Recipe CARD</h3>
        <form onSubmit={this.getRecipe}>
        <TextField id="standard-basic" name="ingredient" label="Ingredient" placeholder="e.g.fish" />
        </form>
        <div style={{ display: "flex", justifyContent:'space-center', flexWrap: 'wrap' }}>
          {this.state.recipes.map(recipe => (
            <div className='card' key={recipe.id} style={{flex: '0 0 calc(25% - 30px)', margin: '15px'}} >
              <div style={{width:'100%'}}><a href={`${recipe.href}`} target="_blank"><img src={recipe.thumbnail} style={{width:'100%', height:'10%'}} /></a></div>
              <div><a href={`${recipe.href}`} target="_blank">{recipe.title}</a></div>
              <div>{recipe.ingredients}</div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
