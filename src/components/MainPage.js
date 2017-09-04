import React, { Component } from "react";
import "../index.css";

import Form from "./Form.js";

import { NavLink } from "react-router-dom";

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.addtoList = this.addtoList.bind(this);
    this.state = {
      popular: [],
      toprated: [],
      popularTV: [],
      topRatedTv: [],
      popularPeople: []
    };
  }
  addtoList(id, genre) {
		console.log("here")
    if (genre === "movie") {
			console.log("here")
			fetch(
	      "https://api.themoviedb.org/3/list/32914/add_item?api_key=4f2d813db1c216bca9c8a22d63ad274a&session_id=8203c9d46e318fdae07959d4701916b6a13b5031",
	      {
	        method: "POST",
	        headers: {
	          Accept: "application/json",
	          "Content-Type": "application/json"
	        },
	        body: JSON.stringify({
	          "media_id": id
	        })
	      }
	    );
    }
    if (genre === "tv") {
			console.log("here")
			fetch(
				"https://api.themoviedb.org/3/list/32916/add_item?api_key=4f2d813db1c216bca9c8a22d63ad274a&session_id=8203c9d46e318fdae07959d4701916b6a13b5031",
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"media_id": id
					})
				}
			);
    }
  }
  componentDidMount() {
    //fetch and map top rated movies
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&include_adult=false&include_video=false"
    )
      .then(response => response.json())
      .then(response => {
        let movieCards = response.results.map(movie => {
          let movieurl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
          return (
            <div key={movie.id}>
              <NavLink to={`/movie/${movie.id}`}>
                <div className="card moviecard">
                  <img alt="card" src={movieurl} className="movieposter" />
                  <br /> {movie.title}
                </div>
              </NavLink>
              <button onClick={() => this.addtoList(movie.id, "movie")}>
                Add to Watch List
              </button>
            </div>
          );
        });
        this.setState({ toprated: movieCards });
        //fetch and map top rated tv
        fetch(
          "https://api.themoviedb.org/3/tv/top_rated?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&include_adult=false&include_video=false"
        )
          .then(response => response.json())
          .then(response => {
            let topRatedTvCards = response.results.map(movie => {
              let movieurl =
                "https://image.tmdb.org/t/p/w500" + movie.poster_path;
              return (
                <div key={movie.id}>
                  <NavLink to={`/tv/${movie.id}`}>
                    <div className="card moviecard">
                      <img alt="card" src={movieurl} className="movieposter" />
                      <br /> {movie.name}
                    </div>
                  </NavLink>
                </div>
              );
            });
            this.setState({ topRatedTv: topRatedTvCards });
            //fetch and map popular people
            fetch(
              "https://api.themoviedb.org/3/person/popular?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&page=1"
            )
              .then(response => response.json())
              .then(response => {
                let popularPeople = response.results.map(person => {
                  let personurl =
                    "https://image.tmdb.org/t/p/w640/" + person.profile_path;
                  return (
                    <div key={person.id}>
                      <NavLink to={`/person/${person.id}`}>
                        <div className="card moviecard">
                          <img
                            alt="card"
                            src={personurl}
                            className="movieposter"
                          />
                          <br /> {person.name}
                        </div>
                      </NavLink>
                    </div>
                  );
                });
                this.setState({ popularPeople: popularPeople });
                //fetch and map popular movies
                fetch(
                  "https://api.themoviedb.org/3/discover/movie?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false"
                )
                  .then(response => response.json())
                  .then(response => {
                    let popularCards = response.results.map(movie => {
                      let movieurl =
                        "https://image.tmdb.org/t/p/w500" + movie.poster_path;
                      return (
                        <div key={movie.id}>
                          <NavLink to={`/movie/${movie.id}`}>
                            <div className="card moviecard">
                              <img
                                alt="card"
                                src={movieurl}
                                className="movieposter"
                              />
                              <br /> {movie.title}
                            </div>
                          </NavLink>
                          <button
                            onClick={() => this.addtoList(movie.id, "movie")}
                          >
                            Add to Watch List
                          </button>
                        </div>
                      );
                    });
                    this.setState({ popular: popularCards });
                    //fetch and map popular tv
                    fetch(
                      "https://api.themoviedb.org/3/discover/tv?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false"
                    )
                      .then(response => response.json())
                      .then(response => {
                        let popularTVCards = response.results
                          .slice(0, 10)
                          .map(movie => {
                            let movieurl =
                              "https://image.tmdb.org/t/p/w650/" +
                              movie.poster_path;
                            return (
                              <div key={movie.id}>
                                <NavLink to={`/tv/${movie.id}`}>
                                  <div className="card moviecard">
                                    <img
                                      alt="card"
                                      src={movieurl}
                                      className="movieposter"
                                    />
                                    <br /> {movie.name}
                                  </div>
                                </NavLink>
                              </div>
                            );
                          });
                        this.setState({ popularTV: popularTVCards });
                      })
                      .catch(function(error) {
                        console.log(error);
                      });
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
              })
              .catch(function(error) {
                console.log(error);
              });
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <div>
          Top Rated Movies
          <br />
          <div className="row scrollmenu">
            <div className="scrollLabelOuter">
              <div className="rotate">
                <p className="scrollLabelText">Scroll</p>
                <i className="fa fa-chevron-down scrollArrow" />
              </div>
            </div>
            <div className="row movierow">{this.state.toprated}</div>
            <div className="allResults">
              <NavLink to={`/all/movie/ztoprated/1`}>See All Results</NavLink>
            </div>
          </div>
        </div>
        <div>
          Top Rated TV Shows
          <br />
          <div className="row scrollmenu">
            <div className="scrollLabelOuter">
              <div className="rotate">
                <p className="scrollLabelText">Scroll</p>
                <i className="fa fa-chevron-down scrollArrow" />
              </div>
            </div>
            <div className="row movierow">{this.state.topRatedTv}</div>
            <div className="allResults">
              <NavLink to={`/all/tv/ztoprated/1`}>See All Results</NavLink>
            </div>
          </div>
        </div>
        <div>
          Popular People
          <br />
          <div className="row scrollmenu">
            <div className="scrollLabelOuter">
              <div className="rotate">
                <p className="scrollLabelText">Scroll</p>
                <i className="fa fa-chevron-down scrollArrow" />
              </div>
            </div>
            <div className="row movierow">{this.state.popularPeople}</div>
            <div className="allResults">
              <NavLink to={`/all/person/zpopular/1`}>See All Results</NavLink>
            </div>
          </div>
        </div>
        <div>
          Popular Movies
          <br />
          <div className="row scrollmenu">
            <div className="scrollLabelOuter">
              <div className="rotate">
                <p className="scrollLabelText">Scroll</p>
                <i className="fa fa-chevron-down scrollArrow" />
              </div>
            </div>
            <div className="row movierow">{this.state.popular}</div>
            <div className="allResults">
              <NavLink to={`/all/movie/zpopular/1`}>See All Results</NavLink>
            </div>
          </div>
        </div>
        <div>
          Popular TV Shows
          <br />
          <div className="row scrollmenu">
            <div className="scrollLabelOuter">
              <div className="rotate">
                <p className="scrollLabelText">Scroll</p>
                <i className="fa fa-chevron-down scrollArrow" />
              </div>
            </div>
            <div className="row movierow">{this.state.popularTV}</div>
            <div className="allResults">
              <NavLink to={`/all/tv/zpopular/1`}>See All Results</NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
