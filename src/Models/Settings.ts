import { BaseModelSimplified } from './BaseModel';
import { ISiteSettings } from '../interfaces';
import RequestListModel from './QueryModels/RequestListModel';
import SettingsUpdateModel from './QueryModels/SettingsUpdateModel';

export default class Settings extends BaseModelSimplified {

  constructor(baseUrl: string, suffix: string) {
    super(baseUrl, suffix.concat('/settings'));
  }

  public fetch(): RequestListModel<ISiteSettings> {
    const requestListModel: RequestListModel<ISiteSettings> = new RequestListModel<ISiteSettings>(this.baseUrl, this.suffix);
    return requestListModel;
  }

  public update(data: Partial<ISiteSettings>): SettingsUpdateModel {
    const updateModel: SettingsUpdateModel = new SettingsUpdateModel(this.baseUrl, this.suffix, data);
    return updateModel;
  }
}