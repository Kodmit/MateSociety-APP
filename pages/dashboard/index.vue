<template>
  <div>
    <div class="container home">
      <div v-if="user.group_member">
        <inGroup user="user" />
      </div>
      <div v-else>
        <noGroup />
      </div>
      <hr>
      <div class="columns">
        <div class="column">
          <nuxt-link :to="{ path: '/profile/' + this.$store.state.auth.user_id }">
            <div class="block small">
              <i class="fal fa-user fa-5x _icon" />
              <span class="text">Voir mon profil</span>
            </div>
          </nuxt-link>
        </div>

        <div class="column">
          <nuxt-link :to="{ path: '/dashboard/edit_profile' }">
            <div class="block small">
              <i class="fal fa-user-edit fa-5x _icon" />
              <span class="text">Modifier mon profil</span>
            </div>
          </nuxt-link>
        </div>

        <div class="column">
          <div class="block small">
            <i class="fal fa-cogs fa-5x _icon" />
            <span class="text">Réglages</span>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '../../components/Footer'
import NoGroup from '../../components/dashboard/noGroup'
import InGroup from '../../components/dashboard/inGroup'
export default {
  name: 'Index',
  components: { InGroup, NoGroup, Footer },
  middleware: 'authenticated',
  head() {
    return {
      title: 'Dashboard'
    }
  },
  data() {
    return {
      user: ''
    }
  },
  mounted() {
    const self = this
    this.$axios.get('/users/' + this.$store.state.auth.user_id).then(function (response) {
      self.user = response.data
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/dashboard.css';
</style>
