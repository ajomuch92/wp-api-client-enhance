import fetch, { HeadersInit } from 'node-fetch';
import { IBase } from '../../interfaces';
import WPError, { ApiError } from '../Errors';
import Parameter from '../Parameter';

export default class RequestListModel<T extends IBase> {
  protected globalParameter: Parameter;
  protected baseUrl: String;
  protected suffix: string | String;
  protected headers?: HeadersInit;

  constructor(baseUrl: String, suffix: string | String) {
    this.baseUrl = baseUrl;
    this.suffix = suffix;
    this.globalParameter = new Parameter();
  }

  public offset(number: number | string): RequestListModel<T> {
    this.globalParameter.offset = number;
    return this;
  }
  
  public fields(fields: String | string[] | number | number[]): RequestListModel<T> {
    this.globalParameter.fields = fields;
    return this;
  }
  
  public page(page: number | string): RequestListModel<T> {
    this.globalParameter.page = page;
    return this;
  }
  
  public perPage(perPage: number | string): RequestListModel<T> {
    this.globalParameter.perPage = perPage;
    return this;
  }

  public setHeaders(headers: HeadersInit): RequestListModel<T> {
    this.headers = headers;
    return this;
  }

  public async request(): Promise<T | T[]> {
    const response = await fetch(`${this.baseUrl}${this.suffix}?${this.globalParameter.toQueryStringFields()}`);
    const data: any = await response.json();
    if (data.code) {
      throw new WPError(data as ApiError);
    }
    return Array.isArray(data) ? data as T[] : data as T;
  }
}