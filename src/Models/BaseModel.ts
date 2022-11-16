import { IBase } from '../interfaces';
import RequestListModel from './QueryModels/RequestListModel';
import SingleModel from './QueryModels/SingleModel';

export default abstract class BaseModel {
  protected baseUrl: string;
  protected suffix: string;

  constructor(baseUrl: string, suffix: string) {
    this.baseUrl = baseUrl;
    this.suffix = suffix;
  }

  abstract find(id: string | String | number | Number): SingleModel<IBase>;

  abstract fetch(): RequestListModel<IBase>;
}