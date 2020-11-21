import React, { Component } from 'react';
import axios from 'axios'
import Image from './Image';
import { Button, Spinner } from 'react-bootstrap';

class ImageList extends Component {
    state = { 
        images: [],
        visible: 2,
        isLoading: true,
        newLoaded: false,
        status: false,
    }

    componentDidMount(){
        this.resetState();
    }

    getImages = () =>{
        axios.get('http://127.0.0.1:8000/api/encrypt/', {
            headers: {
                 'accept': 'application/json'
            }
        }).then(resp=>{
             this.setState({
                images: this.state.images.concat(resp.data),
                
                })
             console.log(resp)
         })

        axios.get('http://127.0.0.1:8000/api/decrypt/', {
            headers: {
                 'accept': 'application/json'
            }
        }).then(resp=>{
            this.setState({
                images: this.state.images.concat(resp.data),               
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
        const images = this.state.images.slice(0, this.state.visible).map(img=>{
            const pict=`http://localhost:8000${img.encrypted_picture}`
            return <li><Image key={img.id} pic={pict} height="500px" width="500px"/> </li>
        })
        return ( 
            <div>
                {this.state.isLoading ?
                <Spinner animation="border" role="status"></Spinner>
                :
                    <React.Fragment>
                        {((this.state.images.length === 0) && (this.state.status)) &&
                        <h3>No images</h3>
                        }
                        <ul>
                            {images}
                        </ul>
                        
                        {this.state.newLoaded &&
                        <Spinner animation="border" role="status"></Spinner>
                        }
                        <br />
                        {((this.state.images.length > this.state.visible) && (this.state.images.length >2)) &&
                        <Button className="mb-3" variant='primary' size='lg' onClick={this.handleVisible}>Load more</Button>
                        }
                        {((this.state.images.length <= this.state.visible) && (this.state.images.length>0)) &&
                        <h3 className="mb-3">No more images to load</h3>
                        }
                    </React.Fragment>
                }
            </div>
         );
    }
}
 
export default ImageList;