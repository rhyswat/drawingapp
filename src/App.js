import React, { Component } from 'react';

import './drawing.css';

import DrawingApp from './DrawingApp';

//
// Root component
// --------------------------------------------------------------------
class App extends Component {
  render() {
    return (
      <DrawingApp />
    )
  }
};

//
// Exports
// --------------------------------------------------------------------
export default App;
