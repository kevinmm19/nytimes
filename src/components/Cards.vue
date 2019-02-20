<template>
    <ul class="posts">
        <li class="post" v-for="post in posts" :key="post._id">
            <article class="post__card js-card" @click="flip">
                <div class="post__front">
                    <div class="post__img-container">
                        <img v-if="post.multimedia.length" class="post__img" :src="'https://www.nytimes.com/' + post.multimedia[0].url" :alt="post.headline.main">
                        <img v-else class="post__img" src="https://www.insidehighered.com/sites/default/server_files/media/the-new-york-times-masthead-1423244159624-postLarge.png" :alt="post.headline.main">
                    </div>
                    <div class="post__title-container">
                        <p class="post__title" v-html="post.headline.main"></p>
                    </div>
                </div>
                <div class="post__back">
                    <div class="post__img-container">
                        <img v-if="post.multimedia.length" class="post__img" :src="'https://www.nytimes.com/' + post.multimedia[0].url" :alt="post.headline.main">
                        <img v-else class="post__img" src="https://www.insidehighered.com/sites/default/server_files/media/the-new-york-times-masthead-1423244159624-postLarge.png" :alt="post.headline.main">
                    </div>
                    <div class="post__snippet-container">
                        <p class="post__snippet" v-if="post.snippet" v-html="post.snippet"></p>
                        <a :href="post.web_url" class="post__link" target="_blank">Click Here to Read the post</a>
                    </div>
                </div>
            </article>
        </li>
    </ul>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Cards',
  computed: {
    ...mapState(['posts'])
  },
  methods: {
      flip(event) {
          const card = event.target.closest('.js-card');
          card.classList.toggle('post__card--flipped');
      }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/_vars.scss";
@import "../scss/_mixins.scss";
.post {
    position: relative;
    margin: 0 auto 30px;
    height: 200px;
    width: 300px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    &s {
        padding: 110px 10px 20px;
        display: flex;
        flex-flow: row wrap;
        align-content: space-evenly;
    }
    &__card {
        position: relative;
        transition: 0.8s;
        transform-style: preserve-3d;
        &--flipped {
            transform: rotateY(180deg);
        }
    }
    &__front,
    &__back {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 200px;
        backface-visibility: hidden;
    }
    &__front {
        z-index: 2;
        transform: rotateY(0deg);
    }
    &__back {
        transform: rotateY(180deg);
    }
    &__img {
        width: 100%;
        height: 100%;
        &-container {
            height: 200px;
        }
    }
    &__title {
        padding-bottom: 8px;
        @include rem(1.4);
        &-container {
            position: absolute;
            bottom: 0;
            padding: 10px;
            width: 100%;
            max-height: 100px;
            background-color: $colorBg2;
            overflow: hidden;
        }
    }
    &__snippet {
        max-height: 135px;
        @include rem(1.4);
        color: $colorText1;
        overflow: hidden;
        &-container {
            position: absolute;
            top: 0;
            padding: 15px;
            width: 100%;
            height: 200px;
            background-color: $colorBg2;
            overflow: hidden;
        }
    }
    &__link {
        position: absolute;
        bottom: 20px;
        @include rem(1.6);
        color: $colorText1;
    }    
}
</style>
