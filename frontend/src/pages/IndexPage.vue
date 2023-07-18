<template>
  <q-page class="row">
    <div class="col-sm-12 row">
      <div class="col-sm-2"></div>
      <div class="col-sm-8">
        <UITable
          class="q-pt-md"
          title="Logs"
          :rows="logs"
          :columns="columns"
        ></UITable>
      </div>
      <div class="col-sm-2"></div>

      <q-inner-loading
        :showing="isLoading"
        label="Please wait..."
        label-class="text-primary"
        label-style="font-size: 1.1em"
      >
      </q-inner-loading>
    </div>
  </q-page>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, onMounted, ref } from 'vue';
import { Log, Column } from 'components/models';
import UITable from 'components/UITable.vue';
import { config } from '../config/index';
import { useQuasar } from 'quasar';
const API_URL = config.apiUrl;

export default defineComponent({
  name: 'IndexPage',
  components: { UITable },
  setup() {
    const $q = useQuasar();
    const isLoading = ref<boolean>(true);
    const logs = ref<Log[]>([]);

    onMounted(async () => {
      try {
        const response = await axios.get(`${API_URL}/logs`);
        isLoading.value = false;
        logs.value = response.data.map((item: any) => {
          const log: Log = {
            id: item.id,
            message: item.message,
            timestamp: `${item.updatedAt
              .slice(0, 10)
              .split('-')
              .reverse()
              .join('/')} ${item.updatedAt.slice(11, 16)}`
          };
          return log;
        });
      } catch {
        $q.notify({
          type: 'negative',
          message: 'Error in searching logs.'
        });
        isLoading.value = false;
      }
    });

    const columns = ref<Column[]>([
      {
        name: 'id',
        label: 'Id',
        field: 'id',
        align: 'left'
      },
      {
        name: 'message',
        label: 'Message',
        field: 'message',
        align: 'left'
      },
      {
        name: 'timestamp',
        label: 'Timestmap',
        field: 'timestamp',
        align: 'left'
      }
    ]);
    return { logs, columns, isLoading };
  }
});
</script>
