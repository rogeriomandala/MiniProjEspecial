import React from 'react';
import './App.css';
import NavBar from "./Components/Navbar";

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from "./Paginas/Home";
import GerarChave from "./Paginas/GerarChave";
import ListaApostas from "./Paginas/ListaApostas";
//ListaApostas

//const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;
const Contact = () => <h1>Contact</h1>;
const NotFound = () => <h1>404 - Page Not Found</h1>;



function App() {
  return (
    <div className="App">
        <Router>
       <NavBar />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
       {/*}
       <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/gerar-chave">gerar chave</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>*/}
       
        <Switch>
          {/*}
          <Route path="/" component={Home}>
              <Home />
          </Route>
          <Route path="/gerar-chave" component={GerarChave}>
              <GerarChave />
          </Route>*/}
         {/*}
          <Route path="/" component={Pricing}>
            <Pricing />
          </Route>
          <Route path="/deets" component={MoreDeets}>
            <MoreDeets />
          </Route>
          <Route path="/dankmemes/add" component={DankMemes}>
            <DankMemes />
          </Route>*/}

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
