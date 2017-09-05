import React, { Component } from "react";
import "../index.css";

import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import Form from "./Form.js";

export default class Header extends Component {
  render() {
    return (
			<div className="header row">
				<div className="col-7 logo">
						<NavLink
							activeClassName="selected"
							className="nav-link"
							exact
							to="/">
							<h1>Moviegoer
								{" "}<i className="fa fa-video-camera"></i></h1>
						</NavLink>
				</div>
				<div className="col-5 headerbuttons">
					<Form/>
					<div className="watchlistButton">
							<Link to="/watchList">
								<button>
									Favorite Movies List						</button>
							</Link>
					</div>
				</div>

			</div>

    );
  }
}
