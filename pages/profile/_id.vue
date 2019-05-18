<template>
  <section class="main-content columns is-fullheight">
    <Sidebar />
    <div id="user_profile" class="container column is-10">
      <div v-if="picture">
        <img class="picture" :src="picture">
      </div>
      <div v-else class="no_image">
        <i class="fal fa-user" />
      </div>
      <span class="username">{{ data.username }}</span>
      <span class="joined">S'est inscrit {{ date }}</span>
      <span class="location"><i class="fal fa-compass" /> {{ data.city }} - {{ country }}</span>
      <span v-if="data.group" class="group">{{ data.group.name }}</span>
      <div v-if="data.description" class="wrapper">
        <div class="quote open">
          “
        </div>
        <span class="description">{{ data.description }}</span>
        <div class="quote close">
          ”
        </div>
      </div>
      <div class="social">
        <span v-if="data.discord"><i class="fab fa-discord" /> {{ data.discord }}</span>
        <span v-if="data.tox_id"><i class="fal fa-lock-alt" /> Tox : {{ data.tox_id }}</span>
      </div>

      <a href="" class="report">Signaler ce profil</a>
    </div>
    <Footer />
  </section>
</template>

<script>
import Moment from 'moment'
import Footer from '../../components/Footer'
import Sidebar from '../../components/dashboard/Sidebar'
export default {
  name: 'UserProfile',
  components: { Sidebar, Footer },
  head() {
    return {
      title: 'Profil'
    }
  },
  data() {
    return {
      data: '',
      picture: '',
      date: '',
      country: ''
    }
  },
  mounted() {
    const self = this
    this.$axios
      .get('/users/' + this.$route.params.id)
      .then(function (response) {
        self.data = response.data
        if (response.data.image) {
          self.picture = 'http://localhost:8000/uploads/media/' + response.data.image.filePath
        }
        Moment.locale('fr')
        self.date = Moment(self.data.created_at, 'YYYYMMDD').fromNow()
        self.country = response.data.country.name
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 404) {
            self.$router.push('/profile/not_found')
          }
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
  #user_profile {
    .no_image {
      width: 300px;
      height: 300px;
      border-radius: 200px;
      margin: auto;
      background-color: $grey;
      border: 2px solid $grey;

      svg {
        font-size: 160px;
        display: block;
        margin: 60px auto;
        color: $blue1;
      }
    }
  }

</style>
