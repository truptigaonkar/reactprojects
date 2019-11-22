import React from 'react';
import './App.css';
import Githubusers from './components/Githubusers';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Weather from './components/Weather';

function App() {
  return (
    <div className="App">
      <Router>
        <Link to='/'>Githubusers</Link><br/>
        <Link to='/weather'>Weather</Link>

        <Route exact path="/" component={Githubusers} />
        <Route exact path="/weather" component={Weather} />
      </Router>
     
    </div>
  );
}

export default App;
