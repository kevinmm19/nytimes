<template>
  <section class="search">
      <form>
          <label for="searchInput" class="search__label">Search: </label>
          <input type="search" id="searchInput" class="search__input js-search" @input="fetch" placeholder="Type anything..." v-model="search" ref="searchInput" disabled="disabled">
      </form>
  </section>
</template>

<script>
export default {
  name: 'Search',
  data: function () {
    return {
        search: '',
        timeout: 0
    }
  },
  async mounted() {
    await this.find();
    this.$refs.searchInput.removeAttribute('disabled');
    this.debounceFind = this.debounce(this.find, 1000);
  },
  destroyed() {
    clearTimeout(this.timeout);
  },
  methods: {
    debounce(func, wait, immediate) {
        return function() {
            let context = this, args = arguments;
            let later = function() {
            this.timeout = null;
            if (!immediate) func.apply(context, args);
            };
            let callNow = immediate && !this.timeout;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    async find() {
        try {
            let error429 = false;
            const query = this.search.trim().replace(/[|&;$%@"<>()+=,]/g, '');
            const url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b8b62a16c985441e8acf5049435cbef9&q=' + query;
            const headers = new Headers({
                'Content-Type': 'text/plain'
            });
            const response = await fetch(url, { 
                method: 'GET',
                mode: 'cors',
                headers: headers
            });
            if (response !== undefined && response.ok) {
                const posts = await response.json();
                this.$store.commit({
                  type: 'setPosts',
                  list: posts.response.docs
                });
            } else {
                error429 = true;
            }
            this.$store.commit({
              type: 'setFlags',
              errorFetch: false,
              error429: error429,
              loading: false
            });
        } catch (error) {
            this.$store.commit({
              type: 'setFlags',
              errorFetch: true,
              error429: false,
              loading: false
            });
        }
    },
    fetch() {
        this.$store.commit({
          type: 'setFlags',
          errorFetch: false,
          error429: false,
          loading: true
        });
        this.debounceFind();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/_vars.scss";
@import "../scss/_mixins.scss";
.search {
    position: fixed;
    padding: 20px 0;
    width: 100%;
    text-align: center;
    background-color: $colorBg1;
    z-index: 1;
    &__label {
        color: $colorBg5;
        font-size: 18px;
        padding-right: 5px;
    }
    &__input {
        padding: 10px;
        height: 20px;
        width: 68%;
        @include respond-to($tablet) {
            width: 50%;
        }
    }
}
</style>
