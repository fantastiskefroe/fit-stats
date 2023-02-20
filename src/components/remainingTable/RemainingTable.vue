<script lang="ts">
import '@vuepic/vue-datepicker/dist/main.css';
import {defineComponent, type PropType} from "vue";
import type {ProductVariantStatsOutput} from "@/api/shopify-data";
import type {Sorting} from "@/components/remainingTable/Sorting";
import type {Row} from "@/components/remainingTable/Row";
import RemainingTableRow from "@/components/remainingTable/RemainingTableRow.vue";
import SortingHeader from "@/components/remainingTable/SortingHeader.vue";
import type {Filter} from "@/components/remainingTable/Filter";

export default defineComponent({
  name: "RemainingTable",
  components: {SortingHeader, RemainingTableRow},
  props: {
    input: {type: Array as PropType<ProductVariantStatsOutput[]>, required: true},
    filters: {type: Array as PropType<Filter[]>, required: true}
  },
  data() {
    return {
      rowsShown: 30 as number | undefined,
      currentSorting: {column: "daysRemaining", direction: 1} as Sorting,
    };
  },
  computed: {
    filteredInput(): ProductVariantStatsOutput[] {
      const filters = this.filters
      .map((filter) => {
        switch (filter.type) {
          case "TAG":
            return (stats: ProductVariantStatsOutput[]) => stats.filter((stat) => stat.product.tags.includes(filter.value));
          case "PRODUCT_TYPE":
            return (stats: ProductVariantStatsOutput[]) => stats.filter((stat) => stat.product.productType === filter.value);
          case "VENDOR":
            return (stats: ProductVariantStatsOutput[]) => stats.filter((stat) => stat.product.vendor === filter.value);
        }
      });

      return filters.reduce((rows, filter) => filter(rows), this.input);
    },
    mappedInput(): Row[] {
      return this.filteredInput.map((stat) => ({
        id: stat.variant.shopifyId,
        imgSrc: stat.product.mainImageUrl !== '' ? stat.product.mainImageUrl : 'https://cdn.shopify.com/s/files/1/0276/3902/1652/files/FantastiskeFroe_logo_mini_32x32.png?v=1583103209',
        title: stat.product.title,
        subTitle: stat.variant.title ?? "",
        inventoryRemaining: stat.variant.inventoryQuantity,
        soldPerDay: stat.soldPerDay,
        daysRemaining: stat.daysLeft,
        numberSold: stat.numSold
      }));
    },
    filteredAndSortedRows(): Row[] {
      return this.sort([...this.mappedInput]).slice(0, this.rowsShown);
    },
  },
  methods: {
    sort(input: Row[]): Row[] {
      const column = this.currentSorting.column;
      const direction = this.currentSorting.direction;

      return input
      .sort((a: Row, b: Row) => {
        if (typeof a[column] === "string") {
          return direction * this.sortLexicographic(a[column] as string, b[column] as string);
        }

        return direction * this.sortNumeric(a[column] as number, b[column] as number);
      });
    },
    sortLexicographic(a: string, b: string): number {
      return a.localeCompare(b, 'da-DK');
    },
    sortNumeric(a: number, b: number): number {
      return a - b;
    },
  }
});
</script>

<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead class="sticky-top bg-white">
      <tr>
        <th></th>
        <SortingHeader :title="'Titel'" :column="'title'" :type="'LEXICOGRAPHIC'"
                       :current-sorting="currentSorting"
                       @sorting-updated="currentSorting = $event"/>
        <SortingHeader :title="'Antal tilbage'" :column="'inventoryRemaining'" :type="'NUMERIC'"
                       :current-sorting="currentSorting"
                       @sorting-updated="currentSorting = $event"/>
        <SortingHeader :title="'Solgt per dag'" :column="'soldPerDay'" :type="'NUMERIC'"
                       :current-sorting="currentSorting"
                       @sorting-updated="currentSorting = $event"/>
        <SortingHeader :title="'Dage tilbage'" :column="'daysRemaining'" :type="'NUMERIC'"
                       :current-sorting="currentSorting"
                       @sorting-updated="currentSorting = $event"/>
        <SortingHeader :title="'Antal solgt'" :column="'numberSold'" :type="'NUMERIC'"
                       :current-sorting="currentSorting"
                       @sorting-updated="currentSorting = $event"/>
      </tr>
      </thead>
      <tbody class="table-group-divider">
      <RemainingTableRow v-for="row in filteredAndSortedRows" v-bind:key="row.id" :row="row"/>
      </tbody>
    </table>
  </div>

  <div>
    <div class="d-grid mb-4">
      <button type="button" class="btn btn-outline-primary"
              v-if="rowsShown !== undefined"
              @click="rowsShown = undefined">
        Vis alle
      </button>
      <button type="button" class="btn btn-outline-primary" v-else
              @click="rowsShown = 30">
        Vis 30 første
      </button>
    </div>
  </div>

</template>
