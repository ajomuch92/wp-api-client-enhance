import IBase from './IBase';

export default interface IPostStatus extends IBase {
  title?: string;
  description?: string;
  url?: string | object;
  email?: string;
  timezone?: string;
  date_format?: string;
  time_format?: string;
  start_of_week?: string;
  language?: string;
  use_smilies?: boolean;
  default_category?: number;
  default_post_format?: number;
  posts_per_page?: number;
  default_ping_status?: number;
  default_comment_status?: number;
}