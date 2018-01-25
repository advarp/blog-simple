import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostShow from './components/post_show';

import reducers from './reducers';
import Header from './components/header';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <div>
        <Header />

        <div className="container mt-5">
          <Switch>
              <Route path='/posts/new' component={PostsNew} />
              <Route path='/posts/:id' component={PostShow} />
              <Route path='/' component={PostsIndex} />
          </Switch>
        </div>
        
      </div>
    </Router>
  </Provider>
  , document.querySelector('.app'));
 