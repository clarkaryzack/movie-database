import React, { Component } from "react";
import "../index.css";

import Form from "./Form.js";

import { NavLink } from "react-router-dom";

export default class WatchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      tvList: [],
    };
  }
  componentDidMount() {
//fetch and map movie watchlist
    fetch(
      "https://api.themoviedb.org/3/list/32914?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US"
    )
      .then(response => response.json())
      .then(response => {
        let movieCards = response.items.map(movie => {
          let movieurl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
          return (
            <div key={movie.id}>
              <NavLink to={`/movie/${movie.id}`}>
                <div className="card moviecard">
                  <img alt="card" src={movieurl} className="movieposter" />
                  <br /> {movie.title}
                </div>
              </NavLink>
            </div>
          );
        });
        this.setState({ movieList: movieCards });
      })
      .catch(function(error) {
        console.log(error);
      })
		.catch(function(error) {
			console.log(error);
		});
	}
  render() {
    return (
      <div>
        <div>
          Watch List: Movies
          <br />
          <div className="row scrollmenu">
            <div className="scrollLabelOuter">
              <div className="rotate">
                <p className="scrollLabelText">Scroll</p>
                <i className="fa fa-chevron-down scrollArrow" />
              </div>
            </div>
            <div className="row movierow">{this.state.movieList}</div>
          </div>
        </div>
      </div>
    );
  }
}
