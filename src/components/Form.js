import React, { Component } from "react";
import "../index.css";

import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      form: "",
      value: "",
      searchterm: "",
      redirect: false
    };
  }
  handleFormChange(event) {
    this.setState({ searchterm: event.target.value });
  }
  handleButtonClick(event) {
    // event.preventDefault();
    this.forceUpdate();
    this.setState({ searchterm: "" });
  }
  handleSubmit(event) {
    event.preventDefault();
    window.location = "/search/" + this.state.searchterm + "/1";
  }
  render() {
    console.log(this.state.searchterm);
    return (
      <div>
        <div className="row">
          <form onSubmit={this.handleSubmit}>
            <input
							className = "textbox"
              type="text"
              name="name"
              placeholder="search for movies, tv shows or people"
              onChange={this.handleFormChange}
              value={this.state.searchterm}
            />
            <button type="submit" name="submit" value="submit">
              search
            </button>
          </form>
        </div>
      </div>
    );
  }
}
