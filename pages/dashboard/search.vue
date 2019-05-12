<template>
  <section class="main-content columns is-fullheight">
    <Sidebar />
    <div class="search column is-10">
      <h1><i class="fal fa-search-location" /> Rechercher un groupe</h1>
      <div class="columns card">
        <div class="column is-6">
          <h2>Par régions - <b>France</b></h2>
          <div id="vmap" />
          <div class="countries">
            <i class="fas fa-flag-alt" />
            <b>Pays :</b>
            <a href="">France</a> •
            <a href="">Belgique</a> •
            <a href="">Suisse</a>
          </div>
        </div>
        <div class="column is-6">
          <h2>Par mots clés</h2>
          <form class="form" @submit.prevent="submit">
            <div class="field has-addons">
              <div class="control" style="width: 80%">
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
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import jQuery from 'jquery'
import Sidebar from '../../components/dashboard/Sidebar'
if (process.browser) {
  window.jQuery = window.$ = jQuery
  require('jqvmap')
  require('@/static/js/jquery.vmap.france.js')
}
export default {
  name: 'Search',
  components: { Sidebar },
  head() {
    return {
      title: 'Rechercher'
    }
  },
  data() {
    return {
      keywords: ''
    }
  },
  mounted() {
    jQuery(document).ready(function () {
      jQuery('#vmap').vectorMap({
        map: 'france_fr',
        backgroundColor: null,
        color: '#222F47',
        borderColor: '#FFF',
        borderOpacity: 1,
        borderWidth: 1,
        hoverColor: '#0079C2',
        enableZoom: false,
        showTooltip: true,
        onRegionClick: function (element, code, region)
        {
          const message = 'You clicked "' +
            region +
            '" which has the code: ' +
            code.toUpperCase()

          alert(message)
        }
      })
    })
  }
}
</script>

<style scoped lang="scss">
  @import '@/assets/css/dashboard.css';
  @import '@/static/css/jqvmap.css';

  $dark: #222F47;
  $blue1: #0079C2;
  $blue2: #7CE7FF;
  $grey: #EFF0F9;
  $white: #FFFFFF;

  .search {

    #vmap {
      width: 100%;
      height: 700px;
    }

    .form {
      margin-top: 25px;
    }

    ._button {
      margin-top: 15px;
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
