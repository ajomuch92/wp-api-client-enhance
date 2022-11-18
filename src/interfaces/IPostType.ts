import IBase from './IBase';

export default interface IPostType extends IBase {
  capabilities?: object;
  description?: string;
  hierarchical?: boolean;
  viewable?: boolean;
  labels?: object;
  name?: string;
  supports?: object;
  taxonomies?: object[];
  rest_base?: string;
}