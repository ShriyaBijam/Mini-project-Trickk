import React, { Component } from 'react';
import axios from 'axios'
import Image from './Image';
import { Button, Spinner } from 'react-bootstrap';
import Navigation from './Navigation'

class ImageList extends Component {
    state = { 
        encryptedImages: [],
        decryptedImages: [],
        visible: 2,
        isLoading: true,
        newLoaded: false,
        status: false,
        token: localStorage.getItem("token"),
    }

    componentDidMount(){
        this.resetState();
    }

    getImages = () =>{
        axios.get('http://127.0.0.1:8000/api/encrypt/', {
            headers: {
                'accept': 'application/json',
                'authorization': `Token ${this.state.token}`,
            }
        }).then(resp=>{
             this.setState({
                encryptedImages: this.state.encryptedImages.concat(resp.data),
                
            })
             console.log(resp)
         })

        axios.get('http://127.0.0.1:8000/api/decrypt/', {
            headers: {
                'accept': 'application/json',
                'authorization': `Token ${this.state.token}`,
            }
        }).then(resp=>{
            this.setState({
                decryptedImages: this.state.decryptedImages.concat(resp.data),               
            })
            console.log(resp)
         })

        this.setState({isLoading:false, status: true,})
    }

    resetState = () =>
    {
        this.getImages();
    }

    handleVisible =()=>{
        const visible = this.state.visible
        const new_visible = visible + 2
        this.setState({newLoaded:true})
        setTimeout(() => {
            this.setState({
                visible:new_visible,
                newLoaded:false,
            })
        }, 300);
    }

    
    render() { 
        const encryptedImages = this.state.encryptedImages.slice(0, this.state.visible).map(img=>{
            const pictHidden=`http://localhost:8000${img.to_be_hidden}`;
            const pictUsed=`http://localhost:8000${img.used_to_hide}`;
            const pictEncrpyt=`http://localhost:8000${img.encrypted_picture}`;

            return <li>
                <Image pictHidden={pictHidden} pictUsed={pictUsed} pictEncrpyt={pictEncrpyt}/> 
            </li>
        })
        const decryptedImages = this.state.decryptedImages.slice(0, this.state.visible).map(img=>{
            const pictHidden=`http://localhost:8000${img.to_be_hidden}`;
            const pictUsed=`http://localhost:8000${img.used_to_hide}`;
            const pictEncrpyt=`http://localhost:8000${img.encrypted_picture}`;

            return <li>
                <Image pictHidden={pictHidden} pictUsed={pictUsed} pictEncrpyt={pictEncrpyt}/> 
            </li>
        })
        return ( 
            <div>
                <Navigation />
                {this.state.isLoading ?
                <Spinner animation="border" role="status"></Spinner>
                :
                    <React.Fragment>
                        <h3>Encrypted Images:</h3>
                        {((this.state.encryptedImages.length === 0) && (this.state.status)) &&
                        <h3>No Encrypted images</h3>
                        }
                        
                        <ul>
                            {encryptedImages}
                        </ul>
                        
                        {this.state.newLoaded &&
                        <Spinner animation="border" role="status"></Spinner>
                        }
                        <br />
                        {((this.state.encryptedImages.length > this.state.visible) && (this.state.encryptedImages.length >2)) &&
                        <Button className="mb-3" variant='primary' size='lg' onClick={this.handleVisible}>Load more</Button>
                        }
                        {((this.state.encryptedImages.length <= this.state.visible) && (this.state.encryptedImages.length>0)) &&
                        <h3 className="mb-3">No more images to load</h3>
                        }

                        <h3>Decrypted Images:</h3>
                        {((this.state.decryptedImages.length === 0) && (this.state.status)) &&
                        <h3>No Decrypted images</h3>
                        }
                        
                        <ul>
                            {decryptedImages}
                        </ul>
                        
                        {this.state.newLoaded &&
                        <Spinner animation="border" role="status"></Spinner>
                        }
                        <br />
                        {((this.state.decryptedImages.length > this.state.visible) && (this.state.decryptedImages.length >2)) &&
                        <Button className="mb-3" variant='primary' size='lg' onClick={this.handleVisible}>Load more</Button>
                        }
                        {((this.state.decryptedImages.length <= this.state.visible) && (this.state.decryptedImages.length>0)) &&
                        <h3 className="mb-3">No more images to load</h3>
                        }
                    </React.Fragment>
                }
            </div>
         );
    }
}
 
export default ImageList;