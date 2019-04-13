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
    this.$router.push('/')
  }
}
</script>

<style scoped></style>
