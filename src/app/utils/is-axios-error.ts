type AxiosErrorResponse = {
  message: string;
  errorType: string;
  details: { messages: string[] }[];
};

export const isAxiosError = (e: unknown): e is AxiosErrorResponse =>
  typeof e === 'object' &&
  e instanceof Object &&
  Object.prototype.hasOwnProperty.call(e, 'message') &&
  Object.prototype.hasOwnProperty.call(e, 'errorType');
