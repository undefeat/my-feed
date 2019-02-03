import * as React from 'react';
import { create } from 'react-test-renderer';
import Post from '.';

it('renders correctly', () => {
    const tree = create(<Post id={1} author="Tester" title="I am title" body="I am body" />).toJSON();

    expect(tree).toMatchSnapshot();
});
