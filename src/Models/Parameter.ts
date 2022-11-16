import { stringify } from 'query-string';

export default class Parameter {
  public context: String = 'view';
  public page: Number | String = 1;
  public perPage: Number | String = 10;
  public search?: String;
  public after?: String | Date;
  public author?: Number | String;
  public authorExclude?: Number[] | String[];
  public before?: String | Date;
  public exclude?: Number[] | String[];
  public include?: Number[] | String[];
  public offset?: Number | String;
  public order: string = 'desc';
  public orderby: string = 'date';
  public status: string = 'publish';
  public taxRelation?: string;
  public categories?: Number[] | String[];
  public categoriesExclude?: Number[] | String[];
  public tags?: Number[] | String[];
  public tagsExclude?: Number[] | String[];
  public sticky?: Number | String;
  public hideEmpty?: Boolean;
  public post?: Number | String;
  public fields?: String | string[] | number | number[];

  private specialFieldsToReplace: string[] = ['authorExclude', 'taxRelation', 'categoriesExclude','tagsExclude', 'hideEmpty', 'fields'];


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