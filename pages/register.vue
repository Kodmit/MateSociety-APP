<template>
  <div class="register">
    <div class="columns content">
      <div class="column wlc-text">
        <p class="title">{{ $t('register.left-panel.title') }}</p>
        <div class="text">
          <p>{{ $t('register.left-panel.text.0') }}</p>
          <p>{{ $t('register.left-panel.text.1') }}</p>
          <p>{{ $t('register.left-panel.text.2') }}</p>
          <p>{{ $t('register.left-panel.text.3') }}</p>
        </div>
      </div>
      <div class="column" style="padding: 0; height: 100% ">
        <div class="_container">
          <div class="title">{{ $t('register.title') }}</div>
          <form @submit.prevent="submit">
            <div
              class="field"
              :class="{ 'form-group--error': $v.username.$error }"
            >
              <label class="label">{{ $t('register.username') }}</label>
              <input
                v-model.trim="$v.username.$model"
                :disabled="submitStatus === 'PENDING'"
                class="input _input"
              />
              <span v-if="!$v.username.minLength" class="msg-error">
                <small
                  >{{ $t('register.errors.username-too-short-1') }}
                  {{ $v.username.$params.minLength.min }}
                  {{ $t('register.errors.username-too-short-2') }}.</small
                >
              </span>
            </div>

            <div
              class="field"
              :class="{ 'form-group--error': $v.email.$error }"
            >
              <label class="label">{{ $t('register.email') }}</label>
              <input
                v-model.trim="$v.email.$model"
                :disabled="submitStatus === 'PENDING'"
                class="input _input"
              />
              <div v-if="!$v.email.email" class="msg-error">
                <small>L'email n'est pas valide.</small>
              </div>
            </div>

            <div
              class="field"
              :class="{ 'form-group--error': $v.password.$error }"
            >
              <label class="label">{{ $t('register.password') }}</label>
              <input
                v-model.trim="$v.password.$model"
                :disabled="submitStatus === 'PENDING'"
                class="input _input"
              />
              <div v-if="!$v.password.minLength" class="msg-error">
                <small
                  >{{ $t('register.errors.password-too-short-1') }}
                  {{ $v.password.$params.minLength.min }}
                  {{ $t('register.errors.password-too-short-2') }}.</small
                >
              </div>
            </div>
            <div
              class="field"
              :class="{ 'form-group--error': $v.repeatPassword.$error }"
            >
              <label class="label">{{ $t('register.password-repeat') }}</label>
              <input
                v-model.trim="$v.repeatPassword.$model"
                :disabled="submitStatus === 'PENDING'"
                class="input _input"
              />
              <div v-if="!$v.repeatPassword.sameAsPassword" class="msg-error">
                <small>{{ $t('register.errors.password-not-equal') }}</small>
              </div>
            </div>

            <button
              class="button is-primary is-fullwidth"
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
            <i class="far fa-arrow-left"></i>
          </nuxt-link>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { required, sameAs, minLength, email } from 'vuelidate/lib/validators'
import Footer from '../components/Footer'

export default {
  name: 'Register',
  components: { Footer },
  layout: 'NoNavbar',
  head() {
    return {
      title: 'Inscription'
    }
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      submitStatus: null
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(4)
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
    }
  },
  methods: {
    submit() {
      const registerFormData = new FormData()
      registerFormData.set('username', this.username)
      registerFormData.set('email', this.email)
      registerFormData.set('password', this.password)
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          // this.submitStatus = 'OK'

          // or

          this.submitStatus = 'BAD_IDS'
        }, 11500)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat|Oswald|Raleway|Roboto|Roboto+Condensed');
$dark: #1d1d1b;

.register {
  background-color: $dark;
  position: absolute;
  bottom: 0px;
  top: 0px;
  right: 0px;
  left: 0px;
  color: #fff;

  .wlc-text {
    .title {
      font-size: 25px;
    }

    .text {
      font-family: 'Oswald', sans-serif;
      text-align: center;
      width: 90%;
    }
  }

  .content {
    width: 80%;
    margin: auto;
    height: 100%;
  }

  form {
    margin-top: 40px;
  }

  ._container {
    float: left;
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
