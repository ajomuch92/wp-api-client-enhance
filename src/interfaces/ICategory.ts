import IBase from './IBase';

export default interface ICategory extends IBase {
  id?: number;
  count?: number;
  description?: string;
  link?: string | object;
  name?: string;
  slug?: string;
  taxonomy?: string;
  parent?: number;
  meta?: object | object[];
}