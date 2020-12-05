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
              <fieldset>
                <legend>Register</legend>
                <p>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text" id="username"
                    onChange={e => this.setState({username: e.target.value})} />
                </p>
                <p>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password" id="password" value={this.state.password}
                    onChange={e => this.setState({password: e.target.value})} />
                </p>
                <p>
                  <label htmlFor="password">Confirm Password</label>
                  <input
                    type="password" id="c_password" value={this.state.c_password}
                    onChange={e => this.setState({c_password: e.target.value})} />
                </p>
                <p>
                  <button type="submit">Register</button>
                </p>
      
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </fieldset>
          </form>
          </div>

        )
    }
}

export default Register
