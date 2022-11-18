import { ISiteSettings } from '../interfaces';
import { BaseModelSimplified } from './BaseModel';
import RequestListModel from './QueryModels/RequestListModel';

export default class Settings extends BaseModelSimplified {

  constructor(baseUrl: string | String, suffix: string | String) {
    super(baseUrl.toString(), suffix.concat('/settings'));
  }

  public fetch(): RequestListModel<ISiteSettings> {
    const requestListModel: RequestListModel<ISiteSettings> = new RequestListModel<ISiteSettings>(this.baseUrl, this.suffix);
    return requestListModel;
  }
}