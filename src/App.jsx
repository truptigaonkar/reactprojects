import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
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
            <NavLink exact activeClassName="active-class" to="/">GitHub-User</NavLink>
            <NavLink exact activeClassName="active-class" to="/recipes">Recipe</NavLink>
            <NavLink exact activeClassName="active-class" to="/weather">Weather</NavLink>
            <NavLink exact activeClassName="active-class" to="/media">Media</NavLink>
            <NavLink exact activeClassName="active-class" to="/prisjaktproduct">Prisjakt-Product</NavLink>
          </ul>
        </header>
        <Switch>
          <Route exact path="/" component={Githubusers} />
          <Route path="/recipes" component={Recipes} />
          <Route path="/weather" component={Weather} />
          <Route path="/media" component={Media} />
          <Route path="/prisjaktproduct" component={Prisjaktproduct} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
