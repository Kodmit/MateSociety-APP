<template>
  <section class="main-content columns is-fullheight">
    <Sidebar />
    <div class="column is-10 manage_group">
      <h1>Modifier l'événement</h1>
      <div class="columns">
        <div class="column is-8">
          <form class="form" @submit.prevent="submit">
            <p v-if="submitStatus === 'ITEM_ALREADY_EXIST'" class="form_error">
              Le nom du groupe existe déjà
            </p>

            <div class="fields" :class="{ 'form-group--error': $v.name.$error }">
              <label class="label">Nom de l'événement</label>
              <input v-model.trim="$v.name.$model" :disabled="submitStatus === 'PENDING'">
              <span v-if="!$v.name.minLength || !$v.name.maxLength" class="msg-error">
                <small>Le nom de l'événement doit faire entre {{ $v.name.$params.minLength.min }} et {{ $v.name.$params.maxLength.max }} caractères. (Actuellement : {{ name.length }})</small>
              </span>
            </div>

            <div class="fields">
              <label class="label">Description (optionelle)</label>
              <textarea v-model.trim="$v.description.$model" :disabled="submitStatus === 'PENDING'" />
              <div v-if="!$v.description.maxLength" class="msg-error">
                <small>La description doit faire moins de {{ $v.description.$params.maxLength.max }} caractères. (Actuellement : {{ description.length }})</small>
              </div>
            </div>

            <div class="fields" :class="{ 'form-group--error': $v.place.$error }">
              <label class="label">Lieu</label>
              <input v-model.trim="$v.place.$model" :disabled="submitStatus === 'PENDING'">
              <div v-if="!$v.place.maxLength" class="msg-error">
                <small>Le nom du lieu doit faire moins de {{ $v.place.$params.maxLength.max }} caractères. (Actuellement : {{ place.length }})</small>
              </div>
            </div>

            <div style="margin-top: 20px" class="fields">
              <label v-if="show_end_var" class="label">Date de début</label>
              <label v-else class="label">Date</label>
              <datetime v-model="start_date" style="background-color: #fff" type="datetime" :disabled="submitStatus === 'PENDING'" />
            </div>

            <div class="fields">
              <input id="checkbox-3" class="checkbox-custom" name="checkbox-3" type="checkbox" @click="show_end()">
              <label for="checkbox-3" class="checkbox-custom-label">Ajouter une date de fin</label>
            </div>

            <div v-if="show_end_var" style="margin-top: 20px; margin-bottom: 30px" class="fields">
              <label class="label">Date de fin</label>
              <datetime v-model="end_date" style="background-color: #fff" type="datetime" :disabled="submitStatus === 'PENDING'" />
            </div>

            <button class="_button" style="margin-top: 0" type="submit" :disabled="submitStatus === 'PENDING' || $v.$invalid">
              <span v-if="submitStatus === 'PENDING'">Modification...</span>
              <span v-else>Modifier</span>
            </button>
          </form>
        </div>
        <div class="column is-4">
          <div class="card" style="padding: 20px; width: 90%; margin: auto">
            <h2>Les événements</h2>
            <p>Les événements ne sont visibles que par vous et les membres de votre groupe.</p>
            <p>Une fois modifié, l'événement sera consultable sur le dashboard et dans la rubrique "événements".</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
// import Swal from 'sweetalert2'
import { Datetime } from 'vue-datetime'
import Sidebar from '../../../../components/dashboard/Sidebar'

export default {
  name: 'EditEvent',
  components: { Sidebar, datetime: Datetime },
  head() {
    return {
      title: 'Editer un événement'
    }
  },
  data() {
    return {
      group: '',
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      place: '',
      show_end_var: false,
      submitStatus: ''
    }
  },
  mounted() {

  },
  methods: {
    submit() {
      const formData = new FormData()
      formData.set('name', this.name)
      formData.set('description', this.description)
      formData.set('event_start', this.start_date)
      if (this.end_date !== '') {
        formData.set('event_end', this.end_date)
      }
      formData.set('place', this.place)

      const object = {}
      formData.forEach((value, key) => {
        object[key] = value
      })

      console.log(object)

      const self = this
      this.submitStatus = 'PENDING'

      this.$axios.post('/group_events', object)
        .then(function (response) {
          self.submitStatus = ''
          if (response.status === 201) {
            self.$toast.success('événement ajouté avec succès')
            self.$router.push('/dashboard')
          }
        })
    },
    show_end() {
      this.show_end_var = !this.show_end_var
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(20)
    },
    place: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30)
    },
    description: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(300)
    },
    start_date: {
      required
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

  p {
    font-family: "Raleway", sans-serif;
    margin-top: 10px;
  }

  h2 {
    font-family: "Montserrat", sans-serif;
    font-size: 23px;
    font-weight: 300;
    text-transform: uppercase;
  }

</style>
