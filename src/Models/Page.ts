import BaseModel from './BaseModel';
import CreateModel from './QueryModels/CreateModel';
import { IPage } from '../interfaces';
import RequestListModel from './QueryModels/RequestListModel';
import SingleModel from './QueryModels/SingleModel';

export default class Page extends BaseModel {

  constructor(baseUrl: string, suffix: string) {
    super(baseUrl, suffix.concat('/pages'));
  }

  public find(id: string | number): SingleModel<IPage> {
    const singleModel: SingleModel<IPage> = new SingleModel<IPage>(this.baseUrl, this.suffix, id);
    return singleModel;
  }

  public fetch(): RequestListModel<IPage> {
    const requestListModel: RequestListModel<IPage> = new RequestListModel<IPage>(this.baseUrl, this.suffix);
    return requestListModel;
  }

  public create(data: Partial<IPage>): CreateModel<IPage> {
    const createModel: CreateModel<IPage> = new CreateModel<IPage>(this.baseUrl, this.suffix, data);
    return createModel;
  }
}