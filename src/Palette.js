import React from 'react';

//
// Palette of assets
// --------------------------------------------------------------------
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

//
// Exports
// --------------------------------------------------------------------
export default Palette;
