import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi';

import { addExperience, updateExperience, removeExperience } from '@/store/resumeSlice';

import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

const ExperienceForm = () => {
  const dispatch = useDispatch();
  const experiences = useSelector((state) => state.resume.experience);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const handleAdd = () => {
    reset({
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
    setEditingId(null);
    setIsAdding(true);
  };

  const handleEdit = (exp) => {
    setValue('jobTitle', exp?.jobTitle);
    setValue('company', exp?.company);
    setValue('location', exp?.location);
    setValue('startDate', exp?.startDate);
    setValue('endDate', exp?.endDate || '');
    setValue('current', exp?.current || false);
    setValue('description', exp?.description || '');
    setEditingId(exp?.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  const onSubmit = (data) => {
    if (editingId) {
      dispatch(updateExperience({ id: editingId, ...data }));
    } else {
      dispatch(addExperience(data));
    }
    reset();
    setIsAdding(false);
    setEditingId(null);
  };

  const handleRemove = (id) => {
    if (confirm('Are you sure you want to remove this experience?')) {
      dispatch(removeExperience(id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Work Experience</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
          disabled={isAdding}
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {(isAdding || editingId !== null) && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Job Title"
              id="jobTitle"
              placeholder="e.g. Senior Software Engineer"
              {...register('jobTitle', { required: 'Job title is required' })}
              error={errors?.jobTitle?.message}
            />

            <Input
              label="Company"
              id="company"
              placeholder="Company Name"
              {...register('company', { required: 'Company name is required' })}
              error={errors?.company?.message}
            />

            <Input
              label="Location"
              id="location"
              placeholder="e.g. San Francisco, CA"
              {...register('location')}
            />

          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Time Period
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                id="startDate"
                type="month"
                placeholder="Start Date"
                {...register('startDate', { required: 'Start date is required' })}
                error={errors?.startDate?.message}
              />
              <div className="flex items-center space-x-2">
                <Input
                  id="endDate"
                  type="month"
                  placeholder="End Date"
                  disabled={watch('current')}
                  {...register('endDate', {
                    validate: (value) => {
                      if (!watch('current') && !value) {
                        return 'End date is required if not current';
                      }
                      return true;
                    },
                  })}
                  error={errors?.endDate?.message}
                />
                <div className="flex items-center">
                  <input
                    id="current"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    {...register('current')}
                  />
                  <label
                    htmlFor="current"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Current
                  </label>
                </div>
              </div>
            </div>
          </div>

          <Textarea
            label="Description"
            id="description"
            rows={4}
            placeholder="Describe your responsibilities and achievements..."
            {...register('description')}
          />

          <div className="flex justify-end space-x-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {editingId ? 'Update' : 'Add'} Experience
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {experiences?.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No work experience added yet.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {experiences?.map((exp) => (
              <li
                key={exp?.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="px-4 py-3 bg-white dark:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {exp.jobTitle}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {exp?.company} • {exp?.location}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {exp?.startDate} -{' '}
                        {exp?.current ? 'Present' : exp?.endDate}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(exp)}
                        className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemove(exp?.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  {exp?.description && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                      {exp?.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;