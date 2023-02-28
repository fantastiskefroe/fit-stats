<template>
  <div class="position-relative">
    <div class="toast-container position-fixed bottom-0 end-0 p-3">

      <div v-for="toast in toasts" v-bind:key="toast.id" :ref="'toast-' + toast.id"
           class="toast"
           role="alert"
           aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">{{ toast.title }}</strong>
          <small>{{ toast.timestamp.toLocaleTimeString() }}</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast"
                  aria-label="Close"></button>
        </div>
        <div class="toast-body">
          {{ toast.body }}
        </div>
      </div>

    </div>
  </div>
</template>


<script lang="ts">
import {defineComponent} from "vue";
import {ToastService} from "@/util/toast-service";
import type {ToastData} from "@/components/toast/ToastData";
import {Toast} from "bootstrap";

export default defineComponent({
  name: "ToastComponent",
  data() {
    return {
      toasts: [] as ToastData[],
      initializedToastIds: [] as string[]
    };
  },
  mounted() {
    ToastService.toasts$.subscribe((toasts) => {
      this.toasts = toasts;
      setTimeout(() => {
        this.toasts
        .filter((toastData) => !this.initializedToastIds.includes(toastData.id))
        .forEach((toastData) => {
          const toastRef = (this.$refs['toast-' + toastData.id] as HTMLDivElement[])[0];
          console.log(toastRef);
          toastRef.addEventListener('hidden.bs.toast', () => ToastService.removeToast(toastData.id));

          const toast = new Toast(toastRef);
          toast.show();
          this.initializedToastIds.push(toastData.id);
        });
      }, 1);
    });
  }
});
</script>


<style scoped lang="scss">

</style>