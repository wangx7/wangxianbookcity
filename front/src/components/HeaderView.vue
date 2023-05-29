<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useUserInfoStore } from '@/stores/userInfo'

const { userInfo, getUserInfo } = useUserInfoStore()
getUserInfo()

const selectInput = ref(null)
</script>

<template>
  <header>
    <div class="left_class">
      <img src="@/assets/ico/书城.svg" :alt="userInfo.name" />
      <h4 class="title_name">{{ userInfo.name }}</h4>

      <nav>
        <RouterLink to="/"> 首页 </RouterLink>
        <RouterLink to="/about"> 分类 </RouterLink>
        <RouterLink to="/dongtai"> 动态 </RouterLink>
      </nav>

      <slot name="middle">
        <input type="text" placeholder="搜书名/作者" v-model="selectInput" />
      </slot>
    </div>

    <div class="right_class">
      <div
        :style="`background-image:url(${userInfo.headImg})`"
        class="head_img_class"
        alt="头像"
      ></div>

      <slot name="right">
        <button>发布新书</button>
      </slot>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  height: 60px;
  line-height: 60px;
  margin: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-background-soft);

  .left_class {
    display: flex;
    align-items: center;

    ::v-deep a {
      margin: 10px;
      padding: 5px 10px;
      border-radius: 3px;
    }

    img {
      height: 20px;
      color: red;
      margin: 5px;
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
      height: 40px;
      width: 40px;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 50%;
      margin: 10px;
    }

    button {
      height: 27px;
      width: 70px;
      margin: 10px;
    }
  }
}
</style>
