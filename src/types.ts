import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type ResourceResponse<R> = Promise<AxiosResponse<R>>;
export type IRequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
export type IResponseInterceptor<R = AxiosResponse> = (response: R) => R | Promise<R>;
