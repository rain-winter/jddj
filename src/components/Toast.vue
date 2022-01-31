<template>
    <div class="toast">{{message}}</div>
</template>
<script>
import { reactive, toRefs } from 'vue'

export const useToastEffect = () => {
  const toastData = reactive({
    show: false,
    toastMessage: ''
  })

  const showToast = (message) => {
    toastData.show = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.show = false
      toastData.toastMessage = ''
    }, 2000)
  }
  const { show, toastMessage } = toRefs(toastData)
  return { show, toastMessage, showToast }
}
export default {
  name: 'Toast',
  props: ['message']
}
</script>
<style type="scss" scoped>
.toast {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 1000;
    transform: translate(-50%,-50%);
    background-color:rgb(0, 0, 0,.35);
    border-radius:.05rem;
    color: #fff;
    padding: .1rem;
}
</style>
