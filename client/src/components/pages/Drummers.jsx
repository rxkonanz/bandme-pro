import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import { Redirect } from 'react-router-dom';
import { SERVER_URL } from '../../config';

export default class Drummers extends Component {

    state = {
        allDrummers: [],
        currentUser: localStorage.userEmail,
        likedMusicians: []
    }

    componentDidMount() {
        this.getDrummers();
        this.getLikedMusicians();
    }

    getDrummers = () => {
        Axios.get(`${SERVER_URL}/drummers`)
           .then(res => {
             let drummersArray = res.data.allDrummers
             this.setState({
               allDrummers: drummersArray
            })
        })
    }

    getLikedMusicians = () => {
        Axios.post(`${SERVER_URL}/liked-musicians`, {currentUser: this.state.currentUser})
        .then(res => {
            this.setState({
                likedMusicians: res.data.musicians[0].likedMusicians
            })
        })
    }

    likeVideo = (musicianEmail) => {
        Axios.post(`${SERVER_URL}/like-video`, {bandEmail: this.state.currentUser, musicianEmail})
            .then(res => {
                console.log(res)
            })
        window.location.reload();
    }

    unlikeVideo = (musicianEmail) => {
        Axios.post(`${SERVER_URL}/unlike-video`, {bandEmail: this.state.currentUser, musicianEmail})
        .then(res => {
            console.log(res)
        })
        window.location.reload();
    }

    showDrummers = () => {
        let result = this.state.allDrummers.map((drummer,i) => {

            if(this.state.likedMusicians.includes(drummer.email)){
                return (<div className="each-musician col-xl-6 col-lg-6">
                            <iframe className="youtube-video" title="youtubevideo" src={drummer.ytLink} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            <p>{drummer.name}</p>
                            <button className="liked-button" onClick={(e) => this.unlikeVideo(drummer.email)}>Liked</button>
                        </div>)
            }
            else {
                return (<div className="each-musician col-xl-6 col-lg-6">
                            <iframe className="youtube-video" title="youtubevideo" src={drummer.ytLink} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            <p>{drummer.name}</p>
                            <button onClick={(e) => this.likeVideo(drummer.email)}>Like</button>
                        </div>)
            }

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