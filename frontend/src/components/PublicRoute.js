import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { isLogin } from './LoginFunc';

class PrivateRoute extends Component {
  state = {
    haveAcces: false,
    loaded: false,
  }

  componentDidMount() {
    this.checkAcces();
  }

  checkAcces = () => {
    let { haveAcces } = this.state;

    isLogin().then((logIn) => {

        haveAcces = logIn
        console.log("Logged In",haveAcces);
        this.setState({ haveAcces,
            loaded: true,
         })
      })
  }
  render() {
    const { component: Component, ...rest } = this.props;
    const { loaded, haveAcces } = this.state;
    if (!loaded) return null;
    return (
      <Route
        {...rest}
        render={props => {
          return haveAcces ? (
            <Redirect to={{pathname: '/allimages',}}/>
          ) : (
            <Component {...props} />
          );
        }}
      />
    );
  }
}

export default withRouter(PrivateRoute);