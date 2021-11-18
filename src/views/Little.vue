<template>
  <div class="xida">
    <div class="xida1"></div>
    <div class="xida2"></div>
    <div class="xida3"></div>
  </div>
</template>

<script>
export default {
  name: 'Little'
}
</script>

<style scoped>
.xida {
  height: 300px;
  width: 300px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 20px;
}
.xida2 {
  background: url('../assets/bg2.png') repeat-x 0 0px;
  animation: bea 120s linear infinite;
}
.xida3 {
  background: url('../assets/bg1.png') repeat-x 0 0px;
  animation: bea 60s linear infinite;
}
.xida2,
.xida3 {
  position: absolute;
  bottom: 0px;
  height: 266px;
  width: 2000px;
  background-size: 50% 100%;
}
.xida1 {
  z-index: 999;
  position: absolute;
  bottom: 34px;
  width: 200px;
  height: 100px;
  background: url('../assets/bear.png') no-repeat;
  /* 我们元素可以添加多个动画， 用逗号分隔 */
  animation: bear 1s steps(8) infinite, move 3s forwards;
}

@keyframes bear {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -1600px 0;
  }
}
@keyframes bea {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
@keyframes move {
  0% {
    left: 0;
  }
  100% {
    left: 50%;
    /* margin-left: -100px; */
    transform: translateX(-50%);
  }
}
</style>
