import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { updatePersonalInfo } from '@/store/resumeSlice';

import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '../ui/Button';
import { validation } from '@/utils/validator';

const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state) => state.resume.personalInfo);
  const hasInitialized = useRef(false);

  const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm({
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      linkedin: '',
      github: '',
      website: '',
      summary: '',
    }
  });

  // Initialize form with Redux data only once on mount
  useEffect(() => {
    if (!hasInitialized?.current && personalInfo) {
      reset({
        fullName: personalInfo?.fullName || '',
        jobTitle: personalInfo?.jobTitle || '',
        email: personalInfo?.email || '',
        phone: personalInfo?.phone || '',
        address: personalInfo?.address || '',
        city: personalInfo?.city || '',
        country: personalInfo?.country || '',
        postalCode: personalInfo?.postalCode || '',
        linkedin: personalInfo?.linkedin || '',
        github: personalInfo?.github || '',
        website: personalInfo?.website || '',
        summary: personalInfo?.summary || '',
      });
      hasInitialized.current = true;
    }
  }, [personalInfo, reset]);

  const onSubmit = async (data, e) => {
    e?.preventDefault();
    
    // Trigger validation for all fields
    const isValid = await trigger();
    
    if (!isValid) {
      toast.error('Please fill in all required fields correctly');
      return;
    }
    
    dispatch(updatePersonalInfo(data));
    toast.success('Personal information saved successfully!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          id="fullName"
          placeholder="John Doe"
          required
          {...register('fullName', { 
            required: 'Full name is required',
            minLength: {
              value: 2,
              message: 'Full name must be at least 2 characters'
            }
          })}
          error={errors?.fullName?.message}
        />

        <Input
          label="Job Title"
          id="jobTitle"
          placeholder="e.g. Software Engineer"
          required
          {...register('jobTitle', { 
            required: 'Job title is required',
            minLength: {
              value: 2,
              message: 'Job title must be at least 2 characters'
            }
          })}
          error={errors?.jobTitle?.message}
        />

        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="john@example.com"
          required
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          error={errors?.email?.message}
        />

        <Input
          label="Phone"
          id="phone"
          type="tel"
          inputMode="numeric"
          placeholder="1234567890"
          required
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Phone number must be 10 digits'
            }
          })}
          onInput={(e) => {
            e.target.value = e?.target?.value?.replace(/\D/g, '')?.slice(0, 10);
          }}
          error={errors?.phone?.message}
        />

        <Input
          label="Address"
          id="address"
          placeholder="123 Main St"
          {...register('address')}
        />

        <Input
          label="City"
          id="city"
          placeholder="City"
          {...register('city')}
        />

        <Input
          label="Country"
          id="country"
          placeholder="Country"
          {...register('country')}
        />

        <Input
          label="Postal Code"
          id="postalCode"
          placeholder="Postal Code"
          {...register('postalCode')}
        />

        <Input
          label="LinkedIn"
          id="linkedin"
          placeholder="linkedin.com/in/username"
          {...register('linkedin')}
        />

        <Input
          label="GitHub"
          id="github"
          placeholder="github.com/username"
          {...register('github')}
        />

        <Input
          label="Website"
          id="website"
          placeholder="yourwebsite.com"
          {...register('website')}
        />
      </div>

      <div>
        <Textarea
          label="Professional Summary"
          id="summary"
          rows={4}
          placeholder="A brief summary of your professional background and skills..."
          {...register('summary')}
        />
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;