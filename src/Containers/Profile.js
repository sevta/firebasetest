import React , { Component } from 'react'
import { base , app , gmail } from '../base'
import { Redirect } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import './Index.css'
import './Profile.css'

export default class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {redirect: null , user: ''}
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
		const { user } = this.state
		return (
			<div className='container-home'>
				<Navbar />
				<div className="container-profile-p">
					<div className="header-p">
						<div className="username-p">
							<h2 style={{fontSize: '2.2rem'}}>{user.displayName}</h2>
						</div>
						<div className="avatar-p">
							<img src={user.photoURL} alt=""/>
						</div>
						<div className="about-p">
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste nihil .</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}