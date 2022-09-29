import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type IRequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
export type IResponseInterceptor<R = AxiosResponse> = (response: R) => R | Promise<R>;

export interface IRestService<T, L = T[]> {
  fetch(params?: Record<string, unknown>): Promise<AxiosResponse<L>>;

  createOne(data?: Record<string, unknown>): Promise<AxiosResponse<T>>;

  fetchOne(id: string | number): Promise<AxiosResponse<T>>;

  updateOne(id: string | number, data?: Record<string, unknown>): Promise<AxiosResponse<T>>;

  deleteOne<R = void>(id: string | number): Promise<AxiosResponse<R>>;
}
