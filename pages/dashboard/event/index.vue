<template>
  <section class="main-content columns is-fullheight">
    <Sidebar />
    <div class="column is-10 events">
      <nuxt-link v-for="event in orderBy(events, 'event_start', -1)" :key="event['@id']" :to="'/dashboard/event/' + event['@id'].split('/')[3]" class="event">
        <span class="name"><i class="fas fa-arrow-circle-right" /> {{ event.name }} à {{ event.place }} {{ Moment(event.event_start, 'YYYYMMDD').fromNow() }}</span>
        <span class="date">Le {{ Moment(event.event_start).format('Do MMMM YYYY à LT') }}</span>
      </nuxt-link>
      <div v-if="events.length === 0">
        Aucuns events
      </div>
    </div>
  </section>
</template>

<script>
import jQuery from 'jquery'
import Vue2Filters from 'vue2-filters'
import Moment from 'moment'
import Sidebar from '../../../components/dashboard/Sidebar'
if (process.browser) {
  window.jQuery = window.$ = jQuery
  require('gasparesganga-jquery-loading-overlay')
}
export default {
  name: 'EventIndex',
  components: { Sidebar },
  mixins: [Vue2Filters.mixin],
  head() {
    return {
      title: 'Liste des évènements'
    }
  },
  data: function () {
    return {
      events: [],
      Moment: Moment
    }
  },
  mounted() {
    jQuery(document).ready(function () {
      jQuery('.events').LoadingOverlay('show', { 'background': '#EFF0F9' })
    })
    const self = this
    this.$axios.get('/groups/' + this.$cookies.get('user_infos').user_group + '/group_events')
      .then(function (response) {
        if (response.status === 200) {
          self.events = response.data['hydra:member']
          jQuery('.events').LoadingOverlay('hide')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style scoped lang="scss">
  $dark: #222F47;
  $blue1: #0079C2;
  $blue2: #7CE7FF;
  $grey: #EFF0F9;
  $white: #FFFFFF;
  .event {
    background-color: $blue2;
    margin-top: 10px;
    border-radius: 5px;
    padding: 10px;
    display: block;
    .name {
      font-family: "Raleway", sans-serif;
    }

    .date {
      display: block;
      text-align: right;
      font-family: "Montserrat", sans-serif;
      font-size: 14px;
    }
  }
</style>
