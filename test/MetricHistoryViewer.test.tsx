import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MetricHistoryViewer } from '../src';
import MetricHistoryApiMock from './MetricHistoryApiMock';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    // https://reactjs.org/link/wrap-tests-with-act
    act(() => {
      ReactDOM.render(
        <MetricHistoryViewer metricHistoryApi={new MetricHistoryApiMock()} />,
        div);
    });
    act(() => {
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
