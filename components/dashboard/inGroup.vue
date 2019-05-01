<template>
  <div class="in_group">
    <div class="columns">
      <div class="column is-3">
        <div v-if="!user.group_member.image" class="no_image">
          <i class="fal fa-user-friends" />
        </div>
        <span class="group_name">{{ user.group_member.name }}</span>
        <span class="welcome">Bienvenue <span>{{ user.username }}</span></span>
        <div v-if="user.owned_group">
          <nuxt-link to="/dashboard/manage_group">
            Gérer mon groupe
          </nuxt-link>
        </div>
      </div>
      <div class="column is-5">
        <div class="_card">
          <span class="title">Mur du groupe</span>
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
  </div>
</template>

<script>
export default {
  name: 'InGroup',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      group: ''
    }
  },
  mounted() {
    const self = this

    this.$axios.get('/groups/' + this.user.group_member['@id'].split('/')[3])
      .then(function (response) {
        self.group = response.data
        console.log(response.data)
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
      border: 2px solid $dark;

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
