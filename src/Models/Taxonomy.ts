import { BaseModelReadOnly } from './BaseModel';
import { ITaxonomy } from '../interfaces';
import RequestListModel from './QueryModels/RequestListModel';
import SingleModel from './QueryModels/SingleModel';

export default class Taxonomy extends BaseModelReadOnly {

  constructor(baseUrl: string, suffix: string) {
    super(baseUrl, suffix.concat('/taxonomies'));
  }

  public find(id: string | number): SingleModel<ITaxonomy> {
    const singleModel: SingleModel<ITaxonomy> = new SingleModel<ITaxonomy>(this.baseUrl, this.suffix, id);
    return singleModel;
  }

  public fetch(): RequestListModel<ITaxonomy> {
    const requestListModel: RequestListModel<ITaxonomy> = new RequestListModel<ITaxonomy>(this.baseUrl, this.suffix);
    return requestListModel;
  }
}