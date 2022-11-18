import IBase from './IBase';

export default interface IUser extends IBase {
  id?: number;
  username?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  url?: string | object;
  description?: string;
  link?: string | object;
  locale?: string;
  nickname?: string;
  slug?: string;
  registered_date?: string |Date;
  roles?: object[];
  password?: string;
  capabilities?: object;
  extra_capabilities?: object;
  avatar_urls?: object;
  meta?: object | object[];
}