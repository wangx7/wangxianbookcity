<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import IcoShuCheng from '@/assets/ico/IcoShuCheng.vue'
import IcoAdd from '@/assets/ico/IcoAdd.vue'

import avatarUrl from '@/assets/ico/avatar.svg'

const title = import.meta.env.VITE_TITLE

const selectInput = ref(null)

import { useUserInfoStore } from '@/stores/userInfo'
const { userInfo } = useUserInfoStore()
</script>

<template>
  <header>
    <div class="left_class">
      <IcoShuCheng style="margin-right: 10px" />
      <h4 class="none_class title_name">{{ title }}</h4>

      <nav>
        <RouterLink to="/"> 首页 </RouterLink>
        <RouterLink to="/about"> 分类 </RouterLink>
        <RouterLink to="/dongtai"> 动态 </RouterLink>
      </nav>

      <slot name="middle">
        <input type="text" placeholder="搜书名/作者" v-model.trim="selectInput" />
      </slot>
    </div>

    <div class="right_class">
      <span class="none_class">{{ userInfo.name }}</span>
      <div
        :style="`background-image:url(${userInfo.avatarUrl || avatarUrl})`"
        class="head_img_class"
        alt="头像"
      ></div>

      <IcoAdd />
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-background-soft);

  .left_class {
    display: flex;
    align-items: center;

    ::v-deep a {
      transform: 4s;
      border-radius: 3px;
    }

    .icon {
      height: 20px;
      // color: red;
      // margin: 5px;
      transform: rotateZ(180deg);
    }

    .title_name {
      margin-right: 60px;
    }
  }

  input {
    height: 30px;
    width: 200px;
    margin-left: 20px;
  }

  .right_class {
    display: flex;
    align-items: center;

    .head_img_class {
      cursor: pointer;
      height: 40px;
      width: 40px;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 50%;
      margin: 10px;
    }

    .icon {
      height: 27px;
      cursor: pointer;
    }
  }
}

.none_class {
  display: inline-block;
  margin-right: 20px;
}

@media (max-width: 800px) {
  .none_class {
    display: none;
  }
  .head_img_class {
    width: 30px !important;
    height: 30px !important;
  }

  input {
    width: 110px !important;
    transform: 4s;
  }
}

@media (min-width: 810px) {
  ::v-deep a {
    margin: 10px;
    padding: 5px 10px;
    border-radius: 3px;
  }

  input {
    width: 200px;
  }
}
</style>
