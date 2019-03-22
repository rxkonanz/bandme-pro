import React, { Component, NavLink } from 'react';
import Axios from 'axios';
import api from '../../api';

export default class Profile extends Component {

  state = {
    user: this.props.user
  }

  handleLogoutClick(e) {
    api.logout()
    //this.setState({user:null})
    this.setUser()
    this.props.history.push('/login')
  }

  setUser = () => {
    if (api.isLoggedIn()) {
      this.setState({ user: api.getLocalStorageUser() })
    } else {
      this.setState({ user: {} })

    }
  }

  showProfile = () => {
    return  <div className="profile-container">
              <h2 className="profile-title">Your Account</h2>
              <img src={this.state.user.imgLink} className="profile-picture" alt=""></img><br></br><br></br>
              <h4>{this.state.user.name}</h4>
              <button className="logout-button" onClick={(e) => this.handleLogoutClick(e)}>Logout</button>
            </div>
  }

  render(){
    return(
      <div className="container">{this.showProfile()}</div>
    )
  }
}