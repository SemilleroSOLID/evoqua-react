import { MetricHistoryApi } from '@evoqua/types/api';
import { MetricHistory } from '@evoqua/types/models';
import * as React from 'react';
import AsyncSelect from 'react-select/async';

import MetricHistoryPlot from './MetricHistoryPlot';

interface ProjectIdSelectProps {
  getProjectsIds: MetricHistoryApi['getProjectIds'];
  setProjectId: (projectId: string) => void;
}

const projectIdToOption = (projectId: string) => ({
  value: projectId,
  label: projectId,
});

function ProjectIdSelect(
  { getProjectsIds: getProjectIds, setProjectId } : ProjectIdSelectProps
) {
  /*
   * react-select v5 supposedly supports options of any type (if using
   * getOptionValue and getOptionLabel). However, string options cause a:
   * TypeError: Cannot use 'in' operator to search for 'options' in <option:str>
   * So we map the project IDs (strings) into regular { value, label } options:
   */
  return (
    <AsyncSelect
      placeholder="ID del proyecto"
      loadOptions={async () => (await getProjectIds()).map(projectIdToOption)}
      defaultOptions
      cacheOptions
      onChange={option => option && setProjectId(option.value)}
    />
  );
}

interface MetricSelectProps {
  getMetrics: MetricHistoryApi['getMetrics'];
  projectId: string | undefined;
  setMetricKey: (metricKey: string) => void;
}

function MetricSelect(
  { getMetrics, projectId, setMetricKey } : MetricSelectProps
) {
  return (
    <AsyncSelect
      placeholder="Métrica"
      loadOptions={async () => projectId ? await getMetrics(projectId) : []}
      defaultOptions
      // How to force reload of options? · Issue #1581 · JedWatson/react-select
      // https://github.com/JedWatson/react-select/issues/1581#issuecomment-408625770
      // cacheOptions doc is misleading (https://github.com/JedWatson/react-select/issues/1581#issuecomment-459728301)
      key={projectId}
      cacheOptions={projectId}
      getOptionValue={metric => metric.key}
      getOptionLabel={metric => metric.label}
      onChange={metric => metric && setMetricKey(metric.key)}
    />
  );
}

interface MetricHistoryViewerProps {
  metricHistoryApi: MetricHistoryApi;
  projectId?: string;
}

function useMetricHistoryApi(
  { metricHistoryApi, projectId: projectIdProp } : MetricHistoryViewerProps
) {
  const [projectId, _setProjectId] = React.useState(projectIdProp);
  const [metricKey, setMetricKey] = React.useState<string | undefined>();

  const setProjectId = (projectId: string) => {
    _setProjectId(projectId);
    setMetricKey(undefined);
  };

  const [metricHistory, setMetricHistory] =
    React.useState<MetricHistory | undefined>();

  React.useEffect(() => {
    if (projectId && metricKey) {
      metricHistoryApi.getMetricHistory(projectId, metricKey)
                      .then(setMetricHistory);
    } else {
      setMetricHistory(undefined);
    }
  }, [projectId, metricKey]);

  return { projectId, setProjectId, setMetricKey, metricHistory };
}

export default function MetricHistoryViewer(
  { metricHistoryApi, projectId: projectIdProp } : MetricHistoryViewerProps
) {
  const { projectId, setProjectId, setMetricKey, metricHistory } =
    useMetricHistoryApi({ metricHistoryApi, projectId: projectIdProp });
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {projectIdProp
          ? <div></div>
          : <ProjectIdSelect
              getProjectsIds={
                metricHistoryApi.getProjectIds.bind(metricHistoryApi)
              }
              setProjectId={setProjectId}
            />
        }
        <MetricSelect
          getMetrics={metricHistoryApi.getMetrics.bind(metricHistoryApi)}
          projectId={projectId}
          setMetricKey={setMetricKey}
        />
      </div>
      {metricHistory && <MetricHistoryPlot metricHistory={metricHistory} />}
    </div>
  );
}
