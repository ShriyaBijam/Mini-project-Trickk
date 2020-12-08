import React, {Component} from "react";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import PubNav from './PublicNavigation';

class Register extends Component {
    state = {
        username: "",
        password: "",
        c_password:"",
        redirect: false,
      }

      validate = () => {
        return this.state.password === this.state.c_password;
      }

      onSubmit = e => {
        e.preventDefault();
        if (this.validate())
        {
          const data = this.state;
          const filteredData = (({ username,password}) => ({ username,password}))(data);
          axios.post("http://127.0.0.1:8000/api/auth/register/", filteredData, {headers:{'Content-Type': 'application/json'}})
          .then(() => {
              axios.post("http://127.0.0.1:8000/api/auth/login/", filteredData, {headers:{'Content-Type': 'application/json'}})
              .then( () =>
              {
                this.setState({redirect:true});
              }
              )    
          })
          .catch(err => {
              if (err.response.status === 500)
              {
                  alert("Sever error! Try again");
              }
              else
              {
                  console.log(err.response);
                  alert("Enter correct credentials!");
              }
          });
        }
        else
        {
          alert("Passwords do not match! Try Again");
          this.setState({
            password: "",
            c_password:"",
          });
        }
        
      }

      render() {
        if(this.state.redirect){
          return <Redirect push to="/allimages"/> 
         }
        return (
          <div>
            <PubNav />

            <form onSubmit={this.onSubmit}>
              <h3>Register</h3>
              <div className="form-group">
                <label for="username">Username</label>
                <input type="text" placeholder="Username" id="username"
                onChange={e => this.setState({username: e.target.value})} value={this.state.username}/>
              </div>

              <div className="form-group">
                <label for="password">Password</label>
                <input type="password" placeholder="Enter password" id="password"
                onChange={e => this.setState({password: e.target.value})}/>
              </div>

              <div className="form-group">
                      <label for="c_password">Confirm Password</label>
                      <input type="password" placeholder="Re-enter password" 
                      onChange={e => this.setState({c_password: e.target.value})} id="c_password"/>
              </div>

              <button type="submit" className="btn btn-primary btn-block">Register</button>
                
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        )
    }
}

export default Register
