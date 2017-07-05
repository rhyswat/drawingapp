import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';

import { expect } from 'chai';

import Drawing from '../Drawing';

it('renders without crashing', () => {
  const props = { assets: [] };
  shallow(<Drawing {...props} />);
});

it('mounts without crashing', () => {
  const props = { assets: [] };
  let wrapper = mount(<Drawing {...props} />);
});

it('mounts with a name', () => {
  const props = { name: 'drawing 1', assets: [] };
  let wrapper = mount(<Drawing {...props} />)

  const title = wrapper.find('h4');
  expect(title.text()).to.equal('Drawing drawing 1');
});

it('mounts with assets', () => {
  const props = {
    name: 'drawing 1',
    assets: [
      { id: 1, name: 'asset-1' },
      { id: 2, name: 'asset-2' }]
  };

  // when
  let wrapper = mount(<Drawing {...props} />);

  // then
  const title = wrapper.find('h4');
  expect(title.text()).to.equal('Drawing drawing 1');

  const assets = wrapper.find('DrawingAsset');
  expect(assets.length).to.equal(2);
});

it('clicks work', () => {
  let clickCount = 0;
  let receivedId = null;
  let target = function (id) {
    receivedId = id;
    clickCount += 1;
  };

  const props = {
    name: 'drawing 1',
    assets: [{ id: 100, name: 'asset-1' }],
    removeAssetFromDrawing : target
  };

  // when
  let wrapper = mount(<Drawing {...props} />);

  // then
  const assets = wrapper.find('DrawingAsset');
  expect(assets.length).to.equal(1);

  const button = assets.find('button');
  button.simulate('click');
  expect(clickCount).to.equal(1);
  expect(receivedId).to.equal(100);

});