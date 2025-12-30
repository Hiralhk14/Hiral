import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

import { addEducation, updateEducation, removeEducation } from '@/store/resumeSlice';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import RequiredIndicator from '../ui/RequiredIndicator';

const EducationForm = () => {
  const dispatch = useDispatch();
  const education = useSelector((state) => state.resume.education);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
    }
  });
  const handleAdd = () => {
    reset({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startYear: '',
      endYear: '',
      current: false,
      grade: '',
    });
    setEditingId(null);
    setIsAdding(true);
  };

  const handleEdit = (edu) => {
    setValue('institution', edu?.institution);
    setValue('degree', edu?.degree);
    setValue('fieldOfStudy', edu?.fieldOfStudy || '');
    setValue('startYear', edu?.startYear);
    setValue('endYear', edu?.endYear || '');
    setValue('current', edu?.current || false);
    setValue('grade', edu?.grade || '');
    setEditingId(edu?.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  const onSubmit = async (data, e) => {
    e?.preventDefault();

    // Trigger validation for all fields
    const isValid = await trigger();

    if (!isValid) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    const educationData = {
      ...data,
      id: editingId || Date?.now()?.toString(),
    };

    if (editingId) {
      dispatch(updateEducation(educationData));
    } else {
      dispatch(addEducation(educationData));
    }

    reset();
    setIsAdding(false);
    setEditingId(null);
  };

  const handleRemove = (id) => {
    if (confirm('Are you sure you want to remove this education entry?')) {
      dispatch(removeEducation(id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Education</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
          disabled={isAdding}
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      {(isAdding || editingId !== null) && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Institution"
              id="institution"
              required
              {...register('institution', {
                required: 'Institution name is required',
                minLength: {
                  value: 2,
                  message: 'Institution name must be at least 2 characters'
                }
              })}
              error={errors?.institution?.message}
            />

            <Input
              label="Degree"
              id="degree"
              required
              {...register('degree', {
                required: 'Degree is required',
                minLength: {
                  value: 2,
                  message: 'Degree must be at least 2 characters'
                }
              })}
              error={errors?.degree?.message}
            />

            <Input
              label="Field of Study"
              id="fieldOfStudy"
              required
              {...register('fieldOfStudy', {
                required: 'Field of study is required',
                minLength: {
                  value: 2,
                  message: 'Field of study must be at least 2 characters'
                }
              })}
              error={errors?.fieldOfStudy?.message}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Time Period<RequiredIndicator />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id="startYear"
                  type="number"
                  placeholder="Start Year"
                  required
                  {...register('startYear', {
                    required: 'Start year is required',
                    min: {
                      value: 1900,
                      message: 'Please enter a valid year',
                    },
                    max: {
                      value: new Date().getFullYear() + 5,
                      message: 'Please enter a valid year',
                    },
                  })}
                  error={errors?.startYear?.message}
                />
                <div className="flex items-center space-x-2">
                  <Input
                    id="endYear"
                    type="number"
                    placeholder="End Year"
                    required
                    disabled={watch('current')}
                    {...register('endYear', {
                      validate: (value) => {
                        if (!watch('current') && !value) {
                          return 'End year is required if not current';
                        }
                        if (
                          value &&
                          parseInt(value) < parseInt(watch('startYear') || 0)
                        ) {
                          return 'End year must be after start year';
                        }
                        return true;
                      },
                    })}
                    error={errors?.endYear?.message}
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

            <Input
              label="Grade (Optional)"
              id="grade"
              placeholder="e.g. 3.8 GPA"
              {...register('grade')}
            />
          </div>

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
              {editingId ? 'Update' : 'Add'} Education
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {education?.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No education entries added yet.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {education?.map((edu) => (
              <li
                key={edu.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="px-4 py-3 bg-white dark:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {edu?.degree}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {edu?.institution}
                        {edu?.fieldOfStudy && ` • ${edu?.fieldOfStudy}`}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {edu?.startYear} -{' '}
                        {edu?.current ? 'Present' : edu?.endYear}
                        {edu?.grade && ` • ${edu?.grade}`}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(edu)}
                        className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemove(edu?.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EducationForm;