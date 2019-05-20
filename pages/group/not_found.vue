<template>
  <div class="not_found">
    <i class="fal fa-meh fa-5x _icon" />
    <span class="title">Groupe introuvable</span>
    <nuxt-link to="../dashboard">
      Retour
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'GroupNotFound',
  head() {
    return {
      title: 'Groupe introuvable'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/dashboard.css';
</style>
