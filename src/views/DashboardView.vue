<script lang="ts">
import '@vuepic/vue-datepicker/dist/main.css';
import {defineComponent} from "vue";
import DashboardContent from "@/components/dashboard/DashboardContent.vue";

export default defineComponent({
  components: {DashboardContent},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
  mounted() {
  }
});
</script>

<template>
  <div class="row my-4">
    <h1 class="display-5">
      Dashboard
    </h1>
  </div>

  <DashboardContent/>

</template>

<style scoped lang="scss">
</style>
