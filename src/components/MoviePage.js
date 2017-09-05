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
//handleSubmit is necessary to link to new movie pages (the window must be refreshed)
  handleSubmit(event, id) {
    event.preventDefault();
    window.location = "/movie/" + id;
  }
  componentDidMount() {
//the fetch url is taken from search parameters in the page url
    console.log(this.props.match.params.movienum);
    let movienum = parseInt(this.props.match.params.movienum);
//initial fetch - stored to movieInfo in state
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        movienum +
        "?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&append_to_response=credits,similar"
    )
      .then(response => response.json())
      .then(response => {
        this.setState({ movieInfo: response });
// map over genre list and add to state
        let genreList = response.genres.map(genre => {
          console.log(genre.name);
          return <div key={genre.id}>{genre.name}</div>;
          console.log(genreList);
        });
        console.log(genreList);
        this.setState({ genreList: genreList });
// add cast to state by appending credits to fetch url
        let credits = response.credits.cast.map(cast => {
          console.log(cast.profile_path);
          if (cast.profile_path) {
            let imgurl = "https://image.tmdb.org/t/p/w640/" + cast.profile_path;
            console.log(imgurl);
            return (
              <div key={cast.credit_id}>
                <NavLink to={`/person/${cast.id}`}>
								<div className='card moviecard'>
                  <img className="movieposter" src={imgurl} />
                  <br />
                  {cast.name}
                  <br />
                  Character: {cast.character}
                  <br />
								</div>
                </NavLink>
              </div>
            );
          }
        });
        this.setState({ credits: credits });
// add similar movies to state by appending credits to fetch url
        let similar = response.similar.results.map(movie => {
          let imgurl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
          console.log(imgurl);
          return (
            <div key={movie.id}>
              <NavLink to="/">
							<div className='card moviecard'>
                <a onClick={event => this.handleSubmit(event, movie.id)}>
                  <img className="movieposter" src={imgurl} />
                  <br />
                  {movie.title}
                </a>
							</div>
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
{/* scroll menu for cast */}
<div>
	Cast
</div>
          <div className="row scrollmenu">
            <div className="row movierow">{this.state.credits}</div>
          </div>
          <br />
{/* scroll menu for similar films */}
<div>
	Similar Films
</div>
          <div className="row scrollmenu">
            <div className="row movierow">{this.state.similar}</div>
          </div>
        </div>
{/* link to add to watch list */}
<button className="recommendbutton" onClick={() => this.addtoList(this.state.movieInfo.id, "movie")}>
	<i className="fa fa-heart"></i> Favorite
</button>
      </div>
    );
  }
}
