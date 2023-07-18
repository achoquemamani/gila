<template>
  <div>
    <q-table
      :pagination="initialPagination"
      :title="title"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Log } from './models';

export default defineComponent({
  name: 'UITable',
  props: {
    title: {
      type: String,
      required: true
    },
    rows: {
      type: Array as PropType<Log[]>,
      default: () => []
    },
    columns: {
      type: Array as PropType<
        {
          name: string;
          label: string;
          field: string;
        }[]
      >,
      default: () => []
    }
  },
  setup() {
    const initialPagination = ref({
      rowsPerPage: 10
    });
    return { initialPagination };
  }
});
</script>
