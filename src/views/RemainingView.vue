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

const now = new Date();

export default defineComponent({
  components: {RemainingTable, Datepicker},
  data() {
    return {
      loading: false,
      fromDate: startOfMonth(now),
      filters: [] as Filter[],
      tagDatalist: undefined as string | undefined,
      productTypeDatalist: undefined as string | undefined,
      vendorDatalist: undefined as string | undefined,
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
    addFilter(type: FilterType, field: string): void {
      if (this.filters.some((f: Filter) => f.type === type && f.field === field)) {
        return;
      }
      this.filters.push({type, field});
    },
    removeFilter(filter: Filter): void {
      this.filters = this.filters.filter((f: Filter) => f.type !== filter.type || f.field !== filter.field);
    },
    filteredFilters(type: FilterType): Filter[] {
      return this.filters.filter((filter: Filter) => filter.type === type);
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
      .filter((tag) => this.filters.every((filter: Filter) => filter.type !== 'TAG' || filter.field !== tag))
      .sort((a, b) => a.localeCompare(b, 'da-DK'));
    },
    productTypes(): string[] {
      return [...new Set(this.productVariantStats
      .map((stats: ProductVariantStatsOutput) => stats.product.productType)
      .filter((category): category is string => category != null))]
      .filter((category) => this.filters.every((filter: Filter) => filter.type !== 'PRODUCT_TYPE' || filter.field !== category))
      .sort((a, b) => a.localeCompare(b, 'da-DK'));
    },
    vendors(): string[] {
      return [...new Set(this.productVariantStats
      .map((stats: ProductVariantStatsOutput) => stats.product.vendor)
      .filter((category): category is string => category != null))]
      .filter((category) => this.filters.every((filter: Filter) => filter.type !== 'VENDOR' || filter.field !== category))
      .sort((a, b) => a.localeCompare(b, 'da-DK'));
    },
  },
  watch: {
    fromDate(): void {
      this.fetch();
    },
    tagDatalist(newVal: string | undefined): void {
      if (newVal == null) {
        return;
      }

      this.addFilter('TAG', newVal);
      this.tagDatalist = undefined;
    },
    productTypeDatalist(newVal: string | undefined): void {
      if (newVal == null) {
        return;
      }

      this.addFilter('PRODUCT_TYPE', newVal);
      this.productTypeDatalist = undefined;
    },
    vendorDatalist(newVal: string | undefined): void {
      if (newVal == null) {
        return;
      }

      this.addFilter('VENDOR', newVal);
      this.vendorDatalist = undefined;
    }
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
      <div class="row mb-2">
        <div class="d-grid">
          <button type="button" class="btn btn-outline-primary"
                  @click="addFilter('TAG', 'løsvægt')">
            Løsvægt
          </button>
        </div>
      </div>

      <div class="row mb-2">
        <div class="d-grid">
          <button type="button" class="btn btn-outline-primary"
                  @click="addFilter('TAG', 'stalden')">
            Stalden
          </button>
        </div>
      </div>

      <div class="row mb-2">
        <div>
          <input class="form-control" list="datalistTag"
                 placeholder="Søg efter tag..." v-model="tagDatalist">
          <datalist id="datalistTag">
            <option v-for="tag in tags" v-bind:key="tag" :value="tag"/>
          </datalist>
        </div>
      </div>

      <div class="mb-2">
        <span class="badge filter-badge text-bg-primary me-1"
              v-for="filter in filteredFilters('TAG')" v-bind:key="filter.field"
              @click="removeFilter(filter)">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-x" viewBox="0 0 16 16">
              <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </span>
          {{ filter.field }}
        </span>
      </div>
    </div>

    <div class="col-3">
      <div class="row mb-2">
        <div class="d-grid">
          <button type="button" class="btn btn-outline-primary"
                  @click="addFilter('PRODUCT_TYPE', 'Tilbehør')">
            Tilbehør
          </button>
        </div>
      </div>

      <div class="row mb-2">
        <div>
          <input class="form-control" list="datalistCategory"
                 placeholder="Søg efter produkttype..." v-model="productTypeDatalist">
          <datalist id="datalistCategory">
            <option v-for="productType in productTypes" v-bind:key="productType"
                    :value="productType"/>
          </datalist>
        </div>
      </div>

      <div class="mb-2">
        <span class="badge filter-badge text-bg-primary me-1"
              v-for="filter in filteredFilters('PRODUCT_TYPE')" v-bind:key="filter.field"
              @click="removeFilter(filter)">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-x" viewBox="0 0 16 16">
              <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </span>
          {{ filter.field }}
        </span>
      </div>
    </div>

    <div class="col-3">
      <div class="row mb-2">
        <div class="d-grid">
          <button type="button" class="btn btn-outline-primary"
                  @click="addFilter('VENDOR', 'ForeverTray')">
            ForeverTray
          </button>
        </div>
      </div>

      <div class="row mb-2">
        <div class="d-grid">
          <button type="button" class="btn btn-outline-primary"
                  @click="addFilter('VENDOR', 'Nelson Garden')">
            Nelson Garden
          </button>
        </div>
      </div>

      <div class="row mb-2">
        <div>
          <input class="form-control" list="datalistVendor"
                 placeholder="Søg efter vendor..." v-model="vendorDatalist">
          <datalist id="datalistVendor">
            <option v-for="vendor in vendors" v-bind:key="vendor" :value="vendor"/>
          </datalist>
        </div>
      </div>

      <div class="mb-2">
        <span class="badge filter-badge text-bg-primary me-1"
              v-for="filter in filteredFilters('VENDOR')" v-bind:key="filter.field"
              @click="removeFilter(filter)">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-x" viewBox="0 0 16 16">
              <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </span>
          {{ filter.field }}
        </span>
      </div>
    </div>
  </div>

  <div class="row">
    <div v-if="loading" class="d-flex justify-content-center mt-5 text-primary">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Henter data...</span>
      </div>
    </div>

    <RemainingTable v-else :input="productVariantStats" :filters="filters" />
  </div>
</template>

<style scoped lang="scss">
.spinner-border {
  width: 4rem;
  height: 4rem;
}

.filter-badge {
  cursor: pointer;
}
</style>
