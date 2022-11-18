import IBase from './IBase';

export default interface ISiteSettings extends IBase {
  name?: string;
  private?: boolean;
  protected?: boolean;
  public?: boolean;
  queryable?: boolean;
  show_in_list?: boolean;
  slug?: string;
  date_floating?: boolean;
}