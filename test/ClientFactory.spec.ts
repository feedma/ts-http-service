import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ClientFactory } from '../src';
import { IRequestInterceptor, IResponseInterceptor } from '../src/types';

describe('ClientFactory', () => {
  it('should create an axios instance', async () => {
    const client = ClientFactory.build();
    expect(client.get).toBeInstanceOf(Function);
    expect(client.post).toBeInstanceOf(Function);
    expect(client.put).toBeInstanceOf(Function);
    expect(client.patch).toBeInstanceOf(Function);
    expect(client.delete).toBeInstanceOf(Function);
    expect(client.options).toBeInstanceOf(Function);
    expect(client.head).toBeInstanceOf(Function);
    expect(client.postForm).toBeInstanceOf(Function);
    expect(client.putForm).toBeInstanceOf(Function);
    expect(client.patchForm).toBeInstanceOf(Function);
  });

  it('should sanitize url removing double slahes', () => {
    const expectedUrl = 'https://api.test.com/with/path';
    expect(ClientFactory.sanitizeUrl('https://api.test.com//with/path')).toBe(expectedUrl);
    expect(ClientFactory.sanitizeUrl('https://api.test.com//with///path')).toBe(expectedUrl);
  });

  it('should add a single request interceptor', () => {
    const interceptor: IRequestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => config;
    const client = ClientFactory.build();
    jest.spyOn(client.interceptors.request, 'use');

    ClientFactory.applyGlobalRequestInterceptor(client, interceptor);
    expect(client.interceptors.request.use).toBeCalledTimes(1);
    expect(client.interceptors.request.use).toBeCalledWith(interceptor);
  });

  it('should add a single response interceptor', () => {
    const interceptor: IResponseInterceptor = (config: AxiosResponse): AxiosResponse => config;
    const client = ClientFactory.build();
    jest.spyOn(client.interceptors.response, 'use');

    ClientFactory.applyGlobalResponseInterceptor(client, interceptor);
    expect(client.interceptors.response.use).toBeCalledTimes(1);
    expect(client.interceptors.response.use).toBeCalledWith(interceptor);
  });

  it('should add multiple request interceptor', () => {
    const interceptor: IRequestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => config;
    const interceptor2: IRequestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => config;
    const client = ClientFactory.build();
    jest.spyOn(client.interceptors.request, 'use');

    ClientFactory.applyGlobalRequestInterceptors(client, [interceptor, interceptor2]);
    expect(client.interceptors.request.use).toBeCalledTimes(2);
    expect(client.interceptors.request.use).toBeCalledWith(interceptor);
    expect(client.interceptors.request.use).toBeCalledWith(interceptor2);
  });

  it('should add multiple response interceptor', () => {
    const interceptor: IResponseInterceptor = (config: AxiosResponse): AxiosResponse => config;
    const interceptor2: IResponseInterceptor = (config: AxiosResponse): AxiosResponse => config;
    const client = ClientFactory.build();
    jest.spyOn(client.interceptors.response, 'use');

    ClientFactory.applyGlobalResponseInterceptors(client, [interceptor, interceptor2]);
    expect(client.interceptors.response.use).toBeCalledTimes(2);
    expect(client.interceptors.response.use).toBeCalledWith(interceptor);
    expect(client.interceptors.response.use).toBeCalledWith(interceptor2);
    expect(client.interceptors.response).toBeTruthy();
  });
});
