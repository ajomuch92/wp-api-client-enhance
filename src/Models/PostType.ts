import { IPostType } from '../interfaces';
import { BaseModelSimplified } from './BaseModel';
import RequestListModel from './QueryModels/RequestListModel';

export default class PostType extends BaseModelSimplified {

  constructor(baseUrl: string | String, suffix: string | String) {
    super(baseUrl.toString(), suffix.concat('/types'));
  }

  public fetch(): RequestListModel<IPostType> {
    const requestListModel: RequestListModel<IPostType> = new RequestListModel<IPostType>(this.baseUrl, this.suffix);
    return requestListModel;
  }
}