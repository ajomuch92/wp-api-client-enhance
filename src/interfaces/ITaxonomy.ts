import IBase from './IBase';

export default interface ITaxonomy extends IBase {
  capabilities?: object;
  description?: string;
  hierarchical?: boolean;
  labels?: object;
  name?: string;
  slug?: string;
  types?: object[];
  rest_base?: string;
  visibility?: object;
}