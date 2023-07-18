<template>
  <q-page class="row">
    <div class="col-sm-12 row">
      <div class="col-sm-2"></div>
      <div class="col-sm-8">
        <FormNotification title="Form notification"></FormNotification>
      </div>
      <div class="col-sm-2"></div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormNotification from 'components/FormNotification.vue';

export default defineComponent({
  name: 'PageNotification',
  components: { FormNotification }
});
</script>
