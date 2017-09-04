import React, {Component} from "react";
import "../index.css";

// import { NavLink } from "react-router-dom";

export default class MoviePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieInfo: "",
			genreList: "",
			credits: ""
		};
	}
	componentDidMount() {
		console.log(this.props.match.params.movienum)
		let movienum = parseInt(this.props.match.params.movienum)
		fetch("https://api.themoviedb.org/3/movie/"+movienum+"?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US").then(response => response.json()).then(response => {
			this.setState({movieInfo:response})
			let genreList = response.genres.map(genre => {
				console.log(genre.name)
				return (
					<div key={genre.id}>
						{genre.name}
					</div>
				)
				console.log(genreList)
			})
			console.log(genreList)
			this.setState({genreList:genreList});
			fetch("https://api.themoviedb.org/3/movie/"+movienum+"/credits?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US").then(response => response.json()).then(response => {
				let credits = response.cast.map(cast => {
					console.log(cast.profile_path)
					let imgurl = "https://image.tmdb.org/t/p/w640/"+cast.profile_path;
					console.log(imgurl);
					return(
					<div key={cast.credit_id}>
						<img className="movieposter" src={imgurl}/>
						<br/>
						{cast.name}
						<br/>
						Character: {cast.character}
						<br/>
					</div>
				)
				})
				this.setState({credits:credits})
				console.log(genreList)
				this.setState({genreList:genreList})

				}).catch(function(error) {
					console.log(error);
			})
			}).catch(function(error) {
				console.log(error);
		});
	}

	render() {
		let movieurl = "https://image.tmdb.org/t/p/w500" + this.state.movieInfo.poster_path
		return (
			<div>
				<div className="">
					<img alt="card" src={movieurl} className="movieposter"/>
					<br/>
					{this.state.movieInfo.title}
					<br/>
					<br/>
					Genre:{this.state.genreList}
					<br/>
					Relsease Date: ******
					<br/>
					{this.state.movieInfo.overview}
					<br/>
					{this.state.credits}
				</div>
				<button onClick={this.addtoList}>
					Add to Watch List
				</button>
			</div>
		);
	}
}
