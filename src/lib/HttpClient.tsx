import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import {showAlert} from 'components/Dialog';
import {history, pathnameBeforeSignIn} from './history';

export interface RequestConfig extends AxiosRequestConfig {
  autoHandlerError?: boolean | ((error: any) => boolean);
}

class HttpClient {
  client: AxiosInstance;


  constructor(
    public baseUrl: string,
    public handleError?: (error: any) => Promise<never>
  ) {
    this.client = axios.create({
      baseURL: baseUrl, // 注意大小写
      timeout: 10 * 1000,
      headers: {},
      withCredentials: true,
    });
    this.testMock();
  }

  testMock() {

  }

  ajax<T>(options: RequestConfig) {
    const {method, url, data, autoHandlerError, ...config} = options;
    const promise =
      method === 'get' ? this.client.get<T>(url!, config) :
        method === 'post' ? this.client.post<T>(url!, data, config) :
          method === 'patch' ? this.client.patch<T>(url!, data, config) :
            method === 'delete' ? this.client.delete<T>(url!, config) : undefined as never;
    return promise.then(null, (error) => {
      if ((typeof autoHandlerError === 'function' ? autoHandlerError(error) : autoHandlerError)
        && this.handleError) {
        return this.handleError(error);
      } else {
        return Promise.reject(error);
      }
    });
  }

  get<T>(url: string, options?: RequestConfig) {
    return this.ajax<T>({...options, url, method: 'get'});
  }

  post<T>(url: string, data?: unknown, options?: RequestConfig) {
    return this.ajax<T>({...options, url, data, method: 'post'});
  }

  patch<T>(url: string, data?: unknown, options?: RequestConfig) {
    return this.ajax<T>({...options, url, data, method: 'patch'});
  }

  delete<T>(url: string, options?: RequestConfig) {
    return this.ajax<T>({...options, url, method: 'delete'});
  }
}

const isDev = () => window.location.hostname === 'localhost';

const defaultHttpClient = new HttpClient(
  isDev() ? '/api/v1/' : '/api/v1/',
  (error) => {
    if (error.isAxiosError) {
      const {response} = error as AxiosError;
      if (response === undefined) {
        showAlert('网络错误');
      } else if (response?.status === 401) {
        showAlert('请先登录', () => {
          pathnameBeforeSignIn.value = history.location.pathname;
          history.push('/sign_in');
        });
      } else if (response?.status === 404) {
        showAlert('你访问的资源不存在', () => {
          history.push('/');
        });
      } else if (response?.status >= 400) {
        showAlert(`服务器繁忙，错误码：${response.status}`);
      }
    }
    return Promise.reject(error);
  });
export {defaultHttpClient, HttpClient};
