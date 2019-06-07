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
import jQuery from 'jquery'
import Footer from '../../components/Footer'
import NoGroup from '../../components/dashboard/noGroup'
import InGroup from '../../components/dashboard/inGroup'
import Sidebar from '../../components/dashboard/Sidebar'
if (process.browser) {
  window.jQuery = window.$ = jQuery
  require('gasparesganga-jquery-loading-overlay')
}
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
      user: '',
      ownedGroup: ''
    }
  },
  mounted() {
    jQuery(document).ready(function () {
      jQuery('.home').LoadingOverlay('show', { 'background': '#EFF0F9' })
    })
    const self = this
    if (typeof self.$cookies.get('user_infos') === 'undefined') {
      this.$axios.get('/users/' + this.$store.state.auth.user_id).then(function (response) {
        self.user = response.data

        if (self.user.owned_group) {
          self.ownedGroup = self.user.owned_group['@id'].split('/')[3]
        } else {
          self.ownedGroup = null
        }
        self.$cookies.set('user_infos', {
          'user': self.user,
          'user_group': self.user.group_member['@id'].split('/')[3],
          'owned_group': self.ownedGroup
        }, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
      })
    }
    else if (typeof self.$cookies.get('user_infos').user_group !== 'undefined') {
      self.user = self.$cookies.get('user_infos').user
    }
    jQuery(document).ready(function () {
      jQuery('.home').LoadingOverlay('hide')
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/dashboard.css';
</style>
