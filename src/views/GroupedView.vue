<script lang="ts">
import '@vuepic/vue-datepicker/dist/main.css';
import {defineComponent} from "vue";
import GroupedContent from "@/components/grouped/GroupedContent.vue";

export default defineComponent({
  components: {GroupedContent},
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
      Grafer
    </h1>
  </div>

  <GroupedContent/>

</template>

<style scoped lang="scss">
</style>
