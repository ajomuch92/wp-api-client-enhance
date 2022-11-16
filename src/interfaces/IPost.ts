import IBase from './IBase';
import IRendered from './IRendered';

export default interface IPost extends IBase {
  id?: number;
  date?: Date;
  date_gmt?: Date;
  guid?: IRendered;
  modified?: Date;
  modified_gmt?: Date;
  slug?: string;
  status?: string;
  password?: string;
  parent?: number;
  title?: string | IRendered;
  content?: string | IRendered;
  author?: number;
  excert?: string | IRendered;
  featured_media?: number;
  comment_status?: string;
  ping_status?: string;
  menu_order?: number;
  sticky?: Boolean;
  meta?: object[];
  template?: string;
  categories?: string[];
  tags?: string[];
}