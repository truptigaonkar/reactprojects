import React, { Component } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import Recipelist from './Recipelist';
import { RECIPES_URL } from '../config';
import Style from './Recipesearch.module.css';
import Footer from '../Footer';

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
        <br />
        <div className={Style.form}>
          <form onSubmit={this.getRecipe}>
            <input
              type="text"
              id="ingredient"
              className={Style.form__field}
              placeholder="Search recipe here...."
            />
            <label htmlFor="ingredient" className={Style.form__label}>
              Search product here....
            </label>
          </form>
        </div>
        <Recipelist recipes={recipes} />
        <br />
        <br />
        <Footer href="https://www.themealdb.com/api.php" title="Recipe Meal API" />
      </>
    );
  }
}
