import { MetricHistoryGetter } from '@evoqua/types/api';
import { Metric, MetricHistory, Project } from '@evoqua/types/models';
import * as React from 'react';
import { MultiValue } from 'react-select';
import AsyncSelect from 'react-select/async';

import GridMetricsHistoryPlots from './GridMetricsHistoryPlots';
//import MetricHistoryPlot from './MetricHistoryPlot';

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
        <GridMetricsHistoryPlots metricsHistory={metricHistory} />
        
      }
    </div>
  );
}

function useMetricHistoryViewer(
  { metricHistoryGetter, projectKey }: MetricHistoryViewerProps
) {
  const [metricHistory, setMetricHistory] =
    React.useState<MetricHistory[]>();

  const setMetric = React.useCallback((metric: MultiValue<Metric>) => {

    let metricHistoryaux: MetricHistory[] = [];

    const funt = async () => {
      for (let index = 0; index < metric.length; index++) {
        metricHistoryGetter
          .getMetricHistory(projectKey, metric[index])
          .then(metricHistoryNew => {
            metricHistoryaux.push(metricHistoryNew);
          });
      }

    }

    funt().then(() => {
      //console.log(metricHistoryaux);

      setMetricHistory(metricHistoryaux)
    })



  }, [projectKey]);

  React.useEffect(() => setMetricHistory(undefined), [projectKey]);

  return { setMetric, metricHistory };
}


interface MetricSelectProps {
  getMetrics: MetricHistoryGetter['getMetrics'];
  projectKey: Project['key'];
  setMetric: (metric: MultiValue<Metric>) => void;
}

function MetricSelect(
  { getMetrics, projectKey, setMetric }: MetricSelectProps
) {
  return (
    <AsyncSelect
      placeholder="Métrica"
      isMulti
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
