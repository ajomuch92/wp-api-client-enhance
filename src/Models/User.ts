import fetch from 'node-fetch';
import { ILoggedUser, ILoginUser, IUser } from '../interfaces';
import BaseModel from './BaseModel';
import WPError from './Errors';
import RequestListModel from './QueryModels/RequestListModel';
import SingleModel from './QueryModels/SingleModel';

export default class User extends BaseModel {

  constructor(baseUrl: string | String, suffix: string | String) {
    super(baseUrl.toString(), suffix.concat('/users'));
  }

  public find(id: string | String | number | Number): SingleModel<IUser> {
    const singleModel: SingleModel<IUser> = new SingleModel<IUser>(this.baseUrl, this.suffix, id);
    return singleModel;
  }

  public fetch(): RequestListModel<IUser> {
    const requestListModel: RequestListModel<IUser> = new RequestListModel<IUser>(this.baseUrl, this.suffix);
    return requestListModel;
  }

  public async login(user: ILoginUser, urlLogin: string) : Promise<ILoggedUser> {
    const response = await fetch(
      `${this.baseUrl}/${urlLogin}`,
      {
        method: 'POST',
        body: JSON.stringify(user)
      }
    );
    const data = await response.json();
    if (data.code) {
      throw new WPError(data);
    }
    return data as ILoggedUser;
  }
}