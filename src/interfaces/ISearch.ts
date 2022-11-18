import IBase from './IBase';

export default interface ISearch extends IBase {
  id?: number;
  title?: string;
  url?: string | object;
  type?: string;
  subtype?: string;
}