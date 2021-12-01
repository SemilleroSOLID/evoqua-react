import { MetricHistory } from '@evoqua/types/models';
import * as React from 'react';

import MetricHistoryPlot from './MetricHistoryPlot';


interface MetricsHistoryPlotsProps{
    metricsHistory: MetricHistory[];
}

export default function GridMetricsHistoryPlots(props: MetricsHistoryPlotsProps){
    //const {metricsHistory} = props;

    return(
        createPlots(props)

    )


}

function createPlots(
    {metricsHistory} : MetricsHistoryPlotsProps
){
    console.log(metricsHistory);
    

    return (
        <div style={styles.container}>
            {metricsHistory.map((metricHistory) => <MetricHistoryPlot key = {metricHistory.metric}  metricHistory={metricHistory} style={styles.plot}/>)}
        </div>
    );
}


const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    plot: {
      flex: '1 0 0',
    },
  }