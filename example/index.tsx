import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Dashboard } from '../.';
import {
  MetricHistoryGetterMock,
  ProjectsGetterMock,
  VersionMetricsGetterMock,
} from '../test/apiMocks';

ReactDOM.render(
  <Dashboard
    projectsGetter={new ProjectsGetterMock()}
    metricHistoryGetter={new MetricHistoryGetterMock()}
    versionMetricsGetter={new VersionMetricsGetterMock()}
  />,
  document.getElementById('root'));
