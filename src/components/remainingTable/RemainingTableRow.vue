<script lang="ts">
import '@vuepic/vue-datepicker/dist/main.css';
import {defineComponent, type PropType} from "vue";
import type {Row} from "@/components/remainingTable/Row";


export default defineComponent({
  name: "RemainingTableRow",
  props: {
    row: {type: Object as PropType<Row>, required: true}
  },
});
</script>

<template>
  <tr class="align-middle">
    <td class="text-center">
      <img
          :src="row.imgSrc"
          loading="lazy" class="img-thumbnail"
          :alt="row.title">
    </td>
    <td>
      {{ row.title }}
      <br>
      <span class="text-secondary">
            {{ row.subTitle }}
          </span>
    </td>
    <td>
      {{ row.inventoryRemaining }}
    </td>
    <td>
      {{ row.soldPerDay.toFixed(2) }}
    </td>
    <td>
      {{ row.daysRemaining.toFixed(1) }}
    </td>
    <td>
      {{ row.numberSold }}
    </td>
  </tr>
</template>

<style scoped lang="scss">
.img-thumbnail {
  height: 48px !important;
}
</style>