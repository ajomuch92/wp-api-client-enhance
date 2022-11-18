import { ITaxonomy } from '../interfaces';
import { BaseModelSimplified } from './BaseModel';
import RequestListModel from './QueryModels/RequestListModel';

export default class Taxonomy extends BaseModelSimplified {

  constructor(baseUrl: string | String, suffix: string | String) {
    super(baseUrl.toString(), suffix.concat('/taxonomies'));
  }

  public fetch(): RequestListModel<ITaxonomy> {
    const requestListModel: RequestListModel<ITaxonomy> = new RequestListModel<ITaxonomy>(this.baseUrl, this.suffix);
    return requestListModel;
  }
}