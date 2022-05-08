import { ProjectsGetter } from '@evoqua/types/api';
import { Project } from '@evoqua/types/models';
import React from 'react';
import AsyncSelect from 'react-select/async';

interface ProjectSelectProps {
  getProjects: ProjectsGetter['getProjects'];
  setProject: (project: Project) => void;
}

export default function ProjectSelect(
  { getProjects, setProject } : ProjectSelectProps
) {
  return (
    <AsyncSelect
      placeholder="Proyecto"
      loadOptions={getProjects}
      defaultOptions
      cacheOptions
      getOptionValue={project => project.key}
      getOptionLabel={project => project.name}
      onChange={project => project && setProject(project)}
    />
  );
}
