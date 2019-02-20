<template>
  <p :class="'message ' + css">{{msg}}</p>
</template>

<script>
export default {
  name: 'Message',
  props: {
    msg: String,
    css: String
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/_vars.scss";
.message {
  padding: 150px 20px 0;
  font-size: 25px;
  color: $colorText1;
  &--big {
    font-size: 40px;
  }
}
</style>
