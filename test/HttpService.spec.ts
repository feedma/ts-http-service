import { IRequestInterceptor, IResponseInterceptor } from '../src/types';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpService } from '../src';

describe('HttpService', () => {
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

  class TestService extends HttpService {
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

  it('should be an instance of HttpService', async () => {
    const service = new TestService();
    expect(service).toBeInstanceOf(HttpService);
  });

  it('should have a axios instance as client', async () => {
    const service = new TestService();
    const client = service.getClient();
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
    const service = new TestService(requestInterceptors);
    const interceptors = service.getRequestInterceptors();
    expect(interceptors).toStrictEqual([globalRequestInterceptor, requestInterceptor1, requestInterceptor2]);
  });

  it('should merge the global response interceptors with the instance request interceptors', async () => {
    const responseInterceptor1 = responseInterceptorFactory();
    const responseInterceptor2 = responseInterceptorFactory();
    const responseInterceptors = [responseInterceptor1, responseInterceptor2];
    const service = new TestService([], responseInterceptors);
    const interceptors = service.getResponseInterceptors();
    expect(interceptors).toStrictEqual([globalResponseInterceptor, responseInterceptor1, responseInterceptor2]);
  });
});
