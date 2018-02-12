import React, { Component } from "react";
import "../index.css";

import { NavLink } from "react-router-dom";

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.addtoList = this.addtoList.bind(this);
    this.state = {
      movielist: <div className="noresults">No movies found that match your search.</div>,
      tvlist: <div className="noresults">No tv shows were found that match your search.</div>,
      personlist: <div  className="noresults">No people were found who match your search.</div>
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
    // fetch movies based on params
    let moviesearchurl =
      "https://api.themoviedb.org/3/search/movie?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US&query=" +
      this.props.match.params.term +
      "&include_adult=false&page=" +
      this.props.match.params.page;
    fetch(moviesearchurl)
      .then(response => response.json())
      .then(response => {
        let movieCards = response.results.map(movie => {
          if (movie.poster_path) {
            let movieurl =
              "https://image.tmdb.org/t/p/w500" + movie.poster_path;
            return (
              <div key={movie.id} className="allrows">
                <div className="card moviecard">
                  <div className="cardinner">
                    <NavLink to={`/movie/${movie.id}`}>
                      <img
                        alt="movie poster"
                        src={movieurl}
                        className="movieposter"
                      />
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
          } else {
            return null;
          }
        });
				if (movieCards.length !== 0) {
          this.setState({movielist:movieCards})
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
    fetch(tvsearchurl)
      .then(response => response.json())
      .then(response => {
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
          } else {
            return null;
          }
        });
				if (tvCards.length !== 0) {
          this.setState({tvlist:tvCards})
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
    fetch(personsearchurl)
      .then(response => response.json())
      .then(response => {
        let personCards = response.results.map(person => {
          if (person.profile_path) {
            let personurl =
              "https://image.tmdb.org/t/p/w500/" + person.profile_path;
            return (
              <div key={person.id} className="allrows">
                <NavLink to={`/person/${person.id}`}>
                  <div className="card moviecard">
                    <img
                      alt="profile"
                      src={personurl}
                      className="movieposter profilePhoto"
                    />
                    <br />
                    {person.name}
                  </div>
                </NavLink>
              </div>
            );
          } else {
            return null;
          }
        });
        if (personCards.length !== 0) {
          this.setState({personlist:personCards})
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <div className="searchtitle">
          <h2>Search Results for: {this.props.match.params.term}</h2>
        </div>
        <div className="rowtitle">
          <h2>Movies</h2>
          <div className="allResults">
            <button>
              <NavLink to={`/all/movie/${this.props.match.params.term}/1`}>
                See All Results
              </NavLink>
            </button>
          </div>
          <div className="scrollmenu">
            <div className="scrollborder">
              <div className="row movierow">
                {this.state.movielist}
                <div className="finalcard allrows">
                  <NavLink
                    className="card moviecard"
                    to={`/all/movie/${this.props.match.params.term}/1`}
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
          <h2>TV Shows</h2>
          <div className="allResults">
            <button>
              <NavLink to={`/all/tv/${this.props.match.params.term}/1`}>
                See All Results
              </NavLink>
            </button>
          </div>
          <div className="scrollmenu">
            <div className="scrollborder">
              <div className="row movierow">
                {this.state.tvlist}
                <div className="finalcard allrows">
                  <NavLink
                    className="card moviecard"
                    to={`/all/tv/${this.props.match.params.term}/1`}
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
          <h2>People</h2>
          <div className="allResults">
            <button>
              <NavLink to={`/all/person/${this.props.match.params.term}/1`}>
                See All Results
              </NavLink>
            </button>
          </div>
          <div className="scrollmenu">
            <div className="scrollborder">
              <div className="row movierow">
                {this.state.personlist}
                <div className="finalcard allrows">
                  <NavLink
                    className="card moviecard"
                    to={`/all/person/${this.props.match.params.term}/1`}
                  >
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
