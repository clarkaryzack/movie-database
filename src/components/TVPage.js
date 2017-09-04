import React, {Component} from "react";
import "../index.css";

// import { NavLink } from "react-router-dom";

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
		console.log(this.props.match.params.tvnum)
		let tvnum = parseInt(this.props.match.params.tvnum)
		fetch("https://api.themoviedb.org/3/tv/"+tvnum+"?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US").then(response => response.json()).then(response => {
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
			fetch("https://api.themoviedb.org/3/tv/"+tvnum+"/credits?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US").then(response => response.json()).then(response => {
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
					{this.state.movieInfo.name}
					<br/>
					<br/>
					Genre:{this.state.genreList}
					<br/>
					Broadcast from: {this.state.movieInfo.first_air_date} to {this.state.movieInfo.last_air_date}
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
