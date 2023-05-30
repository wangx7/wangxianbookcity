<template>
  <div class="login_class">
    <header>
      <IcoShuCheng />
      <h1>{{ title }}</h1>
    </header>

    <form @submit.prevent="submit" autocomplete="on">
      <div v-for="item in formItems" :key="item.id" class="form-item">
        <label :for="item.id">{{ item.label }}: </label>
        <input
          :type="item.type"
          @blur="check(item)"
          :id="item.id"
          :placeholder="item.placeholder"
          :name="item.id"
          v-model="item.value"
        />
        <component
          @click="lookPassword(item)"
          class="right_ico_class"
          :is="item.rightIcon"
          v-if="item.rightIcon"
        />

        <p>{{ item.msg }}</p>
      </div>

      <span @click="getPassWord">找回密码</span>

      <div class="submit_class">
        <button type="submit">登录</button>
        <p>用户名唯一，未注册将自动注册</p>
      </div>
    </form>

    <footer>
      <IcoQQ title="QQ登录" />
      <IcoWeiXin title="微信登录" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { reactive, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import IcoShuCheng from '@/assets/ico/IcoShuCheng.vue'
import IcoWeiXin from '@/assets/ico/IcoWeiXin.vue'
import IcoQQ from '@/assets/ico/IcoQQ.vue'
import IcoLookPwd from '@/assets/ico/IcoLookPwd.vue'

import { login, register, type IAccount } from '@/api/loginApi'

const title = import.meta.env.VITE_TITLE
const email = '2228639003@qq.com'
const formItems = reactive([
  {
    id: 'name',
    type: 'text',
    label: '用户名',
    msg: '',
    value: '',
    placeholder: '请填写用户名'
  },
  {
    id: 'password',
    type: 'password',
    label: '密码',
    msg: '',
    value: '',
    rightIcon: shallowRef(IcoLookPwd),
    placeholder: '请填写密码'
  }
])

const router = useRouter()

function getPassWord() {
  alert('请联系管理员，' + email)
}

function lookPassword(item: { type: string }) {
  item.type = item.type === 'password' ? 'text' : 'password'
}

function checkName() {
  const item = formItems[0]
  if (!item.value) {
    item.msg = '请填写用户名'
    return false
  }

  if (!/^[\w\u4e00-\u9fa5]{1,10}$/.test(item.value)) {
    item.msg = '格式为10位以内的汉字、数字、字母或下划线'
    return false
  }

  item.msg = ''
  return true
}

function checkPassWord() {
  const item = formItems[1]
  if (!item.value) {
    item.msg = '请填写密码'
    return false
  }

  if (!/^[\w]{6,16}$/.test(item.value)) {
    item.msg = '格式为6-16位数字、字母或下划线'
    return false
  }

  item.msg = ''
  return true
}

function check(item: { id: string }) {
  switch (item.id) {
    case 'name':
      checkName()
      break
    case 'password':
      checkPassWord()
      break
  }
}

function submit() {
  if (checkName() && checkPassWord()) {
    const params = { name: formItems[0].value, password: formItems[1].value }
    loginUser(params)
  }
}

function loginUser(params: IAccount) {
  login(params)
    .then((res) => {
      const data = res.data
      localStorage.setItem('token', data.token)
      localStorage.setItem('userInfo', JSON.stringify(data))
      router.push('/')
    })
    .catch((err) => {
      if (err.status === 400 && err.data === '用户名不存在~') {
        if (confirm('用户名' + params.name + '未注册, 是否注册？')) {
          createUser(params)
        }
      } else {
        alert(err.data || '请求出错了，请联系管理员' + email)
      }
    })
}

function createUser(params: IAccount) {
  register(params)
    .then(() => {
      loginUser(params)
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style scoped lang="scss">
.login_class {
  width: 360px;
  margin: 0 auto;
  padding-top: 20vh;
  text-align: center;

  header {
    // margin-left: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    margin-bottom: 50px;
    color: var(--color-heading);

    h1 {
      font-size: 22px;
      font-weight: 700;
      color: var(--vt-c-ico-main);
    }

    .icon {
      height: 27px;
      color: var(--vt-c-ico-main);
      margin-right: 10px;
    }
  }

  form {
    .form-item {
      margin-top: 25px;
      margin-left: -20px;
      position: relative;

      p {
        font-size: 14px;
        position: absolute;
        text-align: left;
        color: red;
        margin-left: 90px;
      }

      label {
        display: inline-block;
        margin-right: 10px;
        text-align: right;
        width: 80px;
        margin-bottom: 5px;
      }
      input {
        width: calc(100% - 90px);
        padding: 0 20px;
        height: 30px;
        line-height: 30px;
        border: 1px solid var(--color-border);
        border-radius: 4px;
      }
      input:hover {
        border-color: var(--color-border-hover);
      }

      .right_ico_class {
        cursor: pointer;
        position: absolute;
        color: #aaa;
        height: 18px;
        top: 5px;
        right: -30px;
      }
    }

    span {
      float: right;
      font-size: 12px;
      color: var(--vt-c-text-light-2);
      text-align: right;
      margin-top: 4px;
      cursor: pointer;
    }

    .submit_class {
      clear: both;
      margin-left: 20px;
      button {
        width: 180px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        background-color: var(--vt-c-ico-hover);
        border: none;
        margin: 20px 0px 10px 0;
        border-radius: 15px;
        transition: 0.3s;
        color: #fff;
      }

      button:hover {
        background-color: var(--vt-c-ico-hover);
      }

      p {
        font-size: 12px;
        color: var(--vt-c-text-light-2);
      }
    }
  }

  footer {
    .icon {
      height: 40px;
      margin: 20px;
      color: var(--vt-c-text-light-2);
      cursor: pointer;
      transition: 0.3s;
    }
    .icon:hover {
      color: var(--vt-c-ico-hover);
    }
  }
}
</style>
