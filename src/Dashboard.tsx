import {
  MetricHistoryGetter,
  ProjectsGetter,
  VersionMetricsGetter,
} from '@evoqua/types/api';
import { Metric, Project } from '@evoqua/types/models';
import * as React from 'react';
import AsyncSelect from 'react-select/async';

import MetricHistoryViewer from './MetricHistoryViewer';
import VersionMetricsViewer from './VersionMetricsViewer';

export interface DashboardProps {
  projectsGetter: ProjectsGetter;
  metricHistoryGetter: MetricHistoryGetter;
  versionMetricsGetter: VersionMetricsGetter;
  projectKey?: Project['key'];
  style?: React.CSSProperties;
}

export default function Dashboard(props : DashboardProps) {
  const {
    projectsGetter,
    metricHistoryGetter,
    versionMetricsGetter,
    projectKey: projectKeyProp,
    style,
  } = props;
  const { projectKey, setProjectKey, metrics } = useDashboard(props);
  return (
    <div style={{ ...styles.container, ...style }}>
      {projectKeyProp
        ? null
        : <ProjectSelect
            getProjects={projectsGetter.getProjects.bind(projectsGetter)}
            setProjectKey={setProjectKey}
          />
      }
      {projectKey && metrics &&
        <div style={styles.twoColLayout}>
          <MetricHistoryViewer
            metricHistoryGetter={metricHistoryGetter}
            projectKey={projectKey}
          />
          <VersionMetricsViewer
            versionMetricsGetter={versionMetricsGetter}
            projectKey={projectKey}
            metrics={metrics}
          />
        </div>
      }
    </div>
  );
}

function useDashboard(
  { projectKey: projectKeyProp, metricHistoryGetter }: DashboardProps
) {
  const [projectKeyState, setProjectKey] =
    React.useState<Project['key'] | undefined>();
  const projectKey = projectKeyProp ?? projectKeyState;

  const [metrics, setMetrics] = React.useState<Metric[] | undefined>();
  // TODO: the metrics should be set by a prop or by an input, not like this:
  React.useEffect(() => {
    if (projectKey) {
      metricHistoryGetter
        .getMetrics(projectKey)
        .then(metrics => setMetrics(metrics.slice(0, 5)));
    }
  }, [projectKey]);

  return { projectKey, setProjectKey, metrics };
}

interface ProjectSelectProps {
  getProjects: ProjectsGetter['getProjects'];
  setProjectKey: (projectKey: Project['key']) => void;
}

function ProjectSelect({ getProjects, setProjectKey } : ProjectSelectProps) {
  return (
    <AsyncSelect
      placeholder="Proyecto"
      loadOptions={getProjects}
      defaultOptions
      cacheOptions
      getOptionValue={project => project.key}
      getOptionLabel={project => project.name}
      onChange={project => project && setProjectKey(project.key)}
    />
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: 'calc(100vh - 16px)', // 16px: <body>'s 8px top and bottom padding
    display: 'flex',
    flexDirection: 'column',
  },
  twoColLayout: {
    display: 'grid',
    gridTemplateColumns: '65fr 35fr',
    flexGrow: 1,
  },
}
