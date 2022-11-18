import { IPage } from '../interfaces';
import BaseModel from './BaseModel';
import RequestListModel from './QueryModels/RequestListModel';
import SingleModel from './QueryModels/SingleModel';

export default class Page extends BaseModel {

  constructor(baseUrl: string | String, suffix: string | String) {
    super(baseUrl.toString(), suffix.concat('/pages'));
  }

  public find(id: string | String | number | Number): SingleModel<IPage> {
    const singleModel: SingleModel<IPage> = new SingleModel<IPage>(this.baseUrl, this.suffix, id);
    return singleModel;
  }

  public fetch(): RequestListModel<IPage> {
      const requestListModel: RequestListModel<IPage> = new RequestListModel<IPage>(this.baseUrl, this.suffix);
      return requestListModel;
  }
}