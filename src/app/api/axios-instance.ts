import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { baseUrl, timeout } from './axios-config';
import { getToken } from './token';

type DetailMessageType = {
  type: string;
  message: string;
};

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) =>
  !!StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: baseUrl,
    timeout: timeout,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = error.response.data;

        // eslint-disable-next-line no-console
        console.error(detailMessage.message);
      }

      throw error;
    },
  );

  return api;
};
