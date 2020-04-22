import axios, {AxiosRequestConfig, AxiosInstance, AxiosError} from 'axios';
import {alert} from 'components/Dialog';
import {history, pathnameBeforeSignIn} from './history';

export interface RequestConfig extends AxiosRequestConfig {
  autoHandlerError?: boolean
}

class HttpClient {
  client: AxiosInstance;


  constructor(
    public baseUrl: string,
    public handleError?: (error: any) => void
  ) {
    this.client = axios.create({
      baseURL: baseUrl, // 注意大小写
      timeout: 10 * 1000,
      headers: {}
    });
  }

  ajax<T>(options: RequestConfig) {
    const {method, url, data, autoHandlerError, ...config} = options;
    const promise =
      method === 'get' ? this.client.get<T>(url!, config) :
        method === 'post' ? this.client.post<T>(url!, data, config) :
          method === 'patch' ? this.client.patch<T>(url!, data, config) :
            method === 'delete' ? this.client.patch<T>(url!, config) : undefined as never;
    if (autoHandlerError) {
      return promise.then(null, (error) => this.handleError?.(error));
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

const defaultHttpClient = new HttpClient('http://localhost:8080/api/v1/', (error) => {
  if (error.isAxiosError) {
    if ((error as AxiosError).response?.status === 401) {
      return alert('请先登录', () => {
        pathnameBeforeSignIn.value = history.location.pathname
        history.push('/sign_in');
      });
    }
  }
  throw error;
});
export {defaultHttpClient, HttpClient};
