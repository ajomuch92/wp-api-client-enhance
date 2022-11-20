import Category from './Category';
import Comment from './Comment';
import Media from './Media';
import Page from './Page';
import Post from './Post';
import PostType from './PostType';
import Search from './Search';
import Settings from './Settings';
import Tag from './Tag';
import Taxonomy from './Taxonomy';
import User from './User';

export default class WPApi {
  protected baseUrl: string;
  protected suffix: string;
  public posts: Post;
  public pages: Page;
  public categories: Category;
  public comments: Comment;
  public media: Media;
  public postTypes: PostType;
  public search: Search;
  public settings: Settings;
  public tags: Tag;
  public taxonomies: Taxonomy;
  public users: User;

  constructor(baseUrl: string, suffix: string) {
    this.baseUrl = baseUrl;
    this.suffix = suffix;
    this.posts = new Post(baseUrl, suffix);
    this.pages = new Page(baseUrl, suffix);
    this.categories = new Category(baseUrl, suffix);
    this.comments = new Comment(baseUrl, suffix);
    this.media = new Media(baseUrl, suffix);
    this.postTypes = new PostType(baseUrl, suffix);
    this.search = new Search(baseUrl, suffix);
    this.settings = new Settings(baseUrl, suffix);
    this.tags = new Tag(baseUrl, suffix);
    this.taxonomies = new Taxonomy(baseUrl, suffix);
    this.users = new User(baseUrl, suffix);
  }
}