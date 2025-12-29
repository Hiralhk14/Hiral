import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiTrash2, FiExternalLink } from 'react-icons/fi';

import { addCertification, updateCertification, removeCertification } from '@/store/resumeSlice';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const CertificationsForm = () => {
  const dispatch = useDispatch();
  const certifications = useSelector((state) => state.resume.certifications);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
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
      issuer: '',
      date: '',
      credentialId: '',
      credentialUrl: '',
    });
    setEditingId(null);
    setIsAdding(true);
  };
  
  const handleEdit = (cert) => {
    setValue('name', cert?.name);
    setValue('issuer', cert?.issuer || '');
    setValue('date', cert?.date || '');
    setValue('credentialId', cert?.credentialId || '');
    setValue('credentialUrl', cert?.credentialUrl || '');
    setEditingId(cert?.id);
    setIsAdding(true);
  };
  
  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };
  
  const onSubmit = (data) => {
    if (editingId) {
      dispatch(updateCertification({ id: editingId, ...data }));
    } else {
      dispatch(addCertification(data));
    }
    reset();
    setIsAdding(false);
    setEditingId(null);
  };
  
  const handleRemove = (id) => {
    if (confirm('Are you sure you want to remove this certification?')) {
      dispatch(removeCertification(id));
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Certifications</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
          disabled={isAdding}
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add Certification
        </Button>
      </div>
      
      {(isAdding || editingId !== null) && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Certification Name"
              id="name"
              placeholder="e.g. AWS Certified Solutions Architect"
              {...register('name', { required: 'Certification name is required' })}
              error={errors?.name?.message}
            />
            
            <Input
              label="Issuing Organization"
              id="issuer"
              placeholder="e.g. Amazon Web Services"
              {...register('issuer', { required: 'Issuer is required' })}
              error={errors?.issuer?.message}
            />
            
            <Input
              label="Date Earned"
              id="date"
              type="month"
              {...register('date')}
            />
            
            <Input
              label="Credential ID (Optional)"
              id="credentialId"
              placeholder="e.g. ABC123456"
              {...register('credentialId')}
            />
            
            <div className="md:col-span-2">
              <Input
                label="Credential URL (Optional)"
                id="credentialUrl"
                type="url"
                placeholder="https://example.com/verify/ABC123456"
                leftIcon={<FiExternalLink className="text-gray-400" />}
                {...register('credentialUrl')}
              />
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
              {editingId ? 'Update' : 'Add'} Certification
            </Button>
          </div>
        </form>
      )}
      
      <div className="space-y-4">
        {certifications?.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No certifications added yet.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {certifications?.map((cert) => (
              <li
                key={cert?.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="px-4 py-3 bg-white dark:bg-gray-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {cert?.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {cert?.issuer}
                        {cert?.date && ` • ${cert?.date}`}
                        {cert?.credentialId && ` • ID: ${cert?.credentialId}`}
                      </p>
                      {cert?.credentialUrl && (
                        <a
                          href={cert?.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center mt-1 text-sm text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          <FiExternalLink className="w-3.5 h-3.5 mr-1" />
                          Verify Credential
                        </a>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(cert)}
                        className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemove(cert?.id)}
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

export default CertificationsForm;