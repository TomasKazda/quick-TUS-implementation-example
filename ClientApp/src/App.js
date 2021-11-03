import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Upload from './components/Upload';
import { Counter } from './components/Counter';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <Route exact path='/' component={Upload} />
            <Route path='/counter' component={Counter} />
            <Route path='/upload' component={Upload} />
        </Layout>
    );
  }
}
