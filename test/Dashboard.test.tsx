import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import { Dashboard } from '../src';
import {
  ProjectsGetterMock,
  MetricHistoryGetterMock,
  VersionMetricsGetterMock,
} from './apiMocks';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    // https://reactjs.org/link/wrap-tests-with-act
    act(() => {
      ReactDOM.render(
        <Dashboard
          projectsGetter={new ProjectsGetterMock()}
          metricHistoryGetter={new MetricHistoryGetterMock()}
          versionMetricsGetter={new VersionMetricsGetterMock()}
        />,
        div);
    });
    act(() => { ReactDOM.unmountComponentAtNode(div); });
  });
});
