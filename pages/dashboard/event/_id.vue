<template>
  <section class="main-content columns is-fullheight">
    <Sidebar />
    <div class="column is-10 event">
      <div class="card">
        <a class="report"><i class="fal fa-exclamation-triangle" /> Signaler l'événement</a>
        <span class="title"><i class="fas fa-arrow-circle-right" /> {{ event.name }}</span>
        <span class="fromNow">{{ Moment(event.event_start, 'YYYYMMDD').fromNow() }}</span>
        <section class="dates">
          <span class="date">Date de début : Le <b>{{ Moment(event.event_start).format('Do MMMM YYYY à LT') }}</b></span>
          <span v-if="event.event_end" class="date"> - Date de fin : Le <b>{{ Moment(event.event_end).format('Do MMMM YYYY à LT') }}</b></span>
        </section>
      </div>
      <div class="columns">
        <div class="column">
          <section class="_card">
            <b><i class="fal fa-sticky-note fa-2x" /> Description</b>
            {{ event.description }}
            <span class="creator"><i class="fas fa-user" /> <nuxt-link :to="'/profile/' + creator_id">{{ creator.username }}</nuxt-link></span>
          </section>
          <div :v-if="creator['@id'] === $store.state.auth.user_id" class="admin">
            <a class="button is-primary">Modifier</a>
            <a class="button is-danger">Supprimer l'événement</a>
          </div>
        </div>
        <div class="column">
          <section class="_card">
            <b><i class="fal fa-location-arrow fa-2x" /> Localisation : {{ event.place }}</b>
            <iframe
              id="mapcanvas"
              width="100%"
              height="500px"
              :src="'https://maps.google.com/maps?q=' + event.place + '&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=&amp;output=embed'"
              frameborder="0"
              scrolling="yes"
              marginheight="0"
              marginwidth="0"
            />
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Moment from 'moment'
import Sidebar from '../../../components/dashboard/Sidebar'
export default {
  name: 'EventId',
  components: { Sidebar },
  head() {
    return {
      title: 'Détails de l\'événement'
    }
  },
  data() {
    return {
      event: '',
      Moment: Moment,
      creator: '',
      creator_id: ''
    }
  },
  mounted() {
    Moment.locale('fr')
    const self = this
    this.$axios.get('/group_events/' + this.$route.params.id)
      .then(function (response) {
        self.event = response.data
        self.creator = response.data.creator
        self.creator_id = response.data.creator['@id'].split('/')[3]
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          self.$router.push('/event/not_found')
        }
      })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/dashboard.css';

  $dark: #222F47;
  $blue1: #0079C2;
  $blue2: #7CE7FF;
  $grey: #EFF0F9;
  $white: #FFFFFF;

  .event {
    margin-top: 20px;

    .card {
      border-radius: 5px;
      width: 100%;
      padding: 15px;
    }

    .title {
      font-family: "Montserrat", sans-serif;
      font-size: 40px;
      font-weight: 300;
    }

    .report {
      float: right;
      font-family: "Raleway", sans-serif;
      color: #ff7651;
      right: 15px;
    }

    .admin {
      margin-top: 15px;
    }

    .fromNow{
      font-family: "Montserrat", sans-serif;
      font-size: 20px;
      color: $blue1;
    }

    .dates {
      margin-top: 10px;
      font-family: "Raleway", sans-serif;
    }

    ._card {
      b {
        display: block;
        font-family: "Montserrat", sans-serif;
        margin-bottom: 10px;
      }

      svg {
        vertical-align: middle;
        color: $blue1;
        margin-right: 5px;
      }

      .creator {
        font-family: "Montserrat", sans-serif;
        display: block;
        font-size: 15px;
        margin-top: 15px;
        svg {
          vertical-align: center;
          margin: 0;
        }
        b {
          display: inline;
        }
      }
      font-family: "Raleway", sans-serif;
      background-color: $white;
      padding: 15px;
      border-radius: 5px;
      margin-top: 15px;
      font-size: 18px;
    }
  }
</style>
