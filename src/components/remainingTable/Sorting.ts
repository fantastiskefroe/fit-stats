export type SortingColumn = "title" | "subTitle" | "inventoryRemaining" | "soldPerDay" | "daysRemaining" | "numberSold";

export interface Sorting {
  column: SortingColumn;
  direction: 1 | -1;
}
