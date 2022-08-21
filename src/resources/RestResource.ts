import { HttpResource } from '../http/HttpResource';
import { IRequestInterceptor, IResponseInterceptor, IRestResource, ResourceResponse } from '../types';

export abstract class RestResource<T, L = T[]> extends HttpResource implements IRestResource<T, L> {
  protected globalRequestInterceptors: IRequestInterceptor[] = [];
  protected globalResponseInterceptors: IResponseInterceptor[] = [];

  async fetch(params?: Record<string, unknown>): ResourceResponse<L> {
    return this.client.get<L>('/', { params });
  }

  async createOne(data?: Record<string, unknown>): ResourceResponse<T> {
    return this.client.post<T>('/', data);
  }

  async fetchOne(id: string | number): ResourceResponse<T> {
    return this.client.get<T>(`/${id}`);
  }

  async updateOne(id: string | number, data?: Record<string, unknown>): ResourceResponse<T> {
    return this.client.patch<T>(`/${id}`, data);
  }

  async deleteOne<R = void>(id: string | number): ResourceResponse<R> {
    return this.client.delete<R>(`/${id}`);
  }
}
