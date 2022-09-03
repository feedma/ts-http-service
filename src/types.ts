import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type ServiceResponse<R> = Promise<AxiosResponse<R>>;
export type IRequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
export type IResponseInterceptor<R = AxiosResponse> = (response: R) => R | Promise<R>;

export interface IRestService<T, L = T[]> {
  fetch(params?: Record<string, unknown>): ServiceResponse<L>;

  createOne(data?: Record<string, unknown>): ServiceResponse<T>;

  fetchOne(id: string | number): ServiceResponse<T>;

  updateOne(id: string | number, data?: Record<string, unknown>): ServiceResponse<T>;

  deleteOne<R = void>(id: string | number): ServiceResponse<R>;
}
