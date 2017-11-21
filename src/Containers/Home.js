import React , { Component } from 'react'
import { base , app , gmail , db } from '../base'
import './Index.css'
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
		this.createChatRoom = this.createChatRoom.bind(this)
	}

	createChatRoom = () => {
		console.log('create')
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
				this.setState({redirect: false , user: user} , () => console.log(this.state))
			} else {
				this.setState({redirect: true} , () => console.log(this.state))
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
				{user ? (
					<div className='container-profile'>
						<div className="headers">
							<img src={user.photoURL} alt=""/>
						</div>
						<p>{user.displayName}</p>
						<p>{user.email}</p>
					</div>
				) : null}
				<Link to='/globalchat' className="btn btn-warning btn-md_two" style={{
					width: '100%' , position: 'absolute' , bottom: 36 , borderRadius: 0
				}}>Global Chat Room</Link>
				<Link to='/createchat' className="btn btn-info btn-md" style={{
					width: '100%' , position: 'absolute' , bottom: 0 , borderRadius: 0
				}} onClick={this.createChatRoom}>Create Chat Room</Link>
			</div>
		)
	}
}