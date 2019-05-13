<template>
  <section class="main-content columns is-fullheight">
    <Sidebar />
    <div class="search column is-10">
      <h1><i class="fal fa-search-location" /> Rechercher un groupe</h1>
      <div class="columns card">
        <div class="column is-6">
          <h2>Par régions - <b>{{ map_name }}</b></h2>
          <Map v-if="show" :map="map" />
          <div class="countries">
            <i class="fas fa-flag-alt" />
            <b>Pays :</b>
            <span class="country_link" @click="renderMap('france_fr', 'France')">France</span> •
            <span class="country_link" @click="renderMap('be_mill', 'Belgique')">Belgique</span> •
            <span class="country_link" @click="renderMap('ch_mill', 'Suisse')">Suisse</span>
          </div>
        </div>
        <div class="column is-6">
          <h2>Par mots clés</h2>
          <form class="form" @submit.prevent="submit">
            <div class="field has-addons">
              <div class="control" style="width: 90%">
                <input v-model="keywords" class="input" placeholder="Entrez une recherche" :disabled="submitStatus === 'PENDING'">
              </div>
              <div class="control">
                <button type="submit" class="button is-info" :disabled="submitStatus === 'PENDING'">
                  <span v-if="submitStatus === 'PENDING'">Recherche...</span>
                  <span v-else><i class="far fa-search" /></span>
                </button>
              </div>
            </div>
          </form>
          <SearchResults />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import jQuery from 'jquery'
import Sidebar from '../../components/dashboard/Sidebar'
import Map from '../../components/dashboard/Map'
import SearchResults from '../../components/dashboard/SearchResults'
if (process.browser) {
  window.jQuery = window.$ = jQuery
  require('jqvmap')
  require('@/static/js/jquery.vmap.france.js')
  require('@/static/js/jquery.vmap.belgium.js')
  require('@/static/js/jquery.vmap.switzerland.js')
}
export default {
  name: 'Search',
  components: { SearchResults, Map, Sidebar },
  head() {
    return {
      title: 'Rechercher'
    }
  },
  data() {
    return {
      keywords: '',
      map: 'france_fr',
      map_name: 'France',
      show: true,
      submitStatus: ''
    }
  },
  mounted() {},
  methods: {
    renderMap(key, name) {
      const self = this
      self.map = key
      self.map_name = name
      self.show = false
      this.$nextTick(function () {
        self.show = true
        console.log(self.show)
      }, 500)
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/assets/css/dashboard.css';

  $dark: #222F47;
  $blue1: #0079C2;
  $blue2: #7CE7FF;
  $grey: #EFF0F9;
  $white: #FFFFFF;

  .search {

    .form {
      margin-top: 25px;
    }

    ._button {
      margin-top: 15px;
    }

    .country_link {
      color: $blue1;
      cursor: pointer;
    }

    textarea, input, select {
      width: 100%;
      font-size: 20px;
      padding: 11px;
      border-radius: 3px;
      z-index: 5555;
      transition: .2s;
      border: 0;
      background-color: $white;
      color: $dark;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

      &:focus {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        outline: none;
      }
    }

    button {
      background-color: $dark;
      float: right;
      border: none;
      font-family: 'Raleway', sans-serif;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      border-radius: 3px;
      font-size: 20px;
      color: $grey;
      transition: .2s;
      font-weight: 200;
      cursor: pointer;
      padding: 12px 33px;
      margin-top: 0 !important;

      &:hover{
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        outline: none;
      }
    }

    .field {
      width: 100%;
    }

    h2 {
      font-family: "Montserrat", sans-serif;
      font-size: 30px;
      font-weight: 200;
      color: $blue1;
    }

    .card {
      margin-top: 10px;
    }
  }
</style>
