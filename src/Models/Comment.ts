import { IComment } from '../interfaces';
import BaseModel from './BaseModel';
import RequestListModel from './QueryModels/RequestListModel';
import SingleModel from './QueryModels/SingleModel';

export default class Comment extends BaseModel {

  constructor(baseUrl: string | String, suffix: string | String) {
    super(baseUrl.toString(), suffix.concat('/comments'));
  }

  public find(id: string | String | number | Number): SingleModel<IComment> {
    const singleModel: SingleModel<IComment> = new SingleModel<IComment>(this.baseUrl, this.suffix, id);
    return singleModel;
  }

  public fetch(): RequestListModel<IComment> {
    const requestListModel: RequestListModel<IComment> = new RequestListModel<IComment>(this.baseUrl, this.suffix);
    return requestListModel;
  }
}