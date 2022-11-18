import { IMedia } from '../interfaces';
import BaseModel from './BaseModel';
import RequestListModel from './QueryModels/RequestListModel';
import SingleModel from './QueryModels/SingleModel';

export default class Category extends BaseModel {

  constructor(baseUrl: string | String, suffix: string | String) {
    super(baseUrl.toString(), suffix.concat('/media'));
  }

  public find(id: string | String | number | Number): SingleModel<IMedia> {
    const singleModel: SingleModel<IMedia> = new SingleModel<IMedia>(this.baseUrl, this.suffix, id);
    return singleModel;
  }

  public fetch(): RequestListModel<IMedia> {
    const requestListModel: RequestListModel<IMedia> = new RequestListModel<IMedia>(this.baseUrl, this.suffix);
    return requestListModel;
  }
}