<template>
  <div class="login-page">
    <div class="_container">
      <div class="title">Connexion</div>
      <form class="form" @submit.prevent="submit">
        <p v-if="submitStatus === 'ERROR'" class="form_error">
          Merci de remplir correctement le formulaire
        </p>
        <p v-if="submitStatus === 'BAD_IDS'" class="form_error">
          Indentifiants incorrects.
        </p>
        <div
          class="fields"
          :class="{ 'form-group--error': $v.username.$error }"
        >
          <label class="label">Nom d'utilisateur</label>
          <input
            v-model.trim="$v.username.$model"
            :disabled="submitStatus === 'PENDING'"
          />
        </div>

        <div
          class="fields"
          :class="{ 'form-group--error': $v.password.$error }"
        >
          <label class="label">Mot de passe</label>
          <input
            v-model.trim="$v.password.$model"
            :disabled="submitStatus === 'PENDING'"
          />
        </div>

        <button
          class="_button"
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
      </form>

      <nuxt-link class="forgot-password" :to="{ path: '/forgot_password' }"
        >Mot de passe oublié ?</nuxt-link
      >

      <nuxt-link class="register" :to="{ path: '/register' }"
        >Créer un compte</nuxt-link
      >

      <nuxt-link class="back_link" :to="{ path: '/' }">
        <i class="far fa-arrow-left"></i>
      </nuxt-link>
    </div>
    <Footer />
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import Swal from 'sweetalert2'
import Cookie from 'js-cookie'
import axios from 'axios'
import Footer from '../components/Footer'

export default {
  name: 'Login',
  components: { Footer },
  layout: 'NoNavbar',
  middleware: 'notAuthenticated',
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
            } else if (response.data.error === 'user_not_enabled') {
              self.submitStatus = 'USER_NOT_ENABLED'
              Swal.fire({
                title: 'Erreur',
                text: "Votre compte n'est pas activé.",
                type: 'error',
                confirmButtonText: 'Fermer'
              })
            }
          })
          .catch(function(error) {
            self.submitStatus = 'BAD_IDS'
            if (error.response.status) {
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
            } else {
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
  },
  head() {
    return {
      title: 'Login',
      bodyAttrs: {
        class: 'front-bg'
      }
    }
  }
}
</script>

<style src="@/assets/css/front.css"></style>
