<template>
  <div>
    <div id="user_profile" class="container">
      <img class="picture" :src="picture">
      <span class="username">{{ data.username }}</span>
      <span class="joined">S'est inscrit {{ date }}</span>
      <span class="location"><i class="fal fa-compass" /> {{ data.city }} - {{ country }}</span>
      <span v-if="data.group" class="group">{{ data.group.name }}</span>
      <div class="wrapper">
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
  </div>
</template>

<script>
import Moment from 'moment'
import Footer from '../../components/Footer'
export default {
  name: 'UserProfile',
  components: { Footer },
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
        console.log(response.data)
        self.data = response.data
        self.picture = 'http://localhost:8000/uploads/media/' + response.data.image.filePath
        Moment.locale('fr')
        self.date = Moment(self.data.created_at, 'YYYYMMDD').fromNow()
        self.country = response.data.country.name
      })
      .catch(function (error) {
        console.log(error.response)
        if (error.response.status === 404) {
          self.$router.push('/profile/not_found')
        }
      })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/dashboard.css';
</style>
