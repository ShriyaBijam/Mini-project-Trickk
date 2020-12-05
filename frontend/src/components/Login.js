import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";

import PublicNav from './PublicNavigation';

class Login extends Component {

  state = {
    username: "",
    password: "",
    redirect: false,
  }

  onSubmit = e => {
    e.preventDefault();
    const data = this.state;
    const filteredData = (({ username,password}) => ({ username,password}))(data);
    axios.post("http://127.0.0.1:8000/api/auth/login/", filteredData, {headers:{'Content-Type': 'application/json'}})
    .then(res => {
      localStorage.setItem("token", res.data.token);
      this.setState({redirect:true});
    })
    .catch(err => {
        if (err.response.status === 500)
        {
            alert("Sever error! Try again");
        }
        else
        {
            alert("Enter correct credentials!");
        }
    });
  }

  render(
  ) {
    if(this.state.redirect){
     return <Redirect push to="/allimages"/> 
    }
    return (
      <div>
        <PublicNav />

        <form onSubmit={this.onSubmit}>
          <fieldset>
            <legend>Login</legend>
            <p>
              <label htmlFor="username">Username</label>
              <input
                type="text" id="username"
                onChange={e => this.setState({username: e.target.value})} />
            </p>
            <p>
              <label htmlFor="password">Password</label>
              <input
                type="password" id="password"
                onChange={e => this.setState({password: e.target.value})} />
            </p>
            <p>
              <button type="submit">Login</button>
            </p>

            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </fieldset>
        </form>
      </div>
      
    )
  }
}

export default Login