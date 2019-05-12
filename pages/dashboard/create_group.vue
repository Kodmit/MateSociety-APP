<template>
  <div>
    <div class="container create_group">
      <h1>Créer un groupe</h1>
      <p class="subtitle">
        Remplissez le formulaire ci-dessous afin de créer votre groupe, vous ne pouvez créer qu'un seul groupe et vous serez automatiquement assigné à celui-ci.
      </p>

      <form class="form" @submit.prevent="submit">
        <p v-if="submitStatus === 'ITEM_ALREADY_EXIST'" class="form_error">
          Le nom du groupe existe déjà
        </p>

        <div class="fields" :class="{ 'form-group--error': $v.name.$error }">
          <label class="label">Nom de votre groupe</label>
          <input v-model.trim="$v.name.$model" :disabled="submitStatus === 'PENDING'">
          <span v-if="!$v.name.minLength || !$v.name.maxLength" class="msg-error">
            <small>Le nom du group doit faire entre {{ $v.name.$params.minLength.min }} et {{ $v.name.$params.maxLength.max }} caractères. (Actuellement : {{ name.length }})</small>
          </span>
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
            <small>Le nom de la ville doit faire moins de {{ $v.city.$params.maxLength.max }} caractères. (Actuellement : {{ city.length }})</small>
          </div>
        </div>

        <div class="fields" :class="{ 'form-group--error': $v.description.$error }">
          <label class="label">Description du groupe</label>
          <textarea v-model.trim="$v.description.$model" :disabled="submitStatus === 'PENDING'" />
          <div v-if="!$v.description.maxLength" class="msg-error">
            <small>La description doit faire moins de {{ $v.description.$params.maxLength.max }} caractères. (Actuellement : {{ description.length }})</small>
          </div>
        </div>

        <button class="_button" type="submit" :disabled="submitStatus === 'PENDING' || $v.$invalid">
          <span v-if="submitStatus === 'PENDING'">Création...</span>
          <span v-else>Créer le groupe</span>
        </button>
      </form>
    </div>
    <Footer />
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import Swal from 'sweetalert2'
import Footer from '../../components/Footer'
export default {
  name: 'CreateGroup',
  components: { Footer },
  middleware: 'authenticated',
  head() {
    return {
      title: 'Créer un groupe'
    }
  },
  data() {
    return {
      name: '',
      countries: '',
      city: '',
      description: '',
      options: [],
      submitStatus: ''
    }
  },
  mounted() {
    const self = this
    this.$axios.get('/users/' + this.$store.state.auth.user_id)
      .then(function (r) {
        console.log(r)
        if (r.data.group_member) {
          self.$router.push('/dashboard')
        }
      })
    this.$axios.get('/countries').then(function (response) {
      self.countries = response.data['hydra:member'][0]['@id']
      self.options = response.data['hydra:member']
    })
  },
  methods: {
    submit() {
      const groupFormData = new FormData()
      groupFormData.set('name', this.name)
      groupFormData.set('country', this.countries)
      groupFormData.set('city', this.city)
      groupFormData.set('description', this.description)

      const object = {}
      groupFormData.forEach((value, key) => {
        object[key] = value
      })
      const self = this

      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'

        this.$axios.post('/groups', object)
          .then(function (response) {
            self.submitStatus = ''
            if (response.status === 201) {
              Swal.fire({
                title: 'Votre groupe a été créé',
                text: "Vous pouvez désormais l'administrer, suivez bien les indications une fois sur la page.",
                type: 'success',
                allowOutsideClick: false,
                showCancelButton: false,
                confirmButtonText: 'Administrer mon groupe',
                reverseButtons: true
              }).then((result) => {
                if (result.value) {
                  self.$router.push('/dashboard')
                }
              })
            }
          })
          .catch(function (out) {
            if (out.response.status === 400) {
              if (out.response.data['hydra:description'] === 'name: This value is already used.')
              {
                Swal.fire({
                  title: 'Erreur',
                  text: 'Le nom de ce groupe existe déjà.',
                  type: 'error',
                  confirmButtonText: 'Fermer'
                })
              }
              else {
                Swal.fire({
                  title: 'Erreur',
                  text: 'Votre requête comporte des erreurs.',
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
    name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(20)
    },
    city: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30)
    },
    description: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(300)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/dashboard.css';
</style>
