<template>
  <section class="main-content columns is-fullheight main-activities">
    <modal
      name="editActivity"
      width="60%"
      height="auto"
      transition="nice-modal-fade"
      class="editActivity"
      :scrollable="true"
      :adaptive="true"
    >
      <form class="form" @submit.prevent="submit(activityData['@id'].split('/')[3])">
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

        <button class="_button" style="margin-top: 0" type="submit" :disabled="submitStatus === 'DISABLED' || submitStatus === 'PENDING' || $v.$invalid">
          <span v-if="submitStatus === 'PENDING'">Enregistrement...</span>
          <span v-else>Modifier</span>
        </button>
      </form>
    </modal>
    <Sidebar />
    <div id="activities" class="container column is-10">
      <h1>Activités</h1>
      <section v-for="activity in activities" :key="activity['@id'].split('/')[3]">
        <div class="a_icon">
          <i :class="'fa fa-' + activity.icon.path" />
        </div>
        <div class="a_content">
          <span class="name">{{ activity.name }}</span>
          <span class="description">{{ activity.description }}</span>
          <span v-if="canEdit" @click="editActivity(activity)">
            Modifier
          </span>
          <span v-if="canEdit" @click="deleteActivity(activity)">
            Supprimer
          </span>
        </div>
      </section>
      <nuxt-link to="/group/activities/add">
        + Ajouter une activité
      </nuxt-link>
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
  name: 'IndexActivities',
  components: { Sidebar },
  head() {
    return {
      title: 'Liste des activités'
    }
  },
  data: function () {
    return {
      activities: [],
      canEdit: false,
      activityData: {},
      icons: [],
      name: '',
      description: '',
      submitStatus: '',
      check_id: ''
    }
  },
  mounted() {
    jQuery('#activities').LoadingOverlay('show', { 'background': 'transparent' })
    const self = this
    const userInfos = this.$cookies.get('user_infos')

    this.$axios.get('/groups/' + userInfos.user_group + '/group_goals')
      .then(function (response) {
        if (response.status === 200) {
          self.activities = response.data['hydra:member']
          if (self.$cookies.get('user_infos').owned_group) {
            self.canEdit = true
          }
          jQuery('#activities').LoadingOverlay('hide')
        }
      })
      .catch(function (error) {
        console.log(error)
      })

    this.$axios.get('/icons')
      .then(function (response) {
        if (response.status === 200) {
          self.icons = response.data['hydra:member']
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    editActivity(activityData) {
      this.$modal.show('editActivity')
      this.activityData = activityData
      this.name = activityData.name
      this.description = activityData.description
      this.check_id = activityData.icon['@id']
    },
    deleteActivity(activityData) {
      jQuery('#activities').LoadingOverlay('show', { 'background': 'transparent' })
      const self = this
      this.$axios.delete('/group_goals/' + activityData['@id'].split('/')[3])
        .then(function (response) {
          if (response.status === 204) {
            self.$toast.success('Activité supprimée avec succès')
            jQuery('#activities').LoadingOverlay('hide')
            self.$router.go(0)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    submit(activityId) {
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

        console.log(activityId)

        this.$axios.put('/group_goals/' + activityId, object)
          .then(function (response) {
            if (response.status === 200) {
              self.$toast.success('Activité modifiée avec succès')
              self.$router.go(0)
              self.$modal.hide('editActivity')
            }
          })
          .catch(function (error) {
            // todo : Handle
            console.log(error)
          })
      }
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

  .main-activities {

    .editActivity {
      form {
        padding: 30px;

        button {
          margin-bottom: 30px;
        }
      }
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
          font-size: 30px;
        }
      }
    }
  }

  #activities {

    section {
      background-color: $blue2;
      padding: 10px;
      margin-bottom: 15px;
      border-radius: 3px;
      display: inline-flex;
      width: 100%;

      .a_icon {
        display: inline-block;

        svg {
          font-size: 45px;
          margin-left: 10px;
          margin-top: 8px;
          vertical-align: inherit;
        }
      }

      .a_content {
        display: inline-block;
        margin-left: 15px;

        .name {
          font-family: "Montserrat", sans-serif;
          font-size: 25px;
          color: #000;
        }

        .description {
          font-family: "Raleway", sans-serif;
          display: block;
        }
      }
    }
  }
</style>
