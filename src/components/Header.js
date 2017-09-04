import React, { Component } from "react";
import "../index.css";

import { NavLink } from "react-router-dom";

import Form from "./Form.js";

export default class Header extends Component {
  render() {
    return (
      <div className="row">
        <div id="logo">
          <nav>
            <NavLink
              activeClassName="selected"
              className="nav-link"
              exact
              to="/"
            >
              Moviegoer
            </NavLink>
          </nav>
        </div>
        <Form />
        <NavLink to="/advSearch">Advanced Search</NavLink>
        <NavLink to="/watchList">Watch List</NavLink>
      </div>
    );
  }
}
