import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../css/Navigation.css';

const PublicNavigation = () => {
    return ( 
        <Navbar bg="dark" variant="dark" className="mb-1">
            <Navbar.Brand href="/">Trickk</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
        </Navbar>
     );
}
 
export default PublicNavigation;