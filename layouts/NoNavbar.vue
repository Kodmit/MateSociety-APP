<template>
  <div>
    <LangSwitcher />
    <img class="logo" src="images/logo.png" />

    <div class="nav">
      <nuxt-link class="link" :to="{ path: '/concept' }">{{
        $t('home.concept')
      }}</nuxt-link>
      <nuxt-link class="link" :to="{ path: '/contact' }">{{
        $t('home.contact')
      }}</nuxt-link>
      <nuxt-link class="link" :to="{ path: '/login' }">{{
        $t('home.login')
      }}</nuxt-link>
    </div>

    <nuxt />
  </div>
</template>

<script>
import LangSwitcher from '~/components/LangSwitcher.vue'
export default {
  name: 'NoNavbar',
  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  },
  components: {
    LangSwitcher
  }
}
</script>

<style src="@/assets/css/front.css"></style>
