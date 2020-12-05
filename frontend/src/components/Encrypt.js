import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import '../css/Classifier.css'
import {Spinner, Button, Alert, Image} from 'react-bootstrap'
import axios from 'axios'
import Navigation from './Navigation';

class Encrypt extends Component {
    state = { 
        files: [],
        isLoading: false,
        recentImage: null,
        to_be_hidden_path: null,
        encrypted_picture_path:null,
        token: localStorage.getItem("token"),
     }

     onDrop =(files) =>{
        this.setState({
            files:[],
            isLoading: true,
            recentImage:null
            })
        this.loadImage(files)
     }

     loadImage=(files)=>{
         setTimeout(() => {
             this.setState({
                 files,
                 isLoading: false
             }, () => {

             })
         }, 1000);
     }

     activateSpinner = () => {
         this.setState({
             files:[],
             isLoading:true,
            })
     }

     deactivateSpinner=()=> {
        this.setState({isLoading:false})
     }

     sendImage =()=> {
         this.activateSpinner()
         let formData = new FormData()
         formData.append('to_be_hidden', this.state.files[0], this.state.files[0].name)
         formData.append('used_to_hide', this.state.files[1], this.state.files[1].name)
         axios.post('http://localhost:8000/api/encrypt/', formData, {
             headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data',
                'authorization': `Token ${this.state.token}`,
             }
         })
         .then(resp=>{
             this.getImageClass()
             console.log(resp.data.id)
         })
         .catch(err=>{
             console.log("Code broke at send image")
             console.log(err.data)
         })
     }

     getImageClass =()=> {
         axios.get(`http://localhost:8000/api/encrypt/`, {
            headers: {
                'accept': 'application/json',
                'authorization': `Token ${this.state.token}`,
            }
         })
         .then(resp=>{
             this.setState({recentImage:resp.data.slice(-1)[0],
                encrypted_picture_path: `http://localhost:8000${resp.data.slice(-1)[0].encrypted_picture}`,
                to_be_hidden_path: `http://localhost:8000${resp.data.slice(-1)[0].to_be_hidden}`
            })
         })
         .catch(err=>{
            console.log("Code broke at get image")
            console.log(err)
        })
        this.deactivateSpinner()

     }
     
    render() { 
        const files = this.state.files.map(file => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
          ));

        return ( 
            <div>
                <Navigation />

                <Dropzone onDrop={this.onDrop} accept='image/png, image/jpeg'>
                    {({isDragActive, getRootProps, getInputProps}) => (
                        <section className="container">
                        <div {...getRootProps({className: 'dropzone back'})}>
                            <input {...getInputProps()} />
                            <i className="far fa-image mb-2 text-muted" style={{fontSize:100}}></i>
                            <p className='text-muted'>{isDragActive ? "Here we GO!! " : "Drag images here to Encrypt"}</p>
                        </div>
                        <h2>First Image will be hidden in Second Image</h2>
                        <aside>{files}</aside>

                        {this.state.files.length >1 &&
                        <Button variant='info' size='lg' className='mt-3' onClick={this.sendImage}>Encrypt!</Button>
                        }

                        {this.state.isLoading &&
                        <Spinner animation="border" role="status"></Spinner>
                        }

                        {this.state.recentImage &&
                        <React.Fragment>
                            <Alert variant='primary'>
                                <h3>This image is hidden</h3> <br />
                                <Image className='justify-content-center' src={this.state.to_be_hidden_path} rounded/>                
                            </Alert>
                            <h3>Encrypted image is</h3> <br />
                            <Image className='justify-content-center' src={this.state.encrypted_picture_path} rounded/>
                        </React.Fragment>
                        }
                        </section>
                    )}
                </Dropzone>
            </div>
            
         );
    }
}
 
export default Encrypt;