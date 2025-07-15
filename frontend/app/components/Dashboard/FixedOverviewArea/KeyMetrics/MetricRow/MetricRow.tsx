import React from "react";
import { Metric } from "../types";

type MetricRowProps = {
  metric: Metric;
};

const MetricRow: React.FC<MetricRowProps> = ({ metric }) => {
  return (
    <div className="flex justify-between items-center">
      <span className="font-medium text-gray-800">{metric.name}</span>
      <div className="flex items-center gap-2">
        <span className="font-bold text-gray-800">{metric.value}</span>
        {metric.change && (
          <span
            className={`text-xs ${
              metric.trend === "up"
                ? "text-success"
                : metric.trend === "down"
                ? "text-destructive"
                : "text-muted-foreground"
            }`}
          >
            {metric.change}
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricRow;
