<template>
  <div class="row mb-2" v-for="highlight in highlights" v-bind:key="highlight.value">
    <div class="d-grid">
      <button type="button" class="btn btn-outline-primary"
              @click="addFilterValue(highlight.value)">
        {{ highlight.title }}
      </button>
    </div>
  </div>

  <div class="row mb-2">
    <div>
      <input class="form-control" :list="`datalist${type}`"
             :placeholder="placeholderText" v-model="selectedDatalistValue">
      <datalist :id="`datalist${type}`">
        <option v-for="value in remainingValues" v-bind:key="value" :value="value"/>
      </datalist>
    </div>
  </div>

  <div class="mb-2">
        <span class="badge filter-badge text-bg-primary me-1"
              v-for="filterValue in filterValues" v-bind:key="filterValue"
              @click="removeFilterValue(filterValue)">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="bi bi-x" viewBox="0 0 16 16">
              <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </span>
          {{ filterValue }}
        </span>
  </div>
</template>
<script lang="ts">
import type {PropType} from "vue";
import {defineComponent} from "vue";
import type {FilterType} from "@/components/remainingTable/Filter";

export default defineComponent({
  name: 'FilterSection',
  emits: ['filterValuesUpdated'],
  props: {
    type: {type: String as PropType<FilterType>, required: true},
    values: {type: Array as PropType<string[]>, required: true},
    placeholderText: {type: String, required: true},
    highlights: {type: Array as PropType<{ title: string, value: string }[]>, required: true},
  },
  data() {
    return {
      filterValues: [] as string[],
      selectedDatalistValue: undefined as string | undefined,
    };
  },
  methods: {
    addFilterValue(filterValue: string): void {
      if (this.filterValues.includes(filterValue)) {
        return;
      }

      this.filterValues.push(filterValue);
      this.emitFilters();
    },
    removeFilterValue(filterValue: string): void {
      this.filterValues = this.filterValues.filter((f: string) => f !== filterValue);
      this.emitFilters();
    },
    emitFilters(): void {
      const filters = this.filterValues
      .map((filterValue) => ({type: this.type, value: filterValue}));

      this.$emit('filterValuesUpdated', filters);
    },
  },
  computed: {
    remainingValues(): string[] {
      return this.values.filter((value) => this.filterValues.every((filterValue) => filterValue !== value));
    },
  },
  watch: {
    selectedDatalistValue(): void {
      if (this.selectedDatalistValue == null) {
        return;
      }

      this.addFilterValue(this.selectedDatalistValue);
      this.selectedDatalistValue = undefined;
    },
  },
});
</script>

<style scoped lang="scss">
.filter-badge {
  cursor: pointer;
}
</style>