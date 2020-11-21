import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../css/Navigation.css';

const Navigation = () => {
    return ( 
        <Navbar bg="dark" variant="dark" className="mb-1">
            <Navbar.Brand href="/">Trickk</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="/encrypt">Encrypt</Nav.Link>
            <Nav.Link href="/decrypt">Decrypt</Nav.Link>
            <Nav.Link href="/allimages">All Images</Nav.Link>
            </Nav>
        </Navbar>
     );
}
 
export default Navigation;