import React , { Component } from 'react'
import { base , app } from '../base'

export default class Navbar extends Component {
	
	logout = () => {
		app.auth().signOut().then(() => this.setState({redirect: true}))
	}

	render() {
		return (
			<div className="navbar-home">
				<div className="burger-menu">
					<span className="line"></span>
					<span className="line"></span>
					<span className="line"></span>
				</div>
				<button className="btn btn-info btn-sm btncenter" onClick={this.logout.bind(this)}>Logout</button>
			</div>
		)
	}
}