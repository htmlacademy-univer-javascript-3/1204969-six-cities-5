export const randomId = () =>
  new Date().getTime().toString() + Math.random().toString(36).substring(2, 15);
