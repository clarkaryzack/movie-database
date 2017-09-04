import React, { Component } from "react";
import "./index.css";


import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

class BaseLayout extends Component {
	constructor(props) {
		super(props);
		this.addtoList = this.addtoList.bind(this)
		this.state = {
		};
	}
	addtoList() {

	}
  render() {
    return (
      <div>
        <Header />
          {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default BaseLayout;
