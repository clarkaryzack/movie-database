import React, { Component } from "react";
import "../index.css";

import { NavLink } from "react-router-dom";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      form: "",
      value: "",
      searchterm: "",
      redirect: false
    };
  }
  // changes state based on changes made to input box
  handleFormChange(event) {
    this.setState({ searchterm: event.target.value });
  }
  render() {
    //render form
    return (
      <form className="searchform row">
				<div>
        <input
          className="textbox"
          type="text"
          name="name"
          placeholder="search for movies, tv shows or people"
          onChange={this.handleFormChange}
          value={this.state.searchterm}></input>
					</div>
        <div className="searchbutton">
          <NavLink
            to={`/waypoint/search/${this.state.searchterm}/1`}
            name="submit"
            value="submit">
            <button type="submit">search</button>
          </NavLink>
        </div>
      </form>
    );
  }
}
