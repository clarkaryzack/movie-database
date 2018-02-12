import React, { Component } from "react";
import "../index.css";

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
// action to post favorites to favorites list
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
//fetch and map top rated movies
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&include_adult=false&include_video=false"
    )
      .then(response => response.json())
      .then(response => {
        let movieCards = response.results.map(movie => {
          let movieurl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
          return (
            <div key={movie.id} className="allrows">
              <div className="card moviecard">
                <div className="cardinner">
                  <NavLink to={`/movie/${movie.id}`}>
                    <img alt="card" src={movieurl} className="movieposter" />
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
                <div key={movie.id} className="allrows">
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
                  if (person.profile_path) {
                    let personurl =
                      "https://image.tmdb.org/t/p/w500/" + person.profile_path;
                    return (
                      <div key={person.id} className="allrows">
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
                  } else {
                    return null;
                  }
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
                        <div key={movie.id} className="allrows">
                          <div className="card moviecard">
                            <div className="cardinner">
                              <NavLink to={`/movie/${movie.id}`}>
                                <img
                                  alt="card"
                                  src={movieurl}
                                  className="movieposter"
                                />
                                <br /> {movie.title}
                              </NavLink>
                            </div>
                            <div className="recommendbutton">
                              <button
                                onClick={() =>
                                  this.addtoList(movie.id, "movie")}
                              >
                                <i className="fa fa-heart" /> Favorite
                              </button>
                            </div>
                          </div>
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
                          .map(movie => {
                            let movieurl =
                              "https://image.tmdb.org/t/p/w500/" +
                              movie.poster_path;
                            return (
                              <div key={movie.id} className="allrows">
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
        <div className="rowtitle">
{/* Render scroll bar of Top Rated Movies */}
          <h2>Top Rated Movies</h2>
          <div className="allResults">
            <button>
              <NavLink to={`/all/movie/ztoprated/1`}>See All Results</NavLink>
            </button>
          </div>
          <div className="scrollmenu">
            <div className="scrollborder">
              <div className="row movierow">
                {this.state.toprated}
                <div className="finalcard allrows">
                  <NavLink
                    className="card moviecard"
                    to={`/all/movie/ztoprated/1`}
                  >
                    <i className="fa fa-plus-circle" />
                    See All Results
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rowtitle">
{/* Render scroll bar of Top Rated TV Shows */}
          <h2>Top Rated TV Shows</h2>
          <div className="allResults">
            <button>
              <NavLink to={`/all/tv/ztoprated/1`}>See All Results</NavLink>
            </button>
          </div>
          <div className="scrollmenu">
            <div className="scrollborder">
              <div className="row movierow">
                {this.state.topRatedTv}
                <div className="finalcard allrows">
                  <NavLink
                    className="card moviecard"
                    to={`/all/tv/ztoprated/1`}
                  >
                    <i className="fa fa-plus-circle" />
                    See All Results
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rowtitle">
{/* Render scroll bar of popular people */}
          <h2>Popular People</h2>
          <div className="allResults">
            <button>
              <NavLink to={`/all/person/zpopular/1`}>See All Results</NavLink>
            </button>
          </div>
          <div className="scrollmenu">
            <div className="scrollborder">
              <div className="row movierow">
                {this.state.popularPeople}
                <div className="finalcard allrows">
                  <NavLink
                    className="card moviecard"
                    to={`/all/person/zpopular/1`}
                  >
                    <i className="fa fa-plus-circle" />
                    See All Results
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rowtitle">
{/* Render scroll bar of popular movies */}
          <h2>Popular Movies</h2>
          <div className="allResults">
            <button>
              <NavLink to={`/all/movie/zpopular/1`}>See All Results</NavLink>
            </button>
          </div>
          <div className="scrollmenu">
            <div className="scrollborder">
              <div className="row movierow">
                {this.state.popular}
                <div className="finalcard allrows">
                  <NavLink
                    className="card moviecard"
                    to={`/all/movie/zpopular/1`}
                  >
                    <i className="fa fa-plus-circle" />
                    See All Results
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rowtitle">
{/* Render scroll bar of popular tv shows */}
          <h2>Popular TV Shows</h2>
          <div className="allResults">
            <button>
              <NavLink to={`/all/tv/zpopular/1`}>See All Results</NavLink>
            </button>
          </div>
          <div className="scrollmenu">
            <div className="scrollborder">
              <div className="row movierow">
                {this.state.popularTV}
                <div className="finalcard allrows">
                  <NavLink className="card moviecard" to={`/all/tv/zpopular/1`}>
                    <i className="fa fa-plus-circle" />
                    See All Results
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
