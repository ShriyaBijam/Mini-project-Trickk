import React from 'react';
import { Card, CardDeck } from 'react-bootstrap';

const Image = (props) => {
    return ( 
    <CardDeck>
        <Card>
            <Card.Img variant="top" src={props.pictHidden} />
        </Card>
        <Card>
            <Card.Img variant="top" src={props.pictUsed} />
        </Card>
        <Card>
            <Card.Img variant="top" src={props.pictEncrpyt} />
        </Card>
    </CardDeck>
    );
}
 
export default Image;