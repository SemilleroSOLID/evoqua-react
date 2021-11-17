import { ProjectsGetter } from '@evoqua/types/api';

export default class ProjectsGetterMock implements ProjectsGetter {
  getProjects() {
    return Promise.resolve([
      { key: 'project1', name: 'Project 1' },
      { key: 'project2', name: 'Project 2' },
      { key: 'project3', name: 'Project 3' },
    ]);
  };
}
