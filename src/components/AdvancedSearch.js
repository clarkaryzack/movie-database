import React, { Component } from "react";
import "../index.css";

import Form from "./Form.js";

import { NavLink } from "react-router-dom";

export default class AdvancedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // fetch movies based on params
  }
  render() {
    return <div>Advanced Search</div>;
  }
}
