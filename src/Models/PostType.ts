import { BaseModelReadOnly } from './BaseModel';
import { IPostType } from '../interfaces';
import RequestListModel from './QueryModels/RequestListModel';
import SingleModel from './QueryModels/SingleModel';

export default class PostType extends BaseModelReadOnly {

  constructor(baseUrl: string, suffix: string) {
    super(baseUrl, suffix.concat('/types'));
  }

  public find(id: string | number): SingleModel<IPostType> {
    const singleModel: SingleModel<IPostType> = new SingleModel<IPostType>(this.baseUrl, this.suffix, id);
    return singleModel;
  }

  public fetch(): RequestListModel<IPostType> {
    const requestListModel: RequestListModel<IPostType> = new RequestListModel<IPostType>(this.baseUrl, this.suffix);
    return requestListModel;
  }
}