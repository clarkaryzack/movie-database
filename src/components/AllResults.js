import React, { Component } from "react";
import "../index.css";

import Form from "./Form.js";

import { NavLink } from "react-router-dom";

export default class AllResults extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.state = {
      allCards: "",
      bigArray: [],
      genre: ""
    };
  }
  nextPage(event) {
    event.preventDefault();
    let nextPage = parseInt(this.props.match.params.page) + 1;
    window.location =
      "/all/" +
      this.props.match.params.genre +
      "/" +
      this.props.match.params.term +
      "/" +
      nextPage;
  }
  prevPage(event) {
    event.preventDefault();
    if (this.props.match.params.page > 1) {
      let prevPage = parseInt(this.props.match.params.page) - 1;
      window.location =
        "/all/" +
        this.props.match.params.genre +
        "/" +
        this.props.match.params.term +
        "/" +
        prevPage;
    } else {
      let prevPage = this.props.match.params.page;
      window.location =
        "/all/" +
        this.props.match.params.genre +
        "/" +
        this.props.match.params.term +
        "/" +
        prevPage;
    }
  }
  componentWillMount() {
    if (this.props.match.params.term === "ztoprated") {
      if (this.props.match.params.genre === "movie") {
        this.setState({
          fetchurl:
            "https://api.themoviedb.org/3/movie/top_rated?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&include_adult=false&include_video=false&page=",
          genre: "movie"
        });
      } else if (this.props.match.params.genre === "tv") {
        this.setState({
          fetchurl:
            "https://api.themoviedb.org/3/tv/top_rated?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&include_adult=false&include_video=false&page=",
          genre: "tv"
        });
      }
    } else if (this.props.match.params.term === "zpopular") {
      if (this.props.match.params.genre === "tv") {
        this.setState({
          fetchurl:
            "https://api.themoviedb.org/3/discover/tv?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=",
          genre: "tv"
        });
      }
      if (this.props.match.params.genre === "person") {
        this.setState({
          fetchurl:
            "https://api.themoviedb.org/3/person/popular?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&page=",
          genre: "person"
        });
      } else if (this.props.match.params.genre === "movie") {
        this.setState({
          fetchurl:
            "https://api.themoviedb.org/3/discover/movie?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=",
          genre: "movie"
        });
      }
    } else {
      this.setState({
        fetchurl:
          "https://api.themoviedb.org/3/search/" +
          this.props.match.params.genre +
          "?api_key=4f2d813db1c216bca9c8a22d63ad274a&query=" +
          this.props.match.params.term +
          "&include_adult=false&language=en-US&page=",
        genre: this.props.match.params.genre
      });
    }
  }
  componentDidMount() {
    fetch(this.state.fetchurl + this.props.match.params.page)
      .then(response => response.json())
      .then(response => {
        let allCards = response.results.map(card => {
          if (card.poster_path) {
            let posterurl =
              "https://image.tmdb.org/t/p/w500" + card.poster_path;
            if (this.state.genre === "tv") {
              return (
                <div key={card.id} className="allrows">
                  <NavLink to={`/${this.props.match.params.genre}/${card.id}`}>
                    <div className="card moviecard">
                      <img alt="card" src={posterurl} className="movieposter" />
                      <br /> {card.name}
                    </div>
                  </NavLink>
                </div>
              );
            }
            console.log(this.state.genre);
            if (this.state.genre === "movie") {
              return (
                <div key={card.id} className="allrows">
                  <NavLink to={`/${this.props.match.params.genre}/${card.id}`}>
                    <div className="card moviecard">
                      <img alt="card" src={posterurl} className="movieposter" />
                      <br /> {card.title}
                    </div>
                  </NavLink>
                  <button onClick={this.addtoList}>Add to Watch List</button>
                </div>
              );
            }
          }
          if (this.state.genre === "person") {
            console.log("here");
            let personurl =
              "https://image.tmdb.org/t/p/w640/" + card.profile_path;
            return (
              <div key={card.id} className="allrows">
                <NavLink to={`/${this.props.match.params.genre}/${card.id}`}>
                  <div className="card moviecard">
                    <img
                      alt="card"
                      src={personurl}
                      className="movieposter profilePhoto"
                    />
                    <br /> {card.name}
                  </div>
                </NavLink>
              </div>
            );
          }
        });
        this.setState({ allCards: allCards });
      });
  }
  render() {
    let nextpage = parseInt(this.props.match.params.page) + 1;
    return (
      <div>
        <div className="row">{this.state.allCards}</div>
        <div className="row">
          <form onSubmit={this.prevPage}>
            <button type="submit" name="submit" value="submit">
              Previous Page
            </button>
          </form>
          <form onSubmit={this.nextPage}>
            <button type="submit" name="submit" value="submit">
              Next Page
            </button>
          </form>
        </div>
      </div>
    );
  }
}
