import { MetricHistory } from '@evoqua/types/models';
import * as React from 'react';
import Plot from 'react-plotly.js';

interface MetricHistoryPlotProps {
  metricHistory: MetricHistory;
  style?: React.CSSProperties;
}

export default function MetricHistoryPlot(
  { metricHistory, style } : MetricHistoryPlotProps
) {
  const { metric, versions, values } = metricHistory;
  return (
    <Plot
      data={[{
        fill: 'tozeroy', // area chart
        x: versions,
        y: values,
      }]}
      layout={{
        title: `${metric} por versión`,
        xaxis: {
          title: { text: 'Versión' },
        },
        yaxis: { title: { text: metric } },
      }}
      config={{
        locale: 'es',
        responsive: true,
      }}
      style={style}
    />
  );
}
