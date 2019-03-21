import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import { Redirect } from 'react-router-dom'
import { SERVER_URL } from '../../config'

export default class Guitarists extends Component {

    state = {
        allGuitarists: [],
        currentUser: localStorage.userEmail
    }

    componentDidMount() {
        this.getGuitarists();
    }

    getGuitarists = () => {
        Axios.get(`${SERVER_URL}/guitarists`)
           .then(res => {
             let guitaristsArray = res.data.allGuitarists
             this.setState({
               allGuitarists: guitaristsArray
            })
        })
    }

    likeVideo = (musicianEmail) => {
        alert("You liked this video!");
        Axios.post(`${SERVER_URL}/like-video`, {bandEmail: this.state.currentUser, musicianEmail})
            .then(res => {
                console.log(res)
            })
    }

    showGuitarists = () => {
        let result = this.state.allGuitarists.map((guitarist,i) => {
          return (<div className="each-musician col-xl-6 col-lg-12">
                    <iframe className="youtube-video" title="youtubevideo" src={guitarist.ytLink} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <p>{guitarist.name}</p>
                    <button onClick={(e) => this.likeVideo(guitarist.email)}>Like</button>
                  </div>)
        })
        return result
      }

    render() {
        return(
            <div className="container">
                <img src="../../images/guitar-logo.png" className="musician-type-image" alt="guitar"/>
                <h1 className="show-artists-title">Guitar Players looking for a Band:</h1>
                <div className="row">
                    {this.showGuitarists()}
                </div>
            </div>
        )
    }

}