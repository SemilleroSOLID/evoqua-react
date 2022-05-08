import { MetricHistoryGetter, VersionMetricsGetter } from '@evoqua/types/api';
import { Project, Version } from '@evoqua/types/models';
import React from 'react';

import { Styles } from '../types';
import DashboardTitle from './DashboardTitle';
import KiviatTubePlot from './KiviatTubePlot';
import MetricHistoryViewer from './MetricHistoryViewer';
import VersionSlider from './VersionSlider';

interface LeftPaneProps {
  project: Project;
  versionMetricsGetter: VersionMetricsGetter;
  version: Version | undefined;
  setVersion: (version: Version) => void;
  metricHistoryGetter: MetricHistoryGetter;
}

export default function LeftPane(
  {
    project,
    versionMetricsGetter,
    version,
    setVersion,
    metricHistoryGetter,
  }: LeftPaneProps
) {
  return (
    <div style={styles.pane}>
      <DashboardTitle projectName={project.name} />
      <VersionSlider
        versionMetricsGetter={versionMetricsGetter}
        projectKey={project.key}
        version={version}
        setVersion={setVersion}
      />
      <KiviatTubePlot style={styles.kiviatTubePlot} />
      <MetricHistoryViewer
        metricHistoryGetter={metricHistoryGetter}
        projectKey={project.key}
        style={styles.metricHistoryViewer}
      />
    </div>
  );
}

const styles: Styles = {
  pane: {
    display: 'flex',
    flexDirection: 'column',
  },
  kiviatTubePlot: {
    flex: 'auto',
  },
  metricHistoryViewer: {
    flex: 'auto',
  },
};
