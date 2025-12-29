import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: {
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
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  selectedTemplate: 'classic',
  sections: {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    certifications: true,
  },
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    updatePersonalInfo: (state, action) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    addExperience: (state, action) => {
      state.experience.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    updateExperience: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.experience.findIndex(exp => exp.id === id);
      if (index !== -1) {
        state.experience[index] = { ...state.experience[index], ...updates };
      }
    },
    removeExperience: (state, action) => {
      state.experience = state.experience.filter(exp => exp.id !== action.payload);
    },
    addEducation: (state, action) => {
      state.education.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    updateEducation: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.education.findIndex(edu => edu.id === id);
      if (index !== -1) {
        state.education[index] = { ...state.education[index], ...updates };
      }
    },
    removeEducation: (state, action) => {
      state.education = state.education.filter(edu => edu.id !== action.payload);
    },
    addSkill: (state, action) => {
      if (!state.skills.some(skill => skill.name.toLowerCase() === action.payload.name.toLowerCase())) {
        state.skills.push({
          id: Date.now(),
          ...action.payload,
        });
      }
    },
    updateSkill: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.skills.findIndex(skill => skill.id === id);
      if (index !== -1) {
        state.skills[index] = { ...state.skills[index], ...updates };
      }
    },
    removeSkill: (state, action) => {
      state.skills = state.skills.filter(skill => skill.id !== action.payload);
    },
    addProject: (state, action) => {
      state.projects.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    updateProject: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.projects.findIndex(project => project.id === id);
      if (index !== -1) {
        state.projects[index] = { ...state.projects[index], ...updates };
      }
    },
    removeProject: (state, action) => {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    },
    addCertification: (state, action) => {
      state.certifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    updateCertification: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.certifications.findIndex(cert => cert.id === id);
      if (index !== -1) {
        state.certifications[index] = { ...state.certifications[index], ...updates };
      }
    },
    removeCertification: (state, action) => {
      state.certifications = state.certifications.filter(cert => cert.id !== action.payload);
    },
    setTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
    toggleSection: (state, action) => {
      const section = action.payload;
      if (state.sections.hasOwnProperty(section)) {
        state.sections[section] = !state.sections[section];
      }
    },
    resetResume: () => initialState,
  },
});

export const {
  updatePersonalInfo,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addSkill,
  updateSkill,
  removeSkill,
  addProject,
  updateProject,
  removeProject,
  addCertification,
  updateCertification,
  removeCertification,
  setTemplate,
  toggleSection,
  resetResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;
