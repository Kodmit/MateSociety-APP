<template>
  <div>
    <div class="edit_profile">
      <div class="container">
        <h1><i class="fal fa-camera" /> Modifier ma photo</h1>
        <div class="columns">
          <div class="column is-4">
            <aside class="menu">
              <p class="menu-label">
                Menu
              </p>
              <ul class="menu-list">
                <li>
                  <nuxt-link to="/dashboard">
                    Dashboard
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/dashboard/change_picture">
                    Changer ma photo de profil
                  </nuxt-link>
                </li>
                <li><a>Voir mon profil</a></li>
                <li><a>Changer mon mot de passe</a></li>
              </ul>
            </aside>
          </div>
          <div class="column is-8">
            <p class="p_text">
              Les formats acceptés sont les suivants : jpg, jpeg, png
            </p>
            <section class="picture">
              <div v-if="!image">
                <div v-if="file === null">
                  <i class="fal fa-user fa-5x _icon" />
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
                <button class="_button" :disabled="submitStatus === 'PENDING' || $v.$invalid" @click="submitFile()">
                  <span v-if="submitStatus === 'PENDING'">Enregistrement...</span>
                  <span v-else>Valider</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Swal from 'sweetalert2'
import Footer from '../../components/Footer'

export default {
  name: 'EditPicture',
  middleware: 'authenticated',
  components: { Footer },
  head() {
    return {
      title: 'Modifier ma photo'
    }
  },
  data() {
    return {
      file: '',
      image: '',
      submitStatus: ''
    }
  },
  mounted() {
    const self = this
    this.$axios.get('/users/' + this.$store.state.auth.user_id)
      .then(function (response) {
        if (response.data.image) {
          self.file = 'http://localhost:8000/uploads/media/' + response.data.image.filePath
        }
        else {
          self.file = null
        }
      })
  },
  methods: {
    submitFile() {
      const formData = new FormData()
      formData.append('file', this.file)

      this.submitStatus = 'PENDING'
      const self = this

      this.$axios.post('/media_objects', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(function (response) {
          if (response.status === 201) {
            const pic = {}
            pic.image = response.data['@id']
            self.$axios.put('/users/' + self.$store.state.auth.user_id, pic)
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
                self.$router.push('/dashboard/change_picture')
              })
          }
          self.submitStatus = ''
        })
        .catch(function (error) {
          Swal.fire({
            title: 'Erreur',
            text: 'Une erreur est survenue ( ' + error + ' )',
            type: 'success',
            confirmButtonText: 'Fermer'
          })
          self.submitStatus = ''
        })
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
      this.$router.push('/dashboard/change_picture')
    },
    removeCurrentImage: function (e) {
      this.image = ''
      this.file = null
      const imageObject = {}
      imageObject.image = null
      this.$axios.put('/users/' + this.$store.state.auth.user_id, imageObject)
        .then(function (response) {
          if (response.status === 200) {
            Swal.fire({
              title: 'Succès',
              text: 'Votre photo de profil a été supprimée !',
              type: 'success',
              confirmButtonText: 'Fermer'
            })
          }
        })
      this.$router.push('/dashboard/change_picture')
    }
  },
  validations: {
    file: {
      required
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/dashboard.css';
</style>
