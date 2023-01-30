export enum SortPropertyEnum {
  RATING = 'rating',
  TITLE = 'title',
  PRICE = 'price',
}

export type FilterSortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface IFilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: FilterSortItem;
}
