[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![npm version](https://badge.fury.io/js/@feedma%2Fhttp-service.svg)](https://badge.fury.io/js/@feedma%2Fhttp-service)


# Quickstart

**Installation**

See the full [documentation](https://feedma.github.io/ts-http-service)

NPM
```shell
npm i axios @feedma/http-service
```

YARN
```shell
yarn add axios @feedma/http-service
```

**Create a service**

Typescript
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

Javascript
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

**Make request**

Typescript
```ts
// app.ts

import { JsonPlaceHolderService } from './JsonPlaceHolderService';

const service: JsonPlaceHolderService = new JsonPlaceHolderService();

const app = async () => {
  const { data } = await service.fetchUsers();
};
```

Javascript
```js
// app.js

import { JsonPlaceHolderService } from './JsonPlaceHolderService';

const service = new JsonPlaceHolderService();

const app = async () => {
  const { data } = await service.fetchUsers();
};
```
