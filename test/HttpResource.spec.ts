import { IRequestInterceptor, IResponseInterceptor } from '../src/types';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpResource } from '../src';

describe('HttpResource', () => {
  const requestInterceptorFactory = (): IRequestInterceptor => {
    return (e: AxiosRequestConfig): AxiosRequestConfig => e;
  };

  const responseInterceptorFactory = (): IResponseInterceptor => {
    return (e: AxiosResponse): AxiosResponse => e;
  };

  const config: AxiosRequestConfig = {
    baseURL: 'https://jsonplaceholder.typicode.com',
  };

  const globalRequestInterceptor = requestInterceptorFactory();
  const globalResponseInterceptor = responseInterceptorFactory();

  class TestResource extends HttpResource {
    protected path = '/';
    protected config = config;
    protected globalRequestInterceptors: IRequestInterceptor[] = [globalRequestInterceptor];
    protected globalResponseInterceptors: IResponseInterceptor[] = [globalResponseInterceptor];

    getClient(): AxiosInstance {
      return this.client;
    }

    getRequestInterceptors(): IRequestInterceptor[] {
      return this._requestInterceptors;
    }

    getResponseInterceptors(): IResponseInterceptor[] {
      return this._responseInterceptors;
    }
  }

  it('should be an instance of HttpResource', async () => {
    const resource = new TestResource();
    expect(resource).toBeInstanceOf(HttpResource);
  });

  it('should have a axios instance as client', async () => {
    const resource = new TestResource();
    const client = resource.getClient();
    expect(client.get).toBeDefined();
    expect(client.post).toBeDefined();
    expect(client.put).toBeDefined();
    expect(client.patch).toBeDefined();
    expect(client.delete).toBeDefined();
    expect(client.options).toBeDefined();
    expect(client.head).toBeDefined();
  });

  it('should merge the global request interceptors with the instance request interceptors', async () => {
    const requestInterceptor1 = requestInterceptorFactory();
    const requestInterceptor2 = requestInterceptorFactory();
    const requestInterceptors = [requestInterceptor1, requestInterceptor2];
    const resource = new TestResource(requestInterceptors);
    const interceptors = resource.getRequestInterceptors();
    expect(interceptors).toStrictEqual([globalRequestInterceptor, requestInterceptor1, requestInterceptor2]);
  });

  it('should merge the global response interceptors with the instance request interceptors', async () => {
    const responseInterceptor1 = responseInterceptorFactory();
    const responseInterceptor2 = responseInterceptorFactory();
    const responseInterceptors = [responseInterceptor1, responseInterceptor2];
    const resource = new TestResource([], responseInterceptors);
    const interceptors = resource.getResponseInterceptors();
    expect(interceptors).toStrictEqual([globalResponseInterceptor, responseInterceptor1, responseInterceptor2]);
  });
});
