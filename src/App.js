import React from 'react';
import './App.css';
import Githubusers from './components/Githubusers';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Recipes from './components/Recipes';
import Weather from './components/Weather';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
            </IconButton>
            <Button color="inherit" component={Link} to="/">GitHub Cards</Button>
            <Button color="inherit" component={Link} to="/recipes">Recipes</Button>
            <Button color="inherit" component={Link} to="/weather">Weather</Button>
          </Toolbar>
        </AppBar>
        <Route exact path="/" component={Githubusers} />
        <Route exact path="/recipes" component={Recipes} />
        <Route exact path="/weather" component={Weather} />
      </Router>
    </div>
  );
}

export default App;
