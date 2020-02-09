import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Button, Typography,
} from '@material-ui/core';
import Media from './components/media/Mediasearch';
import Weather from './components/weather/Weathersearch';
import Recipes from './components/recipes/Recipesearch';
import Githubusers from './components/Githubusers/Usersearch';
import Prisjaktproduct from './components/prisjaktproduct/Productsearch';

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <AppBar position="static">
        <Typography variant="h5" color="secondary">
            API CARDS
            </Typography>
          <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
            
            <IconButton edge="start" color="inherit" aria-label="menu" />
            <Button color="inherit" component={Link} to="/">GitHub-User</Button>
            <Button color="inherit" component={Link} to="/recipes">Recipes</Button>
            <Button color="inherit" component={Link} to="/weather">Weather</Button>
            <Button color="inherit" component={Link} to="/media">Media</Button>
            <Button color="inherit" component={Link} to="/prisjaktproduct">Prisjakt-Product</Button>
          </Toolbar>
        </AppBar>
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
