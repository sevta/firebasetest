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
			user: '',
			check: false,
			participant: [],
			title: ''
		}
		this.checkPerson = this.checkPerson.bind(this)
		this.setTitle = this.setTitle.bind(this)
		this.createRoom = this.createRoom.bind(this)
	}


	// FIX create room pls
	// -----------------------------

	createRoom = e => {
		e.preventDefault()
		base.push('chat_group' , {
			data: {
				title: this.state.title,
				pic: null,
				group: this.state.participant,
				chat: []
			}
		})
		let pUID
		let uUID
		let participantUid = this.state.participant.map(users => users.uid) 
		let usersId = this.state.users.map((users , i) => users.key )
		for (let i = 0; i < participantUid.length; i++) {
			pUID = participantUid[i]
			for (let i = 0; i < usersId.length; i++) {
				uUID = usersId[i]
				if ( pUID === uUID ) {
					alert('still develop')
					// base.post(`users/${uUID}` , {
					// 	data: {
					// 		room: 1
					// 	}
					// })
				}
			}
		}
	}

	setTitle = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}


	// FIX add participant bug
	// solved by: Bintang
	// ----------------------------------

	addParticipant(user) {
		const { participant , check } = this.state
		let index
		let participant_i
		let obj = {
			uid: user.key,
			avatar: user.avatar,
			name: user.name
		}
		this.setState({ check: !check })
		index = -1
		let current_index = -1
		participant.forEach(current_part => {
			current_index++
			if (obj.name === current_part.name) {
				index = current_index
			}
		})
		if (index < 0) {
			participant.push(obj)
		} else {
			participant.splice(index , 1)	
		}
		this.setState({ participant: participant })
	}

	checkPerson = () => {
		const { users , user } = this.state
		const id_users = users.map(id_users => id_users.key)
		const id_person = user.uid
		for ( let i = 0; i < id_users.length; i++ ) {
			console.log(id_users[i])
			if ( id_person === id_users[i] ) {
				const index = id_users.indexOf(id_person)
				users.splice(index , 1)
				this.setState({users})
			}
		}
	}

	componentDidUpdate() {
		this.checkPerson()
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
		}).then(data => {
			this.setState({users: data})
		}).catch(err => console.log(err))
	}

	render() {
		const { users , participant , title } = this.state
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
									<h2 style={{marginBottom: 15 , fontSize: '2.2rem'}}>Create Room</h2>
									{ participant.length ? (
										<div>
											<div className="form-group">
												<input type="text" className="form-control form-create-room" name='title' placeholder='title' onChange={this.setTitle}/>
											</div>
											<div className="container-participant">


												{/* FIX title overflow */}

												<h3>{ title }</h3>
												<div className='participant-list'>
													{ participant.map((user , i) => (
														<div className='participant-img'>
															<img src={user.avatar} alt=""/>
														</div>
													)) }
												</div>
											</div>
										</div>
									) : null }
									<hr style={{marginTop: 45 , width: '50%' , borderTop: 'transparent'}}/>
									<div className="form-group">
										{ users.length ? (
											<ul className='userlist'>
												{ users.map((user , i) => (
													<li className='userlist-block'>


														{/* FIX if people check color changed */}

														<input type="checkbox" className="form-control check-participant" 
															style={{zIndex: 10}}
															onChange={this.addParticipant.bind(this , user)}
														/>
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
				{ participant.length ? (
					<a href=""
						className="btn btn-success btn-sm btn-create"
						onClick={this.createRoom}
					>
					Create..
					 </a>
				) : null }
			</div>
		)
	}
}