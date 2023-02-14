<script lang="ts">
import {StatsApi} from '@/util/api';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {startOfDay, startOfMonth} from "date-fns";
import {defineComponent} from "vue";
import type {ProductVariantStatsOutput} from "@/api/shopify-data";
import {loadToken} from "@/util/token-service";

const now = new Date();

export default defineComponent({
  components: {Datepicker},
  data() {
    return {
      fromDate: startOfMonth(now),
      productVariantStats: [] as ProductVariantStatsOutput[],
      fitToken: "" as string
    };
  },
  computed: {
    filteredStats() {
      return this.productVariantStats;
    }
  },
  methods: {
    fetch(): void {
      StatsApi.getProductVariantStats({
        from: startOfDay(this.fromDate),
        xFitToken: this.fitToken
      })
      .then((productVariantStats: ProductVariantStatsOutput[]) => this.productVariantStats = productVariantStats);
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
    <div class="table-responsive">
      <table class="table table-striped">
        <thead class="sticky-top bg-white">
        <tr>
          <th></th>
          <th>Titel</th>
          <th>Antal tilbage</th>
          <th>Solgt per dag</th>
          <th>Dage tilbage</th>
          <th>Antal solgt</th>
        </tr>
        </thead>
        <tbody class="table-group-divider">
        <tr v-for="stat in filteredStats" v-bind:key="stat.variant.shopifyId"
            class="align-middle">
          <td class="text-center">
            <img
                :src="stat.product.mainImageUrl === '' ? 'https://cdn.shopify.com/s/files/1/0276/3902/1652/files/FantastiskeFroe_logo_mini_32x32.png?v=1583103209' : stat.product.mainImageUrl"
                loading="lazy" class="img-thumbnail"
                :alt="stat.variant.title">
          </td>
          <td>
            {{ stat.product.title }}
            <br>
            <span class="text-secondary">
            {{ stat.variant.title }}
            </span>
          </td>
          <td>
            {{ stat.variant.inventoryQuantity }}
          </td>
          <td>
            {{ stat.soldPerDay.toFixed(2) }}
          </td>
          <td>
            {{ stat.daysLeft.toFixed(1) }}
          </td>
          <td>
            {{ stat.numSold }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.img-thumbnail {
  height: 48px !important;
}
</style>