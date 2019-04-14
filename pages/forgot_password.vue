<template>
  <div class="login-page">
    <div class="_container">
      <div class="title">Mot de passe oublié ?</div>
      <form class="form" @submit.prevent="submit">
        <div class="fields" :class="{ 'form-group--error': $v.email.$error }">
          <label class="label">Entrez votre email</label>
          <input
            v-model.trim="$v.email.$model"
            :disabled="submitStatus === 'PENDING'"
          />
        </div>

        <button
          class="_button"
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
  middleware: 'notAuthenticated',
  head() {
    return {
      title: 'Mot de passe oublié',
      bodyAttrs: {
        class: 'front-bg'
      }
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

<style src="@/assets/css/front.css"></style>
