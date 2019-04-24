<template>
  <div>
    bll
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  head() {
    return {
      title: 'Profil'
    }
  },
  mounted() {
    const self = this
    this.$axios
      .get('/users/' + this.$route.params.id)
      .then(function (response) {
        console.log(response)
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

<style scoped></style>
