<template>
  <section class="main-content columns is-fullheight">
    <Sidebar />
    <div class="home column is-10">
      <div v-if="user.group_member">
        <inGroup :user="user" />
      </div>
      <div v-else>
        <noGroup />
      </div>
    </div>
    <Footer />
  </section>
</template>

<script>
import Footer from '../../components/Footer'
import NoGroup from '../../components/dashboard/noGroup'
import InGroup from '../../components/dashboard/inGroup'
import Sidebar from '../../components/dashboard/Sidebar'
export default {
  name: 'Index',
  components: { Sidebar, InGroup, NoGroup, Footer },
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
