<template>
  <div class="not_found">
    <i class="fal fa-meh fa-5x _icon" />
    <span class="title">Profil non trouvé</span>
    <nuxt-link to="../dashboard">
      Retour
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  head() {
    return {
      title: 'Utilisateur non trouvé'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/dashboard.css';
</style>
