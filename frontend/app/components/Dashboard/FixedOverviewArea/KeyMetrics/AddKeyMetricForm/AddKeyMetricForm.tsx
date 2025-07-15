import {
  Channel,
  Timeframe,
  Topic,
} from "../../../FilterProvider/FilterContext";
import { Metric } from "../types";

type AddKeyMetricFormProps = {
  newMetric: Metric;
  setNewMetric: React.Dispatch<
    React.SetStateAction<{
      name: string;
      value: string;
      change: string;
      trend: "up" | "down" | "neutral";
      timeframe: Timeframe;
      channel: Channel;
      topic: Topic;
    }>
  >;
  handleSubmitMetric: (e: React.FormEvent) => void;
  handleCloseModal: () => void;
};

export const AddKeyMetricForm = ({
  newMetric,
  setNewMetric,
  handleSubmitMetric,
  handleCloseModal,
}: AddKeyMetricFormProps) => {
  return (
    <form onSubmit={handleSubmitMetric} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Metric Name
        </label>
        <input
          type="text"
          value={newMetric.name}
          onChange={(e) =>
            setNewMetric((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900"
          placeholder="e.g., NPS Score"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Value
        </label>
        <input
          type="text"
          value={newMetric.value}
          onChange={(e) =>
            setNewMetric((prev) => ({ ...prev, value: e.target.value }))
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900"
          placeholder="e.g., 72 or 86%"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Change (optional)
        </label>
        <input
          type="text"
          value={newMetric.change}
          onChange={(e) =>
            setNewMetric((prev) => ({
              ...prev,
              change: e.target.value,
            }))
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900"
          placeholder="e.g., +5% or -2%"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Trend
        </label>
        <select
          value={newMetric.trend}
          onChange={(e) =>
            setNewMetric((prev) => ({
              ...prev,
              trend: e.target.value as "up" | "down" | "neutral",
            }))
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900"
        >
          <option value="up">Up (Positive)</option>
          <option value="down">Down (Negative)</option>
          <option value="neutral">Neutral</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Timeframe
          </label>
          <select
            value={newMetric.timeframe}
            onChange={(e) =>
              setNewMetric((prev) => ({
                ...prev,
                timeframe: e.target.value as Timeframe,
              }))
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900"
          >
            <option value={Timeframe.TODAY}>Today</option>
            <option value={Timeframe.WEEK}>This Week</option>
            <option value={Timeframe.MONTH}>This Month</option>
            <option value={Timeframe.QUARTER}>This Quarter</option>
            <option value={Timeframe.YEAR}>This Year</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Channel
          </label>
          <select
            value={newMetric.channel}
            onChange={(e) =>
              setNewMetric((prev) => ({
                ...prev,
                channel: e.target.value as Channel,
              }))
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900"
          >
            <option value={Channel.WEB}>Web</option>
            <option value={Channel.MOBILE}>Mobile</option>
            <option value={Channel.EMAIL}>Email</option>
            <option value={Channel.SOCIAL}>Social</option>
            <option value={Channel.DIRECT}>Direct</option>
            <option value={Channel.ORGANIC}>Organic</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Topic
          </label>
          <select
            value={newMetric.topic}
            onChange={(e) =>
              setNewMetric((prev) => ({
                ...prev,
                topic: e.target.value as Topic,
              }))
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900"
          >
            <option value={Topic.SALES}>Sales</option>
            <option value={Topic.MARKETING}>Marketing</option>
            <option value={Topic.PRODUCT}>Product</option>
            <option value={Topic.CUSTOMER_SERVICE}>Customer Service</option>
            <option value={Topic.OPERATIONS}>Operations</option>
            <option value={Topic.FINANCE}>Finance</option>
            <option value={Topic.TECH}>Technology</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={handleCloseModal}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
        >
          Add Metric
        </button>
      </div>
    </form>
  );
};
