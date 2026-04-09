import IBase from './IBase';
import IRendered from './IRendered';

export default interface IComment extends IBase {
  id?: number;
  author?: number;
  author_email?: string;
  author_ip?: string;
  author_name?: string;
  author_url?: string;
  author_user_agent?: string;
  content?: string | IRendered;
  date?: string | Date;
  date_gmt?: string | Date;
  link?: string;
  parent?: number;
  post?: number;
  status?: string;
  type?: string;
  author_avatar_urls?: object;
  meta?: object | object[];
}