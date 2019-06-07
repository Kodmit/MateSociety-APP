<template>
  <section class="results">
    <nuxt-link v-for="result in results" :key="result['@id']" :to="'/group/' + result['@id'].split('/')[3]" class="result">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure v-if="result.image" class="group_image">
              <img :src="'http://localhost:8000/uploads/media/' + result.image.filePath" alt="Image">
            </figure>
            <figure v-else class="no_image_member">
              <i class="fas fa-users" />
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
    },
    region: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      page: 1,
      results: [],
      search_keywords: this.keywords,
      search_region: this.region,
      params: {},
      Moment: Moment
    }
  },
  mounted() {
    Moment.locale('fr')
  },
  methods: {
    infiniteHandler() {
      const self = this
      if (self.search_region !== '') {
        self.params = {
          name: self.search_keywords,
          department: self.search_region,
          _page: self.page
        }
      }
      else {
        self.params = {
          name: self.search_keywords,
          _page: self.page
        }
      }
      this.$axios.get('/groups', {
        params: self.params
      })
        .then(function (response) {
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

  .group_image {
    border-radius: 100%;
    height: 90px;
    display: block;
    margin-top: 10px;
    overflow: hidden;
    width: 90px;

    img {
      height: 100%;
    }
  }

  .no_image_member{
    border-radius: 100%;
    height: 90px;
    display: block;
    margin-top: 10px;
    overflow: hidden;
    width: 90px;
    color: $blue2;
    font-size: 40px;
    background-color: $dark;

    svg {
      margin: 14px auto;
      font-size: 57px;
      width: 100%;
    }
  }

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
