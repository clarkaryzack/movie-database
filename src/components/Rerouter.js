import React, { Component } from "react";
import "../index.css";

import Form from "./Form.js";

import { NavLink } from "react-router-dom";

export default class Rerouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
			relocateurl: "/"
    };
  }

  componentWillMount() {
		console.log(this.props.match.params.param1)
		if(this.props.match.params.param4) {
			console.log("here")
			this.setState({relocateurl:"/"+this.props.match.params.param1+"/"+this.props.match.params.param2+"/"+this.props.match.params.param3+"/"+this.props.match.params.param4
			})
		}
		if (this.props.match.params.param3) {
			console.log("here")
			this.setState({relocateurl:"/"+this.props.match.params.param1+"/"+this.props.match.params.param2+"/"+this.props.match.params.param2
			})
		}
		if (this.props.match.params.param2) {
			console.log("here")
			this.setState({relocateurl:"/"+this.props.match.params.param1+"/"+this.props.match.params.param2
			})
		}
		else {
			console.log("here")
			this.setState({relocateurl:"/"+this.props.match.params.param1
			})
		}
	}
render(){
	window.location=this.state.relocateurl
	return(
		<div></div>
	)
}
}
