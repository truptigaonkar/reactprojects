import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Media from './components/media/Mediasearch';
import Weather from './components/weather/Weathersearch';
import Recipes from './components/recipes/Recipesearch';
import Githubusers from './components/Githubusers/Usersearch';
import Prisjaktproduct from './components/prisjaktproduct/Productsearch';

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <header className="header">
          <h1 className="logo"><a href="/">API CARDS</a></h1>
          <ul className="main-nav">
            <Link to="/">GitHub-User</Link>
            <Link to="/recipes">Recipe</Link>
            <Link to="/weather">Weather</Link>
            <Link to="/media">Media</Link>
            <Link to="/prisjaktproduct">Prisjakt-Product</Link>
          </ul>
        </header>
        <Route exact path="/" component={Githubusers} />
        <Route exact path="/recipes" component={Recipes} />
        <Route exact path="/weather" component={Weather} />
        <Route exact path="/media" component={Media} />
        <Route exact path="/prisjaktproduct" component={Prisjaktproduct} />
      </Router>
    </div>
  );
}

export default App;
