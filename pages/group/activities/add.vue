<template>
  <section class="main-content columns is-fullheight">
    <Sidebar />
    <div id="add_activity" class="column is-10">
      <h1>Ajouter une activité</h1>
      <div class="columns">
        <div class="column is-8">
          <div class="_card">
            <form class="form" @submit.prevent="submit">
              <span class="title">Choisissez une icône</span>
              <section class="icons">
                <div v-for="icon in icons" :key="icon['@id'].split('/')[3]" :class="{ selected: icon['@id'] === check_id }" class="icon btn" @click="checked(icon.name, icon['@id'])">
                  <input
                    :id="icon['@id'].split('/')[3]"
                    name="icon"
                    class="check"
                    style="display: none"
                    type="radio"
                    :value="icon['@id']"
                    :checked="icon['@id'] === check_id"
                  >
                  <i :class="'fa fa-' + icon.path" />
                  <span>{{ icon.name }}</span>
                </div>
              </section>

              <div class="fields" :class="{ 'form-group--error': $v.name.$error }">
                <label class="label">Nom de l'activité</label>
                <input v-model.trim="$v.name.$model" :disabled="submitStatus === 'PENDING'">
                <span v-if="!$v.name.minLength || !$v.name.maxLength" class="msg-error">
                  <small>Le nom de l'activité doit faire entre {{ $v.name.$params.minLength.min }} et {{ $v.name.$params.maxLength.max }} caractères. (Actuellement : {{ name.length }})</small>
                </span>
              </div>

              <div class="fields" :class="{ 'form-group--error': $v.description.$error }">
                <label class="label">Description</label>
                <textarea v-model.trim="$v.description.$model" :disabled="submitStatus === 'PENDING'" />
                <small>Visible uniquement par les membres du groupe.</small>
                <span v-if="!$v.description.minLength || !$v.description.maxLength" class="msg-error">
                  <small>La description doit faire entre {{ $v.description.$params.minLength.min }} et {{ $v.description.$params.maxLength.max }} caractères. (Actuellement : {{ description.length }})</small>
                </span>
              </div>

              <button class="_button" style="margin-top: 0" type="submit" :disabled="submitStatus === 'DISABLED' ||submitStatus === 'PENDING' || $v.$invalid">
                <span v-if="submitStatus === 'PENDING'">Ajout...</span>
                <span v-else>Ajouter</span>
              </button>
            </form>
          </div>
        </div>
        <div class="column is-4">
          <section class="card">
            <span class="title"><i class="fal fa-info-circle" /> Qu'es qu'une activité ?</span>
            <p>
              Une activité est visible sur la page de profil de votre groupe et sert à définir ce que vous proposez
              aux membres du groupe.
            </p>
            <p>
              Vous pouvez y ajouter une description pour plus de précision, la description n'est visible que par les
              membres du groupe afin que vous puissiez y mettre des informations comme le lieu, l'heure, ect...
            </p>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import jQuery from 'jquery'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import Sidebar from '../../../components/dashboard/Sidebar'
if (process.browser) {
  window.jQuery = window.$ = jQuery
  require('gasparesganga-jquery-loading-overlay')
}
export default {
  name: 'AddActivity',
  components: { Sidebar },
  data: function () {
    return {
      name: '',
      description: '',
      submitStatus: '',
      check_id: '',
      icons: []
    }
  },
  mounted() {
    jQuery('.icons').LoadingOverlay('show', { 'background': '#EFF0F9' })
    const self = this
    this.$axios.get('/icons')
      .then(function (response) {
        if (response.status === 200) {
          self.icons = response.data['hydra:member']
          jQuery('.icons').LoadingOverlay('hide')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    submit() {
      this.submitStatus = 'PENDING'
      if (jQuery('input[name=icon]:checked').length === 0) {
        this.$toast.error('Vous devez selectionner une icône !')
      }
      else {
        const formData = new FormData()
        formData.set('name', this.name)
        formData.set('description', this.description)
        formData.set('icon', this.check_id)

        const self = this
        const object = {}
        formData.forEach((value, key) => {
          object[key] = value
        })

        this.$axios.post('/group_goals', object)
          .then(function (response) {
            if (response.status === 201) {
              self.$toast.success('Activité ajoutée avec succès')
              self.$router.push('/group/activities')
            }
          })
          .catch(function (error) {
            // todo : Handle
            console.log(error)
          })
      }
    },
    checked(name, id) {
      this.name = name
      this.check_id = id
    }
  },
  head() {
    return {
      title: 'Ajouter une activité'
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(20)
    },
    description: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(300)
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/assets/css/dashboard.css';
  $dark: #222F47;
  $blue1: #0079C2;
  $blue2: #7CE7FF;
  $grey: #EFF0F9;
  $white: #FFFFFF;

  #add_activity {
    .fields {
      margin-top: 30px;
    }

    .card {
      width: 95%;
      padding: 20px;

      .title {
        svg {
          font-size: 45px;
          vertical-align: middle;
          color: $blue1;
        }
        font-family: "Montserrat", sans-serif;
        color: $dark;
        font-weight: 400;
        font-size: 25px;
        display: block;
        margin-top: 0;
      }

      p{
        font-family: "Raleway", sans-serif;
        margin-top: 15px;
      }
    }

    .title {
      font-family: "Montserrat", sans-serif;
      color: #0079C2;
      font-weight: 400;
      padding-left: 5px;
      font-size: 18px;
      display: block;
      margin-top: 30px;
      margin-bottom: 15px;
    }

    .icons {
      background-color: #fff;
      text-align: center;
      border-radius: 3px;

      .selected {
        &:hover {
          background-color: $blue2 !important;
        }
        background-color: $blue1;
        transition: .2s;
        span, svg{
          color: #fff !important;
        }
      }

      .icon {
        display: inline-block;
        text-align: center;
        width: 120px;
        height: 100%;
        padding: 7px 0 2px 0;
        margin: 12px;
        cursor: pointer;

        &:hover {
          background-color: $grey;
        }

        span {
          color: $dark;
          font-family: 'Montserrat', sans-serif;
        }

        svg {
          display: block;
          color: $blue1;
          margin: auto auto 10px auto;
          font-size: 32px;
        }
      }
    }
  }
</style>
