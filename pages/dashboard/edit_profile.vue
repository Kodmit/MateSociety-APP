<template>
  <div>
    <div class="edit_profile">
      <div class="container">
        <h1><i class="fal fa-user-edit" /> Editer mon profil</h1>
        <div class="columns">
          <div class="column is-4">
            <aside class="menu">
              <p class="menu-label">
                Menu
              </p>
              <ul class="menu-list">
                <li><a>Dashboard</a></li>
                <li><a>Modifier mon profil</a></li>
                <li><a>Voir mon profil</a></li>
                <li><a>Changer mon mot de passe</a></li>
              </ul>
            </aside>
          </div>
          <div class="column is-8">
            <form class="form" @submit.prevent="submit">
              <p v-if="submitStatus === 'ITEM_ALREADY_EXIST'" class="form_error">
                Le nom d'utilisateur ou l'adresse email existe déjà.
              </p>

              <div class="fields" :class="{ 'form-group--error': $v.username.$error }">
                <label class="label">{{ $t('register.username') }}</label>
                <input v-model.trim="$v.username.$model" :disabled="submitStatus === 'PENDING'">
                <span v-if="!$v.username.minLength" class="msg-error">
                  <small>{{ $t('register.errors.username-too-short-1') }} {{ $v.username.$params.minLength.min }}{{ $t('register.errors.username-too-short-2') }}.</small>
                </span>
              </div>

              <div class="fields" :class="{ 'form-group--error': $v.email.$error }">
                <label class="label">{{ $t('register.email') }}</label>
                <input v-model.trim="$v.email.$model" :disabled="submitStatus === 'PENDING'">
                <div v-if="!$v.email.email" class="msg-error">
                  <small>L'email n'est pas valide.</small>
                </div>
              </div>

              <div class="fields">
                <label class="label">Pays</label>

                <select v-model="countries" :disabled="submitStatus === 'PENDING'">
                  <option v-for="option in options" :key="option['@id']" :value="option['@id']">
                    {{ option.name }}
                  </option>
                </select>
              </div>

              <div class="fields" :class="{ 'form-group--error': $v.city.$error }">
                <label class="label">Ville</label>
                <input v-model.trim="$v.city.$model" :disabled="submitStatus === 'PENDING'">
                <div v-if="!$v.city.maxLength" class="msg-error">
                  <small>Le nom de la ville doit faire moins de {{ $v.city.$params.maxLength.max }} caractères.</small>
                </div>
              </div>

              <div class="fields" :class="{ 'form-group--error': $v.description.$error }">
                <label class="label">Décrivez-vous !</label>
                <textarea v-model.trim="$v.description.$model" :disabled="submitStatus === 'PENDING'" />
                <div v-if="!$v.description.maxLength" class="msg-error">
                  <small>Votre description doit faire moins de {{ $v.description.$params.maxLength.max }} caractères.</small>
                </div>
              </div>

              <button class="_button" type="submit" :disabled="submitStatus === 'PENDING' || $v.$invalid">
                <span v-if="submitStatus === 'PENDING'">Enregistrement...</span>
                <span v-else>Enregistrer</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import Swal from 'sweetalert2'
import Footer from '../../components/Footer'

export default {
  name: 'EditProfile',
  middleware: 'authenticated',
  components: { Footer },
  head() {
    return {
      title: 'Editer mon profil'
    }
  },
  data() {
    return {
      username: 'Chargement...',
      email: 'Chargement...',
      countries: '',
      options: [],
      city: 'Chargement...',
      description: 'Chargement...',
      submitStatus: ''
    }
  },
  mounted() {
    const self = this
    this.$axios.get('/countries').then(function (response) {
      self.options = response.data['hydra:member']
    })
    this.$axios.get('/users/' + this.$store.state.auth.user_id)
      .then(function (response) {
        self.username = response.data.username
        self.email = response.data.email
        self.city = response.data.city
        self.description = response.data.description
        self.countries = response.data.country['@id']
      })
      .catch(function (error) {
        Swal.fire({
          title: 'Erreur',
          text: 'Une erreur serveur est survenue. ( ' + error + ' )',
          type: 'error',
          confirmButtonText: 'Fermer'
        })
      })
  },
  methods: {
    submit() {
      const registerFormData = new FormData()
      registerFormData.set('username', this.username)
      registerFormData.set('email', this.email)
      registerFormData.set('country', this.countries)
      registerFormData.set('city', this.city)
      registerFormData.set('description', this.description)

      const object = {}
      registerFormData.forEach((value, key) => {
        object[key] = value
      })
      // const json = JSON.stringify(object)
      const self = this

      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        this.$axios.put('/users/' + self.$store.state.auth.user_id, object)
          .then(function (response) {
            if (response.status === 200) {
              self.submitStatus = ''
              Swal.fire({
                title: 'Succès',
                text: 'Vos informations ont été enregistrés',
                type: 'success',
                confirmButtonText: 'Fermer'
              })
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
    city: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30)
    },
    description: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/dashboard.css';
</style>
