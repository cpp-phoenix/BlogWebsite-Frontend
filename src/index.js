import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import BlogMain from './Components/BlogMain'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
      <div>
        <Route exact path="/" render={(props) => <App {...props}/>} />
        <Route exact path="/mainPage" render={(props) => <BlogMain {...props}/>}/>
        <Route exact path="/mainPage/Home" render={(props) => <BlogMain {...props}/>}/>
        <Route exact path="/mainPage/Explore" render={(props) => <BlogMain {...props}/>}/>
        <Route exact path="/mainPage/Messages" render={(props) => <BlogMain {...props}/>}/>
        <Route exact path="/mainPage/Notifications" render={(props) => <BlogMain {...props}/>}/>
        <Route exact path="/mainPage/Profile" render={(props) => <BlogMain {...props}/>}/>
        <Route exact path="/mainPage/Saved" render={(props) => <BlogMain {...props}/>}/>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
