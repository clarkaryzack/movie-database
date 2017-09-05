import React, { Component } from "react";
import "../index.css";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        all data fetched from{" "}
        <a href="https://www.themoviedb.org/"> TheMovieDB.org</a>
      </div>
    );
  }
}
