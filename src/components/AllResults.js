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
      genre: "",
			heading: ""
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
          genre: "movie",
					heading: "Top Rated Movies"
        });
      } else if (this.props.match.params.genre === "tv") {
        this.setState({
          fetchurl:
            "https://api.themoviedb.org/3/tv/top_rated?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&include_adult=false&include_video=false&page=",
          genre: "tv",
					heading: "Top Rated TV Shows"
        });
      }
    } else if (this.props.match.params.term === "zpopular") {
      if (this.props.match.params.genre === "tv") {
        this.setState({
          fetchurl:
            "https://api.themoviedb.org/3/discover/tv?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=",
          genre: "tv",
					heading: "Popular TV Shows"
        });
      }
      if (this.props.match.params.genre === "person") {
        this.setState({
          fetchurl:
            "https://api.themoviedb.org/3/person/popular?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&page=",
          genre: "person",
					heading: "Popular People"
        });
      } else if (this.props.match.params.genre === "movie") {
        this.setState({
          fetchurl:
            "https://api.themoviedb.org/3/discover/movie?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=",
          genre: "movie",
					heading: "Popular Movies"
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
        genre: this.props.match.params.genre,
				heading: "Search: "+this.props.match.params.term+" in "+this.props.match.params.genre
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
                <div key={card.id} className="row allcard">
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
                <div key={card.id} className="col allcard">
                  <NavLink to={`/${this.props.match.params.genre}/${card.id}`}>
                    <div className="card moviecard">
                      <img alt="card" src={posterurl} className="movieposter" />
                      <br /> {card.title}
                    </div>
                  </NavLink>
                </div>
              );
            }
          }
          if (this.state.genre === "person") {
            console.log("here");
            let personurl =
              "https://image.tmdb.org/t/p/w640/" + card.profile_path;
            return (
              <div key={card.id} className="col allcard">
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
				<div className="alltitle">
					<h2>{this.state.heading}</h2>
					<br/>
					<h3>All Results, page {this.props.match.params.page}</h3>
				</div>
        <div className="allpage">
					<div className="allpagenav row">
	          <div className="backbutton col-2 offset-2">
	            <a className="navbutton" onClick={this.prevPage}>
	              <button><i className="fa fa-chevron-left"></i>Prev Page</button>
	            </a>
	          </div>
						<div className="forwardbutton col-2 offset-4">
	            <a className="navbutton" onClick={this.nextPage}>
	              <button>Next Page<i className="fa fa-chevron-right"></i></button>
	            </a>
	          </div>
					</div>
          <div className="allpagecards col-12">
						<div className="row justify-content-center">
            	{this.state.allCards}
						</div>
          </div>
					<div className="allpagenav row">
	          <div className="backbutton col-2 offset-2">
	            <a className="navbutton" onClick={this.prevPage}>
	              <button><i className="fa fa-chevron-left"></i>Prev Page</button>
	            </a>
	          </div>
						<div className="forwardbutton col-2 offset-4">
	            <a className="navbutton" onClick={this.nextPage}>
	              <button>Next Page<i className="fa fa-chevron-right"></i></button>
	            </a>
	          </div>
					</div>
        </div>
      </div>
    );
  }
}
