import React , { Component } from 'react'
import { base , app , gmail , db } from '../base'
// import './Index.css'
import './Home.css'
import { Redirect , Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'

export default class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			redirect: null,
			user: null
		}
		this.logout = this.logout.bind(this)
	}

	logout = () => {
		app.auth().signOut().then(() => this.setState({redirect: true}))
	}

	componentWillMount() {
		app.auth().onAuthStateChanged(user => {
			if (user) {
				console.log(user.uid , app )
				const user_id = user.uid
				base.post(`users/${user_id}` , {
					data: {
						name: user.displayName,
						provider: user.providerData[0].providerId,
						avatar: user.photoURL
					}
				})
				this.setState({redirect: false , user: user})
			} else {
				this.setState({redirect: true})
			}
		})
	}
	render() {
		const { user } = this.state
		if (this.state.redirect === true) {
			return <Redirect to='/login' />
		}
		return (
			<div className="container-home">
				<Navbar logout={this.logout.bind(this)}/>
				<div className="header-h">
					<div className="title-h">FireTest</div>
				</div>
				<div className="section-h">
					<Link to='/globalchat' className='section'>
						<div className='background-1'>
							<p>Global Chat</p>
						</div>
					</Link>
					<Link to='/group' className="section">
						<div className="background-2">
							<p>Group</p>
						</div>
					</Link>
					<Link to='/profile' className="section">
						<div className="background-3">
							<p>Profile</p>
						</div>
					</Link>
				</div>
			</div>
		)
	}
}