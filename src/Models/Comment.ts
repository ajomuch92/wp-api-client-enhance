import BaseModel from './BaseModel';
import CreateModel from './QueryModels/CreateModel';
import { IComment } from '../interfaces';
import RequestListModel from './QueryModels/RequestListModel';
import SingleModel from './QueryModels/SingleModel';

export default class Comment extends BaseModel {

  constructor(baseUrl: string, suffix: string) {
    super(baseUrl, suffix.concat('/comments'));
  }

  public find(id: string | number): SingleModel<IComment> {
    const singleModel: SingleModel<IComment> = new SingleModel<IComment>(this.baseUrl, this.suffix, id);
    return singleModel;
  }

  public fetch(): RequestListModel<IComment> {
    const requestListModel: RequestListModel<IComment> = new RequestListModel<IComment>(this.baseUrl, this.suffix);
    return requestListModel;
  }

  public create(data: Partial<IComment>): CreateModel<IComment> {
    const createModel: CreateModel<IComment> = new CreateModel<IComment>(this.baseUrl, this.suffix, data);
    return createModel;
  }
}