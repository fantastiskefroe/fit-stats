<script lang="ts">
import {defineComponent} from "vue";
import FilterSection from "@/components/remaining/FilterSection.vue";
import RemainingTable from "@/components/remaining/RemainingTable.vue";
import Datepicker from "@vuepic/vue-datepicker";
import {startOfDay, subDays, subYears} from "date-fns";
import type {Filter, FilterType} from "@/components/remaining/Filter";
import type {ProductVariantStatsOutput} from "@/api/shopify-data";
import {StatsApi} from "@/util/api";
import {loadToken} from "@/util/token-service";

const now = new Date();

export default defineComponent({
  components: {FilterSection, RemainingTable, Datepicker},
  data() {
    return {
      loading: false,
      fromDate: subDays(now, 30),
      filters: [] as Filter[],
      productVariantStats: [] as ProductVariantStatsOutput[],
      fitToken: "" as string
    };
  },
  methods: {
    setDate(type: '30-DAYS' | '1-YEAR'): void {
      switch (type) {
        case "30-DAYS":
          this.fromDate = subDays(now, 30);
          break;
        case "1-YEAR":
          this.fromDate = subYears(now, 1);
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
          <button type="button" class="btn btn-outline-primary" @click="setDate('1-YEAR')">
            Sidste år
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
