<template>
  <div class="title">{{ title }}</div>
  <div class="col-sm-12 row">
    <div class="col-sm-12 row">
      <div class="col-sm-6 q-pa-md">
        <q-input v-model="message" label="Message" />
      </div>
      <div class="col-sm-6 q-pa-md">
        <q-select
          v-model="category"
          :options="categories"
          label="Category"
          option-label="description"
          option-value="id"
        />
      </div>
    </div>
    <div class="col-sm-12 text-center q-mt-lg">
      <q-btn @click="sendNotification" color="primary" size="sm" label="Send" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  font-size: 15px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>

<script lang="ts">
import axios from 'axios';
import { defineComponent, ref } from 'vue';
import { Category } from './models';
import { useQuasar } from 'quasar';
import { config } from '../config/index';
const API_URL = config.apiUrl;

export default defineComponent({
  name: 'FormNotification',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const $q = useQuasar();
    const isLoading = ref<boolean>(false);
    const message = ref<string>('');
    const categories = ref<Category[]>([
      {
        id: 'Finance',
        description: 'Finance'
      },
      {
        id: 'Sports',
        description: 'Sports'
      },
      {
        id: 'Movies',
        description: 'Movies'
      }
    ]);
    const category = ref<Category>(categories.value[0]);

    const sendNotification = async () => {
      try {
        isLoading.value = true;
        const notification = {
          category: {
            description: category.value.id
          },
          message: message.value
        };
        await axios.post(`${API_URL}/notification`, notification);
        $q.notify({
          type: 'positive',
          message: 'Success sent'
        });
        isLoading.value = false;
      } catch {
        $q.notify({
          type: 'negative',
          message: 'Error in sending notification.'
        });
        isLoading.value = false;
      }
    };
    return { message, categories, category, sendNotification };
  }
});
</script>
