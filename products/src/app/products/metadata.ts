export interface IProductSearchInput {
  brand?: string;
  name?: string;

  lessThan?: number;
  greaterThan?: number;

  order?: string;
  sortBy?: string;
}
