export const sanitizeInput = (input) => {
  return input.trim().replace(/[<>"']/g, '');
};

export const validateUsername = (username) => {
  const regex = /^[a-zA-Z0-9_]{3,50}$/;
  return regex.test(username);
};

export const validatePassword = (password) => {
  return password.length >= 1 && password.length <= 100;
};

export const validateFlag = (flag) => {
  return flag.trim().length > 0 && flag.length <= 200;
};
