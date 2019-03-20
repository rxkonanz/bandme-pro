import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import { Redirect } from 'react-router-dom'

export default class Home extends Component {

  state = {
    artistType: localStorage.artistType,
    allBands: []
  }
  componentDidMount() {
    this.getBands() //calls once 
  }

  logIn = () => {
    if(!api.isLoggedIn()){ //DO THIS ONE
      return (
        <Redirect to="/login" />
      )
    }
  }

  getBands = () => {
    Axios.get("http://localhost:5000/api/all-bands")
      .then(res => {
        let bandsArray = res.data.allBands
        // console.log(bandsArray)
        this.setState({
          allBands:res.data.allBands
        })
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
      let showBands = this.state.allBands.map( (band) => {
        return  <div className="col-xl-4 col-lg-4 band-box">
                  <img src={band.imgLink} className="band-image" alt="alt" />
                  <p>{band.name}</p>
                </div>
      })
      return showBands;
    }
  }

  render() {    
    return (  
      <div className="Home">
        {this.logIn()}
        <div className="container">
          <div className="row">
            {this.showData()}
          </div>
        </div>
        
      </div>
    );
  }
}