import React , { Component } from 'react'
import { base , app , gmail } from '../base'
import './Index.css'
import { Redirect } from 'react-router-dom'
import Spinner from 'react-spinkit'

export default class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			redirect: null,
			login: false
		}
		this.login = this.login.bind(this)
	}

	componentWillMount() {
		app.auth().onAuthStateChanged(user => {
			this.setState({ login: true })
			if (user) {
				this.setState({redirect: true , loading: false})
			} else {
				this.setState({redirect: false , loading: false})
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
		if (this.state.loading === true) {
			return <p>Loading...</p>
		}
		return (
			<div className="container-wrapper">
				<div className="login-from">
					<div className="title">
						TesterFire
					</div>
					<button className="btn btn-primary btn-login" onClick={this.login}>Login With Gmail</button>
				</div>
			</div>
		)
	}
}