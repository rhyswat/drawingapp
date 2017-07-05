import React, { Component } from 'react';

import Drawing from './Drawing';
import NewDrawingForm from './NewDrawingForm';
import Palette from './Palette';
import PreviousNextButtons from './PreviousNextButtons';

//
// Top-level owner of data model
// --------------------------------------------------------------------
class DrawingApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assets: [
        { name: 'Asset A', id: 1 },
        { name: 'Asset B', id: 2 },
        { name: 'Asset C', id: 3 },
        { name: 'Asset D', id: 4 },
        { name: 'Asset E', id: 5 }],
      drawings: [],
      current: -1 // index into drawings array
    };

    // mandatory function bindings
    this.newDrawing = this.newDrawing.bind(this);
    this.addAssetToDrawing = this.addAssetToDrawing.bind(this);
    this.removeAssetFromDrawing = this.removeAssetFromDrawing.bind(this);
    this.previousDrawing = this.previousDrawing.bind(this);
    this.nextDrawing = this.nextDrawing.bind(this);
  };

  newDrawing(drawingName) {
    var index = this.state.drawings.length;
    var drawing = { name: drawingName, assets: [], index: index, removeAssetFromDrawing: this.removeAssetFromDrawing };
    this.setState(prevState => ({
      drawings: prevState.drawings.concat(drawing),
      current: index
    }))
  };

  // array-slice pattern : https://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-reactjs
  addAssetToDrawing(asset) {
    if (this.state.current >= 0) {
      var copy = this.state.drawings.slice();
      var target = copy[this.state.current];

      var drawingAsset = { name: asset.name, assetId: asset.id, id: target.assets.length };
      target.assets.push(drawingAsset);

      this.setState(prevState => ({ drawings: copy }));
    }
  }

  removeAssetFromDrawing(drawingAssetId) {
    if (this.state.current === -1) {
      return;
    }

    var copy = this.state.drawings.slice();
    var target = copy[this.state.current];
    var newAssets = target.assets.filter((a) => a.id !== drawingAssetId);
    target.assets = newAssets;
    this.setState(prevState => ({ drawings: copy }));
  }

  previousDrawing() {
    if (this.state.current === -1) {
      return;
    }

    var n = this.state.drawings.length;
    var c = this.state.current;
    c = ((c - 1) + n) % n;
    this.setState({ current: c });
  };

  nextDrawing() {
    if (this.state.current === -1) {
      return;
    }

    var c = this.state.current;
    c = (c + 1) % this.state.drawings.length;
    this.setState({ current: c });
  };

  render() {
    var element = null;

    var index = this.state.current;
    if (index >= 0) {
      var drawing = this.state.drawings[index];
      element = <Drawing name={drawing.name} assets={drawing.assets} removeAssetFromDrawing={this.removeAssetFromDrawing} />
    }

    return (
      <div className="App">
        <div>
          <Palette assets={this.state.assets} addAssetToDrawing={this.addAssetToDrawing} />
        </div>
        <div>
          <h3>Drawings</h3>
          <NewDrawingForm newDrawing={this.newDrawing} />
        </div>
        <div>
          {element}
        </div>
        <div className="previous-next">
          <PreviousNextButtons previousDrawing={this.previousDrawing} nextDrawing={this.nextDrawing} />
        </div>
      </div>
    );
  }
}

//
// Exports
// --------------------------------------------------------------------
export default DrawingApp;
