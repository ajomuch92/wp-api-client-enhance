import { stringify } from 'query-string';

export default class Parameter {
  protected context: String = 'view';
  protected page: Number | String = 1;
  protected perPage: Number | String = 10;
  protected search?: String;
  protected after?: String | Date;
  protected author?: Number | String;
  protected authorExclude?: Number[] | String[];
  protected authorEmail?: string[];
  protected before?: String | Date;
  protected exclude?: Number[] | String[];
  protected include?: Number[] | String[];
  protected offset?: Number | String;
  protected order: string = 'desc';
  protected orderby: string = 'date';
  protected status: string = 'publish';
  protected taxRelation?: string;
  protected categories?: Number[] | String[];
  protected categoriesExclude?: Number[] | String[];
  protected tags?: Number[] | String[];
  protected tagsExclude?: Number[] | String[];
  protected sticky?: Number | String;
  protected hideEmpty?: Boolean;
  protected post?: Number | String;
  protected parent?: Number | String;
  protected type?: string;
  protected password?: boolean;
  protected fields?: String | string[] | number | number[];

  private specialFieldsToReplace: string[] = ['authorExclude', 'taxRelation', 'categoriesExclude','tagsExclude', 'hideEmpty', 'fields', 'authorEmail'];


  public toQueryString() : String {
    let queryString = stringify(this);
    this.validateNumericFields();
    for(let i = 0 ; i < this.specialFieldsToReplace.length; i += 1) {
      const field: string = this.specialFieldsToReplace[i];
      if (field === 'fields') {
        queryString = queryString.replace(/fields/g, '_fields');
      } else {
        const regex = new RegExp(field, 'g');
        queryString = queryString.replace(regex, this.toSnakeCase(field));
      }
    }
    return queryString;
  }

  public toQueryStringFields(): string | undefined {
    if (this.fields) {
      return stringify({'_fields': this.fields});
    }
    return undefined;
  }

  private validateNumericFields() {
    if(this.page && Number.isNaN(parseInt(this.page.toString()))) {
      throw Error('Not a valid page value');
    }
    if(this.perPage && Number.isNaN(parseInt(this.perPage.toString()))) {
      throw Error('Not a valid perPage value');
    }
    if(this.offset && Number.isNaN(parseInt(this.offset.toString()))) {
      throw Error('Not a valid offset value');
    }
  }

  private toSnakeCase(str: string | String): string {
    const regex = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
    return str && str.match(regex)?.map((x:string) => x.toLowerCase())?.join('_') || '';
  }
}