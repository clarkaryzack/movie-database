import React, { Component } from 'react';
import "../index.css";

import Form from "./Form"

import {NavLink} from 'react-router-dom';

export default class NavBar extends Component {
  render() {
    return (
			<div>
	      <nav >
	        <NavLink activeClassName="selected" className="nav-link" exact to="/">
	          Home
	        </NavLink>
	      </nav>
			</div>
    );
  }
}
