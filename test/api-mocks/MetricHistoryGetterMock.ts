import { MetricHistoryGetter } from '@evoqua/types/api';
import { Metric, Project } from '@evoqua/types/models';

export default class MetricHistoryGetterMock implements MetricHistoryGetter {
  getMetricHistory(_projectKey: Project['key'], _metric: Metric) {
    return Promise.resolve({
      metric:   'LOCs',
      versions: ['0.1.0', '1.0.0', '1.1.0', '1.1.1', '1.2.0'],
      values:   [    400,     800,     200,     350,     450],
    });
  }

  getMetrics(_projectKey: Project['key']) {
    return Promise.resolve([
      { key:  'code_smells', name:            'Code Smells' },
      { key:  'sqale_index', name:         'Technical Debt' },
      { key: 'sqale_rating', name: 'Maintainability Rating' },
    ]);
  }
}
