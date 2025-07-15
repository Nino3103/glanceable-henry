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
import Modal from "../../../shared/Modal";
import AIGenerateButton from "../../../shared/AIGenerateButton";

interface Priority {
  id: string;
  title?: string;
  task?: string;
  description?: string;
  deadline?: string;
  priority?: string;
  impact?: string;
  status: "pending" | "in-progress" | "completed" | "planned";
  timeframe?: Timeframe;
  channel?: Channel;
  topic?: Topic;
}

type ApiPriority = {
  id: string;
  title?: string;
  task?: string;
  deadline?: string;
  status: string;
};

const transformPriority = (priority: ApiPriority): Priority => ({
  id: priority.id,
  task: priority.title || priority.task,
  deadline: priority.deadline || "No deadline",
  status: (priority.status === "planned"
    ? "pending"
    : priority.status) as Priority["status"],
});

const fallbackPriorities: Priority[] = [
  {
    id: "1",
    task: "Review Q4 financials",
    deadline: "Today",
    status: "in-progress",
    timeframe: Timeframe.TODAY,
    channel: Channel.DIRECT,
    topic: Topic.FINANCE,
  },
  {
    id: "2",
    task: "Update team on project status",
    deadline: "Dec 15",
    status: "pending",
    timeframe: Timeframe.WEEK,
    channel: Channel.EMAIL,
    topic: Topic.OPERATIONS,
  },
  {
    id: "3",
    task: "Prepare monthly report",
    deadline: "Dec 18",
    status: "pending",
    timeframe: Timeframe.MONTH,
    channel: Channel.DIRECT,
    topic: Topic.OPERATIONS,
  },
  {
    id: "4",
    task: "Optimize mobile checkout",
    deadline: "This week",
    status: "in-progress",
    timeframe: Timeframe.WEEK,
    channel: Channel.MOBILE,
    topic: Topic.SALES,
  },
  {
    id: "5",
    task: "Launch social media campaign",
    deadline: "Dec 20",
    status: "pending",
    timeframe: Timeframe.MONTH,
    channel: Channel.SOCIAL,
    topic: Topic.MARKETING,
  },
  {
    id: "6",
    task: "Fix server performance issues",
    deadline: "Tomorrow",
    status: "in-progress",
    timeframe: Timeframe.TODAY,
    channel: Channel.DIRECT,
    topic: Topic.TECH,
  },
];

const TopPriorities: React.FC = () => {
  const { filters } = useFiltersContext();
  const { data: priorities, setData: setPriorities } = useDataFetching<
    ApiPriority,
    Priority
  >({
    url: "/api/priorities",
    dataPath: "priorities",
    transform: transformPriority,
    fallbackData: fallbackPriorities,
  });

  // Filter priorities based on global filters
  const filteredPriorities = priorities.filter((priority) => {
    const timeframeMatch =
      filters.timeframe === Timeframe.ALL ||
      priority.timeframe === filters.timeframe;
    const channelMatch =
      filters.channel === Channel.ALL || priority.channel === filters.channel;
    const topicMatch =
      filters.topic === Topic.ALL || priority.topic === filters.topic;
    return timeframeMatch && channelMatch && topicMatch;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPriority, setNewPriority] = useState({
    task: "",
    deadline: "",
    status: "pending" as "pending" | "in-progress" | "completed",
    timeframe: Timeframe.WEEK,
    channel: Channel.DIRECT,
    topic: Topic.OPERATIONS,
  });

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "completed":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            Completed
          </span>
        );
      case "in-progress":
        return (
          <span className={`${baseClasses} bg-orange-100 text-orange-800`}>
            In Progress
          </span>
        );
      case "pending":
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            Pending
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
            Unknown
          </span>
        );
    }
  };

  const handleAddPriority = () => {
    setIsModalOpen(true);
  };

  const handleSubmitPriority = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPriority.task && newPriority.deadline) {
      const priority: Priority = {
        id: Date.now().toString(),
        task: newPriority.task,
        deadline: newPriority.deadline,
        status: newPriority.status,
        timeframe: newPriority.timeframe,
        channel: newPriority.channel,
        topic: newPriority.topic,
      };

      setPriorities((prev) => [...prev, priority]);
      setNewPriority({
        task: "",
        deadline: "",
        status: "pending",
        timeframe: Timeframe.WEEK,
        channel: Channel.DIRECT,
        topic: Topic.OPERATIONS,
      });
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewPriority({
      task: "",
      deadline: "",
      status: "pending",
      timeframe: Timeframe.WEEK,
      channel: Channel.DIRECT,
      topic: Topic.OPERATIONS,
    });
  };

  const handleRandomGenerate = () => {
    const sampleTasks = [
      {
        task: "Schedule team standup",
        deadline: "Today",
        timeframe: Timeframe.TODAY,
        channel: Channel.EMAIL,
        topic: Topic.OPERATIONS,
      },
      {
        task: "Review code changes",
        deadline: "Tomorrow",
        timeframe: Timeframe.TODAY,
        channel: Channel.DIRECT,
        topic: Topic.TECH,
      },
      {
        task: "Update documentation",
        deadline: "Dec 22",
        timeframe: Timeframe.WEEK,
        channel: Channel.WEB,
        topic: Topic.PRODUCT,
      },
      {
        task: "Client presentation",
        deadline: "Next week",
        timeframe: Timeframe.WEEK,
        channel: Channel.DIRECT,
        topic: Topic.SALES,
      },
      {
        task: "Performance review",
        deadline: "Dec 25",
        timeframe: Timeframe.MONTH,
        channel: Channel.EMAIL,
        topic: Topic.OPERATIONS,
      },
      {
        task: "Budget approval",
        deadline: "End of month",
        timeframe: Timeframe.MONTH,
        channel: Channel.DIRECT,
        topic: Topic.FINANCE,
      },
    ];

    const randomTask =
      sampleTasks[Math.floor(Math.random() * sampleTasks.length)];
    const statuses: ("pending" | "in-progress" | "completed")[] = [
      "pending",
      "in-progress",
      "completed",
    ];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    setNewPriority({
      task: randomTask.task,
      deadline: randomTask.deadline,
      status: randomStatus,
      timeframe: randomTask.timeframe,
      channel: randomTask.channel,
      topic: randomTask.topic,
    });
  };

  return (
    <>
      <OverviewCard
        title="Top Priorities"
        variant="priorities"
        onAdd={handleAddPriority}
      >
        <ul className="h-48 overflow-y-auto space-y-3">
          {filteredPriorities.length > 0 ? (
            filteredPriorities.map((priority) => (
              <li key={priority.id} className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">
                    {priority.task}
                  </span>
                  {getStatusBadge(priority.status)}
                </div>
                <div className="text-xs text-gray-600">
                  Due: {priority.deadline}
                </div>
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500 text-center py-8">
              No priorities match the selected filters.
            </li>
          )}
        </ul>
      </OverviewCard>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Add New Priority
          </h3>
          <AIGenerateButton onClick={handleRandomGenerate} />
        </div>
        <form onSubmit={handleSubmitPriority} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task
            </label>
            <input
              type="text"
              value={newPriority.task}
              onChange={(e) =>
                setNewPriority((prev) => ({
                  ...prev,
                  task: e.target.value,
                }))
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900"
              placeholder="e.g., Review quarterly reports"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline
            </label>
            <input
              type="text"
              value={newPriority.deadline}
              onChange={(e) =>
                setNewPriority((prev) => ({
                  ...prev,
                  deadline: e.target.value,
                }))
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900"
              placeholder="e.g., Today, Dec 15, Next week"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={newPriority.status}
              onChange={(e) =>
                setNewPriority((prev) => ({
                  ...prev,
                  status: e.target.value as
                    | "pending"
                    | "in-progress"
                    | "completed",
                }))
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timeframe
              </label>
              <select
                value={newPriority.timeframe}
                onChange={(e) =>
                  setNewPriority((prev) => ({
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
                value={newPriority.channel}
                onChange={(e) =>
                  setNewPriority((prev) => ({
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
                value={newPriority.topic}
                onChange={(e) =>
                  setNewPriority((prev) => ({
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
              Add Priority
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default TopPriorities;
