import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../css/Navigation.css';

const Navigation = () => {
    return ( 
        <Navbar bg="dark" variant="dark" className="mb-1">
            <Navbar.Brand href="/dashboard">Trickk</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="/encrypt">Encrypt</Nav.Link>
            <Nav.Link href="/decrypt">Decrypt</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
            </Nav>
        </Navbar>
     );
}
 
export default Navigation;