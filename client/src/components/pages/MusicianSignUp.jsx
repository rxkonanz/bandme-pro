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
      artistType:'musician',
      ytLink: "",
      imgLink: "",
      instrument: "guitarist"
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
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      artistType: this.state.artistType,
      ytLink: this.getVideoId(this.state.ytLink),
      imgLink: this.state.imgLink,
      instrument: this.state.instrument
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
      ytLink: this.getVideoId(this.state.ytLink),
      imgLink: this.state.imgLink,
      instrument: this.state.instrument
    }
    
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.setUser()
        this.props.history.push("/home") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }


  getVideoId = (url) => {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return "https://www.youtube.com/embed/" + match[2];
    } else {
        return 'error';
    }
  }

  render() {
    return (
      <div className="Signup">
        <div className="grid align__item">
          <div className="login">
              <h4 className="form-title">Register as a Musician</h4>
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
                    <input type="text" value={this.state.ytLink} name="ytLink" placeholder="youtube link" onChange={this.handleInputChange} />
                  </div>

                  <div class="form__field">
                    I am a: 
                    <select className="artist-type-dropdown" name="instrument" onChange={this.handleInputChange}>
                      <option name="guitarist" value="guitarist">Guitar Player</option>
                      <option name="singer" value="singer">Singer</option>
                      <option name="drummer" value="drummer">Drummer</option>
                    </select>
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