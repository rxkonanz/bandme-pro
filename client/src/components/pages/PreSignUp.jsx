import React, { Component } from 'react';
import api from '../../api';

export default class PreSignUp extends Component {

    render(){
        return(
            <div className="pre-signup">
                <a href="/musician-signup" className="important-type-link">I am a Musician</a>
                <a href="/band-signup" className="important-type-link">I am a Band</a>
            </div>
        )
    }

}