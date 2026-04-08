import { ILoggedUser, ILoginUser, IUser } from '../interfaces';

import BaseModel from './BaseModel';
import CreateModel from './QueryModels/CreateModel';
import RequestListModel from './QueryModels/RequestListModel';
import SingleModel from './QueryModels/SingleModel';
import WPError from './Errors';
import fetch from 'node-fetch';

export default class User extends BaseModel {

  constructor(baseUrl: string, suffix: string) {
    super(baseUrl, suffix.concat('/users'));
  }

  public find(id: string | number): SingleModel<IUser> {
    const singleModel: SingleModel<IUser> = new SingleModel<IUser>(this.baseUrl, this.suffix, id);
    return singleModel;
  }

  public fetch(): RequestListModel<IUser> {
    const requestListModel: RequestListModel<IUser> = new RequestListModel<IUser>(this.baseUrl, this.suffix);
    return requestListModel;
  }

  public create(data: Partial<IUser>): CreateModel<IUser> {
    const createModel: CreateModel<IUser> = new CreateModel<IUser>(this.baseUrl, this.suffix, data);
    return createModel;
  }

  public async login(user: ILoginUser, urlLogin: string): Promise<ILoggedUser> {
    const response = await fetch(
      `${this.baseUrl}/${urlLogin}`,
      {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await response.json();
    if (data.code) {
      throw new WPError(data);
    }
    return data as ILoggedUser;
  }
}