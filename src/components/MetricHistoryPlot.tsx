import { MetricHistory } from '@evoqua/types/models';
import * as React from 'react';
import Plot from 'react-plotly.js';

export default function MetricHistoryPlot(
  { metricHistory } : { metricHistory: MetricHistory }
) {
  const { name, versions, values } = metricHistory;
  return (
    <Plot
      data={[{
        fill: 'tozeroy', // area chart
        x: versions,
        y: values,
      }]}
      layout={{
        autosize: true,
        title: `${name} por versión`,
        xaxis: {
          title: { text: 'Versión' },
        },
        yaxis: { title: { text: name } },
      }}
      config={{
        displayModeBar: true,
        locale: 'es',
      }}
      style={{ width: '100%', height: '100%' }}
      useResizeHandler
    />
  );
}
