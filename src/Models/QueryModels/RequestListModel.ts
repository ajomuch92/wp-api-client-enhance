import fetch, { HeadersInit } from 'node-fetch';
import { IBase } from '../../interfaces';
import WPError, { ApiError } from '../Errors';
import Parameter from '../Parameter';

export default class RequestListModel<T extends IBase> {
  protected globalParameter: Parameter;
  protected baseUrl: String;
  protected suffix: string | String;
  protected headers?: HeadersInit = {
    'Content-Type': 'application/json'
  };

  constructor(baseUrl: String, suffix: string | String) {
    this.baseUrl = baseUrl;
    this.suffix = suffix;
    this.globalParameter = new Parameter();
  }

  public setPage(page: String | Number): RequestListModel<T> {
    this.globalParameter.page = page;
    return this;
  }
  
  public setPerPage(perPage: String | Number): RequestListModel<T> {
    this.globalParameter.perPage = perPage;
    return this;
  }
  
  public setSearch(search: String): RequestListModel<T> {
    this.globalParameter.search = search;
    return this;
  }
  
  public setAfter(after: String | Date): RequestListModel<T> {
    this.globalParameter.after = after;
    return this;
  }
  
  public setAuthor(author: String | Number): RequestListModel<T> {
    this.globalParameter.author = author;
    return this;
  }
  
  public setAuthorExclude(authorExclude: Number[] | String[]): RequestListModel<T> {
    this.globalParameter.authorExclude = authorExclude;
    return this;
  }
  
  public setBefore(before: String | Date): RequestListModel<T> {
    this.globalParameter.before = before;
    return this;
  }
  
  public setExclude(exclude: Number[] | String[]): RequestListModel<T> {
    this.globalParameter.exclude = exclude;
    return this;
  }
  
  public setInclude(include: Number[] | String[]): RequestListModel<T> {
    this.globalParameter.include = include;
    return this;
  }
  
  public setOffset(offset: String | Number): RequestListModel<T> {
    this.globalParameter.offset = offset;
    return this;
  }
  
  public setOrder(order: string): RequestListModel<T> {
    this.globalParameter.order = order;
    return this;
  }
  
  public setOrderby(orderby: string): RequestListModel<T> {
    this.globalParameter.orderby = orderby;
    return this;
  }
  
  public setStatus(status: string): RequestListModel<T> {
    this.globalParameter.status = status;
    return this;
  }
  
  public setTaxRelation(taxRelation: string): RequestListModel<T> {
    this.globalParameter.taxRelation = taxRelation;
    return this;
  }
  
  public setCategories(categories: Number[] | String[]): RequestListModel<T> {
    this.globalParameter.categories = categories;
    return this;
  }
  
  public setCategoriesExclude(categoriesExclude: Number[] | String[]): RequestListModel<T> {
    this.globalParameter.categoriesExclude = categoriesExclude;
    return this;
  }
  
  public setTags(tags: Number[] | String[]): RequestListModel<T> {
    this.globalParameter.tags = tags;
    return this;
  }
  
  public setTagsExclude(tagsExclude: Number[] | String[]): RequestListModel<T> {
    this.globalParameter.tagsExclude = tagsExclude;
    return this;
  }
  
  public setSticky(sticky: String | Number): RequestListModel<T> {
    this.globalParameter.sticky = sticky;
    return this;
  }
  
  public setHideEmpty(hideEmpty: Boolean): RequestListModel<T> {
    this.globalParameter.hideEmpty = hideEmpty;
    return this;
  }
  
  public setPost(post: Number | String): RequestListModel<T> {
    this.globalParameter.post = post;
    return this;
  }
  
  public setFields(fields: String | string[] | number | number[]): RequestListModel<T> {
    this.globalParameter.fields = fields;
    return this;
  }
  
  public setAuthorEmail(authorEmail: string): RequestListModel<T> {
    this.globalParameter.authorEmail = authorEmail;
    return this;
  }
  
  public setType(type: string): RequestListModel<T> {
    this.globalParameter.type = type;
    return this;
  }
  
  public setSubtype(subtype: string): RequestListModel<T> {
    this.globalParameter.subtype = subtype;
    return this;
  }
  
  public setPassword(password: boolean): RequestListModel<T> {
    this.globalParameter.password = password;
    return this;
  }

  public setHeaders(headers: HeadersInit): RequestListModel<T> {
    this.headers = headers;
    return this;
  }
  

  public async request(): Promise<T | T[]> {
    const response = await fetch(`${this.baseUrl}${this.suffix}?${this.globalParameter.toQueryStringFields()}`);
    const data: any = await response.json();
    if (data.code) {
      throw new WPError(data as ApiError);
    }
    return Array.isArray(data) ? data as T[] : data as T;
  }
}