import React , { Component } from 'react'
import { base , app , gmail } from './base'
import { Switch , Route , Redirect } from 'react-router-dom'
import Login from './Containers/Login'
import Home from './Containers/Home'
import Profile from './Containers/Profile'
import Containers from './Containers/Containers'
import CreateChat from './Containers/CreateChat'
import GlobalChat from './Containers/GlobalChat'

export default class Routers extends Component {
	constructor(props) {
		super(props)
		this.state = {
			auth: false
		}
	} 

	componentDidMount() {
		this.login = app.auth().onAuthStateChanged(user => {
			if (user) {
				console.log(user)
				this.setState({ auth: true })
			} else {
				this.setState({ auth: false })
			}
		})
	}

	render() {
		const { auth } = this.state
		return (
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/profile' component={Profile} />
				<Route path='/login' component={Login} />
				<Route path='/createchat' component={CreateChat} />
				<Route path='/globalchat' component={GlobalChat} />
			</Switch>
		)
	}
}
