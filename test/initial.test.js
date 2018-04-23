import React from 'react';
import { shallow } from 'enzyme';

const MyComponent = () => {
  return <div>Hello</div>;
}

test('does stuff', () => {
  const wrapper = shallow(<MyComponent />)
  expect(wrapper.find('div').text()).toBe("Hello");
});
