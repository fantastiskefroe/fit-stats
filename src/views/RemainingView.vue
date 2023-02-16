<script lang="ts">
import {StatsApi} from '@/util/api';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {subDays, startOfDay, startOfMonth, startOfYear} from "date-fns";
import {defineComponent} from "vue";
import type {ProductVariantStatsOutput} from "@/api/shopify-data";
import {loadToken} from "@/util/token-service";
import RemainingTable from "@/components/remainingTable/RemainingTable.vue";

const now = new Date();

export default defineComponent({
  components: {RemainingTable, Datepicker},
  data() {
    return {
      loading: false,
      fromDate: startOfMonth(now),
      productVariantStats: [] as ProductVariantStatsOutput[],
      fitToken: "" as string
    };
  },
  methods: {
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
  <div class="row my-3">
    <h1 class="display-4">
      Tilbageværende lager
    </h1>
  </div>

  <div class="row">
    <div class="col-3">
      <Datepicker id="fromDateInput" v-model="fromDate" auto-apply
                  :close-on-auto-apply="true" :clearable="false"
                  :enable-time-picker="false"/>
    </div>

    <div class="col-3">
      <div class="d-grid">
        <button type="button" class="btn btn-outline-primary" @click="setDate('START-YEAR')">I år</button>
      </div>
    </div>

    <div class="col-3">
      <div class="d-grid">
        <button type="button" class="btn btn-outline-primary"  @click="setDate('START-MONTH')">Denne måned</button>
      </div>
    </div>

    <div class="col-3">
      <div class="d-grid">
        <button type="button" class="btn btn-outline-primary" @click="setDate('30-DAYS')" >Sidste 30 dage</button>
      </div>
    </div>
  </div>

  <div class="row">
    <div v-if="loading" class="d-flex justify-content-center mt-5 text-primary">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Henter data...</span>
      </div>
    </div>

    <RemainingTable v-else :input="productVariantStats"/>
  </div>
</template>

<style scoped lang="scss">
.spinner-border {
  width: 4rem;
  height: 4rem;
}
</style>