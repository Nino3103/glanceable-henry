export type Metric = {
  id?: string;
  title?: string;
  name?: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  trend?: "up" | "down" | "neutral";
  timeframe?: Timeframe;
  channel?: Channel;
  topic?: Topic;
};

export type ApiMetric = {
  id: string;
  title?: string;
  name?: string;
  value: string | number;
  change?: string;
  changeType?: string;
};
