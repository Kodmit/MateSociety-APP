<template>
  <div class="register-page">
    <div class="columns content">
      <div class="column wlc-text">
        <img class="logo" src="images/logo.png">
        <div class="text">
          <p>{{ $t('register.left-panel.text.0') }}</p>
          <p>{{ $t('register.left-panel.text.1') }}</p>
          <p>{{ $t('register.left-panel.text.2') }}</p>
          <p>{{ $t('register.left-panel.text.3') }}</p>
        </div>
      </div>
      <div class="column" style="padding: 0; height: 100% ">
        <div class="_container">
          <div class="title">
            {{ $t('register.title') }}
          </div>
          <form class="form" @submit.prevent="submit">
            <p v-if="submitStatus === 'ITEM_ALREADY_EXIST'" class="form_error">
              Le nom d'utilisateur ou l'adresse email existe déjà.
            </p>
            <div
              class="fields"
              :class="{ 'form-group--error': $v.username.$error }"
            >
              <label class="label">{{ $t('register.username') }}</label>
              <input
                v-model.trim="$v.username.$model"
                :disabled="submitStatus === 'PENDING'"
              >
              <span v-if="!$v.username.minLength" class="msg-error">
                <small>{{ $t('register.errors.username-too-short-1') }}
                  {{ $v.username.$params.minLength.min }}
                  {{ $t('register.errors.username-too-short-2') }}.</small>
              </span>
            </div>

            <div
              class="fields"
              :class="{ 'form-group--error': $v.email.$error }"
            >
              <label class="label">{{ $t('register.email') }}</label>
              <input
                v-model.trim="$v.email.$model"
                :disabled="submitStatus === 'PENDING'"
              >
              <div v-if="!$v.email.email" class="msg-error">
                <small>L'email n'est pas valide.</small>
              </div>
            </div>

            <div
              class="fields"
              :class="{ 'form-group--error': $v.password.$error }"
            >
              <label class="label">{{ $t('register.password') }}</label>
              <input
                v-model.trim="$v.password.$model"
                :disabled="submitStatus === 'PENDING'"
                type="password"
              >
              <div v-if="!$v.password.minLength" class="msg-error">
                <small>{{ $t('register.errors.password-too-short-1') }}
                  {{ $v.password.$params.minLength.min }}
                  {{ $t('register.errors.password-too-short-2') }}.</small>
              </div>
            </div>
            <div
              class="fields"
              :class="{ 'form-group--error': $v.repeatPassword.$error }"
            >
              <label class="label">{{ $t('register.password-repeat') }}</label>
              <input
                v-model.trim="$v.repeatPassword.$model"
                :disabled="submitStatus === 'PENDING'"
                type="password"
              >
              <div v-if="!$v.repeatPassword.sameAsPassword" class="msg-error">
                <small>{{ $t('register.errors.password-not-equal') }}</small>
              </div>
            </div>

            <div class="terms" :class="{ invalid: $v.terms.$invalid }">
              <input
                v-model="terms"
                type="checkbox"
                @change="$v.terms.$touch()"
              >
              <label
                for="terms"
              >{{ $t('register.terms') }}
                <nuxt-link :to="{ path: '/cgu' }">(CGU)</nuxt-link></label>
              <span class="checkmark" />
            </div>

            <button
              class="_button"
              type="submit"
              :disabled="submitStatus === 'PENDING' || $v.$invalid"
            >
              <span v-if="submitStatus === 'PENDING'">
                {{ $t('register.register-in-progress') }}
              </span>
              <span v-else>
                {{ $t('register.title') }}
              </span>
            </button>
          </form>

          <nuxt-link class="back_link" :to="{ path: '/' }">
            <i class="far fa-arrow-left" />
          </nuxt-link>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import {
  required,
  sameAs,
  minLength,
  maxLength,
  email
} from 'vuelidate/lib/validators'
import Swal from 'sweetalert2'
import Footer from '../components/Footer'

export default {
  name: 'Register',
  components: { Footer },
  layout: 'NoNavbar',
  middleware: 'notAuthenticated',
  head() {
    return {
      title: 'Inscription',
      bodyAttrs: {
        class: 'front-bg'
      }
    }
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      terms: '',
      submitStatus: ''
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(20)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    },
    terms: {
      sameAs: sameAs(() => true)
    }
  },
  methods: {
    submit() {
      const registerFormData = new FormData()
      registerFormData.set('username', this.username)
      registerFormData.set('email', this.email)
      registerFormData.set('plainPassword', this.password)
      registerFormData.set('country', '/api/countries/1')

      const object = {}
      registerFormData.forEach((value, key) => {
        object[key] = value
      })
      const json = JSON.stringify(object)

      const self = this

      this.$v.$touch()

      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        this.$axios({
          method: 'post',
          url: '/users',
          data: json
        })
          .then(function (response) {
            if (response.status === 201) {
              console.log(response.status)
              self.$router.push('/account_created')
            }
          })
          .catch(function (error) {
            if (error.response) {
              if (error.response.status === 400) {
                self.submitStatus = 'ITEM_ALREADY_EXIST'
                Swal.fire({
                  title: 'Erreur',
                  text: "L'adresse e-mail ou le nom d'utilisateur existe déjà.",
                  type: 'error',
                  confirmButtonText: 'Fermer'
                })
              } else {
                Swal.fire({
                  title: 'Erreur',
                  text: 'Une erreur inconnue est survenue.',
                  type: 'error',
                  confirmButtonText: 'Fermer'
                })
              }
            }
          })
      }
    }
  }
}
</script>

<style src="@/assets/css/front.css"></style>
