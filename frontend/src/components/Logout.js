import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

export const Logout = () => {

    var token = localStorage.getItem("token");
    axios.post('http://localhost:8000/api/auth/logout/', {}, {
             headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data',
                'authorization': `Token ${token}`,
             }
    }).then(res => {
        localStorage.removeItem("token");
        window.location = "/login";
    })

    return null;
}