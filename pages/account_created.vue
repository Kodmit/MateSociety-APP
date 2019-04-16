<template>
  <div class="account-created-page">
    <div class="container">
      <i class="fal fa-check fa-5x" />
      <h1>Votre compte a été créé !</h1>
      <section>
        <p>
          Vous allez recevoir un e-mail de confirmation avec les instructions
          afin d'activer votre compte.
        </p>
        <nuxt-link :to="{ path: '/' }">
          Retourner à l'accueil
        </nuxt-link>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer'
export default {
  name: 'Cgu',
  components: { Footer },
  layout: 'NoNavbar',
  head() {
    return {
      title: 'Compte créé'
    }
  }
}
</script>

<style src="@/assets/css/front.css"></style>
