import React , { Component } from 'react'
import { Switch , Route } from 'react-router-dom'
import Home from './Home'
import Profile from './Profile'
import { base , app } from '../base'
import { Redirect } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import './Index.css'

export default class Containers extends Component {
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
				this.setState({redirect: false , user: user} , () => console.log(this.state))
			} else {
				this.setState({redirect: true} , () => console.log(this.state))
			}
		})
	}

	render() {
		return (this.state.redirect === true) ? <Redirect to='/login' /> : this.props.children 
	}
} 