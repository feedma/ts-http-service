# Quickstart

**Installation**

:::: code-group
::: code-group-item NPM
```shell
npm i axios @feedma/http-service
```
:::
::: code-group-item YARN
```shell
yarn add axios @feedma/http-service
```
:::
::::

**Create a service**

:::: code-group
::: code-group-item Typescript
```ts
// JsonPlaceHolderService.ts

import { HttpService } from '@feedma/http-service';
import { AxiosRequestConfig } from 'axios';

export class JsonPlaceHolderService extends HttpService {
  protected config: AxiosRequestConfig = { 
    baseURL: "https://jsonplaceholder.typicode.com" ,
  };
  
  async fetchUsers(): Promise<AxiosResponse> {
    return this.client.get('/users');
  }
  // Yor request methods here ...
}
```
:::
::: code-group-item Javascript
```js
// JsonPlaceHolderService.js

import { HttpService } from '@feedma/http-service';

export class JsonPlaceHolderService extends HttpService {
  
  constructor(requestInterceptors = [], responseInterceptors = []) {
    super(requestInterceptors, responseInterceptors);
    this.config = {
      baseURL: "https://jsonplaceholder.typicode.com",
    };
  }
  
  async fetchUsers() {
    return this.client.get('/users');
  }
  // Yor request methods here ...
}
```
:::
::::

**Make request**
:::: code-group
::: code-group-item Typescript
```ts
// app.ts

import { JsonPlaceHolderService } from './JsonPlaceHolderService';

const service: JsonPlaceHolderService = new JsonPlaceHolderService();

const app = async () => {
  const { data } = await service.fetchUsers();
};
```
:::
::: code-group-item Javascript
```js
// app.js

import { JsonPlaceHolderService } from './JsonPlaceHolderService';

const service = new JsonPlaceHolderService();

const app = async () => {
  const { data } = await service.fetchUsers();
};
```
:::
::::