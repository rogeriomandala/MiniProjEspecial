import React from 'react';
import './App.css';
import NavBar from "./Components/Navbar";

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from "./Paginas/Home";
import GerarChave from "./Paginas/GerarChave";
import ListaApostas from "./Paginas/ListaApostas";
//ListaApostas

const About = () => <h1>About</h1>;
const Contact = () => <h1>Contact</h1>;
const NotFound = () => <h1>404 - Page Not Found</h1>;



function App() {
  return (
    <div className="App">
        <Router>
       <NavBar />
        {}
       {}
       
        <Switch>
          {}
         {}

          <Route exact path="/" component={Home} />
          <Route path="/gerar-chave" component={GerarChave} />
          <Route path="/lista-de-apostas" component={ListaApostas} />
          <Route component={NotFound} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
