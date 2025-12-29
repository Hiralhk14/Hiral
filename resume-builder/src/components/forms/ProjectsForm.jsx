import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiTrash2, FiLink, FiGithub } from 'react-icons/fi';

import { addProject, updateProject, removeProject } from '@/store/resumeSlice';

import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

const ProjectsForm = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.resume.projects);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [technologies, setTechnologies] = useState('');
  
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
      name: '',
      description: '',
      technologies: [],
      projectUrl: '',
      githubUrl: '',
      startDate: '',
      endDate: '',
      current: false,
    });
    setTechnologies('');
    setEditingId(null);
    setIsAdding(true);
  };
  
  const handleEdit = (project) => {
    setValue('name', project?.name);
    setValue('description', project?.description || '');
    setValue('technologies', project?.technologies || []);
    setValue('projectUrl', project?.projectUrl || '');
    setValue('githubUrl', project?.githubUrl || '');
    setValue('startDate', project?.startDate || '');
    setValue('endDate', project?.endDate || '');
    setValue('current', project?.current || false);
    setTechnologies((project?.technologies || [])?.join(', '));
    setEditingId(project?.id);
    setIsAdding(true);
  };
  
  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };
  
  const onSubmit = (data) => {
    const projectData = {
      ...data,
      technologies: technologies
        ?.split(',')
        ?.map((tech) => tech?.trim())
        ?.filter((tech) => tech?.length > 0),
    };
    
    if (editingId) {
      dispatch(updateProject({ id: editingId, ...projectData }));
    } else {
      dispatch(addProject(projectData));
    }
    reset();
    setTechnologies('');
    setIsAdding(false);
    setEditingId(null);
  };
  
  const handleRemove = (id) => {
    if (confirm('Are you sure you want to remove this project?')) {
      dispatch(removeProject(id));
    }
  };
  
  const handleTechnologiesChange = (e) => {
    setTechnologies(e?.target?.value);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Projects</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
          disabled={isAdding}
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>
      
      {(isAdding || editingId !== null) && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Project Name"
              id="name"
              placeholder="e.g. E-commerce Website"
              {...register('name', { required: 'Project name is required' })}
              error={errors?.name?.message}
            />
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Time Period
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id="startDate"
                  type="month"
                  placeholder="Start Date"
                  {...register('startDate')}
                />
                <div className="flex items-center space-x-2">
                  <Input
                    id="endDate"
                    type="month"
                    placeholder="End Date"
                    disabled={watch('current')}
                    {...register('endDate')}
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
                      Ongoing
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <Textarea
                label="Description"
                id="description"
                rows={3}
                placeholder="Describe the project, your role, and key achievements..."
                {...register('description')}
              />
            </div>
            
            <div className="md:col-span-2">
              <Input
                label="Technologies (comma separated)"
                id="technologies"
                placeholder="e.g. React, Node.js, MongoDB"
                value={technologies}
                onChange={handleTechnologiesChange}
              />
            </div>
            
            <Input
              label="Project URL"
              id="projectUrl"
              type="url"
              placeholder="https://example.com"
              leftIcon={<FiLink className="text-gray-400" />}
              {...register('projectUrl')}
            />
            
            <Input
              label="GitHub Repository"
              id="githubUrl"
              type="url"
              placeholder="https://github.com/username/repo"
              leftIcon={<FiGithub className="text-gray-400" />}
              {...register('githubUrl')}
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
              {editingId ? 'Update' : 'Add'} Project
            </Button>
          </div>
        </form>
      )}
      
      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No projects added yet.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {projects?.map((project) => (
              <li
                key={project?.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="px-4 py-3 bg-white dark:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {project?.name}
                      </h4>
                      {project?.startDate && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {project?.startDate} -{' '}
                          {project?.current ? 'Present' : project?.endDate || 'Present'}
                        </p>
                      )}
                      {project?.description && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                          {project?.description}
                        </p>
                      )}
                      {project?.technologies && project?.technologies?.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {project?.technologies?.map((tech, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-2 flex items-center space-x-4">
                        {project?.projectUrl && (
                          <a
                            href={project?.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                          >
                            <FiLink className="w-3.5 h-3.5 mr-1" />
                            Live Demo
                          </a>
                        )}
                        {project?.githubUrl && (
                          <a
                            href={project?.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <FiGithub className="w-3.5 h-3.5 mr-1" />
                            Source Code
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(project)}
                        className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemove(project?.id)}
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

export default ProjectsForm;