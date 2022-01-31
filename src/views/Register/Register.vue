<template>
  <div class="wrapper">
    <img class="wrapper_img" src="http://www.dell-lee.com/imgs/vue3/user.png" />
    <div class="wrapper_input">
      <input class="wrapper_input_content" placeholder="请输入手机号" v-model="username" />
    </div>
    <div class="wrapper_input">
      <input
        class="wrapper_input_content"
        autocomplete="new-password"
        placeholder="请输入密码"
        v-model="password"
      />
    </div>
    <div class="wrapper_input">
      <input class="wrapper_input_content" placeholder="确认密码" v-model="ensurement" />
    </div>
    <div class="wrapper_login_btn" @click="handleRegister">立即注册</div>
    <div @click="handleClick" class="wrapper_login_link">已有账号去登陆</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import Toast, { useToastEffect } from '../../components/Toast.vue'
import { $post } from '../../utils/request'
// 处理注册的相关逻辑
const useRegisterEffect = (showToast) => {
  const data = reactive({
    username: '',
    password: '',
    ensurement: ''
  })

  const handleRegister = async () => {
    const u = await $post('/api/user/register', {
      username: data.username,
      password: data.password,
      repassword: data.repassword
    })
    console.log(u)
    showToast('注册成功')
  }

  const { username, password, ensurement } = toRefs(data)

  return { username, password, ensurement, handleRegister }
}

const useLoginEffect = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleClick }
}

export default {
  name: 'Register',
  components: {
    Toast
  },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, ensurement, handleRegister } = useRegisterEffect(showToast)
    const { handleClick } = useLoginEffect()

    return { username, password, ensurement, handleRegister, handleClick, show, toastMessage, showToast }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &_img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  &_login_btn {
    background: #0091ff;
    margin: 0.32rem 0.4rem 0;
    box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
    border-radius: 4px;
    height: 0.48rem;
    line-height: 0.48rem;
    font-size: 0.16rem;
    color: #fff;
    text-align: center;
  }
  &_login_link {
    text-align: center;
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
    margin-top: 0.16rem;
  }
  &_input {
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    background: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 0 0.16rem;
    box-sizing: border-box;
    &_content {
      width: 100%;
      height: 100%;
      outline: none;
      background: none;
      border: none;
      &::placeholder {
        font-size: 0.16rem;
        color: rgba(0, 0, 0, 0.5);
        letter-spacing: 0;
        line-height: 24px;
      }
    }
  }
}
</style>
