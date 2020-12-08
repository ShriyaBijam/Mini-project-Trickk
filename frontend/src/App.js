import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'

import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

import Encrypt from './components/Encrypt';
import Decrypt from './components/Decrypt';
import Home from './components/Home';
import ImageList from './components/ImageList';
import Login from './components/Login';
import Register from './components/Register';
import { Logout } from './components/Logout';

function App() {
  return (
    <div>
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <PrivateRoute exact path='/encrypt' component={Encrypt} />
          <PrivateRoute exact path='/decrypt' component={Decrypt} />
          <PublicRoute exact path='/' component={Home} />
          <PrivateRoute exact path='/dashboard' component={ImageList} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={Register} />
          <PrivateRoute exact path='/logout' component={Logout} />
          <Redirect to='/'/>
        </Switch>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
