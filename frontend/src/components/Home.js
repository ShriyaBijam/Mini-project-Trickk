import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import backimg from './back.png';
import './Home.css'

import PubNav from './PublicNavigation';

const Home = () => {
    return ( 
        <div>
            <PubNav />
            <div className="row">
                <div className="col-sm-1">
                </div> 
                <div className="col-sm-5">             
                <div className="jumbotron">
                    <h1>Encrypt And Decrypt Using Trickk</h1>
                    <p>This application works on Images Using python Module OpenCV. 
                        In this we are using concept of Steganography to hide one image into another.
                        User needs to pass two images. One will be the Image that has to be encrypted 
                        and another one will be key which will be shown to viewer.
                    </p>
                    
                </div>
                </div>
                <div className="col-sm-6">             
                <img src={backimg} className="img-fluid" alt="Responsive"></img>
                </div>  
            </div>
        </div>

     );
}
 
export default Home;