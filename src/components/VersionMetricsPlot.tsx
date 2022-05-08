import { VersionMetrics } from '@evoqua/types/models';
import React from 'react';
import Plot from 'react-plotly.js';

interface VersionMetricsPlotProps {
  versionMetrics: VersionMetrics;
  style?: React.CSSProperties;
}

export default React.memo(function VersionMetricsPlot(
  { versionMetrics, style } : VersionMetricsPlotProps
) {
  const { version, metrics, values } = versionMetrics;
  return (
    <Plot
      data={[{
        type: 'scatterpolar', // radar chart
        fill: 'toself',
        theta: metrics,
        r: values,
      }]}
      layout={{
        title: `Métricas en la versión ${version}`,
      }}
      config={{
        locale: 'es',
        responsive: true,
      }}
      style={style}
    />
  );
});
