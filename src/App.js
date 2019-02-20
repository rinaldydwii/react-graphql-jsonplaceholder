import React, { Fragment } from 'react';
import Router from './routes';
import { Navbar, Footer } from './components';

const App = () => (
  <Fragment>
    <Navbar />
    <Router />
    <Footer />
  </Fragment>
)

export default App;
