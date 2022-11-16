import fetch, { HeadersInit } from 'node-fetch';
import { ApiActions } from '../../enum';
import { IBase } from '../../interfaces';
import WPError, { ApiError } from '../Errors';

export default class SingleModel<T extends IBase> {
  protected baseUrl: string | String;
  protected suffix: string | String;
  protected action?: ApiActions;
  protected id: string | String | number | Number;
  protected entity?: T;
  protected newEntity?: T;
  protected headers?: HeadersInit;

  constructor(baseUrl: string | String, suffix: string | String, id: string | String | number | Number) {
    this.baseUrl = baseUrl;
    this.suffix = suffix;
    this.id = id;
    this.action = ApiActions.Find;
  }


  public update(newEntity: T): SingleModel<T> {
    this.newEntity = newEntity;
    this.action = ApiActions.Update;
    return this;
  }

  public delete(): SingleModel<T> {
    this.action = ApiActions.Delete;
    return this;
  }
  
  public setHeaders(headers: HeadersInit): SingleModel<T> {
    this.headers = headers;
    return this;
  }

  public async request(): Promise<void | T> {
    if (!this.id) {
      throw new Error('No ID field provide');
    }
    const fullUrl = `${this.baseUrl}${this.suffix}/${this.id}`;
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: this.headers,
    });
    const data: any = await response.json();
    if (data.code) {
      throw new WPError(data as ApiError);
    }
    if (this.action === ApiActions.Find) {
      return data as T;
    } else if (this.action === ApiActions.Update) {
      const responseUpdate = await fetch(fullUrl, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(this.newEntity),
      });
      const dataUpdated: any = await responseUpdate.json();
      if (dataUpdated.code) {
        throw new WPError(dataUpdated as ApiError);
      }
      return dataUpdated as T;
    } else if (this.action === ApiActions.Delete) {
      const responseDelete = await fetch(fullUrl, {
        method: 'DELETE',
        headers: this.headers,
      });
      const dataDeleted = await responseDelete.json();
      if (dataDeleted.code) {
        throw new WPError(dataDeleted as ApiError);
      }
      return;
    }
  }
}