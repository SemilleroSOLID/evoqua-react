import { MetricHistoryGetter } from "@evoqua/types/api";
import { Metric, Project } from "@evoqua/types/models";
import React from "react";
import AsyncSelect from "react-select/async";

interface MetricSelectProps {
  getMetrics: MetricHistoryGetter['getMetrics'];
  projectKey: Project['key'];
  setMetric: (metric: Metric) => void;
}

export default function MetricSelect(
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
