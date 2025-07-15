import React from "react";
import KeyMetrics from "./KeyMetrics/KeyMetrics";
import AIRecommendations from "./AIRecommendations/AIRecommendations";
import TopPriorities from "./TopPriorities/TopPriorities";

const FixedOverviewArea: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
      <KeyMetrics />
      <AIRecommendations />
      <TopPriorities />
    </div>
  );
};

export default FixedOverviewArea;
