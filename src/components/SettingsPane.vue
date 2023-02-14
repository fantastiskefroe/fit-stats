<template>
  <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvas">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Indstillinger</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
              aria-label="Close"></button>
    </div>

    <div class="offcanvas-body d-flex flex-column justify-content-between">
      <div class="container">
        <div class="row">
          <div class="col gy-3">
            <label for="fitTokenInput" class="form-label">Token</label>
            <input type="password" class="form-control" id="fitTokenInput" v-model="fitToken">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import {defineComponent} from 'vue';
import {loadToken, saveToken} from "@/util/token-service";


export default defineComponent({
  name: "SettingsPane",
  data() {
    return {
      fitToken: "" as string
    };
  },
  computed: {},
  methods: {},
  watch: {
    fitToken(token: string): void {
      saveToken(token);
    },
  },
  mounted() {
    this.fitToken = loadToken();
  }
});
</script>


<style scoped lang="scss">

</style>