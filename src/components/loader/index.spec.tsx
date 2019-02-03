import * as React from 'react';
import { create } from 'react-test-renderer';
import Loader from '.';

it('renders correctly', () => {
    const tree = create(<Loader />).toJSON();

    expect(tree).toMatchSnapshot();
});
