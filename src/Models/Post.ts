import BaseModel from './BaseModel';
import CreateModel from './QueryModels/CreateModel';
import { IPost } from '../interfaces';
import RequestListModel from './QueryModels/RequestListModel';
import SingleModel from './QueryModels/SingleModel';

export default class Post extends BaseModel {

  constructor(baseUrl: string, suffix: string) {
    super(baseUrl, suffix.concat('/posts'));
  }

  public find(id: string | number): SingleModel<IPost> {
    const singleModel: SingleModel<IPost> = new SingleModel<IPost>(this.baseUrl, this.suffix, id);
    return singleModel;
  }

  public fetch(): RequestListModel<IPost> {
    const requestListModel: RequestListModel<IPost> = new RequestListModel<IPost>(this.baseUrl, this.suffix);
    return requestListModel;
  }

  public create(data: Partial<IPost>): CreateModel<IPost> {
    const createModel: CreateModel<IPost> = new CreateModel<IPost>(this.baseUrl, this.suffix, data);
    return createModel;
  }
}