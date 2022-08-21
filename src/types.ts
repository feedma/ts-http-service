import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type ResourceResponse<R> = Promise<AxiosResponse<R>>;
export type IRequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
export type IResponseInterceptor<R = AxiosResponse> = (response: R) => R | Promise<R>;

export interface IRestResource<T, L = T[]> {
  fetch(params?: Record<string, unknown>): ResourceResponse<L>;

  createOne(data?: Record<string, unknown>): ResourceResponse<T>;

  fetchOne(id: string | number): ResourceResponse<T>;

  updateOne(id: string | number, data?: Record<string, unknown>): ResourceResponse<T>;

  deleteOne<R = void>(id: string | number): ResourceResponse<R>;
}
