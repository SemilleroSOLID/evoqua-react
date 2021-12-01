import { MetricHistoryGetter } from '@evoqua/types/api';
import { Metric, Project } from '@evoqua/types/models';

export default class MetricHistoryGetterMock implements MetricHistoryGetter {
  getMetricHistory(_projectKey: Project['key'], _metric: Metric) {

    switch (_metric.key) {
      case 'code_smells':

        return Promise.resolve({
          metric: 'Code Smells',
          versions: ['0.1.0', '1.0.0', '1.1.0', '1.1.1', '1.2.0'],
          values: [50, 300, 150, 180, 200],
        });
      case 'sqale_rating':

        return Promise.resolve({
          metric: 'Maintainability Rating',
          versions: ['0.1.0', '1.0.0', '1.1.0', '1.1.1', '1.2.0'],
          values: [40, 80, 20, 50, 50],
        });
      case 'sqale_index':

        return Promise.resolve({
          metric: 'Technical Debt',
          versions: ['0.1.0', '1.0.0', '1.1.0', '1.1.1', '1.2.0'],
          values: [7, 9, 15, 20, 30],
        });
      case 'locs':

        return Promise.resolve({
          metric: 'LOCs',
          versions: ['0.1.0', '1.0.0', '1.1.0', '1.1.1', '1.2.0'],
          values: [400, 800, 200, 350, 450],
        });

      default:
        return Promise.resolve({
          metric: 'LOCs',
          versions: ['0.1.0', '1.0.0', '1.1.0', '1.1.1', '1.2.0'],
          values: [400, 800, 200, 350, 450],
        });
    }


  };

  getMetrics(_projectKey: Project['key']) {
    return Promise.resolve([
      { key: 'code_smells', name: 'Code Smells' },
      { key: 'sqale_index', name: 'Technical Debt' },
      { key: 'sqale_rating', name: 'Maintainability Rating' },
      { key: 'locs', name: 'Lines of code' }
    ]);
  };
}
