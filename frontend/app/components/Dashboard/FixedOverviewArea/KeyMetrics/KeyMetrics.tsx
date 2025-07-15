"use client";

import React, { useState } from "react";
import OverviewCard from "../OverviewCard/OverviewCard";
import {
  useFiltersContext,
  Timeframe,
  Channel,
  Topic,
} from "../../FilterProvider/FilterContext";
import { useDataFetching } from "../../../../hooks/useDataFetching";
import { ApiMetric, Metric } from "./types";
import { transformMetric } from "./utils/transformMetrics";
import { fallbackMetrics } from "./utils/fallbackMetrics";
import Modal from "../../../shared/Modal";
import AIGenerateButton from "../../../shared/AIGenerateButton";
import { AddKeyMetricForm } from "./AddKeyMetricForm/AddKeyMetricForm";
import MetricRow from "./MetricRow/MetricRow";

const KeyMetrics: React.FC = () => {
  const { filters } = useFiltersContext();
  const { data: metrics, setData: setMetrics } = useDataFetching<
    ApiMetric,
    Metric
  >({
    url: "/api/metrics",
    dataPath: "metrics",
    transform: transformMetric,
    fallbackData: fallbackMetrics,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMetric, setNewMetric] = useState({
    name: "",
    value: "",
    change: "",
    trend: "neutral" as "up" | "down" | "neutral",
    timeframe: Timeframe.MONTH,
    channel: Channel.WEB,
    topic: Topic.SALES,
  });

  // Filter metrics based on global filters
  const filteredMetrics = metrics.filter((metric) => {
    const timeframeMatch =
      filters.timeframe === Timeframe.ALL ||
      metric.timeframe === filters.timeframe;
    const channelMatch =
      filters.channel === Channel.ALL || metric.channel === filters.channel;
    const topicMatch =
      filters.topic === Topic.ALL || metric.topic === filters.topic;
    return timeframeMatch && channelMatch && topicMatch;
  });

  const handleAddMetric = () => {
    setIsModalOpen(true);
  };

  const handleSubmitMetric = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMetric.name && newMetric.value) {
      const metric: Metric = {
        id: Date.now().toString(),
        name: newMetric.name,
        value: newMetric.value,
        change: newMetric.change || undefined,
        trend: newMetric.trend,
        timeframe: newMetric.timeframe,
        channel: newMetric.channel,
        topic: newMetric.topic,
      };

      setMetrics((prev) => [...prev, metric]);
      setNewMetric({
        name: "",
        value: "",
        change: "",
        trend: "neutral",
        timeframe: Timeframe.MONTH,
        channel: Channel.WEB,
        topic: Topic.SALES,
      });
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewMetric({
      name: "",
      value: "",
      change: "",
      trend: "neutral",
      timeframe: Timeframe.MONTH,
      channel: Channel.WEB,
      topic: Topic.SALES,
    });
  };

  const handleRandomGenerate = () => {
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
    setNewMetric({
      name: randomMetric.name,
      value: randomMetric.value,
      change: randomMetric.change,
      trend: randomMetric.trend as "up" | "down" | "neutral",
      timeframe: randomMetric.timeframe,
      channel: randomMetric.channel,
      topic: randomMetric.topic,
    });
  };

  return (
    <>
      <OverviewCard
        title="Key Metrics"
        variant="metrics"
        onAdd={handleAddMetric}
      >
        <div className="h-48 overflow-y-auto space-y-3">
          {filteredMetrics.length > 0 ? (
            filteredMetrics.map((metric, index) => (
              <MetricRow key={`${metric.name}-${index}`} metric={metric} />
            ))
          ) : (
            <div className="text-sm text-gray-500 text-center py-8">
              No metrics match the selected filters.
            </div>
          )}
        </div>
      </OverviewCard>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Add New Metric
          </h3>
          <AIGenerateButton onClick={handleRandomGenerate} />
        </div>
        <AddKeyMetricForm
          newMetric={newMetric}
          setNewMetric={setNewMetric}
          handleSubmitMetric={handleSubmitMetric}
          handleCloseModal={handleCloseModal}
        />
      </Modal>
    </>
  );
};

export default KeyMetrics;
