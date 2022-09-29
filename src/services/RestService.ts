import { AxiosResponse } from 'axios';
import { HttpService } from '../http/HttpService';
import { IRestService } from '../types';

export abstract class RestService<T, L = T[]> extends HttpService implements IRestService<T, L> {
  protected abstract path: string;

  async fetch(params?: Record<string, unknown>): Promise<AxiosResponse<L>> {
    return this.client.get<L>('/', { params });
  }

  async createOne(data?: Record<string, unknown>): Promise<AxiosResponse<T>> {
    return this.client.post<T>('/', data);
  }

  async fetchOne(id: string | number): Promise<AxiosResponse<T>> {
    return this.client.get<T>(`/${id}`);
  }

  async updateOne(id: string | number, data?: Record<string, unknown>): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(`/${id}`, data);
  }

  async deleteOne<R = void>(id: string | number): Promise<AxiosResponse<R>> {
    return this.client.delete<R>(`/${id}`);
  }
}
