<script lang="ts">
import '@vuepic/vue-datepicker/dist/main.css';
import {defineComponent, type PropType} from "vue";
import type {Row} from "@/components/remainingTable/Row";
import {Tooltip} from "bootstrap";
import {addDays} from "date-fns";

export default defineComponent({
  name: "RemainingTableRow",
  props: {
    row: {type: Object as PropType<Row>, required: true}
  },
  computed: {
    lastDay(): string {
      return addDays(new Date(), this.row.daysRemaining).toLocaleDateString();
    }
  },
  mounted() {
    new Tooltip(document.body, {
      selector: "[data-bs-toggle='tooltip']",
    })
  }
});
</script>

<template>
  <tr class="align-middle">
    <td class="text-center img-col">
      <img
          loading="lazy"
          :src="row.imgSrc"
          :alt="row.title">
    </td>
    <td class="title-col">
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
      <span data-bs-toggle="tooltip"
            data-bs-placement="right"
            :title="lastDay">
      {{ row.daysRemaining.toFixed(1) }}

      </span>
    </td>
    <td>
      {{ row.numberSold }}
    </td>
  </tr>
</template>

<style scoped lang="scss">
.img-col {
  min-width: 100px;

  img {
    height: 48px !important;
  }
}

.title-col {
  min-width: 400px;
}


</style>