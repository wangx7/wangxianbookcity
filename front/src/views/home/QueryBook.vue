<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')
</script>

<template>
  <div class="query_class">
    <input type="text" v-model="inputValue" placeholder="搜书名/作者" />
  </div>
</template>

<style scoped>
.query_class {
  text-align: center;
  background-color: var(--color-background-soft);
  padding: 40px 0 50px;
}
input {
  width: 300px;
  height: 45px;
  padding: 5px 20px;
}
</style>
