import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import { Redirect } from 'react-router-dom'

export default class Singers extends Component {

    state = {
        allSingers: [],
        currentUser: localStorage.userEmail
    }

    componentDidMount() {
        this.getSingers();
    }

    getSingers = () => {
        Axios.get("http://localhost:5000/api/singers")
           .then(res => {
             let singersArray = res.data.allSingers
             this.setState({
               allSingers: singersArray
            })
        })
    }

    showSingers = () => {
        let result = this.state.allSingers.map((singer,i) => {
          return (<div className="each-musician col-xl-6 col-lg-6">
                    <iframe className="youtube-video" title="youtubevideo" src={singer.ytLink} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <p>{singer.name}</p>
                    <button>Like</button>
                  </div>)
        })
        return result
      }

    render() {
        return(
            <div className="container">
                <img src="../../images/singer-logo.png" className="musician-type-image" alt="singer"/>
                <h1 className="show-artists-title">Singers looking for a Band:</h1>
                <div className="row">
                    {this.showSingers()}
                </div>
            </div>
        )
    }

}