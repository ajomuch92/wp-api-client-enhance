import IBase from './IBase';
import IRendered from './IRendered';

export default interface IComments extends IBase {
  id?: number;
  author?: string;
  author_email?: string;
  author_ip?: string;
  author_name?: string;
  author_url?: string;
  author_user_agent?: string;
  content?: string | IRendered;
  date?: string |Date;
  date_gmt?: string | Date;
  link?: string | object;
  count?: number;
  description?: string;
  parent?: number;
  type?: number;
  author_avatar_urls?: string;
  meta?: object | object[];
}