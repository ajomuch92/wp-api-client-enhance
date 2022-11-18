import IBase from './IBase';

export default interface ITags extends IBase {
  id?: number;
  count?: number;
  description?: string;
  link?: string | object;
  name?: string;
  slug?: string;
  taxonomy?: string;
  meta?: object | object[];
}