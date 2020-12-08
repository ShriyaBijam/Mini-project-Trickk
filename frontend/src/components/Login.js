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
          <h3>Login</h3>

          <div className="form-group">
            <label for="username">Username</label>
            <input type="text" placeholder="Enter username" id="username"
            onChange={e => this.setState({username: e.target.value})}/>
          </div>

          <div className="form-group">
            <label for="password">Password</label>
            <input type="password" placeholder="Enter password" id="password"
            onChange={e => this.setState({password: e.target.value})}/>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Login</button>
    
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
      
    )
  }
}

export default Login