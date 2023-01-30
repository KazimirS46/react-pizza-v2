export type SearchPizzaParams = {
  category: string;
  order: string;
  search: string;
  sortType: string;
  currentPage: number;
};

export type Pizza = {
  productId: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
