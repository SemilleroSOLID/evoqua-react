import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MetricHistoryViewer } from '../.';
import MetricHistoryApiMock from '../test/MetricHistoryApiMock';

ReactDOM.render(
  <MetricHistoryViewer metricHistoryApi={new MetricHistoryApiMock()} />,
  document.getElementById('root'));
