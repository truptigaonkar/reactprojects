import React, { Component } from "react";
import axios from "axios";

export default class Recipes extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       recipes: []
  //     };
  //   }
  state = {
    recipes: []
  };

  //http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3
  getRecipe = e => {
    e.preventDefault();
    const ingredient = e.target.elements.ingredient.value;
    if(ingredient){
    axios
      .get(`https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?i=${ingredient}`) //https://cors-anywhere.herokuapp.com/ is used to remove error Cross-Origin Read Blocking (CORB)
      .then(response => {
        console.log(response.data.results);
        this.setState({
          recipes: response.data.results,
          ingredient: response.data.ingredient,
          title: response.data.title
        });
      });
    }
  };
  render() {
    return (
      <>
        <h3>Recipes</h3>
        <form onSubmit={this.getRecipe}>
          <input type="text" name="ingredient" placeholder="e.g. fish" />
          <button>GET</button>
        </form>
        {this.state.recipes.map(recipe => (
          <ul key={recipe.id}>
            <li><a href={`${recipe.href}`} target="_blank"><img src={recipe.thumbnail} alt="" /></a></li>
            <li><a href={`${recipe.href}`} target="_blank">{recipe.title}</a></li>
            <li>{recipe.ingredients}</li>
          </ul>
        ))}
      </>
    );
  }
}
