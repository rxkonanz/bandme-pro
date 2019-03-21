import React, { Component } from 'react';
import api from '../../api';

export default class PreSignUp extends Component {

    render(){
        return(
            <div className="pre-signup">
                <div className="signup-container">
                    <div className="signup-option-container">  
                        <a href="/musician-signup"><img src="../../images/musician.png" className="signup-icon" alt="musician"></img><br></br>
                        <p>I am a Musician</p></a>
                    </div>
                    <div className="signup-option-container">
                        <a href="/band-signup"><img src="../../images/band-icon.png" className="signup-icon" alt="band"></img><br></br>
                        <p>I am a Band</p></a>
                    </div>
                </div>
            </div>
        )
    }
}