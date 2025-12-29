export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const re = /^[0-9\-\+\(\)\s]+$/;
  return re.test(phone);
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const validateRequired = (value) => {
  return value && value.trim() !== '';
};

export const validateDate = (date) => {
  const re = /^\d{4}-\d{2}$/;
  return re.test(date);
};