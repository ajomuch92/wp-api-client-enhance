import { ITags } from '../interfaces';
import BaseModel from './BaseModel';
import RequestListModel from './QueryModels/RequestListModel';
import SingleModel from './QueryModels/SingleModel';

export default class Tag extends BaseModel {

  constructor(baseUrl: string | String, suffix: string | String) {
    super(baseUrl.toString(), suffix.concat('/tags'));
  }

  public find(id: string | String | number | Number): SingleModel<ITags> {
    const singleModel: SingleModel<ITags> = new SingleModel<ITags>(this.baseUrl, this.suffix, id);
    return singleModel;
  }

  public fetch(): RequestListModel<ITags> {
      const requestListModel: RequestListModel<ITags> = new RequestListModel<ITags>(this.baseUrl, this.suffix);
      return requestListModel;
  }
}