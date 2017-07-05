import React, { Component } from 'react';

//
// Previous / next drawing controls
// --------------------------------------------------------------------
class PreviousNextButtons extends React.Component {

  render() {
    return (
      <div>
        <button type="button" onClick={() => this.props.previousDrawing()}>Previous drawing</button>
        <button type="button" onClick={() => this.props.nextDrawing()}>Next drawing</button>
      </div>
    )
  }
}

//
// Exports
// --------------------------------------------------------------------
export default PreviousNextButtons;
