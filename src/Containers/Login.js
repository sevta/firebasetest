import React , { Component } from 'react'
import { base , app , gmail } from '../base'
import './Index.css'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			redirect: null
		}
		this.login = this.login.bind(this)
	}

	componentWillMount() {
		app.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({redirect: true} , () => console.log(this.state))
			} else {
				this.setState({redirect: false} , () => console.log(this.state))
			}
		})
	}

	login = () => {
		app.auth().signInWithPopup(gmail)
			.then(result => {
				if (result) {
					return <Redirect to='/' />
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		if (this.state.redirect === true ) {
			return <Redirect to='/' />
		}
		return (
			<div className="container-wrapper">
				<div className="login-from">
					<button className="btn btn-info" onClick={this.login}>Login With Gmail</button>
				</div>
			</div>
		)
	}
}