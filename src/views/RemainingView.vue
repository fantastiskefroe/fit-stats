<script lang="ts">
import {StatsApi} from '@/util/api';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {startOfDay, startOfMonth} from "date-fns";
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

  <div class="col gy-3">
    <label for="fromDateInput" class="form-label">Fra dato</label>
    <Datepicker id="fromDateInput" v-model="fromDate" auto-apply
                :close-on-auto-apply="true" :clearable="false"
                :enable-time-picker="false"/>
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