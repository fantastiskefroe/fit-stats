export type SortingColumn = "title" | "subTitle" | "sku" | "inventoryRemaining" | "soldPerDay" | "daysRemaining" | "numberSold";

export interface Sorting {
  column: SortingColumn;
  direction: 1 | -1;
}
