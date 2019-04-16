<template>
  <div class="concept">
    <LangSwitcher />
    <div class="band">
      <div class="container">
        <div class="title">
          Le concept
        </div>
        <div class="text">
          <p>
            MateSociety est un projet créé par un étudiant. Le but du projet est
            de réunir des personnes dans une même zone géographique, en leurs
            offrant la possibilité de créer ou de rejoindre un groupe existant.
            Ces groupes ont pour vocations de faire recontrer les personnes
            membres de celui-ci afin de participer à diverses activités
            bénéfiques, comme le sport, des sorties culturelles, etc.
          </p>
          <p>
            Des objectifs peuvent être fixés par les chefs de groupe, le but de
            ces objectifs est biensûr de pousser les membres du groupe à les
            atteindre. MateSociety est basé sur un esprit de fraternité, les
            membres doivent mutuellement s'entraider et se "tirer vers le haut".
            Un groupe doit être soudé et uni. Chaque utilisateur ne peut être
            que dans un seul groupe à la fois, et doit rédiger une demande qui
            doit être approuvée par le chef de groupe.
          </p>
        </div>
        <nuxt-link class="back_link" :to="{ path: '/' }">
          <i class="far fa-arrow-left" />
        </nuxt-link>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import LangSwitcher from '~/components/LangSwitcher.vue'
import Footer from '../components/Footer'
export default {
  name: 'Concept',
  layout: 'NoNavbar',
  components: {
    Footer,
    LangSwitcher
  },
  head() {
    return {
      title: 'Le concept',
      bodyAttrs: {
        class: 'front-bg'
      }
    }
  }
}
</script>

<style src="@/assets/css/front.css"></style>
