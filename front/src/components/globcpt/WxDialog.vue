<template>
  <div class="wx-dialog" v-if="modelValue">
    <div class="wx-dialog-overlay"></div>
    <div v-dialog-drag :style="styles" class="wx-dialog-content">
      <div class="wx-dialog-header">
        <slot name="header">
          <h3>{{ title }}</h3>
        </slot>
        <button class="wx-dialog-close-btn" @click="close">×</button>
      </div>
      <div class="wx-dialog-body">
        <slot></slot>
      </div>
      <div class="wx-dialog-footer">
        <slot name="footer">
          <!-- <button class="btn_lv" @click="close">保存</button> -->
        </slot>
        <button @click="close">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  width: {
    type: String,
    default: '600px'
  },
  height: {
    type: String,
    default: 'auto'
  },
  title: {
    type: String
  }
})

const styles = computed(() => {
  return {
    width: props.width,
    height: props.height
  }
})

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped lang="scss">
.wx-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;

  .wx-dialog-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .wx-dialog-content {
    background-color: #fff;
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 9;

    .wx-dialog-header {
      display: flex;
      align-items: center;
      padding: 0 15px;
      background-color: var(--color-background-soft);
      justify-content: space-between;

      .wx-dialog-close-btn {
        cursor: pointer;
      }
    }

    .wx-dialog-body {
      padding: 10px;
      max-height: 60vh;
      overflow: auto;
    }
    .wx-dialog-footer {
      text-align: center;
    }
  }
}
</style>
