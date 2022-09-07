import { IRestService } from '../src/types';
import { HttpService, RestService } from '../src';
import mockAxios from 'jest-mock-axios';

describe('RestService', () => {
  let restService: IRestService<unknown>;

  class TestRestService extends RestService<unknown> {
    protected config = {
      baseURL: 'https://jsonplaceholder.typicode.com',
    };
    protected path = '/users';
  }

  beforeEach(() => {
    restService = new TestRestService();
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should be an instance of HttpService', () => {
    expect(restService).toBeInstanceOf(HttpService);
  });

  it('should implements the resource CRUD methods', () => {
    expect(restService.fetch).toBeDefined();
    expect(restService.createOne).toBeDefined();
    expect(restService.fetchOne).toBeDefined();
    expect(restService.updateOne).toBeDefined();
    expect(restService.deleteOne).toBeDefined();
  });

  describe('fetch', () => {
    it('should call the axios get method when fetch is invoked', async () => {
      const response = [
        {
          name: 'John',
        },
      ];
      mockAxios.get.mockResolvedValue({ data: response });
      await restService.fetch();

      expect(mockAxios.get).toBeCalledTimes(1);
      expect(mockAxios.get).toBeCalledWith('/', { params: undefined });
    });

    it('should call the axios get method when fetch is invoked with params', async () => {
      const response = [
        {
          name: 'John',
        },
      ];
      const params = { page: 1, pageSize: 15 };
      mockAxios.get.mockResolvedValue({ data: response });
      await restService.fetch(params);

      expect(mockAxios.get).toBeCalledTimes(1);
      expect(mockAxios.get).toBeCalledWith('/', { params });
    });
  });

  describe('createOne', () => {
    it('should call the axios post method when createOne is invoked', async () => {
      const response = {
        name: 'John',
      };
      mockAxios.post.mockResolvedValue({ data: response });
      await restService.createOne();

      expect(mockAxios.post).toBeCalledTimes(1);
      expect(mockAxios.post).toBeCalledWith('/', undefined);
    });

    it('should call the axios post method when createOne is invoked with data', async () => {
      const response = [
        {
          name: 'John',
        },
      ];
      const data = { page: 1, pageSize: 15 };
      mockAxios.post.mockResolvedValue({ data: response });
      await restService.createOne(data);

      expect(mockAxios.post).toBeCalledTimes(1);
      expect(mockAxios.post).toBeCalledWith('/', data);
    });
  });

  describe('fetchOne', () => {
    it('should call the axios get method when fetchOne is invoked', async () => {
      const response = {
        name: 'John',
      };
      mockAxios.get.mockResolvedValue({ data: response });
      await restService.fetchOne(1);

      expect(mockAxios.get).toBeCalledTimes(1);
      expect(mockAxios.get).toBeCalledWith('/1');
    });
  });

  describe('updateOne', () => {
    it('should call the axios patch method when updateOne is invoked', async () => {
      const response = {
        id: 1,
        name: 'John',
      };
      mockAxios.patch.mockResolvedValue({ data: response });
      const payload = {
        name: 'John',
      };

      await restService.updateOne(1, payload);

      expect(mockAxios.patch).toBeCalledTimes(1);
      expect(mockAxios.patch).toBeCalledWith('/1', payload);
    });
  });

  describe('deleteOne', () => {
    it('should call the axios delete method when deleteOne is invoked', async () => {
      const response = undefined;
      mockAxios.delete.mockResolvedValue({ data: response });

      await restService.deleteOne(1);

      expect(mockAxios.delete).toBeCalledTimes(1);
      expect(mockAxios.delete).toBeCalledWith('/1');
    });
  });
});
