# Getting started

Since this package is built on top of [axios](https://www.npmjs.com/package/axios), your project must have installed the 
axios package first.

## Installation

To install the `HttpService` package and the **axios** dependency run the following command in your terminal:

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

## Basic usage

### Configuration

The `HttpService` module provides an _abstract class_ that you can extend to configure the `axios` HTTP client, and the 
most part of the process is setting the config in your inherited _class_.

For example if you want to create a client for the [jsonplaceholder](https://jsonplaceholder.typicode.com) fake API, a 
great way to do it is to create the class `JsonPlaceHolderService`.

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

As you can see the config property expects an object that implements the `AxiosRequestConfig`. Take a look in the
[axios docs](https://axios-http.com/docs/intro) if you want to learn more about the 
[axios request config](https://axios-http.com/docs/req_config) properties.


::: tip
A great way to keep yor `JsonPlaceHolderService` class as clean as possible is storing yor api config into a different 
file in your project, for example `src/configs/services.ts`.
:::


:::: code-group
::: code-group-item Typescript
```ts
// src/configs/services.ts

import { AxiosRequestConfig } from 'axios';

export const endpoints: Record<string, AxiosRequestConfig> = {
  jsonplaceholder: {
    baseURL: "https://jsonplaceholder.typicode.com",
  },
}
```
:::
::: code-group-item Javascript
```js
// src/configs/services.js

export const endpoints = {
  jsonplaceholder: {
    baseURL: "https://jsonplaceholder.typicode.com",
  },
};
```
:::
::::


### Creating request methods

Now you are able to add methods for make request to the _jsonplaceholder_ API, in this example we will add a method to 
fetch the list of [users](https://jsonplaceholder.typicode.com/users), to do it we must use the `client` of our class, 
the client is an [AxiosInstance](https://axios-http.com/docs/instance), so you have all its available methods.

:::: code-group
::: code-group-item Typescript
```ts
// JsonPlaceHolderService.ts

import { HttpService } from '@feedma/http-service';
import { AxiosRequestConfig } from 'axios';
import { endpoints } from '../config/services';

export class JsonPlaceHolderService extends HttpService {
  protected config: AxiosRequestConfig = endpoints.jsonplaceholder;
  
  async fetchUsers(): Promise<AxiosResponse> {
    return this.client.get('/users');
  }
  
  // Yor additional methods here ...
}
```
:::
::: code-group-item Javascript
```js
// JsonPlaceHolderService.js

import { HttpService } from '@feedma/http-service';
import { endpoints } from '../config/services';

export class JsonPlaceHolderService extends HttpService {
  constructor(requestInterceptors = [], responseInterceptors = []) {
    super(requestInterceptors, responseInterceptors);
    this.config = endpoints.jsonplaceholder;
  }
  async fetchUsers() {
    return this.client.get('/users');
  }
  // Yor request methods here ...
}
```
:::
::::

### Using the service class
Finally, import the service class in some place in our application to make a request and get the list of users:

:::: code-group
::: code-group-item Typescript
```ts
// app.ts

import { ServiceResponse } from "@feedma/http-service/lib/types";
import { JsonPlaceHolderService } from './JsonPlaceHolderService';
import { IUser } from './types'

const service = new JsonPlaceHolderService();

const app = async () => {
  const { data }: ServiceResponse<IUser[]> = await service.fetchUsers();
  console.log(data);

  // The rest of our app code...
}
```
:::
::: code-group-item Javascript
```js
// app.js

import { JsonPlaceHolderService } from './JsonPlaceHolderService';

const service = new JsonPlaceHolderService();

const app = async () => {
  const { data } = await service.fetchUsers();
  console.log(data);
    
  // The rest of our app code...
};
```
:::
::::