import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import MusicianSignUp from './pages/MusicianSignUp';
import BandSignUp from './pages/BandSignUp';
import PreSignUp from './pages/PreSignUp';
import Guitarists from './pages/Guitarists';
import Drummers from './pages/Drummers';
import Singers from './pages/Singers';
import api from '../api';
import logo from '../logo.svg';

export default class App extends Component {
  state = {
    countries: [],
    user: {},
  }

  componentDidMount() {
    this.setUser()
  }

  setUser = () => {
    if (api.isLoggedIn()) {
      this.setState({ user: api.getLocalStorageUser() })
    } else {
      this.setState({ user: {} })

    }
  }

  handleLogoutClick(e) {
    api.logout()
    //this.setState({user:null})
    this.setUser()

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="/"><h1 className="App-title">BandME</h1></a>
          {!api.isLoggedIn() && <NavLink to="/login">Log In</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/signup">Register</NavLink>}
          {api.isLoggedIn() && <Link to="/login" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
        </header>
        <Switch>

        <Route
            exact
            path='/'
            render={(props) => <Home {...props}  setUser={this.setUser} user={this.state.user}/>}
          />
          <Route 
            path='/home'
            render={(props) => <Home {...props} setUser={this.setUser} user={this.state.user}/>}
          />
          <Route
            path='/musicians/guitar'
            render={(props) => <Guitarists {...props} setUser={this.setUser} user={this.state.user}/>}
          />
          <Route
            path='/musicians/drummer'
            render={(props) => <Drummers {...props} setUser={this.setUser} user={this.state.user}/>}
          />
          <Route
            path='/musicians/singer'
            render={(props) => <Singers {...props} setUser={this.setUser} user={this.state.user}/>}
          />
          <Route
            path='/signup'
            render={(props) => <PreSignUp {...props} setUser={this.setUser} />}
          />
          <Route
            path='/musician-signup'
            render={(props) => <MusicianSignUp {...props} setUser={this.setUser} />}
          />
          <Route
            path='/band-signup'
            render={(props) => <BandSignUp {...props} setUser={this.setUser} />}
          />
          <Route
            path='/login'
            render={(props) => <Login {...props} setUser={this.setUser}/>}
          />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}