<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderView from '@/components/HeaderView.vue'

import { useLabesStore } from '@/stores/labels'

const { setAllLabels } = useLabesStore()

setAllLabels()
</script>

<template>
  <HeaderView />
  <RouterView />
</template>
