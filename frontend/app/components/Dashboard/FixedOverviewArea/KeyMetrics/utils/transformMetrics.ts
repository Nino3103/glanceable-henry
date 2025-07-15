import { ApiMetric, Metric } from "../types";

export const transformMetric = (metric: ApiMetric): Metric => ({
  id: metric.id,
  name: metric.title || metric.name,
  value: metric.value,
  change: metric.change,
  trend:
    metric.changeType === "positive"
      ? "up"
      : metric.changeType === "negative"
      ? "down"
      : "neutral",
});
