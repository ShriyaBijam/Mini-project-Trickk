import React from 'react';
import { Card } from 'react-bootstrap';

const Image = (props) => {
    return ( 
        <Card style={{ width: '40rem' }} className="mx-auto mb-2">
        <Card.Img variant="top" src={props.pic}/>
        <Card.Body>
        <img src={props.pic} height={props.height} width={props.width}></img>
        </Card.Body>
        </Card>
     );
}
 
export default Image;