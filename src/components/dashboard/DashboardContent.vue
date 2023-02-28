<script lang="ts">
import {StatsApi} from '@/util/api';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {
  addDays,
  endOfMonth,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears
} from "date-fns";
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
      presetRanges: [
        {label: 'I dag', range: [now, now]},
        {label: 'I går', range: [subDays(now, 1), subDays(now, 1)]},
        {label: 'Denne måned', range: [startOfMonth(now), endOfMonth(now)]},
        {
          label: 'Sidste måned',
          range: [startOfMonth(subMonths(now, 1)), endOfMonth(subMonths(now, 1))]
        },
        {label: 'I år', range: [startOfYear(now), endOfYear(now)]},
        {label: 'Sidste år', range: [startOfYear(subYears(now, 1)), endOfYear(subYears(now, 1))]}
      ],
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

      this.stats = undefined;

      StatsApi.getStats({
        from,
        to,
        xFitToken: this.fitToken
      })
      .then((statsOutput: StatsOutput) => {
        this.stats = statsOutput;
      });
    },
    taxMultiplier(input?: number): number | undefined {
      if (input == null) {
        return undefined;
      }

      return this.taxesIncluded ? input : input * 0.8;
    },
    formatCurrency(input?: number): string | undefined {
      if (input == null) {
        return undefined;
      }

      return input.toLocaleString('da-dk', {currency: 'DKK', style: 'currency'});
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
        <Datepicker v-model="date" :preset-ranges="presetRanges" auto-apply week-numbers="iso"
                    :range="true" :multi-calendars="true"
                    :close-on-auto-apply="true" :clearable="false"
                    :enable-time-picker="false"/>
      </div>
    </div>
    <div class="col-4 col-md-4 d-flex align-items-center">
      <div class="form-check form-switch">
        <input class="form-check-input clickable" type="checkbox" v-model="taxesIncluded" checked
               id="taxesIncludedSwitch">
        <label class="form-check-label clickable" for="taxesIncludedSwitch">Moms</label>
      </div>
    </div>
  </div>

  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col">
      <DataCard :data="stats?.numberOfOrders?.toLocaleString('da-dk', {useGrouping: false})"
                :data-formatted="stats?.numberOfOrders?.toLocaleString('da-dk')"
                title="Ordrer"/>
    </div>
    <div class="col">
      <DataCard :data="taxMultiplier(stats?.totalOrderValue)?.toLocaleString('da-dk', {useGrouping: false})"
                :data-formatted="formatCurrency(taxMultiplier(stats?.totalOrderValue))"
                title="Total salg"/>
    </div>
    <div class="col">
      <DataCard :data="taxMultiplier(stats?.averageOrderValue)?.toLocaleString('da-dk', {useGrouping: false})"
                :data-formatted="formatCurrency(taxMultiplier(stats?.averageOrderValue))"
                title="Gennemsnitsordre"/>
    </div>
    <div class="col">
      <DataCard :data="stats?.numberOfOrderLines?.toLocaleString('da-dk', {useGrouping: false})"
                :data-formatted="stats?.numberOfOrderLines?.toLocaleString('da-dk')"
                title="Ordrelinjer"/>
    </div>
    <div class="col">
      <DataCard :data="taxMultiplier(stats?.totalOrderLineValue)?.toLocaleString('da-dk', {useGrouping: false})"
                :data-formatted="formatCurrency(taxMultiplier(stats?.totalOrderLineValue))"
                title="Total ordrelinjeværdi"/>
    </div>
    <div class="col">
      <DataCard :data="taxMultiplier(stats?.averageOrderLineValue)?.toLocaleString('da-dk', {useGrouping: false})"
                :data-formatted="formatCurrency(taxMultiplier(stats?.averageOrderLineValue))"
                title="Gennemsnitsordrelinje"/>
    </div>
    <div class="col">
      <DataCard v-if="stats?.totalOrderWeight != null"
                :data="stats?.totalOrderWeight?.toLocaleString('da-dk', {useGrouping: false})"
                :data-formatted="formatWeight(stats?.totalOrderWeight, 'kg')"
                title="Total vægt"/>
    </div>
    <div class="col">
      <DataCard :data="taxMultiplier(stats?.totalShippingValue)?.toLocaleString('da-dk', {useGrouping: false})"
                :data-formatted="formatCurrency(taxMultiplier(stats?.totalShippingValue))"
                title="Total fragt"/>
    </div>
    <div class="col">
      <DataCard v-if="stats?.totalOrderWeight != null"
                :data="stats?.averageOrderWeight?.toLocaleString('da-dk', {useGrouping: false})"
                :data-formatted="formatWeight(stats?.averageOrderWeight, 'kg')"
                title="Gennemsnitsvægt"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
