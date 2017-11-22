import React , { Component } from 'react'
import { app , base } from '../../base'
import { Redirect , Link } from 'react-router-dom'
import '../Index.css'
import './Group.css'
import Navbar from '../../Components/Navbar'
import ListGroup from './ListGroup'

export default class CreateChat extends Component {
	constructor(props) {
		super(props)
		this.state = {
			redirect: null,
			usrer: ''
		}
	}

	componentWillMount() {
		app.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({redirect: false , user: user} , () => console.log(this.state))
			} else {
				this.setState({redirect: true} , () => console.log(this.state))
			}
		})
	}

	render() {
		const { users } = this.state
		if (this.state.redirect === true) {
			return <Redirect to='/login' />
		}
		return (
			<div className='container-home'>
				<Navbar />
				<div className="container-group">
					<ListGroup />
					<Link to='/createchat' className="btn btn-success btn-createRoom"></Link>
				</div>
			</div>
		)
	}
}