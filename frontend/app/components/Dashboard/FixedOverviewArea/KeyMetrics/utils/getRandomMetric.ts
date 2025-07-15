import {
  Channel,
  Timeframe,
  Topic,
} from "../../../FilterProvider/FilterContext";

export const getRandomMetric = () => {
  // Sample metrics with filter properties
  const sampleMetrics = [
    {
      name: "Customer Satisfaction",
      value: "92%",
      change: "+5%",
      trend: "up",
      timeframe: Timeframe.QUARTER,
      channel: Channel.EMAIL,
      topic: Topic.CUSTOMER_SERVICE,
    },
    {
      name: "Avg Order Value",
      value: "$127",
      change: "+8%",
      trend: "up",
      timeframe: Timeframe.MONTH,
      channel: Channel.WEB,
      topic: Topic.SALES,
    },
    {
      name: "Bounce Rate",
      value: "32%",
      change: "-2%",
      trend: "up",
      timeframe: Timeframe.WEEK,
      channel: Channel.SOCIAL,
      topic: Topic.MARKETING,
    },
    {
      name: "Page Load Time",
      value: "1.2s",
      change: "-0.3s",
      trend: "up",
      timeframe: Timeframe.TODAY,
      channel: Channel.MOBILE,
      topic: Topic.TECH,
    },
    {
      name: "Return Rate",
      value: "8.5%",
      change: "+1.2%",
      trend: "down",
      timeframe: Timeframe.MONTH,
      channel: Channel.DIRECT,
      topic: Topic.OPERATIONS,
    },
  ];

  const randomMetric =
    sampleMetrics[Math.floor(Math.random() * sampleMetrics.length)];
  return randomMetric;
};
