<script lang="ts">
import {StatsApi} from '@/util/api';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {addDays, startOfDay} from "date-fns";
import {defineComponent} from "vue";
import type {StatsOutput} from "@/api/shopify-data";
import {loadToken} from "@/util/token-service";
import DataCard from "@/components/dashboard/DataCard.vue";

const now = new Date();

export default defineComponent({
  name: 'DashboardContent',
  components: {DataCard, Datepicker},
  data() {
    return {
      date: [now, now],
      loading: false,
      stats: undefined as StatsOutput | undefined,
      taxesIncluded: true,
      fitToken: "" as string
    };
  },
  methods: {
    fetch(): void {
      const from = startOfDay(this.date[0]);
      const to = addDays(startOfDay(this.date[1]), 1);
      if (from > to) {
        return;
      }

      this.loading = true;

      StatsApi.getStats({
        from,
        to,
        xFitToken: this.fitToken
      })
      .then((statsOutput: StatsOutput) => {
        this.stats = statsOutput;
        this.loading = false;
      });
    },
    formatCurrency(input: number | undefined): string | undefined {
      if (input == null) {
        return undefined;
      }

      const value = this.taxesIncluded ? input : input * 0.8;

      return value.toLocaleString('da-dk', {currency: 'DKK', style: 'currency'});
    },
    formatWeight(input: number | undefined | null, type: 'kg' | 'g'): string | undefined {
      if (input == null) {
        return undefined;
      }

      const value = type === 'g' ? input : input / 1000;

      return `${value.toLocaleString('da-dk')} ${type}`;
    }
  },
  computed: {},
  watch: {
    date() {
      this.fetch();
    }
  },
  mounted() {
    this.fitToken = loadToken();
    this.fetch();
  }
});
</script>

<template>
  <div class="row mb-3">
    <div class="col-8 col-md-4">
      <div class="row">
        <Datepicker v-model="date" auto-apply :range="true"
                    :close-on-auto-apply="true" :clearable="false"
                    :enable-time-picker="false"/>
      </div>
    </div>
    <div class="col-4 col-md-4 d-flex align-items-center">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" v-model="taxesIncluded" checked
               id="taxesIncludedSwitch">
        <label class="form-check-label" for="taxesIncludedSwitch">Moms</label>
      </div>
    </div>
  </div>

  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col">
      <DataCard :data="stats?.numberOfOrders?.toLocaleString('da-dk')"
                title="Ordrer"/>
    </div>
    <div class="col">
      <DataCard :data="formatCurrency(stats?.totalOrderValue)"
                title="Total salg"/>
    </div>
    <div class="col">
      <DataCard :data="formatCurrency(stats?.averageOrderValue)"
                title="Gennemsnitsordre"/>
    </div>
    <div class="col">
      <DataCard :data="stats?.numberOfOrderLines?.toLocaleString('da-dk')"
                title="Ordrelinjer"/>
    </div>
    <div class="col">
      <DataCard :data="formatCurrency(stats?.totalOrderLineValue)"
                title="Total ordrelinjeværdi"/>
    </div>
    <div class="col">
      <DataCard :data="formatCurrency(stats?.averageOrderLineValue)"
                title="Gennemsnitsordrelinje"/>
    </div>
    <div class="col">
      <DataCard v-if="stats?.totalOrderWeight != null"
                :data="formatWeight(stats?.totalOrderWeight, 'kg')"
                title="Total vægt"/>
    </div>
    <div class="col">
      <DataCard :data="formatCurrency(stats?.totalShippingValue)"
                title="Total fragt"/>
    </div>
    <div class="col">
      <DataCard v-if="stats?.totalOrderWeight != null"
                :data="formatWeight(stats?.averageOrderWeight, 'kg')"
                title="Gennemsnitsvægt"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
