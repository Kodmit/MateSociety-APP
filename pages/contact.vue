<template>
  <div class="contact">
    <div class="container">
      <div class="title">Contactez-nous !</div>
      <span class="subtitle">
        Pour poser vos questions, ou juste discuter...
      </span>
      <form class="form">
        <div class="field" :class="{ 'fld-error': $v.form.name.$error }">
          <label class="label">Votre nom</label>
          <input
            v-model.trim="form.name"
            class="input _input"
            type="text"
            @input="$v.form.name.$touch()"
          />

          <span v-if="!$v.form.name.required" class="msg-error">
            <small>Ce champs est obligatoire</small>
          </span>
          <span v-if="!$v.form.name.minLength" class="msg-error">
            <small
              >Le champs doit faire plus de
              {{ $v.form.name.$params.minLength.min }} lettres.</small
            >
          </span>
        </div>

        <div class="field" :class="{ 'is-danger': $v.form.email.$error }">
          <label class="label">Adresse e-mail</label>
          <input v-model="form.email" class="input _input" type="text" />

          <span v-if="!$v.form.email.required" class="msg-error">
            <small>L'email est requis</small>
          </span>
          <div v-if="!$v.form.email.email" class="msg-error">
            L'email n'est pas valide
          </div>
        </div>

        <div class="field" :class="{ 'fld-error': $v.form.message.$error }">
          <label class="label">Votre message</label>
          <textarea
            v-model="form.message"
            class="textarea _input"
            type="text"
          ></textarea>

          <span v-if="!$v.form.message.required" class="msg-error">
            <small>Vous devez entrer un message</small>
          </span>
        </div>

        <p>
          <button
            class="button is-link"
            type="submit"
            :disabled="$v.form.$invalid"
            @click.prevent="submitForm"
          >
            Envoyer
          </button>
        </p>
      </form>

      <nuxt-link class="back_link" :to="{ path: '/' }">
        <i class="far fa-arrow-left"></i>
      </nuxt-link>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios'
import Footer from '~/components/Footer.vue'
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'Contact',
  layout: 'NoNavbar',
  components: {
    Footer
  },
  head() {
    return {
      title: 'Contactez-nous'
    }
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        email
      },
      message: {
        required,
        minLength: minLength(5)
      }
    }
  },
  methods: {
    submitForm() {
      const contactFormData = new FormData()
      contactFormData.set('name', this.form.name)
      contactFormData.set('email', this.form.email)
      contactFormData.set('message', this.form.message)

      axios({
        method: 'post',
        url: '',
        data: contactFormData
      })
        .then(function(response) {
          // Handle success.
        })
        .catch(function(response) {
          // Handle error.
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat|Oswald|Raleway|Roboto|Roboto+Condensed');
$dark: #1d1d1b;

.contact {
  background-color: $dark;
  position: absolute;
  bottom: 0px;
  top: 0px;
  right: 0px;
  left: 0px;
  color: #fff;

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

  ._input:focus {
    border-color: orange;
    box-shadow: none;
  }

  .label {
    color: #fff;
  }

  p {
    margin-top: 15px;
  }

  .back_link {
    font-size: 25px;
    margin-top: 30px;
    color: orange;
    margin-right: auto;
    margin-left: auto;
    width: fit-content;
    display: block;
  }
}
</style>
