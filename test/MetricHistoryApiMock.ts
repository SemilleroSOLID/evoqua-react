import { MetricHistoryApi } from '@evoqua/types/api';

export default class MetricHistoryApiMock implements MetricHistoryApi {
  getMetricHistory(_projectId: string, _metricKey: string) {
    return Promise.resolve({
      name: 'LOCs',
      versions: ['0.1.0', '1.0.0', '1.1.0', '1.1.1', '1.2.0'],
      values: [400, 800, 200, 350, 450],
    });
  };

  getMetrics(_projectId: string) {
    return Promise.resolve([
      { key: 'locs', label: 'LOCs' },
      { key: 'ccomplexity', label: 'Cyclomatic complexity' },
      { key: 'cbo', label: 'Coupling between objects' },
    ]);
  };

  getProjectIds() {
    return Promise.resolve(['project1', 'project2', 'project3']);
  };
}
