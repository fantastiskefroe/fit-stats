<script lang="ts">
import '@vuepic/vue-datepicker/dist/main.css';
import {defineComponent, type PropType} from "vue";
import type {Row} from "@/components/remaining/Row";
import {Tooltip} from "bootstrap";
import {addDays} from "date-fns";
import {CopyService} from "@/util/copy-service";

export default defineComponent({
  name: "RemainingTableRow",
  props: {
    row: {type: Object as PropType<Row>, required: true}
  },
  computed: {
    daysRemaining(): string {
      if (typeof this.row.daysRemaining == "string" ) {
        return this.row.daysRemaining;
      }

      return this.row.daysRemaining.toFixed(1);
    },
    lastDay(): string {
      if (typeof this.row.daysRemaining == "string" ) {
        return '';
      }

      return addDays(new Date(), this.row.daysRemaining).toLocaleDateString("da-DK", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  },
  methods: {
    copy(text: string): void {
      CopyService.copy(text);
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
     <span class="text-secondary copy" @click="copy(row.sku)">
        {{ row.sku }}
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
      {{ daysRemaining }}
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
  min-width: 300px;
}


</style>