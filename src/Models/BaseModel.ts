import CreateModel from './QueryModels/CreateModel';
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

  abstract find(id: string | number): SingleModel<IBase>;

  abstract fetch(): RequestListModel<IBase>;

  abstract create(data: Partial<IBase>): CreateModel<IBase>;
}

export abstract class BaseModelSimplified {
  protected baseUrl: string;
  protected suffix: string;

  constructor(baseUrl: string, suffix: string) {
    this.baseUrl = baseUrl;
    this.suffix = suffix;
  }

  abstract fetch(): RequestListModel<IBase>;
}

// New base class for models that support find but not create
export abstract class BaseModelReadOnly {
  protected baseUrl: string;
  protected suffix: string;

  constructor(baseUrl: string, suffix: string) {
    this.baseUrl = baseUrl;
    this.suffix = suffix;
  }

  abstract find(id: string | number): SingleModel<IBase>;

  abstract fetch(): RequestListModel<IBase>;
}