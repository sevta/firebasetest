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
			users: [],
			participant: [],
			title: ''
		}
	}

	addParticipant = user => {
		this.state.participant.push(user.key)
		this.setState({ participant: this.state.participant })
		console.log(this.state)
	}

	componentWillMount() {
		app.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({redirect: false , user: user} , () => console.log(this.state))
			} else {
				this.setState({redirect: true} , () => console.log(this.state))
			}
		})
		base.fetch('users' , {
			context: this,
			asArray: true,
		}).then(data => this.setState({users: data}))
			.catch(err => console.log(err))
	}

	render() {
		const { users } = this.state
		if (this.state.redirect === true) {
			return <Redirect to='/login' />
		}
		return (
			<div className='container-home'>
				<Navbar />
				<div className="container" style={{marginTop: 20}}>
					<div className="row">
						<div className="col-md-12">
							<form>
								<fieldset>
									<div className="form-group">
										<input type="text" className="form-control" name='title' placeholder='title'/>
									</div>
									<div className="form-group">
										<p>add Participant</p>
										{ users.length ? (
											<ul className='userlist'>
												{ users.map((user , i) => (
													<li className='userlist-block' onClick={this.addParticipant.bind(this , user)}>
														<div className="useravatar">
															<img src={user.avatar} alt=""/>
														</div>
														<p className="username">{user.name}</p>
													</li>
												)) }
											</ul>
										) : null }
									</div>
								</fieldset>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}