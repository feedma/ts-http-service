import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IRequestInterceptor, IResponseInterceptor } from '../types';

export class ClientFactory {
  /**
   * Build a new Instance of Axios
   * @param {AxiosRequestConfig} options
   * @param {string} basePath
   * @param {IRequestInterceptor[]} requestInterceptors
   * @param {IResponseInterceptor[]} responseInterceptors
   * @returns {AxiosInstance}
   */
  static build(
    options: AxiosRequestConfig = {},
    basePath = '/',
    requestInterceptors: IRequestInterceptor[] = [],
    responseInterceptors: IResponseInterceptor[] = [],
  ): AxiosInstance {
    const segments = [options.baseURL, basePath].filter((segment) => ![undefined, null, '', '/'].includes(segment));
    const baseURL = ClientFactory.sanitizeUrl(segments.join('/'));
    const axiosInstance = axios.create({ ...options, baseURL });
    ClientFactory.applyGlobalRequestInterceptors(axiosInstance, requestInterceptors);
    ClientFactory.applyGlobalResponseInterceptors(axiosInstance, responseInterceptors);
    return axiosInstance;
  }

  static sanitizeUrl(url: string): string {
    return url.replace(/([^:]\/)\/+/g, '$1');
  }

  /**
   * Apply a list of request interceptors globally
   * @param {AxiosInstance} axiosInstance
   * @param {IRequestInterceptor[]} interceptors
   */
  static applyGlobalRequestInterceptors(
    axiosInstance: AxiosInstance,
    interceptors: Array<IRequestInterceptor> = [],
  ): void {
    const requestInterceptors = [...interceptors];

    requestInterceptors.forEach((interceptor) => {
      ClientFactory.applyGlobalRequestInterceptor(axiosInstance, interceptor);
    });
  }

  /**
   * Apply a list of response interceptors globally
   * @param {AxiosInstance} axiosInstance
   * @param {IResponseInterceptor[]} interceptors
   */
  static applyGlobalResponseInterceptors(
    axiosInstance: AxiosInstance,
    interceptors: Array<IResponseInterceptor> = [],
  ): void {
    const responseInterceptors = [...interceptors];

    responseInterceptors.forEach((interceptor) => {
      ClientFactory.applyGlobalResponseInterceptor(axiosInstance, interceptor);
    });
  }

  /**
   * Apply a request interceptors globally
   * @param axiosInstance {AxiosInstance}
   * @param interceptor {IRequestInterceptor}
   */
  static applyGlobalRequestInterceptor(axiosInstance: AxiosInstance, interceptor: IRequestInterceptor): void {
    axiosInstance.interceptors.request.use(interceptor);
  }

  /**
   * Apply a response interceptors globally
   * @param axiosInstance {AxiosInstance}
   * @param interceptor {IResponseInterceptor}
   */
  static applyGlobalResponseInterceptor(axiosInstance: AxiosInstance, interceptor: IResponseInterceptor): void {
    axiosInstance.interceptors.response.use(interceptor);
  }
}
