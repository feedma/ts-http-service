# HTTP Resource
A class based HTTP client built on top of axios 


## Basic usage

We provide a base class to extend if you are using `REST` services


```ts
import { RestService, ResourceResponse } from "@feedma/http-service";
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '@config';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

class JsonPlaceholderPostService extends RestService<Post> {
  protected config: AxiosRequestConfig = config.api;
  protected path: string = '/posts'
}

const postService = new JsonPlaceholderPostService()

// now you can use the service inside of any async funcioion
// ResourceResponse<T> is an alias of Promise<AxiosResponse<T>>
const sample = async () => {
  // [GET] to fetch all data @returns 
  const listResponse: ResourceResponse<Post[]> = await postService.fetch();

  // [POST] to create a single record
  const creationResponse: ResourceResponse<Post> = await postService.createOne({
    //... your data here
  });

  // [GET] to get a single record by id
  const fetchOneResponse: ResourceResponse<Post> = await postService.fetchOne(1);
  
  // [PATCH] to update a single record by id 
  const updateOneResponse: ResourceResponse<Post> = await postService.updateOne(1, {
    //... your data here
  });
  
  // [DELETE] to remove a single record by id
  const deletionResponse: ResourceResponse<void> = await postService.deleteOne(1);
}

```

