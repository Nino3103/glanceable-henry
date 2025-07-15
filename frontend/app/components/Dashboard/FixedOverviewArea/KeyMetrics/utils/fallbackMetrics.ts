import { Channel, Timeframe } from "../../../FilterProvider/FilterContext";
import { Topic } from "../../../FilterProvider/FilterContext";
import { Metric } from "../types";

export const fallbackMetrics: Metric[] = [
  {
    name: "Revenue",
    value: "$45.2K",
    change: "+12%",
    trend: "up",
    timeframe: Timeframe.MONTH,
    channel: Channel.WEB,
    topic: Topic.SALES,
  },
  {
    name: "Users",
    value: "2,847",
    change: "+5%",
    trend: "up",
    timeframe: Timeframe.WEEK,
    channel: Channel.MOBILE,
    topic: Topic.MARKETING,
  },
  {
    name: "Orders",
    value: "182",
    change: "-3%",
    trend: "down",
    timeframe: Timeframe.TODAY,
    channel: Channel.WEB,
    topic: Topic.SALES,
  },
  {
    name: "Conversion",
    value: "3.2%",
    change: "+0.8%",
    trend: "up",
    timeframe: Timeframe.MONTH,
    channel: Channel.ORGANIC,
    topic: Topic.MARKETING,
  },
  {
    name: "Support Tickets",
    value: "24",
    change: "+8%",
    trend: "down",
    timeframe: Timeframe.WEEK,
    channel: Channel.EMAIL,
    topic: Topic.CUSTOMER_SERVICE,
  },
  {
    name: "Server Uptime",
    value: "99.9%",
    change: "0%",
    trend: "neutral",
    timeframe: Timeframe.MONTH,
    channel: Channel.DIRECT,
    topic: Topic.TECH,
  },
];
