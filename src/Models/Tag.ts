import BaseModel from './BaseModel';
import CreateModel from './QueryModels/CreateModel';
import { ITags } from '../interfaces';
import RequestListModel from './QueryModels/RequestListModel';
import SingleModel from './QueryModels/SingleModel';

export default class Tag extends BaseModel {

  constructor(baseUrl: string, suffix: string) {
    super(baseUrl, suffix.concat('/tags'));
  }

  public find(id: string | number): SingleModel<ITags> {
    const singleModel: SingleModel<ITags> = new SingleModel<ITags>(this.baseUrl, this.suffix, id);
    return singleModel;
  }

  public fetch(): RequestListModel<ITags> {
    const requestListModel: RequestListModel<ITags> = new RequestListModel<ITags>(this.baseUrl, this.suffix);
    return requestListModel;
  }

  public create(data: Partial<ITags>): CreateModel<ITags> {
    const createModel: CreateModel<ITags> = new CreateModel<ITags>(this.baseUrl, this.suffix, data);
    return createModel;
  }
}