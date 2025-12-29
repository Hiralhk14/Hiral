import {
  validateEmail,
  validatePhone,
  validateUrl,
  validateRequired,
} from './validation';

export const validation = {
  email: {
    required: validateRequired,
    validate: validateEmail,
  },
  phone: {
    required: validateRequired,
    validate: validatePhone,
  },
  url: {
    validate: validateUrl,
  },
};
