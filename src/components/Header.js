import React, {Component} from 'react';
import "../index.css";

import NavBar from "./NavBar.js"
import Form from "./Form.js"

export default class Header extends Component {
	render() {
		return (
			<div className="row">
				<div id="logo">
					MovieGoer
				</div>
				<NavBar/>
				<Form/>
			</div>
		)
	}
}
