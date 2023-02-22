<script lang="ts">
import '@vuepic/vue-datepicker/dist/main.css';
import {defineComponent} from "vue";
import RemainingContent from "@/components/remaining/RemainingContent.vue";

export default defineComponent({
  components: {RemainingContent},
});
</script>

<template>
  <div class="row my-4">
    <h1 class="display-5">
      Tilbageværende lager
    </h1>
  </div>

  <RemainingContent/>
</template>

<style scoped lang="scss">

</style>
