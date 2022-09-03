import { HttpService } from '../http/HttpService';
import { IRequestInterceptor, IResponseInterceptor, IRestService, ServiceResponse } from '../types';

export abstract class RestService<T, L = T[]> extends HttpService implements IRestService<T, L> {
  protected globalRequestInterceptors: IRequestInterceptor[] = [];
  protected globalResponseInterceptors: IResponseInterceptor[] = [];

  async fetch(params?: Record<string, unknown>): ServiceResponse<L> {
    return this.client.get<L>('/', { params });
  }

  async createOne(data?: Record<string, unknown>): ServiceResponse<T> {
    return this.client.post<T>('/', data);
  }

  async fetchOne(id: string | number): ServiceResponse<T> {
    return this.client.get<T>(`/${id}`);
  }

  async updateOne(id: string | number, data?: Record<string, unknown>): ServiceResponse<T> {
    return this.client.patch<T>(`/${id}`, data);
  }

  async deleteOne<R = void>(id: string | number): ServiceResponse<R> {
    return this.client.delete<R>(`/${id}`);
  }
}
