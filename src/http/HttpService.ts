import { IRequestInterceptor, IResponseInterceptor } from '../types';
import { ClientFactory } from './ClientFactory';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

export abstract class HttpService {
  private _httpClient: AxiosInstance | null = null;
  protected abstract config: AxiosRequestConfig;
  protected abstract path: string;
  protected abstract globalRequestInterceptors: IRequestInterceptor[];
  protected abstract globalResponseInterceptors: IResponseInterceptor[];

  constructor(
    private requestInterceptors: IRequestInterceptor[] = [],
    private responseInterceptors: IResponseInterceptor[] = [],
  ) {}

  protected get _requestInterceptors(): IRequestInterceptor[] {
    return [...this.globalRequestInterceptors, ...this.requestInterceptors];
  }

  protected get _responseInterceptors(): IResponseInterceptor[] {
    return [...this.globalResponseInterceptors, ...this.responseInterceptors];
  }

  private buildClient(): AxiosInstance {
    return ClientFactory.build(this.config, this.path, this._requestInterceptors, this._responseInterceptors);
  }

  protected get client(): AxiosInstance {
    if (!this._httpClient) {
      this._httpClient = this.buildClient();
    }
    return this._httpClient;
  }
}
