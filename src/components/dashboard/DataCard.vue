<template>
  <div v-if="data == null" class="card" aria-hidden="true">
    <div class="card-data-top">
      <span class="placeholder col-3"></span>
    </div>
    <div class="card-body">
      <h5 class="card-title placeholder-glow">
        <span class="placeholder col-6"></span>
      </h5>
      <p v-if="body" class="card-text placeholder-glow">
        <span class="placeholder col-7"></span>
        <span class="placeholder col-6"></span>
        <span class="placeholder col-8"></span>
      </p>
    </div>
  </div>

  <div v-else class="card">
    <div class="card-data-top">
      {{ data }}
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

export default defineComponent({
  name: 'DataCard',
  props: {
    data: {type: String as PropType<string>, required: false},
    title: {type: String, required: true},
    body: {type: String, required: false},
  },
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