<template>
  <div class="card">
    <div v-if="data == null" class="card-data-top">
      <span class="placeholder col-3"></span>
    </div>
    <div v-else class="card-data-top copy" @click="copy(data)">
      {{ dataFormatted }}
    </div>
    <div class="card-body">
      <h5 class="card-title text-center">
        {{ title }}
      </h5>

      <p v-if="body" class="card-text">
        {{ body }}
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, type PropType} from "vue";
import {CopyService} from "@/util/copy-service";

export default defineComponent({
  name: 'DataCard',
  props: {
    data: {type: String as PropType<string>, required: false},
    dataFormatted: {type: String as PropType<string>, required: false},
    title: {type: String, required: true},
    body: {type: String, required: false},
  },
  methods: {
    copy(text?: string): void {
      if (text === undefined) {
        return;
      }

      CopyService.copy(text);
    }
  }
});
</script>
<style lang="scss" scoped>
.card-data-top {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  padding: 1rem;
}
</style>