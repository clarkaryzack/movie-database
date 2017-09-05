import React, { Component } from "react";
import "../index.css";

import Form from "./Form.js";

import { NavLink } from "react-router-dom";

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movielist: "No movies found that match your search.",
      tvlist: "No tv shows were found that match your search.",
      personlist: "No people were found who match your search."
    };
  }
  componentDidMount() {
    // fetch movies based on params
    let moviesearchurl =
      "https://api.themoviedb.org/3/search/movie?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&query=" +
      this.props.match.params.term +
      "&include_adult=false&page=" +
      this.props.match.params.page;
    console.log(moviesearchurl);
    fetch(moviesearchurl)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        let movieCards = response.results.map(movie => {
          console.log(movie.poster_path);
          if (movie.poster_path) {
            let movieurl =
              "https://image.tmdb.org/t/p/w500" + movie.poster_path;
            return (
              <div key={movie.id} className="allrows">
                <NavLink to={`/movie/${movie.id}`}>
                  <div className="card moviecard">
                    <img
                      alt="movie poster"
                      src={movieurl}
                      className="movieposter"
                    />
                    <br /> {movie.title}
                  </div>
                </NavLink>
								<button className="recommendbutton" onClick={() => this.addtoList(movie.id, "movie")}>
									<i className="fa fa-heart"></i> Favorite
								</button>
              </div>
            );
          }
        });
        if (movieCards.length != 0) {
          this.setState({ movielist: movieCards });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    //search tv shows based on search params
    let tvsearchurl =
      "https://api.themoviedb.org/3/search/tv?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&query=" +
      this.props.match.params.term +
      "&include_adult=false&page=" +
      this.props.match.params.page;
    console.log(tvsearchurl);
    fetch(tvsearchurl)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        let tvCards = response.results.map(tv => {
          if (tv.poster_path) {
            let tvurl = "https://image.tmdb.org/t/p/w500" + tv.poster_path;
            return (
              <div key={tv.id} className="allrows">
                <NavLink to={`/tv/${tv.id}`}>
                  <div className="card moviecard">
                    <img alt="tv poster" src={tvurl} className="movieposter" />
                    <br /> {tv.name}
                  </div>
                </NavLink>
              </div>
            );
          }
        });
        if (tvCards.length != 0) {
          this.setState({ tvlist: tvCards });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    //search people
    //set url using parameters in page url
    let personsearchurl =
      "https://api.themoviedb.org/3/search/person?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&query=" +
      this.props.match.params.term +
      "&include_adult=false&page=" +
      this.props.match.params.page;
    console.log(personsearchurl);
    let personurl = this.state.personurl;
    fetch(personsearchurl)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        let personCards = response.results.map(person => {
          console.log(person.profile_path);
          if (person.profile_path) {
            let personurl =
              "https://image.tmdb.org/t/p/w640/" + person.profile_path;
            console.log(personurl);
            return (
              <div key={person.id} className="allrows">
                <div className="card moviecard">
                  <NavLink to={`/person/${person.id}`}>
                    <img
                      alt="profile photo"
                      src={personurl}
                      className="movieposter profilePhoto"
                    />
                    <br /> {person.name}
                  </NavLink>
                </div>
              </div>
            );
          }
        });
        if (personCards.length != 0) {
          this.setState({ personlist: personCards });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        Search Results
        <div>
          Movies
          <br />
          <div className="row scrollmenu">
            <div className="row movierow">{this.state.movielist}</div>
            <div className="">
              <NavLink to={`/all/movie/${this.props.match.params.term}/1`}>
                See All Results
              </NavLink>
            </div>
          </div>
        </div>
        <div>
          TV Shows
          <br />
          <div className="row scrollmenu">
            <div className="row movierow">{this.state.tvlist}</div>
            <div className="allResults">
              <NavLink to={`/all/tv/${this.props.match.params.term}/1`}>
                See All Results
              </NavLink>
            </div>
          </div>
        </div>
        <div>
          People
          <br />
          <div className="row scrollmenu">
            <div className="row movierow">{this.state.personlist}</div>
            <div className="allResults">
              <NavLink to={`/all/person/${this.props.match.params.term}/1`}>
                See All Results
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
