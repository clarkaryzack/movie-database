import React, { Component } from "react";
import "../index.css";

import { NavLink } from "react-router-dom";

export default class MoviePage extends Component {
  constructor(props) {
    super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      movieInfo: "",
      genreList: "",
      credits: "",
			similar: ""
    };
  }
	handleSubmit(event, id){
		event.preventDefault()
		window.location="/movie/"+id
	}
  componentDidMount() {
    console.log(this.props.match.params.movienum);
    let movienum = parseInt(this.props.match.params.movienum);
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        movienum +
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
				let similar = response.similar.results.map(movie => {
					let imgurl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
					console.log(imgurl);
					return (
						<div key={movie.id}>
							<form>
							<a onClick={(event)=> this.handleSubmit(event, movie.id)}>
								<img className="movieposter" src={imgurl} />
								<br />
								<a>{movie.title}</a>
							</a>
							</form>
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
    var date = new Date(this.state.movieInfo.release_date);
    var dd = date.getDate();
    var mm = date.getMonth();
    var yy = date.getFullYear();
    let movieurl =
      "https://image.tmdb.org/t/p/w500" + this.state.movieInfo.poster_path;
    return (
      <div>
        <div className="">
          <img alt="card" src={movieurl} className="movieposter" />
          <br />
          {this.state.movieInfo.title}
          <br />
          <br />
          Genre: {this.state.genreList}
          <br />
          Release Date: {monthNames[mm]} {dd}, {yy}
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
        <button onClick={this.addtoList}>Add to Watch List</button>
      </div>
    );
  }
}
