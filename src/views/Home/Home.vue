<template>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Docker :currentIndex="0" />
</template>
<script>
import Docker from '../../components/Docker.vue'
import Nearby from './Nearby.vue'
import StaticPart from './StaticPart.vue'
export default {
  name: 'Home',
  components: {
    Docker,
    Nearby,
    StaticPart
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.wrapper {
  padding: 0 0.18rem;
  position:absolute;
  bottom:0.5rem;
  left: 0;
  top:0;
  overflow-y: auto;
}
</style>
