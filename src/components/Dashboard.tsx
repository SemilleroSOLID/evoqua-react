import {
  MetricHistoryGetter,
  ProjectsGetter,
  VersionMetricsGetter,
} from '@evoqua/types/api';
import { Metric, Project, Version } from '@evoqua/types/models';
import React from 'react';

import { Styles } from '../types';
import LeftPane from './LeftPane';
import ProjectSelect from './ProjectSelect';
import RightPane from './RightPane';

interface DashboardProps {
  project?: Project;
  /**
   * TODO: extract the project selection responsibility from this component. It
   * should receive just the selected project.
   */
  projectsGetter: ProjectsGetter;
  metricHistoryGetter: MetricHistoryGetter;
  versionMetricsGetter: VersionMetricsGetter;
  style?: React.CSSProperties;
}

export default function Dashboard(props: DashboardProps) {
  const {
    project: projectProp,
    projectsGetter,
    metricHistoryGetter,
    versionMetricsGetter,
    style,
  } = props;
  const { project, setProject, version, setVersion, metrics } =
    useDashboard(props);
  return (
    <div style={{ ...styles.container, ...style }}>
      {projectProp
        ? null
        : <ProjectSelect
            getProjects={projectsGetter.getProjects.bind(projectsGetter)}
            setProject={setProject}
          />
      }
      {project &&
        <div style={styles.twoColLayout}>
          <LeftPane
            project={project}
            versionMetricsGetter={versionMetricsGetter}
            version={version}
            setVersion={setVersion}
            metricHistoryGetter={metricHistoryGetter}
          />
          {version && metrics &&
            <RightPane
              versionMetricsGetter={versionMetricsGetter}
              projectKey={project.key}
              version={version}
              metrics={metrics}
            />
          }
        </div>
      }
    </div>
  );
}

function useDashboard(
  { project: projectProp, metricHistoryGetter }: DashboardProps
) {
  const [projectState, setProject] = React.useState<Project>();
  const project = projectProp ?? projectState;
  const [version, setVersion] = React.useState<Version>();
  const [metrics, setMetrics] = React.useState<Metric[]>();
  // TODO: the metrics should be set by a prop or by an input, not like this:
  React.useEffect(() => {
    if (project) {
      metricHistoryGetter
        .getMetrics(project.key)
        .then(metrics => setMetrics(metrics.slice(0, 5)));
    }
  }, [project, metricHistoryGetter]);
  return { project, setProject, version, setVersion, metrics };
}

const styles: Styles = {
  container: {
    height: 'calc(100vh - 16px)', // 16px: <body>'s 8px top and bottom padding
    display: 'flex',
    flexDirection: 'column',
  },
  twoColLayout: {
    display: 'grid',
    gridTemplateColumns: '65fr 35fr',
    flex: 'auto',
  },
};
