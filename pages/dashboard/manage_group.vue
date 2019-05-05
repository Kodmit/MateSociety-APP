<template>
  <section class="main-content columns is-fullheight">
    <Sidebar />
    <div class="column is-10 manage_group">
      <h1>Gérer mon groupe</h1>
      <form class="form container" @submit.prevent="submit">
        <div class="columns">
          <div class="column is-4">
            <h2>Image du groupe</h2>
            <p class="p_text">
              Les formats acceptés sont les suivants : jpg, jpeg, png. Taille
              maximum : 5M
            </p>
            <section class="picture">
              <div v-if="!image">
                <div v-if="file === null">
                  <i class="fal fa-user-friends fa-5x _icon" />
                </div>
                <div v-else>
                  <img :src="file">
                  <button class="_remove" @click="removeCurrentImage">
                    Supprimer l'image
                  </button>
                  <br>
                  <br>
                </div>
                <div class="file has-name">
                  <label class="file-label">
                    <input
                      id="file"
                      ref="file"
                      class="file-input"
                      type="file"
                      accept=".jpg,.png,.jpeg"
                      @change="handleFileUpload()"
                    >
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload" />
                      </span>
                      <span class="file-label">Choisir un fichier</span>
                    </span>
                    <span class="file-name">...</span>
                  </label>
                </div>
              </div>
              <div v-else>
                <img :src="image">
                <button class="_remove" @click="removeImage">
                  Choisir une autre
                </button>
                <button
                  class="_button"
                  :disabled="submitStatus === 'PENDING' || $v.$invalid"
                  @click="submitFile()"
                >
                  <span
                    v-if="submitStatus === 'PENDING'"
                  >Enregistrement...</span>
                  <span v-else>Valider</span>
                </button>
              </div>
            </section>
          </div>
          <div class="column is-8">
            <h2>Informations du groupe</h2>
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

            <div style="margin-top: 20px" class="fields" :class="{ 'form-group--error': $v.description.$error }">
              <label class="label">Description du groupe</label>
              <textarea v-model.trim="$v.description.$model" :disabled="submitStatus === 'PENDING'" />
              <div v-if="!$v.description.maxLength" class="msg-error">
                <small>La description doit faire moins de {{ $v.description.$params.maxLength.max }} caractères. (Actuellement : {{ description.length }})</small>
              </div>
            </div>
          </div>
        </div>
        <button class="_button" type="submit" :disabled="submitStatus === 'PENDING' || $v.$invalid">
          <span v-if="submitStatus === 'PENDING'">Modification...</span>
          <span v-else>Modifier le groupe</span>
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import Swal from 'sweetalert2'
import Sidebar from '../../components/dashboard/Sidebar'
export default {
  name: 'ManageGroup',
  components: { Sidebar },
  head() {
    return {
      title: 'Gérer mon groupe'
    }
  },
  data() {
    return {
      group: '',
      name: 'Chargement...',
      countries: '',
      city: 'Chargement...',
      description: 'Chargement...',
      options: [],
      file: '',
      image: '',
      submitStatus: ''
    }
  },
  mounted() {
    const self = this
    this.$axios.get('/countries').then(function (response) {
      self.countries = response.data['hydra:member'][0]['@id']
      self.options = response.data['hydra:member']
    })
    this.$axios.get('/users/' + this.$store.state.auth.user_id)
      .then(function (response) {
        if (!response.data.owned_group) {
          self.$router.push('/dashboard')
        }
        self.$axios.get('/groups/' + response.data.owned_group['@id'].split('/')[3])
          .then(function (group) {
            console.log(group)
            if (group.data.image) {
              self.file =
                'http://localhost:8000/uploads/media/' +
                group.data.image.filePath
            } else {
              self.file = null
            }
            self.group = group.data
            self.name = group.data.name
            self.countries = group.data.country['@id']
            self.description = group.data.description
            self.city = group.data.city
          })
      })
  },
  methods: {
    submitFile() {
      const formData = new FormData()
      formData.append('file', this.file)

      this.submitStatus = 'PENDING'
      const self = this

      this.$axios
        .post('/media_objects', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(function (response) {
          if (response.status === 201) {
            const pic = {}
            pic.image = response.data['@id']
            self.$axios
              .put('/groups/' + self.group['@id'].split('/')[3], pic)
              .then(function (response) {
                if (response.status === 200) {
                  self.submitStatus = ''
                  Swal.fire({
                    title: 'Succès',
                    text: 'Votre photo de profil a été enregistrée !',
                    type: 'success',
                    confirmButtonText: 'Fermer'
                  })
                }
                self.$router.push('/dashboard/manage_group')
              })
          }
          self.submitStatus = ''
        })
        .catch(function () {
          Swal.fire({
            title: 'Erreur',
            text:
              "Une erreur est survenue, vérifiez que l'image ne dépasse pas la taille maximale et qu'elle est valide.",
            type: 'error',
            confirmButtonText: 'Fermer'
          })
          self.submitStatus = ''
        })
    },
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

        this.$axios.put('/groups/' + self.group['@id'].split('/')[3], object)
          .then(function (response) {
            self.submitStatus = ''
            if (response.status === 200) {
              Swal.fire({
                title: 'Groupe modifié',
                text: 'Vos données ont été enregistrés !.',
                type: 'success',
                confirmButtonText: 'Fermer'
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

        // END
        setTimeout(function () {
          console.log('ok')
        }, 5000)
      }
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
      this.createImage(this.file)
    },
    createImage(file) {
      const image = new Image() // eslint-disable-line no-unused-vars
      const reader = new FileReader()
      const vm = this

      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (e) {
      this.image = ''
      this.file = null
      this.$router.push('/dashboard/manage_group')
    },
    removeCurrentImage: function (e) {
      this.image = ''
      this.file = null
      const imageObject = {}
      imageObject.image = null
      this.$axios
        .put('/groups/' + this.group['@id'].split('/')[3], imageObject)
        .then(function (response) {
          if (response.status === 200) {
            Swal.fire({
              title: 'Succès',
              text: 'La photo du groupe a été supprimée !',
              type: 'success',
              confirmButtonText: 'Fermer'
            })
          }
        })
      this.$router.push('/dashboard/manage_group')
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

  $dark: #222F47;
  $blue1: #0079C2;
  $blue2: #7CE7FF;
  $grey: #EFF0F9;
  $white: #FFFFFF;

  .manage_group {

    h1 {
      border-bottom: 1px solid $blue2;
      margin-bottom: 20px;
    }

    h2 {
      color: $dark;
      font-family: "Montserrat", sans-serif;
      font-weight: 300;
      font-size: 30px;
    }

    .picture {
      text-align: center;
      padding: 20px;
      background-color: $blue1;
      width: 415px;
      margin: auto;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      border-radius: 3px;

      ._icon {
        color: $grey;
        margin-bottom: 20px;
        font-size: 115px;
      }

      .file {
        width: fit-content;
        margin: auto;
      }

      .file-name {
        color: $grey;
      }

      .file-cta {
        background-color: $grey;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      }

      ._button {
        background-color: $grey;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        float: none;
        color: $dark;
        margin-top: 20px;
        border: none;
        padding: 15px 25px;
        font-family: "Raleway", sans-serif;
        border-radius: 3px;
      }

      ._remove {
        background-color: #ff6e6e;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        float: none;
        color: #fff;
        margin-top: 20px;
        border: none;
        padding: 15px 25px;
        font-family: "Raleway", sans-serif;
        border-radius: 3px;
      }
    }
  }

</style>
