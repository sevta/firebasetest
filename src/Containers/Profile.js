import React , { Component } from 'react'
import { base , app , gmail } from '../base'
import { Redirect } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import './Index.css'

export default class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {redirect: null}
	}

	componentWillMount() {
		app.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({redirect: false , user: user})
			} else {
				this.setState({redirect: true})
			}
		})
	}

	render() {
		if (this.state.redirect === true) {
			return <Redirect to='/login' />
		}
		return (
			<div className='container-home'>
				<Navbar />
				<p>Profile is Real..</p>
			</div>
		)
	}
}