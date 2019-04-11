<template>
  <div class="login">
    <div class="_container">
      <div class="title">Connexion</div>
      <form @submit.prevent="submit">
        <div class="field" :class="{ 'form-group--error': $v.username.$error }">
          <label class="label">Nom d'utilisateur</label>
          <input
            v-model.trim="$v.username.$model"
            :disabled="submitStatus === 'PENDING'"
            class="input _input"
          />
        </div>

        <div class="field" :class="{ 'form-group--error': $v.password.$error }">
          <label class="label">Mot de passe</label>
          <input
            v-model.trim="$v.password.$model"
            :disabled="submitStatus === 'PENDING'"
            class="input _input"
          />
        </div>

        <button
          id="submitButton"
          class="button is-primary is-fullwidth"
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
        <p v-if="submitStatus === 'BAD_IDS'" class="form_error">
          Indentifiants incorrects.
        </p>
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
                accessToken: response.data.token
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

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat|Oswald|Raleway|Roboto|Roboto+Condensed');
$dark: #1d1d1b;

.login {
  background-color: $dark;
  z-index: 11;
  position: absolute;
  bottom: 0px;
  top: 0px;
  right: 0px;
  left: 0px;
  color: #fff;

  form {
    margin-top: 40px;
  }

  ._container {
    margin: auto;
    width: 500px;
    background-color: #272727;
    height: 100%;
    padding: 20px;
  }

  .title {
    margin-top: 45px;
    font-family: 'Oswald', sans-serif;
    color: orange;
    font-size: 40px;
    text-transform: uppercase;
    font-weight: 200;
    text-align: center;
    letter-spacing: 5px;
  }

  .subtitle {
    font-family: 'Raleway', sans-serif;
    color: #fff;
    font-weight: 200;
    text-align: center;
    display: block;
    font-size: 18px;
  }

  .form {
    width: 550px;
    margin: auto;
    line-height: 30px;
  }

  ._input {
    background-color: transparent;
    color: #fff;
  }

  .form_error {
    color: #e40012;
    text-align: center;
  }

  ._input:focus {
    border-color: orange;
    box-shadow: none;
  }

  .input[disabled] {
    background-color: #888888 !important;
    border-color: #868686;
    box-shadow: none;
    color: #dedede !important;
  }

  .label {
    color: #fff;
  }

  p {
    margin-top: 15px;
  }

  .register {
    color: orange;
    border-radius: 4px;
    padding: 10px;
    margin-top: 85px;
    background-color: #000000;
    display: block;
    text-align: center;
    text-transform: uppercase;
  }

  .back_link {
    font-size: 25px;
    margin-top: 70px;
    color: orange;
    margin-right: auto;
    margin-left: auto;
    width: fit-content;
    display: block;
  }

  .forgot-password {
    float: right;
    margin-top: 10px;
    color: #00d1b2;
  }
}
</style>
