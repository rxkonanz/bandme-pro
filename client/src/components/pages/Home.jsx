import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import { Redirect } from 'react-router-dom'
import { SERVER_URL } from '../../config'
import { BADSTR } from 'dns';

export default class Home extends Component {

  state = {
    artistType: localStorage.artistType,
    allBands: []
  }
  componentDidMount() {
    this.getBands() //calls once
    if(this.state.artistType == 'band') {
      document.getElementById("bands-like-you-title").style.display= "none";
    } 
  }

  logIn = () => {
    if(!api.isLoggedIn()){ //DO THIS ONE
      return (
        <Redirect to="/login" />
      )
    }
  }

  getBands = () => {
    Axios.get(`${SERVER_URL}/all-bands`)
      .then(res => {
        let bandsArray = res.data.allBands
        if(bandsArray === 'none'){
          this.setState({
            allBands: [bandsArray]
          })
        }
        else {
          let likedByBands = []
          bandsArray.map((band) => {
            if(band.likedMusicians.includes(this.props.user.email)) {
              likedByBands.push(band)
            }
          })
          
          this.setState({
            allBands: likedByBands
          })
        }
      })
  }

  showData = () => {
    console.log(this)
    if(this.state.artistType === 'band'){
      return (
              <div class="container">
                <h1 className="bands-home-title">I am looking for a:</h1>
                <div class="row">
                  <div className="artist-type-div col-lg-4">
                  <a href="/musicians/guitar"><img src="../../images/guitarist.png" className="artist-type-icon" alt="guitarist" />
                    <p>Guitar Player</p></a>
                  </div>
                  <div className="artist-type-div col-lg-4">
                  <a href="/musicians/singer"><img src="../../images/singer.png" className="artist-type-icon" alt="singer" />
                    <p>Singer</p></a>
                  </div>
                  <div className="artist-type-div col-lg-4">
                    <a href="/musicians/drummer"><img src="../../images/drummer.png" className="artist-type-icon" alt="drummer"/>
                    <p>Drummer</p></a>
                  </div>
                </div>
              </div>
            )
    }
    else {
      if(this.state.allBands === ['none']) {
        return <p className="no-band-yet">:( no band has liked you yet <br></br><br></br> (don't worry, we'll find you one!)</p>
      }
      else {
        let showBands = this.state.allBands.map( (band) => {
          return  <div className="col-xl-6 col-lg-6 band-box">
                    <a href={"/bands/" + String(band._id)}>
                    <img src={band.imgLink} className="band-image" alt="alt" />
                    <p>{band.name}</p></a>
                  </div>
        })
        return showBands;
      }
    }
  }

  render() {    
    return (  
      <div className="Home">
        {this.logIn()}
        <div className="container">
          <h1 id="bands-like-you-title">Bands that have liked you:</h1>
          <div className="row">
            {this.showData()}
          </div>
        </div>
      </div>
    );
  }
}