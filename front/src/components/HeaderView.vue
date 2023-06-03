<template>
  <header>
    <div class="left_class">
      <IcoShuCheng style="margin-right: 10px" />
      <h4 class="none_class title_name">{{ title }}</h4>

      <nav>
        <RouterLink to="/"> 首页 </RouterLink>
        <RouterLink to="/"> 分类 </RouterLink>
        <RouterLink to="/"> 动态 </RouterLink>
      </nav>

      <slot name="middle">
        <input type="text" placeholder="搜书名/作者" v-model.trim="selectInput" />
      </slot>
    </div>

    <div class="right_class">
      <span class="none_class">{{ userInfo.name }}</span>
      <img class="head_img_class" :src="userInfo.avatarUrl || avatarUrl" alt="用户头像" />

      <ul>
        <li>个人中心</li>
        <li @click="publishBookClick">发布新书</li>
        <li>发布动态</li>
        <li @click="exitClick">退出登录</li>
      </ul>
    </div>
  </header>

  <WxDialog title="发布新书" v-model="isShowBook">
    <WxFrom :formItems="bookFrom" @submit="submit" ref="bookfromRef"></WxFrom>
    <template #footer>
      <button class="btn_lv" @click="saveClick">发布</button>
    </template>
  </WxDialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import WxDialog from './globcpt/WxDialog.vue'
import WxFrom from './globcpt/WxFrom.vue'

import IcoShuCheng from '@/assets/ico/IcoShuCheng.vue'
import avatarUrl from '@/assets/ico/avatar.svg'

import { useLabesStore } from '@/stores/labels'
import { useUserInfoStore } from '@/stores/userInfo'

import { bookCreate } from '@/api/book/bookApi'

const title = import.meta.env.VITE_TITLE
const selectInput = ref(null)

const router = useRouter()

const { userInfo } = useUserInfoStore()
const { labelcpd } = useLabesStore()

// 类别， 书名，书链接，封面链接，书简介，书作者
const isShowBook = ref(false)
const bookfromRef = ref(null) as unknown as typeof WxFrom
interface Ioption {
  text: string | number
  value: string | number
  disabled?: boolean
}
const bookFrom = reactive([
  {
    id: 'labelId',
    type: 'select',
    options: [] as Ioption[],
    label: '类别',
    value: '',
    rules: [{ require: true, msg: '请选择类别', trigger: 'change' }],
    msg: ''
  },
  {
    id: 'bookName',
    type: 'text',
    label: '书名',
    value: '',
    placeholder: '请填写书名',
    rules: [
      { require: true, msg: '请填写书名', trigger: 'blur' },
      {
        regular: /^[\w\u4e00-\u9fa5]{1,20}$/,
        msg: '格式为20位以内的汉字、数字、字母或下划线',
        trigger: 'blur'
      }
    ],
    msg: ''
  },
  {
    id: 'bookHref',
    type: 'text',
    label: '书链接',
    value: '',
    placeholder: '请填写书链接',
    rules: [{ require: true, msg: '请填写书链接', trigger: 'blur' }],
    msg: ''
  },
  {
    id: 'coverHref',
    type: 'text',
    label: '封面链接',
    value: '',
    placeholder: '请填写封面链接',
    rules: [{ require: true, msg: '请填写封面链接', trigger: 'blur' }],
    msg: ''
  },
  {
    id: 'blurb',
    type: 'textarea',
    label: '书简介',
    value: '',
    placeholder: '请填写书简介',
    rules: [
      { require: true, msg: '请填写书简介', trigger: 'blur' },
      {
        regular: /^[\w\u4e00-\u9fa5，。：；！]{1,200}$/,
        msg: '格式为200位以内的汉字、数字、字母及常用符号',
        trigger: 'blur'
      }
    ],
    msg: ''
  },
  {
    id: 'author',
    type: 'text',
    label: '书作者',
    value: '',
    placeholder: '请填写书作者',
    rules: [
      { require: true, msg: '请填写书作者', trigger: 'blur' },
      {
        regular: /^[\w\u4e00-\u9fa5]{1,10}$/,
        msg: '格式为10位以内的汉字、数字、字母或下划线',
        trigger: 'blur'
      }
    ],
    msg: ''
  }
])

// 发布书籍
function publishBookClick() {
  bookFrom[0].options = [{ value: '', text: '-请选择书籍类型', disabled: true }, ...labelcpd.value]
  isShowBook.value = true
}

/**
 * 发布接口
 * 发布成功 关闭当前窗口
 * 清空值
 */

function submit() {
  const option = {} as any

  bookFrom.forEach((item) => {
    option[item.id] = item.value
  })

  bookCreate(option)
    .then(() => {
      alert('发布成功')
      isShowBook.value = false
      reseBookFrom()
    })
    .catch(() => {
      alert('发布失败')
    })

  // reseBookFrom()
}

function reseBookFrom() {
  bookFrom.forEach((item) => {
    item.value = ''
  })
}

// 点击保存 进行发布
function saveClick() {
  bookfromRef.value.submit()
}

// 退出登录
function exitClick() {
  if (confirm('确定退出吗？')) {
    localStorage.clear()
    router.push('/login')
  }
}
</script>

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

    ::v-deep(a) {
      transform: 4s;
      border-radius: 3px;
    }

    .icon {
      height: 20px;
      color: var(--vt-c-ico-main);
      transform: rotateZ(180deg);
    }

    .title_name {
      margin-right: 60px;
      font-weight: 700;
      color: var(--vt-c-ico-main);
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
    position: relative;

    .head_img_class {
      border-radius: 50%;
      cursor: pointer;
      height: 40px;
      width: 40px;
      margin: 10px;
    }

    .icon {
      height: 27px;
      cursor: pointer;
    }

    ul {
      display: none;
      right: 0;
      position: absolute;
      line-height: 30px;
      top: 50px;
      background-color: #fff;
      box-shadow: 0 6px 14px 0 rgba(158, 172, 182, 0.25);
      border-radius: 5px;
      list-style: none;
      text-align: center;
      padding: 0;
      width: 100px;

      li {
        transition: 0.3s;
        cursor: pointer;
        margin: 5px;
      }

      li:hover {
        background-color: var(--color-background-soft);
        color: var(--vt-c-ico-hover);
      }
    }

    @media (max-width: 800px) {
      ul {
        top: 30px;
      }
    }
  }

  .right_class:hover ul {
    display: block;
  }
}

.none_class {
  display: inline-block;
}

@media (max-width: 800px) {
  .none_class {
    display: none;
  }
  .head_img_class {
    width: 30px !important;
    height: 30px !important;
    margin: 0 !important;
  }

  input {
    width: 110px !important;
  }
}

@media (min-width: 810px) {
  ::v-deep(a) {
    margin: 10px;
    padding: 5px 10px;
    border-radius: 3px;
  }

  input {
    width: 200px;
  }
}
</style>
