<template>
  <div id="app" class="wrapper">
    <Search />
    <section class="center wrapper--alt" v-if="loading">
        <Message :css="'message--big'" :msg="'Loading latest posts...'" />
    </section>
    <Cards v-else-if="posts.length"/>
    <section class="center wrapper--alt" v-else>
        <Message v-if="error429" :msg="'Too many requests to the server. Please wait some seconds and try again.'" />
        <Message v-else-if="errorFetch" :msg="'Failed to connect to the New York Times API.'" />
        <Message v-else :msg="'No posts match your search criteria.'" />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Search from "./Search.vue";
import Message from "./Message.vue";
import Cards from "./Cards.vue";
export default {
  name: 'app',
  components: {
    Search,
    Message,
    Cards
  },
  computed: {
   ...mapState(['posts','loading','error429','errorFetch'])
  }
}
</script>

<style lang="scss">
@import "../scss/_normalize.scss";
@import "../scss/_vars.scss";
@import "../scss/_mixins.scss";
html,
body {
    height: 100%;
    width: 100%;
    position: relative;
    font-size: 62.5%; // ~10px
}
html {
    box-sizing: border-box;
}
*, *:before, *:after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}
body {
    font-family: sans-serif, serif;
    @include rem(1.4);
    color: $colorText3;
    line-height: 1.4;
    background-color: $colorBg6;
    background: linear-gradient(0deg, $colorBg6, $colorBg4);
    background-repeat: no-repeat;
    background-attachment: fixed;
}
h1, h2, h3, h4, h5, h6 {
    color: $colorBg5;
}
ul {
    list-style: none;
}
li {
    display: inline-block;
}
p {
    margin-bottom: 10px;
    &:last-child {
        margin-bottom: 0;
    }
}
input {
    @include rem(1.4);
}
.center {
    text-align: center;
}
.wrapper {
    margin: 0 auto;
    &--alt {
        padding-top: 150px;
    }
}
</style>
