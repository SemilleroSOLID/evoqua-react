import { MetricHistoryGetter } from '@evoqua/types/api';
import { Metric, MetricHistory, Project } from '@evoqua/types/models';
import * as React from 'react';
import AsyncSelect from 'react-select/async';

import MetricHistoryPlot from './MetricHistoryPlot';

interface MetricHistoryViewerProps {
  metricHistoryGetter: MetricHistoryGetter;
  projectKey: Project['key'];
}

export default function MetricHistoryViewer(props: MetricHistoryViewerProps) {
  const { metricHistoryGetter, projectKey } = props;
  const { setMetric, metricHistory } = useMetricHistoryViewer(props);
  return (
    <div style={styles.container}>
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
  const [metricHistory, setMetricHistory] =
    React.useState<MetricHistory | undefined>();

  const setMetric = React.useCallback((metric: Metric) => {
    metricHistoryGetter
      .getMetricHistory(projectKey, metric)
      .then(setMetricHistory);
  }, [projectKey]);

  React.useEffect(() => setMetricHistory(undefined), [projectKey]);

  return { setMetric, metricHistory };
}

interface MetricSelectProps {
  getMetrics: MetricHistoryGetter['getMetrics'];
  projectKey: Project['key'];
  setMetric: (metric: Metric) => void;
}

function MetricSelect(
  { getMetrics, projectKey, setMetric } : MetricSelectProps
) {
  return (
    <AsyncSelect
      placeholder="Métrica"
      loadOptions={getMetrics}
      defaultOptions

      // How to force reload of options? · Issue #1581 · JedWatson/react-select
      // https://github.com/JedWatson/react-select/issues/1581#issuecomment-408625770
      key={projectKey}
      // cacheOptions doc is misleading
      // https://github.com/JedWatson/react-select/issues/1581#issuecomment-459728301
      cacheOptions={projectKey}

      getOptionValue={metric => metric.key}
      getOptionLabel={metric => metric.name}
      onChange={metric => metric && setMetric(metric)}
    />
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  plot: {
    flexGrow: 1,
  },
}
