import IBase from './IBase';

export default interface IMedia extends IBase {
  id?: number;
  date?: string |Date;
  date_gmt?: string |Date;
  guid?: object;
  link?: string | object;
  modified?: string |Date;
  modified_gmt?: string |Date;
  slug?: string;
  status?: string;
  type?: string;
  permalink_template?: string;
  generated_slug?: string;
  title?: string | object;
  author?: number;
  comment_status?: string;
  ping_status?: string;
  meta?: object | object[];
  template?: string;
  alt_text?: string;
  caption?: object;
  media_type?: string;
  mime_type?: string;
  media_details?: object;
  post?: number;
  source_url?: string;
  missing_image_sizes?: object[];
}