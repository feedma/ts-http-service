# REST services

This package provides an abstract class that you can extend to create HTTP clients to perform the common REST actions 
to restful API with the minimal configuration.

## Creating a RestService class

You must create a class that extents of `RestService` abstract class.

::: tip
if you are using typescript is required to indicate
the service data type.
:::

In the example below we are setting the `IUser` interface:

:::: code-group
::: code-group-item Typescript
```ts
// UserService.ts

import { RestService } from "@feedma/http-service";
import { AxiosRequestConfig } from 'axios';
import { endpoints } from '../config/services';
import { IUser } from './types'

class UserService extends RestService<IUser> {
  protected config: AxiosRequestConfig = endpoints.api;
}
```
:::
::: code-group-item Javascript
```js
// UserService.ts

import { RestService } from '@feedma/http-service';
import { endpoints } from '../config/services';

export class JsonPlaceHolderService extends RestService {
  constructor(requestInterceptors = [], responseInterceptors = []) {
    super(requestInterceptors, responseInterceptors);
    this.config = endpoints.jsonplaceholder;
    this.path = '/users';
  }
}
```
:::
::::

## The RestService

The `RestService` _class_ implements the interface `IRestService<T>` with the following methods:


```ts
export interface IRestService<T, L = T[]> {
  fetch(params?: Record<string, unknown>): ServiceResponse<L>;
  createOne(data?: Record<string, unknown>): ServiceResponse<T>;
  fetchOne(id: string | number): ServiceResponse<T>;
  updateOne(id: string | number, data?: Record<string, unknown>): ServiceResponse<T>;
  deleteOne<R = void>(id: string | number): ServiceResponse<R>;
}
```

::: tip 
In this section you must treat the `Id` as an alias of `string | number` type.

`ServiceResponse<T>` is an alias of `Promise<AxiosResponse<T>>`
:::


| Class method | HTTP verb | Params                            | Return type             |
|--------------|-----------|-----------------------------------|-------------------------|
| `fetch`      | `GET`     | **query**: `Object`               | `ServiceResponse<T>`    |
| `createOne`  | `POST`    | **data**: `Object`                | `ServiceResponse<T>`    |
| `fetchOne`   | `GET`     | **id**: `Id`                      | `ServiceResponse<T>`    |
| `updateOne`  | `PATCH`   | **id**: `Id`,  **data**: `Object` | `ServiceResponse<T>`    |
| `deleteOne`  | `DELETE`  | **id**: `Id`                      | `ServiceResponse<void>` |






