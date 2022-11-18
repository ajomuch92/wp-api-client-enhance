import { ISearch } from '../interfaces';
import { BaseModelSimplified } from './BaseModel';
import RequestListModel from './QueryModels/RequestListModel';

export default class Search extends BaseModelSimplified {

  constructor(baseUrl: string | String, suffix: string | String) {
    super(baseUrl.toString(), suffix.concat('/search'));
  }

  public fetch(): RequestListModel<ISearch> {
    const requestListModel: RequestListModel<ISearch> = new RequestListModel<ISearch>(this.baseUrl, this.suffix);
    return requestListModel;
  }
}