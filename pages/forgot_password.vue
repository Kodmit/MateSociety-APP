<template>
  <div class="login">
    <div class="_container">
      <div class="title">Mot de passe oublié ?</div>
      <form @submit.prevent="submit">
        <div class="field" :class="{ 'form-group--error': $v.email.$error }">
          <label class="label">Entrez votre email</label>
          <input
            v-model.trim="$v.email.$model"
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
            Vérification en cours...
          </span>
          <span v-else>
            Valider
          </span>
        </button>
        <p v-if="submitStatus === 'ERROR'" class="form_error">
          Merci de remplir correctement le formulaire
        </p>
        <p v-if="submitStatus === 'BAD_IDS'" class="form_error">
          Indentifiants incorrects.
        </p>
      </form>

      <nuxt-link class="back_link" :to="{ path: '/login' }">
        <i class="far fa-arrow-left"></i>
      </nuxt-link>
    </div>
    <Footer />
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import Swal from 'sweetalert2'
import Footer from '../components/Footer'

export default {
  name: 'ForgotPassword',
  components: { Footer },
  layout: 'NoNavbar',
  head() {
    return {
      title: 'Mot de passe oublié'
    }
  },
  data() {
    return {
      email: '',
      submitStatus: null
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'

          Swal.fire({
            title: 'Succès',
            text:
              'Si cet email existe, un lien de réinitialisation a été envoyé.',
            type: 'success',
            confirmButtonText: 'Fermer'
          })
        }, 500)
      }
    }
  }
}
</script>

<style>
body {
  background-color: #1d1d1b;
}
</style>

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
