import type {App} from "@diaazzawi/collinson-server";
import {treaty} from "@elysiajs/eden";
import axios, {AxiosInstance, RawAxiosRequestHeaders} from "axios";
import {ApiError} from "./shared/classes";

class HttpClient {
  private _axios: AxiosInstance;

  constructor() {
    this._axios = axios.create();
  }

  get = (url: string, config: RawAxiosRequestHeaders | null = null) => {
    try {
      const conf = config
        ? {
            ...config,
            method: "GET",
            url: url,
          }
        : {
            method: "GET",
            url: url,
          };
      return this._axios(conf);
    } catch (err: unknown) {
      throw new ApiError((err as Error).message);
    }
  };

  post = (
    url: string,
    body: any,
    config: RawAxiosRequestHeaders | null = null,
  ) => {
    try {
      const conf = config
        ? {
            ...config,
            method: "POST",
            url: url,
            data: body,
          }
        : {
            method: "POST",
            url: url,
            data: body,
          };
      return this._axios(conf);
    } catch (err: unknown) {
      throw new ApiError((err as Error).message);
    }
  };

  put = (
    url: string,
    body: any,
    config: RawAxiosRequestHeaders | null = null,
  ) => {
    try {
      const conf = config
        ? {
            ...config,
            method: "PUT",
            url: url,
            data: body,
          }
        : {
            method: "PUT",
            url: url,
            data: body,
          };
      return this._axios(conf);
    } catch (err: unknown) {
      throw new ApiError((err as Error).message);
    }
  };

  delete = (url: string, config: RawAxiosRequestHeaders | null = null) => {
    try {
      const conf = config
        ? {
            ...config,
            method: "DELETE",
            url: url,
          }
        : {
            method: "DELETE",
            url: url,
          };
      return this._axios(conf);
    } catch (err: unknown) {
      throw new ApiError((err as Error).message);
    }
  };
}

const httpClient = new HttpClient();

const elysiaClient: ReturnType<typeof treaty<App>> = treaty<App>(
  import.meta.env.VITE_PROXY_API_TARGET!,
  {},
);

export {elysiaClient, httpClient};
