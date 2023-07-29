import React from 'react';
import './navbar.css'; // Assuming the CSS file is in the same directory as this component
import * as ReactBootStrap from "react-bootstrap";
import {
    Link
  } from "react-router-dom";

const NavBar = () => {
    return(
     
          <nav>
            <input type="checkbox" id="check"/>
            <label htmlFor="check" className="checkbtn">
              <i className="fas fa-bars">
                <img src="/menu2.png" alt="Example" />
              </i>
            {/*
              <i className="bi bi-list"></i>
             */}
            </label>
            <label className="logo">@ RogerioMandala</label>
            <ul>
              <li>
                <Link to="/">
                  home
                </Link>
              </li>
              <li>
                <Link to="/gerar-chave">
                  Gerar chave
                </Link>
              </li>
              <li>
                <Link to="/lista-de-apostas">
                  Lista de apostas
                </Link>
              </li>
               {/*} <a className="active" href="#">Home</a>*/}
              


            </ul>
          </nav>

    )
}

export default NavBar;