import React, { Component } from 'react';

//
// Drawings
// --------------------------------------------------------------------

class Drawing extends React.Component {

  constructor(props) {
    super(props);
  };

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


//
// Exports
// --------------------------------------------------------------------
export default Drawing;
