import React, { Component } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import {
  TextField, AppBar, Button, Link,
} from '@material-ui/core';
import Recipelist from './Recipelist';
import { RECIPES_URL } from '../config';

export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [] };
  }

  getRecipe = (e) => {
    e.preventDefault();
    const ingredient = e.target.elements.ingredient.value;
    if (ingredient) {
      axios
        .get(
          // https://www.themealdb.com/api/json/v1/1/search.php?s=chicken
          `${RECIPES_URL}api/json/v1/1/search.php?s=${ingredient}`,
        )
        .then((response) => {
          console.log(response.data.meals);
          this.setState({
            recipes: response.data.meals,
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
        <Recipelist recipes={recipes} />
        <br />
        <br />
        <AppBar position="fixed" color="default" style={{ top: 'auto', bottom: 0 }}>
          <Button color="primary">
            <Link href="https://www.themealdb.com/api.php" color="inherit">
              <b>Recipe Meal API</b>
               : https://www.themealdb.com/api.php
            </Link>
          </Button>
        </AppBar>
      </>
    );
  }
}
