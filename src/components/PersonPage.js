import React, {Component} from "react";
import "../index.css";

// import { NavLink } from "react-router-dom";

export default class PersonPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			personInfo: ""
		};
	}
	componentDidMount() {
		console.log(this.props.match.params.personnum)
		let movienum = parseInt(this.props.match.params.personnum)
		fetch("https://api.themoviedb.org/3/person/"+movienum+"?api_key=4f2d813db1c216bca9c8a22d63ad274a&language=en-US").then(response => response.json()).then(response => {
			this.setState({personInfo:response})
			}).catch(function(error) {
			console.log(error);
		});
	}
	render() {
			let personurl = "https://image.tmdb.org/t/p/w640/" + this.state.personInfo.profile_path
			return (
				<div>
					<div className="">
						<img alt="card" src={personurl} className="movieposter"/>
						<br/>
						{this.state.personInfo.name}
					</div>
				</div>
			);
	}
}
