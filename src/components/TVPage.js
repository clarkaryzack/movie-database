import React, { Component } from "react";
import "../index.css";

import { NavLink } from "react-router-dom";

export default class TVPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tvInfo: "",
      genreList: "",
      credits: ""
    };
  }
//handleSubmit is necessary to link to new tv pages (the window must be refreshed)
  handleSubmit(event, id) {
    event.preventDefault();
    window.location = "/tv/" + id;
  }
  componentDidMount() {
//the fetch url is taken from search parameters in the page url
    console.log(this.props.match.params.tvnum);
    let tvnum = parseInt(this.props.match.params.tvnum);
//initial fetch - stored to tvInfo in state
		let fetchurl = "https://api.themoviedb.org/3/tv/" +
			tvnum +
			"?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&append_to_response=credits,similar"
		console.log(fetchurl)
    fetch(fetchurl)
      .then(response => response.json())
      .then(response => {
        this.setState({ tvInfo: response });
// map over genre list and add to state
        let genreList = response.genres.map(genre => {
          console.log(genre.name);
          return <div key={genre.id} className="allrows">{genre.name}</div>;
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
            <div key={cast.credit_id} className="allrows">
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
// add similar tv shows to state by appending credits to fetch url
        let similar = response.similar.results.map(tv => {
          let imgurl = "https://image.tmdb.org/t/p/w500" + tv.poster_path;
          console.log(imgurl);
          return (
            <div key={tv.id} className="allrows">
              <NavLink to="/">
							<div className='card moviecard'>
                <a onClick={event => this.handleSubmit(event, tv.id)}>
                  <img className="movieposter" src={imgurl} />
                  <br />
                  {tv.name}
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
    var date1 = new Date(this.state.tvInfo.first_air_date);
    var dd1 = date1.getDate();
    var mm1 = date1.getMonth();
    var yy1 = date1.getFullYear();
    var date2 = new Date(this.state.tvInfo.last_air_date);
    var dd2 = date2.getDate();
    var mm2 = date1.getMonth();
    var yy2 = date2.getFullYear();
//set url of image
    let tvurl =
      "https://image.tmdb.org/t/p/w500" + this.state.tvInfo.poster_path;
    return (
//body of page
      <div>
				<div className="pagetitle">
					<h2>TV Show Details</h2>
				</div>
        <div className="pagebody row centered">
					<div className="col-lg-8 col-md-10 offset-lg-2 offset-md-1 row bodycard align-self-center">
						<div className="col-lg-6 col-md-12 align-self-center">
          		<img alt="card" src={tvurl} className="bodyposter" />
						</div>
						<div className="col-lg-6 col-md-12 align-self-center">
		          <h2>{this.state.tvInfo.name}</h2>
		          <br />
		          Air Dates: {monthNames[mm1]} {dd1}, {yy1} - {monthNames[mm2]} {dd2}, {yy2}
		          <br />
							<br/>
		          {this.state.tvInfo.overview}
	       		</div>
					</div>
				</div>

{/* scroll menu for cast */}
<div className="rowtitle">
	<h2>Cast</h2>
</div>
          <div className="scrollmenu">
						<div className="scrollborder">
            <div className="row movierow">{this.state.credits}</div>
          </div>
				</div>
          <br />
{/* scroll menu for similar films */}
<div className="rowtitle">
	<h2>Similar TV Shows</h2>
</div>
          <div className="scrollmenu">
						<div className="scrollborder">
            <div className="row movierow">{this.state.similar}</div>
          </div>
				</div>
        </div>
    );
  }
}
