import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'
import Encrypt from './components/Encrypt';
import Decrypt from './components/Decrypt';
import Home from './components/Home';
import ImageList from './components/ImageList';
import Navigation from './components/Navigation';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Navigation />
      <div className='App'>
        <Switch>
          <Route exact path='/encrypt' component={Encrypt} />
          <Route exact path='/decrypt' component={Decrypt} />
          <Route exact path='/' component={Home} />
          <Route exact path='/allimages' component={ImageList} />
          <Redirect to='/'/>
        </Switch>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
