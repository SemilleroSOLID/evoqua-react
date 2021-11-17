import { VersionMetricsGetter } from '@evoqua/types/api';
import {
  Metric,
  Project,
  Version,
  VersionMetrics,
} from '@evoqua/types/models';
import * as React from 'react';
import AsyncSelect from 'react-select/async';

import VersionMetricsPlot from './VersionMetricsPlot';

interface VersionMetricsViewerProps {
  versionMetricsGetter: VersionMetricsGetter;
  projectKey: Project['key'];
  metrics: Metric[];
}

export default function VersionMetricsViewer(
  props : VersionMetricsViewerProps
) {
  const { versionMetricsGetter, projectKey } = props;
  const { setVersion, versionMetrics } = useVersionMetricsViewer(props);
  return (
    <div style={styles.container}>
      <VersionSelect
        getVersions={
          versionMetricsGetter.getVersions.bind(versionMetricsGetter)
        }
        projectKey={projectKey}
        setVersion={setVersion}
      />
      {versionMetrics &&
        <VersionMetricsPlot
          versionMetrics={versionMetrics}
          style={styles.plot}
        />
      }
    </div>
  );
}

function useVersionMetricsViewer(
  { versionMetricsGetter, projectKey, metrics }: VersionMetricsViewerProps
) {
  const [versionMetrics, setVersionMetrics] =
    React.useState<VersionMetrics | undefined>();

  const setVersion = React.useCallback((version: Version) => {
    versionMetricsGetter
      .getVersionMetrics(projectKey, version, metrics)
      .then(setVersionMetrics);
  }, [projectKey]);

  React.useEffect(() => setVersionMetrics(undefined), [projectKey]);

  return { setVersion, versionMetrics };
}

interface VersionSelectProps {
  getVersions: VersionMetricsGetter['getVersions'];
  projectKey: Project['key'];
  setVersion: (version: Version) => void;
}

function VersionSelect(
  { getVersions, projectKey, setVersion } : VersionSelectProps
) {
  /*
   * react-select v5 supposedly supports options of any type (if using
   * getOptionValue and getOptionLabel). However, string options cause a:
   * TypeError: Cannot use 'in' operator to search for 'options' in <option:str>
   * So we map the versions (strings) into regular { value, label } options:
   */
  return (
    <AsyncSelect
      placeholder="Versión"
      loadOptions={
        async () => (await getVersions(projectKey)).map(mapVersionToOption)
      }
      defaultOptions

      // How to force reload of options? · Issue #1581 · JedWatson/react-select
      // https://github.com/JedWatson/react-select/issues/1581#issuecomment-408625770
      key={projectKey}
      // cacheOptions doc is misleading
      // https://github.com/JedWatson/react-select/issues/1581#issuecomment-459728301
      cacheOptions={projectKey}

      onChange={option => option && setVersion(option.value)}
    />
  );
}

function mapVersionToOption(version: Version) {
  return {
    value: version,
    label: version,
  }
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
