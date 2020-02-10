import React from 'react';
import Style from './Recipelist.module.css';

const Recipelist = (props) => {
  const { recipes } = props;
  return (
    <>
      {recipes ? (
        recipes.map((recipe) => (
          <div className={`${Style.card} ${Style.cardBox}`}>
            <div className={Style.card__content} key={recipe.idMeal}>
              <div className={Style.card__image}><img src={recipe.strMealThumb} alt="recipe" style={{ width: '100%', height: '100%' }} /></div>
              <div className={Style.card__title}>{recipe.strMeal}</div>
              <div>
                <b>Category: </b>
                {recipe.strCategory}
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>Recipe does not exist, please try another ingredient!</h1>
      )}
    </>
  );
};

export default Recipelist;
