<template>
  <div>
    déconnexion...
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  name: 'Logout',
  mounted() {
    Cookie.remove('auth')
    Cookie.remove('user_infos')
    window.location.href = '/'
  }
}
</script>

<style scoped></style>
