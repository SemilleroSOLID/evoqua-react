import { VersionMetricsGetter } from '@evoqua/types/api';
import { Metric, Project, Version } from '@evoqua/types/models';

export default class VersionMetricsGetterMock implements VersionMetricsGetter {
  getVersionMetrics(
    _projectKey: Project['key'], _version: Version, _metrics: Metric[]
  ) {
    return Promise.resolve({
      version: '2021-05-07T09:42:24-0500',
      metrics: [
        'Added technical debt',
        'Code Smells',
        'Effort to Reach Maintainability Rating A',
        'Maintainability Rating',
        'Maintainability Rating on New Code',
      ],
      values: [
        14,
        53,
        21,
        42,
        24,
      ],
    });
  };

  getVersions(_projectKey: Project['key']) {
    return Promise.resolve([
      '2021-05-07T09:42:24-0500',
      '2021-05-08T09:42:24-0500',
      '2021-05-09T09:42:24-0500',
      '2021-05-10T09:42:24-0500',
      '2021-05-11T09:42:24-0500',
    ]);
  };
}
