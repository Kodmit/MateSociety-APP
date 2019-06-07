<template>
  <div>
    dd
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  name: 'Logout',
  mounted() {
    Cookie.remove('auth')
    Cookie.remove('user_infos')
    this.$router.push('/')
  }
}
</script>

<style scoped></style>
