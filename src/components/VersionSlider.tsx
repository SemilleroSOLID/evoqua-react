import { VersionMetricsGetter } from '@evoqua/types/api';
import { Project, Version } from '@evoqua/types/models';
import React from 'react';

import { Styles } from '../types';

interface VersionSliderProps {
  versionMetricsGetter: VersionMetricsGetter;
  projectKey: Project['key'];
  version: Version | undefined;
  setVersion: (version: Version) => void;
}

export default function VersionSlider(
  { versionMetricsGetter, projectKey, version, setVersion }: VersionSliderProps
) {
  const [versions, setVersions] = React.useState<Version[]>();
  React.useEffect(() => {
    versionMetricsGetter
      .getVersions(projectKey)
      .then(versions => {
        setVersions(versions);
        if (versions[0] != null) setVersion(versions[0]);
      });
  }, [versionMetricsGetter, projectKey, setVersion]);
  return !versions
    ? <div>Cargando versiones...</div>
    : <div>
        <input
          type="range"
          list="versions"
          max={versions.length - 1}
          value={version ? versions.indexOf(version) : 0}
          onInput={({ currentTarget: { valueAsNumber } }) =>
            setVersion(versions[valueAsNumber])
          }
          style={styles.slider}
        />
        <datalist id="versions" style={styles.hashMarks}>
          {versions.map((version, index) =>
            <span key={version} style={styles.hashMarkContainer}>
              <option value={index} style={styles.hashMark}>
                {version}
              </option>
            </span>
          )}
        </datalist>
      </div>;
}

const styles: Styles = {
  slider: {
    display: 'block',
    width: '100%',
  },
  hashMarks: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  hashMarkContainer: {
    width: 0,
  },
  hashMark: {
    width: 'fit-content',
    transform: 'translateX(-50%)',
  },
};
