import axios, {AxiosRequestConfig, AxiosInstance, AxiosError} from 'axios';

export interface RequestConfig extends AxiosRequestConfig {
  autoHint?: boolean
}

class HttpClient {
  client: AxiosInstance;

  constructor(public baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl, // 注意大小写
      timeout: 10 * 1000,
      headers: {}
    });
  }

  handleError(error: AxiosError) {
    if (error.isAxiosError) {
      return this.handleAxiosError(error as AxiosError);
    } else {
      throw error;
    }
  }

  handleAxiosError(error: AxiosError) {
    if (error.response?.status === 401) {
      console.error('未登录');
    }
    throw error;
  }

  ajax<T>(options: RequestConfig) {
    const {method, url, data, autoHint, ...config} = options;
    const promise =
      method === 'get' ? this.client.get<T>(url!, config) :
        method === 'post' ? this.client.post<T>(url!, data, config) :
          method === 'patch' ? this.client.patch<T>(url!, data, config) :
            method === 'delete' ? this.client.patch<T>(url!, config) : undefined as never;
    if (autoHint) {
      return promise.then(null, (error) => this.handleError(error));
    } else {
      return promise;
    }
  }

  get<T>(url: string, options?: RequestConfig) {
    this.ajax<T>({...options, url, method: 'get'});
  }

  post<T>(url: string, data?: unknown, options?: RequestConfig) {
    this.ajax<T>({...options, method: 'post'});
  }

  patch<T>(url: string, data?: unknown, options?: RequestConfig) {
    this.ajax<T>({...options, method: 'patch'});
  }

  delete<T>(url: string, options: RequestConfig) {
    this.ajax<T>({...options, url, method: 'delete'});
  }
}

const defaultHttpClient = new HttpClient('http://localhost:8080/api/v1/');
export {defaultHttpClient, HttpClient};
