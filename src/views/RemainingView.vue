<script lang="ts">
import {StatsApi} from '@/util/api';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {startOfDay, startOfMonth, startOfYear, subDays} from "date-fns";
import {defineComponent} from "vue";
import type {ProductVariantStatsOutput} from "@/api/shopify-data";
import {loadToken} from "@/util/token-service";
import RemainingTable from "@/components/remainingTable/RemainingTable.vue";
import type {Filter, FilterType} from "@/components/remainingTable/Filter";
import FilterSection from "@/components/remainingTable/FilterSection.vue";

const now = new Date();

export default defineComponent({
  components: {FilterSection, RemainingTable, Datepicker},
  data() {
    return {
      loading: false,
      fromDate: startOfMonth(now),
      filters: [] as Filter[],
      productVariantStats: [] as ProductVariantStatsOutput[],
      fitToken: "" as string
    };
  },
  methods: {
    setDate(type: 'START-YEAR' | 'START-MONTH' | '30-DAYS'): void {
      switch (type) {
        case "START-YEAR":
          this.fromDate = startOfYear(now);
          break;
        case "START-MONTH":
          this.fromDate = startOfMonth(now);
          break;
        case "30-DAYS":
          this.fromDate = subDays(now, 30);
          break;
      }
    },
    updateFilters(type: FilterType, filters: Filter[]): void {
      const newFilters = this.filters
      .filter((filter) => filter.type !== type);
      newFilters.push(...filters);
      this.filters = newFilters;
    },
    fetch(): void {
      this.loading = true;

      StatsApi.getProductVariantStats({
        from: startOfDay(this.fromDate),
        xFitToken: this.fitToken
      })
      .then((productVariantStats: ProductVariantStatsOutput[]) => {
        this.productVariantStats = productVariantStats;
        this.loading = false;
      });
    },
  },
  computed: {
    tags(): string[] {
      return [...new Set(this.productVariantStats
      .flatMap((stats: ProductVariantStatsOutput) => stats.product.tags))]
      .sort((a, b) => a.localeCompare(b, 'da-DK'));
    },
    productTypes(): string[] {
      return [...new Set(this.productVariantStats
      .map((stats: ProductVariantStatsOutput) => stats.product.productType)
      .filter((category): category is string => category != null))]
      .sort((a, b) => a.localeCompare(b, 'da-DK'));
    },
    vendors(): string[] {
      return [...new Set(this.productVariantStats
      .map((stats: ProductVariantStatsOutput) => stats.product.vendor)
      .filter((category): category is string => category != null))]
      .sort((a, b) => a.localeCompare(b, 'da-DK'));
    },
  },
  watch: {
    fromDate(): void {
      this.fetch();
    },
  },
  mounted() {
    this.fitToken = loadToken();
    this.fetch();
  }
});
</script>

<template>
  <div class="row my-4">
    <h1 class="display-5">
      Tilbageværende lager
    </h1>
  </div>

  <div class="row mb-3">
    <div class="col-3">
      <div class="row mb-2">
        <div class="d-grid">
          <button type="button" class="btn btn-outline-primary" @click="setDate('30-DAYS')">
            Sidste 30 dage
          </button>
        </div>
      </div>

      <div class="row mb-2">
        <div class="d-grid">
          <button type="button" class="btn btn-outline-primary" @click="setDate('START-YEAR')">
            I år
          </button>
        </div>
      </div>

      <div class="row">
        <Datepicker id="fromDateInput" v-model="fromDate" auto-apply
                    :close-on-auto-apply="true" :clearable="false"
                    :enable-time-picker="false"/>
      </div>
    </div>

    <div class="col-3">
      <FilterSection type="TAG" :values="tags"
                     placeholder-text="Søg efter tags..."
                     @filter-values-updated="updateFilters('TAG', $event)"
                     :highlights="[{title: 'Løsvægt', value: 'løsvægt'}, {title: 'Stalden', value: 'stalden'}]"/>
    </div>

    <div class="col-3">
      <FilterSection type="PRODUCT_TYPE" :values="productTypes"
                     placeholder-text="Søg efter produkttype..."
                     @filter-values-updated="updateFilters('PRODUCT_TYPE', $event)"
                     :highlights="[{title: 'Tilbehør', value: 'Tilbehør'}]"/>
    </div>

    <div class="col-3">
      <FilterSection type="VENDOR" :values="vendors"
                     placeholder-text="Søg efter vendor..."
                     @filter-values-updated="updateFilters('VENDOR', $event)"
                     :highlights="[{title: 'ForeverTray', value: 'ForeverTray'}, {title: 'Nelson Garden', value: 'Nelson Garden'}]"/>
    </div>
  </div>

  <div class="row">
    <div v-if="loading" class="d-flex justify-content-center mt-5 text-primary">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Henter data...</span>
      </div>
    </div>

    <RemainingTable v-else :input="productVariantStats" :filters="filters"/>
  </div>
</template>

<style scoped lang="scss">
.spinner-border {
  width: 4rem;
  height: 4rem;
}
</style>
