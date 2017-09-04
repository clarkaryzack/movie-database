import React, { Component } from "react";
import "../index.css";

import { NavLink } from "react-router-dom";

export default class TVPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieInfo: "",
      genreList: "",
      credits: ""
    };
  }
  componentDidMount() {
    console.log(this.props.match.params.tvnum);
    let tvnum = parseInt(this.props.match.params.tvnum);
    fetch(
      "https://api.themoviedb.org/3/tv/" +
        tvnum +
        "?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&append_to_response=credits,similar"
    )
      .then(response => response.json())
      .then(response => {
        this.setState({ movieInfo: response });
        let genreList = response.genres.map(genre => {
          console.log(genre.name);
          return <div key={genre.id}>{genre.name}</div>;
          console.log(genreList);
        });
        console.log(genreList);
        this.setState({ genreList: genreList });
        let credits = response.credits.cast.map(cast => {
          console.log(cast.profile_path);
          let imgurl = "https://image.tmdb.org/t/p/w640/" + cast.profile_path;
          console.log(imgurl);
          return (
            <div key={cast.credit_id}>
              <NavLink to={`/person/${cast.id}`}>
                <img className="movieposter" src={imgurl} />
                <br />
                {cast.name}
                <br />
                Character: {cast.character}
                <br />
              </NavLink>
            </div>
          );
        });
        this.setState({ credits: credits });
				let similar = response.similar.results.map(tv => {
					let imgurl = "https://image.tmdb.org/t/p/w500" + tv.poster_path;
					console.log(imgurl);
					return (
						<div key={tv.id}>
							<NavLink to={`/rerouter/tv/${tv.id}`}>
								<img className="movieposter" src={imgurl} />
								<br />
								{tv.name}
							</NavLink>
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
    var date1 = new Date(this.state.movieInfo.first_air_date);
    var dd1 = date1.getDate();
    var mm1 = date1.getMonth();
    var yy1 = date1.getFullYear();
    var date2 = new Date(this.state.movieInfo.last_air_date);
    var dd2 = date2.getDate();
    var mm2 = date1.getMonth();
    var yy2 = date2.getFullYear();
    let movieurl =
      "https://image.tmdb.org/t/p/w500" + this.state.movieInfo.poster_path;
    return (
      <div>
        <div className="">
          <img alt="card" src={movieurl} className="movieposter" />
          <br />
          {this.state.movieInfo.name}
          <br />
          <br />
          Genre:{this.state.genreList}
          <br />
          Air Dates: {monthNames[mm1]} {dd1}, {yy1} - {monthNames[mm2]} {dd2},{" "}
          {yy2}
          <br />
          {this.state.movieInfo.overview}
          <br />
          <div className="row scrollmenu">
            <div className="scrollLabelOuter">
              <div className="rotate">
                <p className="scrollLabelText">Scroll</p>
                <i className="fa fa-chevron-down scrollArrow" />
              </div>
            </div>
            <div className="row movierow">{this.state.credits}</div>
          </div>
					<br />
					<div className="row scrollmenu">
						<div className="scrollLabelOuter">
							<div className="rotate">
								<p className="scrollLabelText">Scroll</p>
								<i className="fa fa-chevron-down scrollArrow" />
							</div>
						</div>
						<div className="row movierow">{this.state.similar}</div>
					</div>
        </div>
      </div>
    );
  }
}
