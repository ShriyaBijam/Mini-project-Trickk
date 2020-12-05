import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import '../css/Classifier.css';
import {Spinner, Button, Alert, Image} from 'react-bootstrap';
import axios from 'axios';
import Navigation from './Navigation';

class Decrypt extends Component {
    state = { 
        files: [],
        isLoading: false,
        recentImage: null,
        encrypted_picture_path:null,
        to_be_hidden_path:null,
        used_to_hide_path:null,
        token: localStorage.getItem("token")
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
                console.log(this.state.files[0].name)
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
         formData.append('encrypted_picture', this.state.files[0], this.state.files[0].name)
         axios.post('http://localhost:8000/api/decrypt/', formData, {
             headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data',
                'authorization': `Token ${this.state.token}`,
             }
         }).then(resp=>{
            this.getImageClass()
         })
         .catch(err=>{
            console.log(err.data)
         })
     }

     getImageClass =()=> {
         axios.get(`http://localhost:8000/api/decrypt/`, {
             headers: {
                'accept': 'application/json',
                'authorization': `Token ${this.state.token}`,
             }
         })
         .then(resp=>{
             this.setState({recentImage:resp.data.slice(-1)[0],
                encrypted_picture_path: `http://localhost:8000${resp.data.slice(-1)[0].encrypted_picture}`,
                to_be_hidden_path: `http://localhost:8000${resp.data.slice(-1)[0].to_be_hidden}`,
                used_to_hide_path: `http://localhost:8000${resp.data.slice(-1)[0].used_to_hide}`,
            })
             console.log(resp)
         })
         .catch(err=>{
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
                        <p className='text-muted'>{isDragActive ? "Here we GO " : "Drag image here to Decrypt"}</p>
                        </div>
                        <aside>
                        {files}
                        </aside>

                        {this.state.files.length >0 &&
                        <Button variant='info' size='lg' className='mt-3' onClick={this.sendImage}>Decrypt!</Button>
                        }

                        {this.state.isLoading &&
                        <Spinner animation="border" role="status"></Spinner>
                        }

                        {this.state.recentImage &&
                        <React.Fragment>
                            <Alert variant='primary'>
                                <h3>Given Encryted Image is</h3> <br />
                                <Image className='justify-content-center' src={this.state.encrypted_picture_path} rounded/>                        
                            </Alert>
                            
                            <h3>Image that was used to hide is</h3> <br />
                            <Image className='justify-content-center' src={this.state.to_be_hidden_path} rounded/>
                            <h3>Hidden image is</h3> <br />
                            <Image className='justify-content-center' src={this.state.used_to_hide_path} rounded/>
                        </React.Fragment>
                        }
                    </section>
                    )}
                </Dropzone>
            </div>
            
         );
    }
}
 
export default Decrypt;