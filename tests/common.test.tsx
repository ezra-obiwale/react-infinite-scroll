import * as React from 'react';
import { render } from '@testing-library/react';

import 'jest-canvas-mock';

import { InfiniteScroll } from '../src';

describe('Common render', () => {
  const fetchData = async (page: number) => {
    return true;
  };

  it('renders without crashing', () => {
    render(
        <InfiniteScroll id="test" fetchData={fetchData} url="https://api.publicapis.org/entries">
          Test scroll content
        </InfiniteScroll>,
    );
  });
});
