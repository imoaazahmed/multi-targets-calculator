import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { LocalStorageKeys } from '@/constants/local-storage-keys';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retryCount: number;
}

export const getAccessToken = () => localStorage.getItem(LocalStorageKeys.access_token) || '';
export const getRefreshToken = () => localStorage.getItem(LocalStorageKeys.refresh_token) || '';
export const createAuthorizationHeader = (token?: string) => (token ? `Bearer ${token}` : '');

// Create API instance
const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
});

http.defaults.headers.post['Content-Type'] = 'application/json';

// Add a request interceptor
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = {
      ['Authorization']: createAuthorizationHeader(getAccessToken()),
      ...config.headers,
    } as AxiosRequestHeaders;

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
let isRefreshing = false;
let failedQueue: any[] = [];
const MAX_RETRIES = 1;

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const refreshTokenURL = '';

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const isAllowRetry = !originalRequest._retryCount || originalRequest._retryCount < MAX_RETRIES;

    if (error.response) {
      // Unauthorized
      if (error.response?.status === 401 && isAllowRetry) {
        if (!getRefreshToken()) {
          // Do something ex. logout
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers['Authorization'] = createAuthorizationHeader(token as string);

              return http(originalRequest);
            })
            .catch((err: any) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
        isRefreshing = true;

        try {
          const res = await axios.get(refreshTokenURL, {
            baseURL: import.meta.env.VITE_API_URL,
            headers: {
              ['Content-Type']: 'application/json',
              ['Authorization']: createAuthorizationHeader(getRefreshToken()),
            },
          });

          const { accessToken, refreshToken } = res.data ?? {};
          localStorage.setItem(LocalStorageKeys.access_token, accessToken);
          localStorage.setItem(LocalStorageKeys.refresh_token, refreshToken);
          http.defaults.headers.common['Authorization'] = createAuthorizationHeader(accessToken);
          isRefreshing = false;
          processQueue(null, accessToken);

          return http(originalRequest);
        } catch (err) {
          console.error(err);
          processQueue(err, null);
          // Do something ex. logout

          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default http;
