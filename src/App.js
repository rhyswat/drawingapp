import React, { Component } from 'react';
//import logo from './logo.svg';
// import './App.css';
import './drawing.css';

import util from 'util';

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
// New Drawing form
// --------------------------------------------------------------------
class NewDrawingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.newDrawing(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          New drawing:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

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
// Palette of assets
// --------------------------------------------------------------------
class PaletteAsset extends React.Component {

  constructor(props) {
    super(props);
    this.addAssetToDrawing = this.addAssetToDrawing.bind(this);
  }

  addAssetToDrawing() {
    this.props.addAssetToDrawing({ name: this.props.name, id: this.props.id });
  }

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td><button title="Add asset to the current drawing" onClick={() => this.addAssetToDrawing()}>&#43;</button></td>
        </tr>
    )
  }
}

class Palette extends React.Component {

  render() {
    var assetItems = this.props.assets.map((a) => {
      return <PaletteAsset key={a.id} id={a.id} name={a.name}
        addAssetToDrawing={this.props.addAssetToDrawing} />
    });
    return (
      <div>
        <h3>Asset palette</h3>
        <table>
          <tbody>
            {assetItems}
          </tbody>
        </table>
      </div>
    )
  }
}

//
// Drawings
// --------------------------------------------------------------------
class DrawingAsset extends React.Component {
  constructor(props) {
    super(props);
    this.removeAssetFromDrawing = this.removeAssetFromDrawing.bind(this);
  }

  removeAssetFromDrawing() {
    this.props.removeAssetFromDrawing(this.props.id);
  }

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td><button title="Remove from drawing" onClick={() => this.removeAssetFromDrawing()}>&#45;</button></td>
      </tr>
    )
  }
}

class Drawing extends React.Component {
  render() {
    var assetItems = this.props.assets.map((a) => {
      return <DrawingAsset key={a.id} // for listing
        id={a.id} // unique for each drawing asset in this drawing
        name={a.name} // asset name
        removeAssetFromDrawing={this.props.removeAssetFromDrawing} />
    });

    return (
      <div>
        <h4>Drawing {this.props.name}</h4>
        <table>
          <tbody>
            {assetItems}
          </tbody>
        </table>
      </div>
    )
  }
}

//
// Exports
// --------------------------------------------------------------------
export default App;
