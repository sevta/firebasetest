import React , { Component } from 'react'
import { app , base } from '../base'
import { Redirect } from 'react-router-dom'
import './Index.css'
import Navbar from '../Components/Navbar'

export default class CreateChat extends Component {
	constructor(props) {
		super(props)
		this.state = {
			redirect: null,
			message: '',
			user: '',
			uid: '',
			global_chat: []
		}
		this.send = this.send.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	send = e => {
		e.preventDefault()
		base.push('global_chat' , {
			data: {
				uid: this.state.user.uid,
				message: this.state.message,
				time: Date.now(),
				avatar: this.state.user.photoURL,
				name: this.state.user.displayName
			}
		})
		this.setState({message: ''})
	}

	componentWillMount() {
		app.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({redirect: false , user: user} , () => console.log(this.state))
			} else {
				this.setState({redirect: true} , () => console.log(this.state))
			}
		})
		base.syncState('global_chat' , {
			context: this,
			state: 'global_chat',
			asArray: true
		});
	}

	componentDidUpdate() {
		const { global_chat } = this.state
		global_chat.map((usertime , i) => {
			console.log(usertime.time)
			const date = new Date()
			const dateISO = date.toISOString()
			const dateString = date.toDateString()
			const dateDivide = (date.getTime() / 100) >> 0
			console.log(dateDivide)

		})
	}

	render() {
		const { users , global_chat , message } = this.state
		if (this.state.redirect === true) {
			return <Redirect to='/login' />
		}
		return (
			<div className='container-home'>
				<Navbar />
				<div className="container-chat">
				{ global_chat.map((user , i) => (
					<div className="list-chat">
						<div className="avatar-chat">
							<img src={user.avatar} alt=""/>
						</div>
						<div className="message">
							<p>{user.message}</p>
							{/*<div className="username">{user.name}</div>*/}
						</div>
					</div>
				)) }
				</div>
				<div className="container-send">
					<form onSubmit={this.send}>
						<input type="text" className="form-control" name='message' value={message} placeholder='Message...' onChange={this.onChange}/>
						<input type="submit" className="btn btn-success btn-send" onClick={this.send}/>
					</form>
				</div>
			</div>
		)
	}
}