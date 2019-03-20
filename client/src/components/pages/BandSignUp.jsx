import React, { Component } from 'react';
import api from '../../api';

export default class MusicianSignup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      name: "",
      password: "",
      message: null,
      artistType:'band',
      imgLink: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    console.log(this.state, e.target.photo, e.target)
    let data = {
        imgLink: this.state.imgLink,
        email: this.state.email,
        name: this.state.name,
        password: this.state.password,
        artistType: this.state.artistType
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.setUser()
        this.props.history.push("/home") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    
    let data = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      artistType: this.state.artistType,
      imgLink: this.state.imgLink
    }
    
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.setUser()
        this.props.history.push("/home") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Signup">
        <div className="grid align__item">
          <div className="login">
              <h4 className="form-title">Register as a Band</h4>
              <form onSubmit={this.handleSubmit} className="form" method="post" enctype="multipart/form-data">

                  <div className="form__field">
                    <input type="text" value={this.state.imgLink} name="imgLink" placeholder="link to profile image" onChange={this.handleInputChange} />
                  </div>

                  <div className="form__field">
                    <input type="email" value={this.state.email} name="email" placeholder="email" onChange={this.handleInputChange} />
                  </div>
                  
                  <div className="form__field">
                    <input type="text" value={this.state.name} name="name" placeholder="name" onChange={this.handleInputChange} />
                  </div>

                  <div class="form__field">
                    <input type="password" value={this.state.password} name="password" placeholder="password" onChange={this.handleInputChange} />
                  </div>
                  
                  <div class="form__field">
                    {/* <input type="submit" onClick={(e) => this.handleClick(e)} value="Register"></input> */}
                    <input type="submit" value="Register"></input>

                    <a href="/login">Already have an Account? Log In.</a>
                  </div>
              </form>
              {this.state.message && <div className="info info-danger">
              {this.state.message}
              </div>}
          </div>
        </div> 
      </div>
    );
  }
}