<template>
  <div>
    <div class="container">
      <div class="columns content">
        <div class="column">
          <section class="block_1">
            <span class="head"><span class="_3">3</span>MOTS</span>
            <span class="text">Sport</span>
            <span class="text">Estime</span>
            <span class="text">Camaraderie</span>
            <span class="head"><span class="_3">1</span>CONCEPT</span>
          </section>
          <section class="block_2">
            <span><span class="title">MateSociety</span> est un réseau social basé sur le sport, l'estime de soi, et la camaraderie.</span>
            <span>Rejoins un groupe de personnes près de chez toi, ou créé ton propre groupe, fixez-vous des objectifs à atteindre et lancez vous !</span>
            <nuxt-link :to="{ path: '/register' }" class="register">Inscription</nuxt-link>
          </section>
        </div>
        <div class="column">
          <section class="login">
            <span class="title">Bonjour.</span>
            <span class="subtitle">Connectez-vous ou <a href="">créez un compte</a> gratuitement.</span>

            <div class="form">

              <form @submit.prevent="submit">

                <p v-if="submitStatus === 'BAD_IDS'" class="form_error">
                  Indentifiants incorrects.
                </p>
                <div class="fields" :class="{ 'form-group--error': $v.username.$error }">
                  <label class="label">Votre identifiant</label>
                  <input
                    v-model.trim="$v.username.$model"
                    :disabled="submitStatus === 'PENDING'"
                  />
                </div>

                <div class="fields" :class="{ 'form-group--error': $v.password.$error }">
                  <label class="label">Votre mot de passe</label>
                  <input
                    v-model.trim="$v.password.$model"
                    type="password"
                    :disabled="submitStatus === 'PENDING'"
                  />
                </div>

                <nuxt-link class="reset-password" :to="{ path: '/forgot_password' }">Mot de passe oublié ?</nuxt-link>

                <button
                  type="submit"
                  :disabled="submitStatus === 'PENDING'"
                >
                <span v-if="submitStatus === 'PENDING'">
                  Connexion en cours...
                </span>
                  <span v-else>
                  Connexion
                </span>
                </button>
                <p v-if="submitStatus === 'ERROR'" class="form_error">
                  Merci de remplir correctement le formulaire
                </p>
              </form>

            </div>
          </section>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
  import { required, minLength } from 'vuelidate/lib/validators'
  import Swal from 'sweetalert2'
  import Cookie from 'js-cookie'
  import axios from 'axios'
  import Footer from "../components/Footer";
export default {
  name: 'Index',
  components: {Footer},
  layout: 'NoNavbar',
  head() {
    return {
      title: 'Home'
    }
  },
  data() {
    return {
      username: '',
      password: '',
      submitStatus: null
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(4)
    },
    password: {
      required,
      minLength: minLength(4)
    }
  },
  methods: {
    submit() {
      this.$v.$touch()
      const self = this
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        self.submitStatus = 'PENDING'
        axios
          .post('http://localhost:8000/api/login_check', {
            username: this.username,
            password: this.password
          })
          .then(function(response) {
            if (response.data.token) {
              self.submitStatus = 'OK'
              const auth = {
                accessToken: response.data.token,
                username: this.username
              }
              self.$store.commit('update', auth)
              Cookie.set('auth', auth)
              self.$router.push('/dashboard')
            }
          })
          .catch(function(error) {
            self.submitStatus = 'BAD_IDS'
            if (error.response.status === 401) {
              Swal.fire({
                title: 'Attention',
                text: 'Vos identifiants sont incorrects.',
                type: 'warning',
                confirmButtonText: 'Fermer'
              })
            } else {
              Swal.fire({
                title: 'Erreur',
                text: 'Une erreur est survenue sur notre serveur.',
                type: 'error',
                confirmButtonText: 'Fermer'
              })
            }
          })
      }
    }
  }
}
</script>

<style src="@/assets/css/front.css"></style>
