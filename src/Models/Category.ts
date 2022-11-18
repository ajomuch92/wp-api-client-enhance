import { ICategory } from '../interfaces';
import BaseModel from './BaseModel';
import RequestListModel from './QueryModels/RequestListModel';
import SingleModel from './QueryModels/SingleModel';

export default class Category extends BaseModel {

  constructor(baseUrl: string | String, suffix: string | String) {
    super(baseUrl.toString(), suffix.concat('/categories'));
  }

  public find(id: string | String | number | Number): SingleModel<ICategory> {
    const singleModel: SingleModel<ICategory> = new SingleModel<ICategory>(this.baseUrl, this.suffix, id);
    return singleModel;
  }

  public fetch(): RequestListModel<ICategory> {
    const requestListModel: RequestListModel<ICategory> = new RequestListModel<ICategory>(this.baseUrl, this.suffix);
    return requestListModel;
  }
}