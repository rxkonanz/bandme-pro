import React, { Component, Fragment } from 'react';
import api from '../../api';
import Axios from 'axios';
import { SERVER_URL } from '../../config';

export default class BandProfile extends Component {

  state = {
    band: {},
    bandId: this.props.match.params.bandId
  }

  componentDidMount () {
    this.getBand()
  }

  getBand = () => {
    Axios.post(`${SERVER_URL}/band-profile`, {bandId: this.state.bandId})
    .then(res => {
      this.setState({
        band: res.data.band
      })
     })
  }

  showProfile = () => {
    let bandEmail = String(this.state.band.email)
    return <Fragment>
            <h3 className="band-name">{this.state.band.name}</h3>
            <img src={this.state.band.imgLink} className="band-profile-picture" alt=""></img>
            <div className="band-info">
              <p className="band-contact-info">We like what you've got! <br></br><a href={`mailto:${bandEmail}?Subject=Hello%20again`}>Contact Us</a></p>
              <p className="band-contact-info">Check out our <a href={this.state.band.spotifyLink}>Music</a></p>
            </div>
           </Fragment>
  }

  render () {
    return (
      <div className="band-profile-container">{this.showProfile()}</div>
    )
  }

}