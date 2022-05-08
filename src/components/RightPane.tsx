import { VersionMetricsGetter } from '@evoqua/types/api';
import {
  Metric,
  Project,
  Version,
  VersionMetrics,
} from '@evoqua/types/models';
import React from 'react';

import { Styles } from '../types';
import RelatedContent from './RelatedContent';
import VersionMetricsPlot from './VersionMetricsPlot';

interface RightPaneProps {
  versionMetricsGetter: VersionMetricsGetter;
  projectKey: Project['key'];
  version: Version;
  metrics: Metric[];
}

export default function RightPane(props: RightPaneProps) {
  const { versionMetrics } = useRightPane(props);
  return (
    <div style={styles.pane}>
      {!versionMetrics
        ? <div>Cargando métricas de la versión...</div>
        : <VersionMetricsPlot
            versionMetrics={versionMetrics}
            style={styles.versionMetricsPlot}
          />
      }
      <RelatedContent style={styles.relatedContent} />
  </div>
  );
}

function useRightPane(
  { versionMetricsGetter, projectKey, version, metrics }: RightPaneProps
) {
  const [versionMetrics, setVersionMetrics] = React.useState<VersionMetrics>();

  React.useEffect(() => setVersionMetrics(undefined), [projectKey]);
  React.useEffect(() => {
    versionMetricsGetter
      .getVersionMetrics(projectKey, version, metrics)
      .then(setVersionMetrics);
  }, [versionMetricsGetter, projectKey, version, metrics]);

  return { versionMetrics };
}

const styles: Styles = {
  pane: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1px',
  },
  versionMetricsPlot: {
    flex: 2,
  },
  relatedContent: {
    flex: 1,
  },
};
