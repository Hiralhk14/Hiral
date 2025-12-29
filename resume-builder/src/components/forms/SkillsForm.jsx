import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiTrash2, FiX, FiEdit2 } from 'react-icons/fi';

import { addSkill, updateSkill, removeSkill } from '@/store/resumeSlice';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const SkillsForm = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.resume.skills);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [skillInput, setSkillInput] = useState('');
  const [skillLevel, setSkillLevel] = useState('intermediate');
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  
  const handleAdd = () => {
    reset({
      name: '',
      level: 'intermediate',
    });
    setSkillInput('');
    setSkillLevel('intermediate');
    setEditingId(null);
    setIsAdding(true);
  };
  
  const handleEdit = (skill) => {
    setSkillInput(skill?.name);
    setSkillLevel(skill?.level || 'intermediate');
    setEditingId(skill?.id);
    setIsAdding(true);
  };
  
  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };
  
  const onSubmit = (data) => {
    if (editingId) {
      dispatch(updateSkill({ id: editingId, ...data }));
    } else {
      dispatch(addSkill(data));
    }
    setIsAdding(false);
    setEditingId(null);
  };
  
  const handleRemove = (id) => {
    if (confirm('Are you sure you want to remove this skill?')) {
      dispatch(removeSkill(id));
    }
  };
  
  const handleSkillInputChange = (e) => {
    setSkillInput(e?.target?.value);
  };
  
  const handleSkillLevelChange = (e) => {
    setSkillLevel(e?.target?.value);
  };
  
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput?.trim()) {
      if (editingId) {
        dispatch(updateSkill({ id: editingId, name: skillInput?.trim(), level: skillLevel }));
      } else {
        dispatch(addSkill({ name: skillInput?.trim(), level: skillLevel }));
      }
      reset();
      setSkillInput('');
      setSkillLevel('intermediate');
      setEditingId(null);
      setIsAdding(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Skills</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
          disabled={isAdding}
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>
      
      {(isAdding || editingId !== null) && (
        <form onSubmit={handleAddSkill} className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Skill"
                id="skill"
                placeholder="e.g. JavaScript, Python, Project Management"
                value={skillInput}
                onChange={handleSkillInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Proficiency
              </label>
              <select
                id="level"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={skillLevel}
                onChange={handleSkillLevelChange}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
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
              {editingId ? 'Update' : 'Add'} Skill
            </Button>
          </div>
        </form>
      )}
      
      <div className="space-y-4">
        {skills?.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No skills added yet.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills?.map((skill) => (
              <div
                key={skill.id}
                className="relative group flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1.5"
              >
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {skill?.name}
                  {skill?.level && (
                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                      ({skill?.level})
                    </span>
                  )}
                </span>
                <div className="ml-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => handleEdit(skill)}
                    className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    <FiEdit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(skill?.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsForm;