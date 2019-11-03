import { isNumber } from 'util';
import { PageEvent } from '@angular/material';

export class Query {
  filter: string;
  offset: number;
  limit: number;

  /**
   *
   * @param filter Text filter
   * @param pageNumber The current page assuming page 1 is the start
   * @param pageSize The size of the page
   */
  constructor(filter: string = '', offset: number = -1, limit: number = -1) {
    this.filter = filter;
    this.offset = offset;
    this.limit = limit;
  }

  static fromPaginationParameters(filter: string, pageNumber: number, pageSize: number) {
    return new Query(filter, (pageNumber - 1) * pageSize, pageSize);
  }

  updateGivenPageEvent(pageEvent: PageEvent) {
    this.offset = pageEvent.pageIndex * pageEvent.pageSize;
    this.limit = pageEvent.pageSize;
  }

  toUrlParams(): string {
    const urlParams = new URLSearchParams();
    if (!!this.filter) {
      urlParams.set('filter', this.filter);
    }
    if (!isNaN(this.offset) && isNumber(this.offset) && this.offset >= 0) {
      urlParams.set('offset', this.offset.toString());
    }
    if (!isNaN(this.limit) && isNumber(this.limit) && this.limit >= 0) {
      urlParams.set('limit', this.limit.toString());
    }
    return urlParams.toString();
  }

  get pageSize(): number {
    return this.limit || 0;
  }

  get pageIndex(): number {
    return Math.floor(this.offset / this.limit);
  }
}
