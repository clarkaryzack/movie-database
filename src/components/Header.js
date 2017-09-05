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
					<button>
        <NavLink to="/watchList">Favorites List</NavLink>
			</button>
      </div>
    );
  }
}
