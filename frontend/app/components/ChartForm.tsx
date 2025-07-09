"use client";

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export interface ChartFormData {
  id?: string;
  title: string;
  chartType: 'pie' | 'bar';
  numericValue: string;
  metric: string;
}

interface ChartFormProps {
  onSubmit: SubmitHandler<ChartFormData>;
  defaultValues?: ChartFormData;
  onCancel: () => void;
}

const ChartForm: React.FC<ChartFormProps> = ({
  onSubmit,
  defaultValues,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChartFormData>({
    defaultValues: defaultValues || {
      title: '',
      chartType: 'pie',
      numericValue: 'count',
      metric: 'revenue',
    },
  });

  const numericValueOptions = [
    { value: 'count', label: 'Number of Items' },
    { value: 'average', label: 'Average Value' },
    { value: 'sum', label: 'Sum of Values' },
    { value: 'median', label: 'Median Value' },
  ];

  const metricOptions = [
    { value: 'revenue', label: 'Revenue' },
    { value: 'daily_users', label: 'Daily Users' },
    { value: 'orders', label: 'Orders' },
    { value: 'user_segments', label: 'User Segments' },
    { value: 'category', label: 'Category' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">
          Card Title
        </label>
        <input
          id="title"
          type="text"
          className={`w-full border ${
            errors.title ? 'border-destructive' : 'border-input'
          } rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring`}
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && (
          <p className="mt-1 text-xs text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="chartType" className="block text-sm font-medium text-foreground mb-1">
          Chart Type
        </label>
        <select
          id="chartType"
          className="w-full border border-input rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          {...register('chartType', { required: true })}
        >
          <option value="pie">Pie Chart</option>
          <option value="bar">Bar Chart</option>
        </select>
      </div>

      <div>
        <label htmlFor="numericValue" className="block text-sm font-medium text-foreground mb-1">
          Numeric Value
        </label>
        <select
          id="numericValue"
          className="w-full border border-input rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          {...register('numericValue', { required: true })}
        >
          {numericValueOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="metric" className="block text-sm font-medium text-foreground mb-1">
          Metric
        </label>
        <select
          id="metric"
          className="w-full border border-input rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          {...register('metric', { required: true })}
        >
          {metricOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-input rounded-md text-sm font-medium text-foreground bg-background hover:bg-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary border border-transparent rounded-md text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {defaultValues?.id ? 'Update Chart' : 'Add Chart'}
        </button>
      </div>
    </form>
  );
};

export default ChartForm; 