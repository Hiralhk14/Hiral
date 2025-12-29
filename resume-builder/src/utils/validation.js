export const validateEmail = (value) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(value) || 'Invalid email address';
};

export const validatePhone = (value) => {
  const re = /^\d{10}$/;
  return re.test(value) || 'Phone number must be exactly 10 digits';
};

export const validateUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return 'Invalid URL';
  }
};

export const validateRequired = (value) => {
  return (value && value.trim() !== '') || 'This field is required';
};

export const validateDate = (date) => {
  const re = /^\d{4}-\d{2}$/;
  return re.test(date);
};