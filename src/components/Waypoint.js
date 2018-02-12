import React, { Component } from "react";
import "../index.css";

import { Redirect } from "react-router-dom";

export default class Waypoint extends Component {
	render() {
		if (this.props.match.params.n1==="all") {
			if (parseInt(this.props.match.params.n4, 10)===0) {
				return(
					<Redirect push to={`/all/${this.props.match.params.n2}/${this.props.match.params.n3}/1`}>
					</Redirect>
				)
			} else {
				return(
					<Redirect push to={`/all/${this.props.match.params.n2}/${this.props.match.params.n3}/${this.props.match.params.n4}`}>
					</Redirect>
				)
			}
		} else if (this.props.match.params.n1==="movie") {
			return(
				<Redirect push to={`/movie/${this.props.match.params.n2}`}>
				</Redirect>
			)
		} else if (this.props.match.params.n1==="tv") {
			return(
				<Redirect push to={`/tv/${this.props.match.params.n2}`}>
				</Redirect>
			)
		} else if (this.props.match.params.n1==="person") {
			return(
				<Redirect push to={`/person/${this.props.match.params.n2}`}>
				</Redirect>
			)
		} else if (this.props.match.params.n1==="search") {
			return(
				<Redirect push to={`/search/${this.props.match.params.n2}/${this.props.match.params.n3}`}>
				</Redirect>
			)
		} else if (this.props.match.params.n1==="watchlist") {
			if (this.props.match.params.n2) {
				return(
					<Redirect push to={`/watchlist`}>
					</Redirect>
				)
			}
		} else {
			return (
				<Redirect push to={`/`}>
				</Redirect>
			)
		}
	}
}
