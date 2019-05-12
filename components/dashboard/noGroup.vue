<template>
  <div>
    <div class="columns">
      <div class="column">
        <section class="welcome">
          <span class="_title">
            Bonjour <span class="username">{{ this.$store.state.auth.username }}</span>
          </span>
          <p>
            Bienvenue sur votre compte, vous n'êtes pas encore dans un groupe,
            vous pouvez en rejoindre un ou en créer un.
          </p>
          <p>
            Afin de maximiser vos chances d'être accepté, nous vous
            conseillons de <nuxt-link to="/dashboard/edit_profile">
              compléter votre profil
            </nuxt-link>.
          </p>
        </section>
      </div>
      <div class="column">
        <div class="block">
          <i class="fal fa-search fa-5x _icon" />
          <span class="text">Rechercher un groupe</span>
        </div>
      </div>
      <div class="column">
        <nuxt-link to="dashboard/create_group">
          <div class="block">
            <i class="fal fa-plus fa-5x _icon" />
            <span class="text">Créer un groupe</span>
          </div>
        </nuxt-link>
      </div>
    </div>
    <hr>
    <div class="columns">
      <div class="column">
        <nuxt-link :to="{ path: '/profile/' + this.$store.state.auth.user_id }">
          <div class="block small">
            <i class="fal fa-user fa-5x _icon" />
            <span class="text">Voir mon profil</span>
          </div>
        </nuxt-link>
      </div>

      <div class="column">
        <nuxt-link :to="{ path: '/dashboard/edit_profile' }">
          <div class="block small">
            <i class="fal fa-user-edit fa-5x _icon" />
            <span class="text">Modifier mon profil</span>
          </div>
        </nuxt-link>
      </div>

      <div class="column">
        <div class="block small">
          <i class="fal fa-cogs fa-5x _icon" />
          <span class="text">Réglages</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoGroup'
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/dashboard.css';
</style>
