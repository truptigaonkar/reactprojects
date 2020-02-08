import React from 'react';

const Recipelist = (props) => {
  const { recipes } = props;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-center', flexWrap: 'wrap' }}>
      {recipes.map((recipe) => (
        <div className="card" key={recipe.idMeal}>
          <div><img src={recipe.strMealThumb} alt="recipe" style={{ width: '100%', height: '100%' }} /></div>
          <div>{recipe.strMeal}</div>
          <div>
            <b>Category: </b>
            {recipe.strCategory}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recipelist;
