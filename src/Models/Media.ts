import BaseModel from './BaseModel';
import CreateModel from './QueryModels/CreateModel';
import { IMedia } from '../interfaces';
import RequestListModel from './QueryModels/RequestListModel';
import SingleModel from './QueryModels/SingleModel';
import UploadModel from './QueryModels/UploadModel';

export default class Media extends BaseModel {

  constructor(baseUrl: string, suffix: string) {
    super(baseUrl, suffix.concat('/media'));
  }

  public find(id: string | number): SingleModel<IMedia> {
    const singleModel: SingleModel<IMedia> = new SingleModel<IMedia>(this.baseUrl, this.suffix, id);
    return singleModel;
  }

  public fetch(): RequestListModel<IMedia> {
    const requestListModel: RequestListModel<IMedia> = new RequestListModel<IMedia>(this.baseUrl, this.suffix);
    return requestListModel;
  }

  public create(data: Partial<IMedia>): CreateModel<IMedia> {
    const createModel: CreateModel<IMedia> = new CreateModel<IMedia>(this.baseUrl, this.suffix, data);
    return createModel;
  }

  public upload(file: Buffer | string, filename: string, mimeType?: string): UploadModel {
    const uploadModel: UploadModel = new UploadModel(this.baseUrl, this.suffix, file, filename, mimeType);
    return uploadModel;
  }
}