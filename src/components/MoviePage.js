import React, { Component } from "react";
import "../index.css";

import { NavLink } from "react-router-dom";

export default class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.addtoList = this.addtoList.bind(this);
    this.state = {
      movieInfo: "",
      genreList: "",
      credits: "",
      similar: ""
    };
  }
// addstoList adds a movie to the favorites list
addtoList(id) {
		fetch(
			"https://api.themoviedb.org/3/list/32914/add_item?api_key=4f2d813db1c216bca9c8a22d63ad274a&session_id=8203c9d46e318fdae07959d4701916b6a13b5031",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ media_id: id })
			}
		);
	}
  componentDidMount() {
//the fetch url is taken from search parameters in the page url
    let movienum = parseInt(this.props.match.params.movienum, 10);
//initial fetch - stored to movieInfo in state
    let fetchurl =
      "https://api.themoviedb.org/3/movie/" +
      movienum +
      "?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&append_to_response=credits,similar";
    fetch(fetchurl)
      .then(response => response.json())
      .then(response => {
        this.setState({ movieInfo: response });
        // add cast to state by appending credits to fetch url
        let credits = response.credits.cast.map(cast => {
          if (cast.profile_path) {
            let imgurl = "https://image.tmdb.org/t/p/w500/" + cast.profile_path;
            return (
              <div key={cast.credit_id} className="allrows">
                  <div className="card moviecard">
										<div className='cardinner'>
										<NavLink to={`/person/${cast.id}`}>
                    <img
                      className="movieposter"
                      alt="movie poster"
                      src={imgurl}
                    />
                    <br /> {cast.name}
									</NavLink>
                  </div>
              </div>
						</div>
            );
          } else {
            return null;
          }
        });
        this.setState({ credits: credits });
// add similar movies to state by appending credits to fetch url
        let similar = response.similar.results.map(movie => {
          let imgurl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
          return (
            <div key={movie.id} className="allrows">
              <div className="card moviecard">
                <div className="cardinner">
											<NavLink to={`/waypoint/movie/${movie.id}`}>
											<img
                        className="movieposter"
                        alt="movie poster"
                        src={imgurl}
                      />
                      <br /> {movie.title}
											</NavLink>
                </div>
                <div className="recommendbutton">
                  <button onClick={() => this.addtoList(movie.id, "movie")}>
                    <i className="fa fa-heart" /> Favorite
                  </button>
                </div>
              </div>
            </div>
          );
        });
        this.setState({ similar: similar });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
// convert numberic date to text
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var date = new Date(this.state.movieInfo.release_date);
    var dd = date.getDate();
    var mm = date.getMonth();
    var yy = date.getFullYear();
//set url of image
    let movieurl =
      "https://image.tmdb.org/t/p/w500" + this.state.movieInfo.poster_path;
    return (
//body of page
      <div class="container">
        <div className="pagetitle">
          <h2>Movie Details</h2>
        </div>
        <div className="pagebody row centered">
          <div className="bodycard row col-lg-10 col-md-8 col-10 offset-md-2 offset-lg-1 offset-1 row">
            <div className="col-lg-6 col-md-12 col-12">
              <img alt="card" src={movieurl} className="bodyposter" />
            </div>
            <div className="col-lg-6 col-md-12 col-12 align-self-center bodytext">
              <h2>{this.state.movieInfo.title}</h2>
              <br />
              Release Date: {monthNames[mm]} {dd}, {yy}
              <br />
              <br /> {this.state.movieInfo.overview}
              <br />
              <div className="moviepagefavbutton">
                <button
                  onClick={() =>
                    this.addtoList(this.state.movieInfo.id, "movie")}
                >
                  <i className="fa fa-heart" /> Favorite
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* scroll menu for cast */}
        <div className="rowtitle">
          <h2>Cast</h2>
        </div>
        <div className="scrollmenu">
          <div className="scrollborder">
            <div className="row movierow">{this.state.credits}</div>
          </div>
        </div>
        <br />
        {/* scroll menu for similar films */}
        <div className="rowtitle">
          <h2>Similar Films</h2>
          <div className="scrollmenu">
            <div className="scrollborder">
              <div className="row movierow">{this.state.similar}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
