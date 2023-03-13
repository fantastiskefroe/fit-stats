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
  subWeeks,
  subYears
} from "date-fns";
import {defineComponent} from "vue";
import type {GroupByUnitInput, StatsOutput} from "@/api/shopify-data";
import {loadToken} from "@/util/token-service";
import {endOfWeekMon, startOfWeekMon} from "@/util/date-service";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import {Bar, Line} from "vue-chartjs";

ChartJS.register(PointElement, LineElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const now = new Date();

export default defineComponent({
  name: 'GroupedContent',
  components: {Bar, Line, Datepicker},
  data() {
    return {
      date: [startOfWeekMon(now), endOfWeekMon(now)],
      groupBy: 'DAY' as GroupByUnitInput,
      presetRanges: [
        {label: 'I dag', range: [now, now]},
        {label: 'I går', range: [subDays(now, 1), subDays(now, 1)]},
        {label: 'Denne uge', range: [startOfWeekMon(now,), endOfWeekMon(now)]},
        {
          label: 'Sidste uge',
          range: [startOfWeekMon(subWeeks(now, 1)), endOfWeekMon(subWeeks(now, 1))]
        },
        {label: 'Denne måned', range: [startOfMonth(now), endOfMonth(now)]},
        {
          label: 'Sidste måned',
          range: [startOfMonth(subMonths(now, 1)), endOfMonth(subMonths(now, 1))]
        },
        {label: 'I år', range: [startOfYear(now), endOfYear(now)]},
        {label: 'Sidste år', range: [startOfYear(subYears(now, 1)), endOfYear(subYears(now, 1))]}
      ],
      stats: [] as StatsOutput[],
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

      this.stats = [];

      StatsApi.getStatsGrouped({
        from,
        to,
        unit: this.groupBy,
        xFitToken: this.fitToken
      })
      .then((statsOutputList: StatsOutput[]) => {
        this.stats = statsOutputList;
      });
    },
  },
  computed: {
    chartData() {
      return {
        labels: this.stats
        .map((s) => `${s.from ?? '--'} - ${s.to ?? '--'}`),
        datasets: [
          {
            label: 'Antal ordrer',
            data: this.stats.map((s) => s.numberOfOrders),
            backgroundColor: '#4e73df',
            hoverBackgroundColor: '#2e59d9',
            borderColor: '#4e73df',
          },
          // {
          //   label: 'Antal ordrelinjer',
          //   data: this.stats.map((s) => s.numberOfOrderLines),
          //   backgroundColor: '#1cc88a',
          //   hoverBackgroundColor: '#17a673',
          //   borderColor: '#1cc88a',
          // },
          // {
          //   label: 'Gennemsnitsordre',
          //   data: this.stats.map((s) => s.averageOrderValue),
          //   backgroundColor: '#36b9cc',
          //   hoverBackgroundColor: '#2c9faf',
          //   borderColor: '#36b9cc',
          // },
          // {
          //   label: 'Gennemsnitlig fragtpris',
          //   data: this.stats.map((s) => s.averageShippingValue),
          //   backgroundColor: '#f6c23e',
          //   hoverBackgroundColor: '#f4b619',
          //   borderColor: '#f6c23e',
          // },
          // {
          //   label: 'Gennemsnitlig ordrevægt',
          //   data: this.stats.map((s) => s.averageOrderWeight),
          //   backgroundColor: '#e74a3b',
          //   hoverBackgroundColor: '#e74a3b',
          //   borderColor: '#e74a3b',
          // },
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Statistik'
          }
        }
      }
    }
  },
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
  </div>

  <div>
    <Bar
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
    />
  </div>

  <div>
    <Line
        :options="chartOptions"
        :data="chartData"
    />
  </div>

</template>

<style scoped lang="scss">
</style>
