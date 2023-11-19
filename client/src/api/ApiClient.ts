/* eslint-disable */
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

export interface ApiError {
    message: string;
    status: number;
}

export class ApiClient {
    private readonly baseURL: string = 'http://127.0.0.1:5000/';

    private async request<T>(config: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await axios.request<T>({
            baseURL: this.baseURL,
            ...config,
        });

        return response.data;
    }

    public async get<T>(
        url: string,
        config?: AxiosRequestConfig,
        queryParams?: any,
    ): Promise<T> {
        return (await queryParams)
            ? await this.request<T>({
                  url,
                  method: 'GET',
                  params: queryParams,
                  ...config,
              })
            : await this.request<T>({ url, method: 'GET', ...config });
    }

    public async post<T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        return await this.request<T>({ url: url, method: 'POST', data: data, ...config });
    }

    public async put<T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        return await this.request<T>({ url, method: 'PUT', data, ...config });
    }

    public async delete<T>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        return await this.request<T>({ url, method: 'DELETE', ...config });
    }
}
