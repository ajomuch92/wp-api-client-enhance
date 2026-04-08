import BaseModel from './BaseModel';
import CreateModel from './QueryModels/CreateModel';
import { ICategory } from '../interfaces';
import RequestListModel from './QueryModels/RequestListModel';
import SingleModel from './QueryModels/SingleModel';

export default class Category extends BaseModel {

  constructor(baseUrl: string, suffix: string) {
    super(baseUrl, suffix.concat('/categories'));
  }

  public find(id: string | number): SingleModel<ICategory> {
    const singleModel: SingleModel<ICategory> = new SingleModel<ICategory>(this.baseUrl, this.suffix, id);
    return singleModel;
  }

  public fetch(): RequestListModel<ICategory> {
    const requestListModel: RequestListModel<ICategory> = new RequestListModel<ICategory>(this.baseUrl, this.suffix);
    return requestListModel;
  }

  public create(data: Partial<ICategory>): CreateModel<ICategory> {
    const createModel: CreateModel<ICategory> = new CreateModel<ICategory>(this.baseUrl, this.suffix, data);
    return createModel;
  }
}