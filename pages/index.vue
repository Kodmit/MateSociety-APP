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
            <span><span class="title">MateSociety</span> est un réseau social basé sur le sport, le développement personnel, et la camaraderie.</span>
            <span>Rejoins un groupe de personnes près de chez toi, ou créé ton propre groupe, fixez-vous des objectifs à atteindre et lancez vous !</span>
            <nuxt-link :to="{ path: '/register' }" class="register">
              Inscription
            </nuxt-link>
          </section>
        </div>
        <div class="column">
          <section v-if="!this.$store.state.auth" class="login">
            <span class="title">Bonjour.</span>
            <span class="subtitle">Connectez-vous ou <nuxt-link :to="{ path: '/register' }">créez un compte</nuxt-link> gratuitement.</span>

            <div class="form">
              <form @submit.prevent="submit">
                <p v-if="submitStatus === 'BAD_IDS'" class="form_error">
                  Indentifiants incorrects.
                </p>
                <p v-if="submitStatus === 'USER_NOT_ENABLED'" class="form_error">
                  Votre compte n'est pas activé.
                </p>
                <div class="fields" :class="{ 'form-group--error': $v.username.$error }">
                  <label class="label">Votre identifiant</label>
                  <input
                    v-model.trim="$v.username.$model"
                    :disabled="submitStatus === 'PENDING'"
                  >
                </div>

                <div class="fields" :class="{ 'form-group--error': $v.password.$error }">
                  <label class="label">Votre mot de passe</label>
                  <input
                    v-model.trim="$v.password.$model"
                    type="password"
                    :disabled="submitStatus === 'PENDING'"
                  >
                </div>

                <nuxt-link class="reset-password" :to="{ path: '/forgot_password' }">
                  Mot de passe oublié ?
                </nuxt-link>

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
          <section v-else class="login">
            <span class="title">Bonjour.</span>
            <span class="subtitle">
              Vous êtes déjà connecté(e), {{ this.$store.state.auth.username }}.<br>
              <nuxt-link :to="{ path: '/dashboard' }" class="register">Accéder au panel</nuxt-link>
              <br><br>
              <nuxt-link :to="{ path: '/logout' }" class="register">Déconnexion</nuxt-link>
            </span>
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
import jwtDecode from 'jwt-decode'
import Footer from '../components/Footer'
export default {
  name: 'Index',
  components: { Footer },
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
      submitStatus: ''
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
        this.$axios
          .post('/login_check', {
            username: this.username,
            password: this.password
          })
          .then(function (response) {
            if (response.data.token) {
              self.submitStatus = 'OK'
              const token = jwtDecode(response.data.token)
              const auth = {
                accessToken: 'Bearer ' + response.data.token,
                username: self.username,
                user_id: token.id
              }
              self.$store.commit('update', auth)
              Cookie.set('auth', auth)
              self.$router.push('/dashboard')
            }
            else if (response.data.error === 'user_not_enabled') {
              self.submitStatus = 'USER_NOT_ENABLED'
              Swal.fire({
                title: 'Erreur',
                text: 'Votre compte n\'est pas activé.',
                type: 'error',
                confirmButtonText: 'Fermer'
              })
            }
          })
          .catch(function (error) {
            self.submitStatus = 'BAD_IDS'
            if (error.response) {
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
            }
            else {
              Swal.fire({
                title: 'Erreur',
                text: 'Une erreur inconnue est survenue.',
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
