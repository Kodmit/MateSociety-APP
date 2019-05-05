<template>
  <div class="in_group">
    <div class="columns">
      <div class="column is-3">
        <div class="_card">
          <div v-if="!group.image" class="no_image">
            <i class="fal fa-user-friends" />
          </div>
          <div v-else>
            <img :src="'http://localhost:8000/uploads/media/' + group.image.filePath" class="picture">
          </div>
          <span class="group_name">{{ user.group_member.name }}</span>
          <span class="group_location"><i class="fal fa-thumbtack" /> {{ group.city }}</span>
          <span class="group_description">{{ group.description }}</span>
        </div>
      </div>
      <div class="column is-5">
        <div class="_card">
          <span class="title"><i class="fal fa-calendar-day" /> Evènements à venir</span>
          <div v-for="event in orderBy(events, 'event_start')" :key="event['@id']" class="event">
            <span class="name"><i class="fas fa-arrow-circle-right" /> {{ event.name }} à {{ event.place }} {{ Moment(event.event_start, 'YYYYMMDD').fromNow() }}</span>
            <span class="date">Le {{ Moment(event.event_start).format('Do MMMM YYYY à LT') }}</span>
          </div>
          <nuxt-link to="/dashboard/add_event" class="link">
            + Ajouter un événement
          </nuxt-link>
        </div>
      </div>
      <div class="column is-4">
        <span class="title">Membres du groupe</span>
        <div class="member-list">
          <nuxt-link v-for="member in group.users" :key="member.username" :to="'/profile/' + member['@id'].split('/')[3]" class="member">
            <img :src="'http://localhost:8000/uploads/media/' + member.image.filePath" class="min_picture">
            <span v-if="member.username.length>=8" class="username">{{ member.username.substring(0,8)+".." }}</span>
            <span v-if="member.username.length<8" class="username">{{ member.username }}</span>
          </nuxt-link>
        </div>
        <span class="invit">Comment inviter des membres ?</span>
      </div>
    </div>
    <hr>
    <span class="welcome">Bienvenue <span>{{ user.username }}</span></span>
    <div v-if="user.owned_group">
      <nuxt-link to="/dashboard/manage_group">
        Gérer mon groupe
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Moment from 'moment'
import Vue2Filters from 'vue2-filters'
export default {
  name: 'InGroup',
  mixins: [Vue2Filters.mixin],
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      group: '',
      Moment: Moment,
      events: []
    }
  },
  mounted() {
    const self = this
    Moment.locale('fr')
    this.$axios.get('/groups/' + this.user.group_member['@id'].split('/')[3])
      .then(function (response) {
        self.group = response.data

        const dateobj = new Date()
        const currentDate = dateobj.toISOString()

        self.group.groupEvents.forEach(function (element) {
          if (element.event_start > currentDate) {
            self.events.push(element)
          }
        })
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

  .in_group {

    .picture{
      border-radius:100%;
      height: 300px;
      display: block;
      margin: 10px auto 0px auto;
      overflow:hidden;
      width: 300px;
    }

    .link {
      color: $blue1;
      display: block;
      text-align: center;
      margin-top: 10px;
    }

    .event {
      background-color: $blue2;
      margin-top: 10px;
      border-radius: 5px;
      padding: 10px;
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

    hr {
        margin: 10px;
    }

    .group_location {
      display: block;
      font-family: "Montserrat", sans-serif;
      text-align: center;
      font-size: 20px;
      color: $blue1;
    }

    .group_description {
      font-style: italic;
      text-align: center;
      display: block;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    ._card {
      background-color: $white;
      border-radius: 4px;
      padding: 10px;
    }

    .member-list {

      .member {
        width: fit-content;
        display: inline-block;
        text-align: center;
        .username{
          font-family: "Raleway", sans-serif;
        }
      }

    }

    .invit {
      cursor: pointer;
      font-family: "Raleway", sans-serif;
      display: block;
      color: $blue1;
      margin: 20px auto;
      width: fit-content;
    }

    .no_image {
      width: 200px;
      height: 200px;
      border-radius: 200px;
      margin: auto;
      background-color: $grey;
      border: 2px solid $grey;

      svg {
        font-size: 100px;
        display: block;
        margin: 45px auto;
        color: $blue1;
      }
    }

    .min_picture{
      border-radius:100%;
      height: 50px;
      display: block;
      margin-top: 10px;
      overflow:hidden;
      width: 50px;
    }

    .group_name {
      font-family: "Montserrat", sans-serif;
      display: block;
      font-weight: 300;
      font-size: 40px;
      text-align: center;
    }

    .welcome {
      font-family: "Montserrat", sans-serif;
      font-size: 30px;

      span {
        color: $blue1;
      }
    }

    .title {
      font-family: "Montserrat", sans-serif;
      font-weight: 300;
      color: $dark;
      font-size: 28px;
    }

  }
</style>
