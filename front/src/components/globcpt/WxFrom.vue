<template>
  <form class="submit" @submit.prevent="submit" autocomplete="on">
    <div v-for="item in formItems" :key="item.id" class="form-item">
      <label :for="item.id">{{ item.label }}: </label>
      <select
        v-if="item.type === 'select'"
        :id="item.id"
        :placeholder="item.placeholder"
        :multiple="item.multiple"
        :name="item.id"
        @blur="checkItem(item, 'blur')"
        @change="checkItem(item)"
        v-model="item.value"
      >
        <option
          v-for="option of item.options"
          :disabled="option.disabled"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>

      <textarea
        v-else-if="item.type === 'textarea'"
        :id="item.id"
        :placeholder="item.placeholder"
        :name="item.id"
        @blur="checkItem(item, 'blur')"
        @change="checkItem(item)"
        v-model="item.value"
      />

      <div class="check_class" v-else-if="item.type === 'radio' || item.type === 'checkbox'">
        <template v-for="radio of item.options" :key="radio.value">
          <input
            :type="item.type"
            :id="radio.value + ''"
            :value="radio.value"
            v-model="item.value"
            @blur="checkItem(item, 'blur')"
            @change="checkItem(item)"
          />
          <label :for="radio.value + ''">{{ radio.text }}</label>
        </template>
      </div>

      <input
        v-else
        :type="item.type"
        :id="item.id"
        :placeholder="item.placeholder"
        :name="item.id"
        @blur="checkItem(item, 'blur')"
        @change="checkItem(item)"
        v-model.trim="item.value"
      />
      <p>{{ item.msg }}</p>
    </div>
  </form>
</template>

<script setup lang="ts">
interface Ioption {
  text: string | number
  value: string | number
  disabled?: boolean
}

interface Irule {
  require?: boolean
  msg: string
  trigger: string
  regular?: RegExp
}

interface IformItem {
  id: string
  type: string
  label: string
  value: any
  options?: Ioption[]
  rules?: Array<Irule>
  msg?: string
  multiple?: boolean
  placeholder?: string
}
const props = defineProps<{
  formItems: Array<IformItem>
}>()

const emit = defineEmits(['submit'])

function submit() {
  validate((valid: Boolean) => {
    if (valid) {
      emit('submit', props.formItems)
    }
  })
}

const checkItem = (item: IformItem, type = 'change') => {
  if (item.rules) {
    for (const rule of item.rules) {
      // 默认是change
      if (rule.trigger && rule.trigger === type) {
        if (rule.require && !item.value) {
          item.msg = rule.msg
          return false
        }

        if (rule.regular) {
          if (!rule.regular.test(item.value)) {
            item.msg = rule.msg
            return false
          }
        }
      }
    }

    item.msg = ''
    return true
  }
}

function validate(fn: Function) {
  let valid = true
  for (const item of props.formItems) {
    if (item.rules) {
      for (const rule of item.rules) {
        if (rule.require && !item.value) {
          item.msg = rule.msg
          valid = false
          break
        }

        if (rule.regular) {
          if (!rule.regular.test(item.value)) {
            item.msg = rule.msg
            valid = false
            break
          }
        }
      }
    }
  }

  fn(valid)
}

defineExpose({
  submit
})
</script>

<style scoped lang="scss">
form.submit {
  text-align: center;
  .form-item {
    margin: 10px 0 25px -25px;
    position: relative;

    label {
      display: inline-block;
      margin-right: 10px;
      text-align: right;
      width: 80px;
      margin-bottom: 5px;
    }

    .check_class {
      width: calc(100% - 90px);
      max-width: 260px;
      padding: 0 20px 0 10px;
      display: inline-block;
      text-align: left;
      height: 30px;
      line-height: 30px;

      input {
        width: auto !important;
        height: auto !important;
        margin-right: 5px;
      }

      label {
        width: auto !important;
        height: auto !important;
      }
    }

    input,
    select,
    textarea {
      width: calc(100% - 90px);
      max-width: 260px;
      padding: 0 20px;
      height: 30px;
      line-height: 30px;
      border: 1px solid var(--color-border);
      border-radius: 4px;
    }

    textarea {
      height: 60px;
      line-height: 22px;
    }

    input:hover,
    select:hover,
    textarea:hover {
      border-color: var(--color-border-hover);
    }

    p {
      font-size: 14px;
      position: absolute;
      left: 50%;
      margin-left: -68px;
      color: red;
    }

    @media (max-width: 450px) {
      p {
        left: 0;
        margin-left: 110px;
      }
    }
  }
}
</style>
