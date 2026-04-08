import WPError, { ApiError } from '../Errors';
import fetch, { HeadersInit } from 'node-fetch';

import { ISiteSettings } from '../../interfaces';

export default class SettingsUpdateModel {
  protected baseUrl: string;
  protected suffix: string;
  protected data: Partial<ISiteSettings>;
  protected headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  constructor(baseUrl: string, suffix: string, data: Partial<ISiteSettings>) {
    this.baseUrl = baseUrl;
    this.suffix = suffix;
    this.data = data;
  }

  public setHeaders(headers: HeadersInit): SettingsUpdateModel {
    this.headers = { ...this.headers, ...headers };
    return this;
  }

  public addHeader(key: string, value: string): SettingsUpdateModel {
    this.headers = { ...this.headers, [key]: value };
    return this;
  }

  public async request(): Promise<ISiteSettings> {
    const fullUrl = `${this.baseUrl}${this.suffix}`;
    
    // Settings usa POST para actualizar, no PATCH
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(this.data),
    });

    const responseData: any = await response.json();
    
    if (responseData.code) {
      throw new WPError(responseData as ApiError);
    }
    
    return responseData as ISiteSettings;
  }
}