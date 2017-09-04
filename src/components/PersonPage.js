import React, { Component } from "react";
import "../index.css";

import { NavLink } from "react-router-dom";

export default class PersonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personInfo: "",
      movieCards: "",
      tvCards: ""
    };
  }
  componentDidMount() {
    console.log(this.props.match.params.personnum);
    let personnum = parseInt(this.props.match.params.personnum);
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
			var date2 = "Present"
			if (this.state.personInfo.deathday){
		    var date2 = new Date(this.state.personInfo.deathday);
		    var dd2 = date2.getDate();
		    var mm2 = date1.getMonth();
		    var yy2 = date2.getFullYear();
				date2 = monthNames[mm1]+" "+dd1+", "+yy1;
			}
			date1 = monthNames[mm1]+" "+dd1+", "+yy1;
			console.log(date1);
			console.log(date2);
			this.setState({birthday: date1, deathday: date2});
			console.log(this.state.birthday);
			console.log(this.state.deathday);
// add film credits to state by appending credits to fetch url
        let moviecredits = response.movie_credits.cast.map(movie => {
          if (movie.poster_path) {
            let movieurl =
              "https://image.tmdb.org/t/p/w500" + movie.poster_path;
            return (
              <div key={movie.id}>
                <NavLink to={`/movie/${movie.id}`}>
                  <img className="movieposter" src={movieurl} />
                  <br />
                  {movie.title}
									<br/>
									Character: {movie.character}
                </NavLink>
              </div>
            );
          }
        });
        this.setState({ movieCards: moviecredits });
// add tv credits to state by appending credits to fetch url
        let tvcredits = response.tv_credits.cast.map(tv => {
          if (tv.poster_path) {
            let tvurl = "https://image.tmdb.org/t/p/w500" + tv.poster_path;
            return (
              <div key={tv.id}>
                <NavLink to={`/tv/${tv.id}`}>
                  <img className="movieposter" src={tvurl} />
                  <br />
                  {tv.name}
									<br/>
									Character: {tv.character}
                </NavLink>
              </div>
            );
          }
        });
				console.log(tvcredits)
        this.setState({ tvCards: tvcredits });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
		let personurl =
			"https://image.tmdb.org/t/p/w640/" + this.state.personInfo.profile_path;
    return (
      <div>
        <div className="">
          <img alt="card" src={personurl} className="movieposter" />
          <br />
          {this.state.personInfo.name}
          <br />
					{this.state.birthday} - {this.state.deathday}
          <br />
          {this.state.personInfo.biography}
        </div>
        {/* scroll menu for movie credits */}
        <div className="row scrollmenu">
          <div className="scrollLabelOuter">
            <div className="rotate">
              <p className="scrollLabelText">Scroll</p>
              <i className="fa fa-chevron-down scrollArrow" />
            </div>
          </div>
          <div className="row movierow">{this.state.movieCards}</div>
        </div>
        <br />
        {/* scroll menu for tvcredits */}
        <div className="row scrollmenu">
          <div className="scrollLabelOuter">
            <div className="rotate">
              <p className="scrollLabelText">Scroll</p>
              <i className="fa fa-chevron-down scrollArrow" />
            </div>
          </div>
          <div className="row movierow">{this.state.tvCards}</div>
        </div>
      </div>
    );
  }
}
