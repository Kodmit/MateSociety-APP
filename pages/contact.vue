<template>
  <div class="contact">
    <div class="container">
      <div class="title">Contactez-nous !</div>
      <span class="subtitle">
        Pour poser vos questions, ou juste discuter...
      </span>

      <form class="form">
        <p :class="{ 'fld-error': $v.form.name.$error }">
          <label>Votre nom</label>
          <input
            v-model.trim="form.name"
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
        </p>

        <div :class="{ 'fld-error': $v.form.email.$error }">
          <label>Adresse e-mail</label><br />
          <input v-model="form.email" type="text" />

          <span v-if="!$v.form.email.required" class="msg-error">
            <small>L'email est requis</small>
          </span>
          <div v-if="!$v.form.email.email" class="msg-error">
            L'email n'est pas valide
          </div>
        </div>

        <div :class="{ 'fld-error': $v.form.message.$error }">
          <label>Votre message</label><br />
          <textarea v-model="form.message" type="text"></textarea>

          <span v-if="!$v.form.message.required" class="msg-error">
            <small>Vous devez entrer un message</small>
          </span>
        </div>

        <p>
          <button
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
  </div>
</template>

<script>
import axios from 'axios'
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'Contact',
  layout: 'NoNavbar',
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
        minLength: minLength(4)
      }
    }
  },
  methods: {
    submitForm() {
      const contactFormData = new FormData()
      contactFormData.set('name', this.form.name)
      contactFormData.set('job', this.form.job)

      axios({
        method: 'post',
        url: 'https://reqres.in/api/users',
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

  .text {
    width: 550px;
    margin: auto;
    line-height: 30px;
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
