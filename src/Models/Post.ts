import { IPost } from '../interfaces';
import BaseModel from './BaseModel';
import RequestListModel from './QueryModels/RequestListModel';
import SingleModel from './QueryModels/SingleModel';

export default class Post extends BaseModel {

  constructor(baseUrl: string | String, suffix: string | String) {
    super(baseUrl.toString(), suffix.concat('/posts'));
  }

  public find(id: string | String | number | Number): SingleModel<IPost> {
    const singleModel: SingleModel<IPost> = new SingleModel<IPost>(this.baseUrl, this.suffix, id);
    return singleModel;
  }

  public fetch(): RequestListModel<IPost> {
      const requestListModel: RequestListModel<IPost> = new RequestListModel<IPost>(this.baseUrl, this.suffix);
      return requestListModel;
  }
}