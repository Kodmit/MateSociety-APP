<template>
  <aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
    <p class="menu-label is-hidden-touch">
      Navigation
    </p>
    <ul class="menu-list">
      <li>
        <nuxt-link to="/dashboard" class="is-active">
          <span class="icon"><i class="fa fa-home" /></span> Dashboard
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="'dashboard/edit_profile'" class="">
          <span class="icon"><i class="fal fa-user-edit" /></span> Modifier mon profil
        </nuxt-link>
      </li>
      <li>
        <a href="#" class="">
          <span class="icon"><i class="fal fa-calendar-alt" /></span> Evénements
        </a>
      </li>
      <li>
        <a href="#" class="">
          <span class="icon"><i class="fal fa-bullseye-arrow" /></span> Objectifs
        </a>
      </li>
      <li>
        <a href="#" class="">
          <span class="icon"><i class="fal fa-user-friends" /></span> Membres de l'équipe
        </a>
      </li>
      <li>
        <a href="#">
          <span class="icon"><i class="fal fa-wrench" /></span> Gestion du groupe
        </a>
        <ul>
          <li>
            <a href="#">
              <span class="icon is-small"><i class="fal fa-inbox-in" /></span> Demandes d'adhésion
            </a>
          </li>
          <li>
            <nuxt-link to="/dashboard/manage_group">
              <span class="icon is-small"><i class="fal fa-cogs" /></span> Configuration
            </nuxt-link>
          </li>
        </ul>
      </li>
      <li>
        <a href="#" class="">
          <span class="icon"><i class="fa fa-info" /></span> A propos
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped>

</style>
