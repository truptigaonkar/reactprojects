import React, { Component } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import {
  TextField, AppBar, Button, Link,
} from '@material-ui/core';

export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [] };
  }

  // http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3
  getRecipe = (e) => {
    e.preventDefault();
    const ingredient = e.target.elements.ingredient.value;
    if (ingredient) {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?i=${ingredient}`,
        ) // https://cors-anywhere.herokuapp.com/ is used to remove error Cross-Origin Read Blocking (CORB)
        .then((response) => {
          this.setState({
            recipes: response.data.results,
          });
        });
    }
    e.target.reset(); // making input empty
  };

  render() {
    const { recipes } = this.state;
    return (
      <>
        <Helmet><title>Recipe</title></Helmet>
        <form onSubmit={this.getRecipe}>
          <TextField id="standard-basic" name="ingredient" label="Ingredient" placeholder="e.g.fish" />
          <Button style={{ margin: '15px' }} type="submit" variant="contained" color="primary" disableElevation>
  GET RECIPE
          </Button>
        </form>
        <div style={{ display: 'flex', justifyContent: 'space-center', flexWrap: 'wrap' }}>
          {recipes.map((recipe) => (
            <div className="card" key={recipe.id}>
              <div><a href={`${recipe.href}`} rel="noopener noreferrer"><img src={recipe.thumbnail} alt="recipe" style={{ width: '100%', height: '100%' }} /></a></div>
              <div><a href={`${recipe.href}`} rel="noopener noreferrer">{recipe.title}</a></div>
              <div>{recipe.ingredients}</div>
            </div>
          ))}
        </div>
        <br />
        <br />
        <AppBar position="fixed" color="default" style={{ top: 'auto', bottom: 0 }}>
          <Button color="primary">
            <Link href="http://www.recipepuppy.com/about/api/" color="inherit">
              <b>Recipe Puppy API</b>
               : http://www.recipepuppy.com/about/api/
            </Link>
          </Button>
        </AppBar>
      </>
    );
  }
}
