import 'jsdom-global/register';
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';

it('renders without crashing', () => {
  shallow(<App />);
});

it('mounts without crashing', () => {
  let wrapper = mount(<App />);
});