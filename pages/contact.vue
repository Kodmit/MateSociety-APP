<template>
  <div class="contact">
    <div class="band">
      <div class="container">
        <div class="title">Contactez-nous !</div>
        <div class="form">
          <form>
            <div class="fields" :class="{ 'fld-error': $v.form.name.$error }">
              <label class="label">Votre nom</label>
              <input
                v-model.trim="form.name"
                type="text"
                @input="$v.form.name.$touch()"
              />

              <span v-if="!$v.form.name.minLength" class="msg-error">
                <small
                  >Le champs doit faire plus de
                  {{ $v.form.name.$params.minLength.min }} lettres.</small
                >
              </span>
            </div>

            <div class="fields" :class="{ 'is-danger': $v.form.email.$error }">
              <label class="label">Adresse e-mail</label>
              <input v-model="form.email" type="text" />

              <div v-if="!$v.form.email.email" class="msg-error">
                L'email n'est pas valide
              </div>
            </div>

            <div
              class="fields"
              :class="{ 'fld-error': $v.form.message.$error }"
            >
              <label class="label">Votre message</label>
              <textarea
                v-model="form.message"
                rows="5"
                class="_textarea"
                type="text"
              ></textarea>
            </div>

            <button
              class="_button"
              type="submit"
              :disabled="$v.form.$invalid"
              @click.prevent="submitForm"
            >
              Envoyer
            </button>
          </form>
        </div>

        <nuxt-link class="back_link" :to="{ path: '/' }">
          <i class="far fa-arrow-left"></i>
        </nuxt-link>
      </div>
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
      title: 'Contactez-nous',
      bodyAttrs: {
        class: 'front-bg'
      }
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

<style src="@/assets/css/front.css"></style>
