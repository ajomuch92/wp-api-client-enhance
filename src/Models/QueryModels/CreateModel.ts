import WPError, { ApiError } from '../Errors';
import fetch, { HeadersInit } from 'node-fetch';

import { IBase } from '../../interfaces';

export default class CreateModel<T extends IBase> {
  protected baseUrl: string;
  protected suffix: string;
  protected data: Partial<T>;
  protected headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  constructor(baseUrl: string, suffix: string, data: Partial<T>) {
    this.baseUrl = baseUrl;
    this.suffix = suffix;
    this.data = data;
  }

  public setHeaders(headers: HeadersInit): CreateModel<T> {
    this.headers = { ...this.headers, ...headers };
    return this;
  }

  public addHeader(key: string, value: string): CreateModel<T> {
    this.headers = { ...this.headers, [key]: value };
    return this;
  }

  public async request(): Promise<T> {
    const fullUrl = `${this.baseUrl}${this.suffix}`;
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(this.data),
    });

    const responseData: any = await response.json();
    
    if (responseData.code) {
      throw new WPError(responseData as ApiError);
    }
    
    return responseData as T;
  }
}