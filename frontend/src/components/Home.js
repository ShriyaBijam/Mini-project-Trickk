import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col} from 'react-bootstrap';

import backimg from './back.png';
import './Home.css'

const Home = () => {
    return ( 
        <div class="row">
            <div class="col-sm-1">
            </div> 
            <div class="col-sm-5">             
            <div class="jumbotron">
                <h1>Encrypt And Decrypt Using Trickk</h1>
                <p>This application works on Images Using python Module OpenCV. 
                    In this we are using concept of Steganography to hide one image into another.
                    User needs to pass two images. One will be the Image that has to be encrypted 
                    and another one will be key which will be shown to viewer.</p>
                
            </div>
            </div>
            <div class="col-sm-6">             
            <img src={backimg} class="img-fluid" alt="Responsive image"></img>
            </div>  
        </div>
     );
}
 
export default Home;