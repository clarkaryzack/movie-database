import React, { Component } from "react";
import "../index.css";

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
// changes state based on changes made to input box
  handleFormChange(event) {
    this.setState({ searchterm: event.target.value });
  }
// clears input box after a search
  handleButtonClick(event) {
    this.forceUpdate();
    this.setState({ searchterm: "" });
  }
// reloads window if searching from SearchResults.js
  handleSubmit(event) {
    event.preventDefault();
    window.location = "/search/" + this.state.searchterm + "/1";
  }
  render() {
//render form
    console.log(this.state.searchterm);
    return (
      <div className="searchform">
        <form onSubmit={this.handleSubmit}>
          <input
            className="textbox"
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
    );
  }
}
