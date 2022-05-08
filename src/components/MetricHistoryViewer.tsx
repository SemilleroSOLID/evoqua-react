import { MetricHistoryGetter } from '@evoqua/types/api';
import { Metric, MetricHistory, Project } from '@evoqua/types/models';
import React from 'react';

import { Styles } from '../types';
import MetricHistoryPlot from './MetricHistoryPlot';
import MetricSelect from './MetricSelect';

interface MetricHistoryViewerProps {
  metricHistoryGetter: MetricHistoryGetter;
  projectKey: Project['key'];
  style?: React.CSSProperties;
}

export default function MetricHistoryViewer(props: MetricHistoryViewerProps) {
  const { metricHistoryGetter, projectKey, style } = props;
  const { setMetric, metricHistory } = useMetricHistoryViewer(props);
  return (
    <div style={{ ...styles.container, ...style }}>
      <MetricSelect
        getMetrics={metricHistoryGetter.getMetrics.bind(metricHistoryGetter)}
        projectKey={projectKey}
        setMetric={setMetric}
      />
      {metricHistory &&
        <MetricHistoryPlot metricHistory={metricHistory} style={styles.plot} />
      }
    </div>
  );
}

function useMetricHistoryViewer(
  { metricHistoryGetter, projectKey }: MetricHistoryViewerProps
) {
  const [metricHistory, setMetricHistory] = React.useState<MetricHistory>();

  const setMetric = React.useCallback((metric: Metric) => {
    metricHistoryGetter
      .getMetricHistory(projectKey, metric)
      .then(setMetricHistory);
  }, [metricHistoryGetter, projectKey]);

  React.useEffect(() => setMetricHistory(undefined), [projectKey]);
  
  return { setMetric, metricHistory };
}

const styles: Styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  plot: {
    flex: 'auto',
  },
};
