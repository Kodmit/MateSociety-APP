<template>
  <div id="view_group">
    <section class="main-content columns is-fullheight">
      <Sidebar />
      <div class="column is-10 manage_group">
        Content
      </div>
    </section>
    <Footer />
  </div>
</template>
<script>
import Footer from '../../components/Footer'
import Sidebar from "../../components/dashboard/Sidebar";
export default {
  name: 'ViewGroup',
  components: {Sidebar, Footer },
  head() {
    return {
      title: 'Groupe'
    }
  },
  data: function () {
    return {
      group: ''
    }
  },
  mounted() {
    const id = this.$route.params.id
    const self = this
    this.$axios.get('/group/' + id)
      .then(function (response) {
        if (response.status === 200) {
          console.log('ok')
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 404) {
            self.$router.push('/group/not_found')
          }
        }
      })
  }
}
</script>

<style scoped>

</style>
