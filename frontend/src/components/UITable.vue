<template>
  <div>
    <q-table :title="title" :rows="rows" :columns="columns" row-key="name" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Log } from './models';

export default defineComponent({
  name: 'ExampleComponent',
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
  }
});
</script>
