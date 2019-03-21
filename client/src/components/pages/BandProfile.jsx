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
    return <Fragment>
            <img src={this.state.band.imgLink} className="band-profile-picture" alt=""></img>
            <h3 className="band-name">{this.state.band.name}</h3>
            <p className="band-contact-info">We like what you've got! Contact Us: {this.state.band.email}</p>
           </Fragment>
  }

  render () {
    return (
      <div className="band-profile-container">{this.showProfile()}</div>
    )
  }

}