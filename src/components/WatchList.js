import React, { Component } from "react";
import "../index.css";

import { NavLink } from "react-router-dom";

export default class WatchList extends Component {
  constructor(props) {
    super(props);
    this.clearList = this.clearList.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.state = {
      favList: (
        <div className="emptyfavlist">
          There are no movies in the favorites list at this time.
        </div>
      )
    };
  }
//clear list clears the favorites list
  clearList() {
    fetch(
      "https://api.themoviedb.org/3/list/32914/clear?api_key=4f2d813db1c216bca9c8a22d63ad274a&session_id=8203c9d46e318fdae07959d4701916b6a13b5031&confirm=true",
      {
        method: "POST"
      }
    )

  }
//remove item removes a single item from the favorites list
  removeItem(id) {
    fetch(
      "https://api.themoviedb.org/3/list/32914/remove_item?api_key=4f2d813db1c216bca9c8a22d63ad274a&session_id=8203c9d46e318fdae07959d4701916b6a13b5031",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ media_id: id })
      }
    )
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
            <div key={movie.id} className="pagebody row centered">
              <div className="bodycard col-lg-8 offset-lg-2 row">
                  <div className="col-lg-6">
										<NavLink to={`/movie/${movie.id}`}>
                    <img alt="card" src={movieurl} className="bodyposter" />
									</NavLink>
                  </div>
                  <div className="col-lg-6 align-self-center bodytext">
                    <h2>{movie.title}</h2>
                    <br />
                    <br /> {movie.overview}
                    <br />
									</div>

                    <div className="removeButton">
                      <button onClick={() => this.removeItem(movie.id)}>
												<NavLink to={`/`}>
                        <i className="fa fa-times-circle" />
												Remove Item
											</NavLink>
                      </button>
                    </div>
                  </div>
              </div>
          );
        });
        if (movieCards.length !== 0) {
          this.setState({ favList: movieCards });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <div className="pagetitle">
          <h2>Community Favorites</h2>
          <p>
            The Community Favorites page allows all users to contribute to a
            shared list of favorite movies.
          </p>
          <p>
            (Support for Favorite TV Shows will be added in The Movie Database
            API v4)
          </p>
        </div>
        <div className="clearbutton">
          <button onClick={() => this.clearList()}>
						<NavLink to={`/`}>
            	<i className="fa fa-times-circle" /> Clear List
						</NavLink>
          </button>
        </div>
        <div>{this.state.favList}</div>
      </div>
    );
  }
}
