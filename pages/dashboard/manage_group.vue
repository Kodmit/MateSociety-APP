<template>
  <div>
    Gérer le groupe {{ group.name }}
  </div>
</template>

<script>
export default {
  name: 'ManageGroup',
  head() {
    return {
      title: 'Gérer mon groupe'
    }
  },
  data() {
    return {
      group: ''
    }
  },
  mounted() {
    const self = this
    this.$axios.get('/users/' + this.$store.state.auth.user_id)
      .then(function (response) {
        if (!response.data.owned_group) {
          self.$router.push('/dashboard')
        }
        self.$axios.get('/groups/' + response.data.owned_group['@id'].split('/')[3])
          .then(function (group) {
            self.group = group.data
          })
      })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/dashboard.css';

</style>
