<template>
  <el-card>
    <music-form />
    <music-table />
  </el-card>
</template>

<script>
import MusicForm from './cpns/form/MusicForm.vue';
import MusicTable from './cpns/table/MusicTable.vue';
export default {
  components: { MusicForm, MusicTable },
  setup() {

    return {
    }
  }
}
</script>

<style scoped>
</style>