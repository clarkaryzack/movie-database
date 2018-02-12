import React, { Component } from "react";
import "../index.css";

import { NavLink } from "react-router-dom";

export default class PersonPage extends Component {
  constructor(props) {
    super(props);
    this.addtoList = this.addtoList.bind(this);
    this.state = {
      personInfo: "",
      movieCards: "",
      tvCards: ""
    };
  }
//addtoList stores the movie to favorites
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
    console.log(this.props.match.params.personnum);
    let personnum = parseInt(this.props.match.params.personnum, 10);
    // set fetch url
    let fetchurl =
      "https://api.themoviedb.org/3/person/" +
      personnum +
      "?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&append_to_response=movie_credits,tv_credits";
    console.log(fetchurl);
    fetch(fetchurl)
      .then(response => response.json())
      .then(response => {
        //set state personInfo to response
        this.setState({ personInfo: response });
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
        var date1 = new Date(this.state.personInfo.birthday);
        var dd1 = date1.getDate();
        var mm1 = date1.getMonth();
        var yy1 = date1.getFullYear();
        var date2 = "Present";
        date1 = monthNames[mm1] + " " + dd1 + ", " + yy1;
        if (this.state.personInfo.deathday) {
          date2 = new Date(this.state.personInfo.deathday);
          var dd2 = date2.getDate();
          var mm2 = date2.getMonth();
          var yy2 = date2.getFullYear();
          date2 = monthNames[mm2] + " " + dd2 + ", " + yy2;
        }
        this.setState({ birthday: date1, deathday: date2 });
        // add film credits to state by appending credits to fetch url
        let moviecredits = response.movie_credits.cast.map(movie => {
          if (movie.poster_path) {
            let movieurl =
              "https://image.tmdb.org/t/p/w500" + movie.poster_path;
            return (
              <div key={movie.id} className="allrows">
                <div className="card moviecard">
                  <div className="cardinner">
                    <NavLink to={`/movie/${movie.id}`}>
                      <img
                        className="movieposter"
                        alt="movie post"
                        src={movieurl}
                      />
                      <br />
                      {movie.title}
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
          } else {
            return null;
          }
        });
        this.setState({ movieCards: moviecredits });
        // add tv credits to state by appending credits to fetch url
        let tvcredits = response.tv_credits.cast.map(tv => {
          if (tv.poster_path) {
            let tvurl = "https://image.tmdb.org/t/p/w500" + tv.poster_path;
            return (
              <div key={tv.id} className="allrows">
                <NavLink to={`/tv/${tv.id}`}>
                  <div className="card moviecard">
                    <img
                      className="movieposter"
                      alt="movie poster"
                      src={tvurl}
                    />
                    <br />
                    {tv.name}
                  </div>
                </NavLink>
              </div>
            );
          } else {
            return null;
          }
        });
        this.setState({ tvCards: tvcredits });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    let personurl = "https://image.tmdb.org/t/p/w500" + this.state.personInfo.profile_path;
		console.log("personurl",personurl)
    return (
      <div class="container">
        <div className="pagetitle">
          <h2>Person Details</h2>
        </div>
        <div className="pagebody row centered">
					<div className="bodycard row col-lg-10 col-md-8 col-10 offset-md-2 offset-lg-1 offset-1 row">
            <div className="col-lg-6 col-md-12 col-12">
              <img alt="card" src={personurl} className="bodyposter" />
            </div>
            <div className="col-lg-6 col-md-12 align-self-center bodytext">
              <h2>{this.state.personInfo.name}</h2>
              <br />
              {this.state.birthday} - {this.state.deathday}
              <br />
              <br />
              {this.state.personInfo.biography}
            </div>
          </div>
        </div>
        {/* scroll menu for movie credits */}
        <div className="rowtitle">
          <h2>Film Credits</h2>
        </div>
        <div className="scrollmenu">
          <div className="scrollborder">
            <div className="row movierow">{this.state.movieCards}</div>
          </div>
        </div>
        <br />
        {/* scroll menu for tvcredits */}
        <div className="rowtitle">
          <h2>TV Credits</h2>
        </div>
        <div className="scrollmenu">
          <div className="scrollborder">
            <div className="row movierow">{this.state.tvCards}</div>
          </div>
        </div>
      </div>
    );
  }
}
