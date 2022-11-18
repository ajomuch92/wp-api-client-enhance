import IBase from './IBase';
import IRendered from './IRendered';

export default interface IPage extends IBase {
  id?: number;
  date?: string |Date;
  date_gmt?: string | Date;
  guid?: IRendered;
  link?: string | object;
  modified?: string | Date;
  modified_gmt?: Date;
  slug?: string;
  status?: string;
  type?: string;
  password?: string;
  permalink_template?: string;
  generated_slug?: string;
  parent?: number;
  title?: string | IRendered;
  content?: string | IRendered;
  author?: number;
  excert?: string | IRendered;
  featured_media?: number;
  comment_status?: string;
  ping_status?: string;
  menu_order?: number;
  meta?: object | object[];
  template?: string;
  categories?: string[];
  tags?: string[];
}