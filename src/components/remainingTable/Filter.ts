export type FilterType = 'TAG' | 'PRODUCT_TYPE' | 'VENDOR';

export interface Filter {
  type: FilterType,
  field: string
}
