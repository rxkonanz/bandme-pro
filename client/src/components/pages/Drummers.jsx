import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import { Redirect } from 'react-router-dom'

export default class Drummers extends Component {

    state = {
        allDrummers: [],
        currentUser: localStorage.userEmail
    }

    componentDidMount() {
        this.getDrummers();
    }

    getDrummers = () => {
        Axios.get("http://localhost:5000/api/drummers")
           .then(res => {
             let drummersArray = res.data.allDrummers
             this.setState({
               allDrummers: drummersArray
            })
        })
    }

    showDrummers = () => {
        let result = this.state.allDrummers.map((drummer,i) => {
          return (<div className="each-musician col-xl-6 col-lg-6">
                    <iframe className="youtube-video" title="youtubevideo" src={drummer.ytLink} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <p>{drummer.name}</p>
                    <button>Like</button>
                  </div>)
        })
        return result
      }

    render() {
        return(
            <div className="container">
                <img src="../../images/drums-logo.png" className="musician-type-image" alt="drums"/>
                <h1 className="show-artists-title">Drummers looking for a Band:</h1>
                <div className="row">
                    {this.showDrummers()}
                </div>
            </div>
        )
    }

}