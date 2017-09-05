import React, { Component } from "react";
import "../index.css";

import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import Form from "./Form.js";

export default class Header extends Component {
  render() {
    return (
			<div className="header row">
				<div className="col-lg-7 col-md-12 logo">
						<NavLink
							activeClassName="selected"
							className="nav-link"
							exact
							to="/">
							<h1>Moviegoer
								{" "}<i className="fa fa-ticket"></i></h1>
						</NavLink>
				</div>
				<div className="col-lg-5 col-md-12 headerbuttons">
					<Form/>
					<div className="watchlistButton">
							<Link to="/watchList">
								<button>
									<i className="fa fa-heart"></i>{" "}Community Favorites
								</button>
							</Link>
					</div>
				</div>

			</div>

    );
  }
}
