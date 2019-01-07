<template>
  <div class="template-wrapper">
    <header class="header">
      <form class="header__form">
          <input type="search" class="header__search js-search" placeholder="Search For Any Topic" v-model="search" disabled="disabled">    
          <input type="reset" class="header__reset js-reset" value="CLEAR" v-if="search.length" @click="reset">
      </form>
    </header>
    <section class="message loading" v-if="loading">
        <p class="loading__text">Loading...</p>
    </section>
    <section class="articles" v-else-if="articles.length">
        <article class="article" v-for="article in articles" :key="article._id">
            <div class="article__card js-card" @click="flip">
                <div class="article__front">
                    <div class="article__img-container">
                        <img v-if="article.multimedia.length" class="article__img" :src="'https://www.nytimes.com/' + article.multimedia[0].url" :alt="article.headline.main">
                        <img v-else class="article__img" src="https://www.insidehighered.com/sites/default/server_files/media/the-new-york-times-masthead-1423244159624-articleLarge.png" :alt="article.headline.main">
                    </div>
                    <div class="article__title-container">
                        <h3 class="article__title" v-html="article.headline.main"></h3>
                    </div>
                </div>
                <div class="article__back">
                    <div class="article__img-container">
                        <img v-if="article.multimedia.length" class="article__img" :src="'https://www.nytimes.com/' + article.multimedia[0].url" :alt="article.headline.main">
                        <img v-else class="article__img" src="https://www.insidehighered.com/sites/default/server_files/media/the-new-york-times-masthead-1423244159624-articleLarge.png" :alt="article.headline.main">
                    </div>
                    <div class="article__snippet-container">
                        <p class="article__snippet" v-if="article.snippet" v-html="article.snippet"></p>
                        <a :href="article.web_url" class="article__link" target="_blank">Click Here to Read the Article</a>
                    </div>
                </div>
            </div>
        </article>
    </section>
    <section class="message error" v-else>
        <p class="error__text" v-if="error429">
            Too many requests to the server. Please wait some seconds and try again.
        </p>
        <p class="error__text" v-else-if="errorFetch">
            Failed to connect to the New York Times API.
        </p>
        <p class="error__text" v-else>
            No articles match your search criteria.
        </p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'News',
  data: function () {
      return {
          search: '',
          articles: [],
          loading: true,
          error429: false,
          errorFetch: false
      }
  },
  async created() {
      await this.find();
      document.querySelector('.js-search').removeAttribute('disabled');
      this.debounceFind = this.debounce(this.find, 1000);
  },
  watch: {
      search() {
          this.loading = true;
          this.debounceFind();
      }
  },
  methods: {
      debounce(func, wait, immediate) {
        let timeout;
        return function() {
          let context = this, args = arguments;
          let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
          let callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
      },
      async find() {
          try {
              const url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b8b62a16c985441e8acf5049435cbef9&q=' + this.search;
              const headers = new Headers({
                  'Content-Type': 'text/plain'
              });
              const response = await fetch(url, { 
                  method: 'GET',
                  mode: 'cors',
                  headers: headers
              });
              if (response !== undefined && response.ok) {
                  const articles = await response.json();
                  this.articles = articles.response.docs;
                  this.error429 = false;
              } else {
                  this.error429 = true;
              }
              this.loading = false;
              this.errorFetch = false;
          } catch (error) {
              this.errorFetch = true;
              this.error429 = false;
              this.loading = false;
          }
      },
      flip(event) {
          const card = event.target.closest('.js-card');
          card.classList.toggle('article__card--flipped');
      },
      reset() {
          document.querySelector('.js-search').focus();
          this.search = '';
      }
  }
}
</script>

<style scoped lang="scss">
@import "../scss/_vars.scss";
@import "../scss/_mixins.scss";

.message {
    padding-top: 150px;
    text-align: center;
}
.loading {
    &__text {
        @include rem(4);
        color: $colorText1;
    }
}
.error {
    &__text {
        padding: 0 20px;
        @include rem(2.5);
        color: $colorText1;
    }
}
.header {
    position: fixed;
    padding: 20px 12px;
    width: 100%;
    text-align: center;
    background-color: $colorBg1;
    z-index: 1;
    &__search {
        padding: 10px;
        height: 20px;
        width: 65%;
        @include respond-to($tablet) {
            width: 50%;
        }
    }
    &__reset {
        height: 44px;
        width: 25%;
        color: $colorText1;
        background-color: $colorBg1;
        border: 2px solid $colorText1;
        &:hover, &:focus {
            color: $colorBg1;
            background-color: $colorBg5;
        }
        @include respond-to($tablet) {
            width: 10%;
        }
    }
}
.article {
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
