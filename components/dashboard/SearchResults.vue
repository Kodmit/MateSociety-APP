<template>
  <section class="results">
    <nuxt-link v-for="result in results" :key="result['@id']" to="" class="result">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content" style="margin-top: 0">
              <p>
                <strong>{{ result.name }}</strong> <small>@{{ result.creator.username }}</small>
                <small>Groupe créé {{ Moment(result.created_at, 'YYYYMMDD').fromNow() }}</small>
                <br>
                <span v-if="result.description.length>=8" class="username">{{ result.description.substring(0,300)+".." }}</span>
                <span v-if="result.description.length<8" class="username">{{ result.description }}</span>
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <div class="level-item" aria-label="reply">
                  <span class="icon is-small">
                    <i class="fas fa-users" aria-hidden="true" />
                  </span>
                  <span class="numb">{{ result.users.length }}</span>
                </div>
                <a class="level-item" aria-label="like">
                  <span class="icon is-small">
                    <i class="fas fa-map-marker-alt" />
                  </span>
                  {{ result.city }}
                </a>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </nuxt-link>
    <infinite-loading ref="infiniteLoading" @infinite="infiniteHandler">
      <div slot="no-more">
        Fin des résultats !
      </div>
      <div slot="no-results">
        Aucun groupe trouvé :(
      </div>
    </infinite-loading>
  </section>
</template>

<script>
import Moment from 'moment'
export default {
  name: 'SearchResults',
  props: {
    keywords: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      page: 1,
      results: [],
      search: this.keywords,
      Moment: Moment
    }
  },
  mounted() {
    Moment.locale('fr')
  },
  methods: {
    infiniteHandler() {
      const self = this
      this.$axios.get('/groups', {
        params: {
          name: self.search,
          _page: self.page
        }
      })
        .then(function (response) {
          console.log(response.data['hydra:member'])
          const data = response.data['hydra:member']
          if (data.length) {
            self.page += 1
            self.results.push(...data)
            self.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
          }
          else {
            self.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
  $dark: #222F47;
  $blue1: #0079C2;
  $blue2: #7CE7FF;
  $grey: #EFF0F9;
  $white: #FFFFFF;

  ::-webkit-scrollbar {
    width: 13px;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 20px rgba(0,0,0,0.3);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 50px $blue1;
  }

  ::-webkit-scrollbar-thumb:hover {
    -webkit-box-shadow: inset 0 0 50px rgba(45,125,200,1);
  }

.results {
  height: 600px;
  padding: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 25px;

  .result {
    margin-bottom: 10px;
    display: block;
  }

  .level-item {
    .numb {
      padding-left: 5px;
    }
  }
}
</style>
