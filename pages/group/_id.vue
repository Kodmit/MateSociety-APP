<template>
  <section id="view-group">
    <div class="header">
      <div class="profile_pic">
        <img :src="'https://images.unsplash.com/photo-1478812954026-9c750f0e89fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'">
      </div>
      <div class="menu-bar">
        <span class="item left" @click="$router.back()"><i class="arrow arrow-left" /> <span>Retour</span></span>
        <span class="item right _button"><i class="cross" /> Rejoindre !</span>
      </div>
    </div>
    <span class="group_name">{{ group.name }}</span>
    <section class="info">
      <span><i class="fas fa-users" /> {{ g_members }} membres</span>
      <span><i class="fas fa-map-marker-alt" /> {{ group.city }}, {{ g_dept }}, {{ g_country }}</span>
    </section>
    <section class="description">
      {{ group.description }}
    </section>
    <section class="activities">
      <div v-for="activity in group.groupGoals" :key="activity['@id'].split('/')[3]" class="activity">
        <i :class="'fa fa-' + activity.icon.path" />
        <span>{{ activity.name }}</span>
      </div>
    </section>
    <Footer />
  </section>
</template>
<script>
import Footer from '../../components/Footer'

export default {
  name: 'ViewGroup',
  components: { Footer },
  head() {
    return {
      title: this.group.name
    }
  },
  data: function () {
    return {
      group: '',
      g_members: '',
      g_dept: '',
      g_country: ''
    }
  },
  mounted() {
    const id = this.$route.params.id
    const self = this
    this.$axios.get('/groups/' + id)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data)
          self.group = response.data
          self.g_members = response.data.users.length
          self.g_dept = response.data.department.name
          self.g_country = response.data.country.name
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 404) {
            self.$router.push('/group/not_found')
          }
        }
      })
  }
}
</script>

<style scoped lang="scss">
#view-group {
  background-color: #fff;
  height: 100%;
  position: absolute;
  width: 100%;
  $crossSize : 40px;
  $barsWidth : 2px;
  $crossColor : white;
  $dark: #222F47;
  $blue1: #0079C2;
  $blue2: #7CE7FF;
  $grey: #EFF0F9;
  $white: #FFFFFF;

  .activities {
    width: 90%;
    margin: 80px auto 0;
    text-align: center;

    .activity {
      width: 12%;
      display: inline-block;

      svg {
        font-size: 35px;
        color: #000;
        transition: all 0.3s ease-in 0s;

        &:hover{
          transform: scale(1.2);
        }
      }

      span {
        display: block;
        font-family: 'Montserrat', sans-serif;
        font-weight: 200;
        font-size: 20px;
        margin-top: 10px;
      }
    }
  }

  .group_name {
    font-family: 'Montserrat', sans-serif;
    color: #000;
    font-weight: 200;
    font-size: 55px;
    display: block;
    margin: 110px auto 0;
    width: fit-content;
  }

  .description {
    font-family: 'Raleway', sans-serif;
    display: block;
    width: 70%;
    margin: 30px auto 0;
    text-align: center;
  }

  .info {
    color: grey;
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
    span {
      display: inline-block;
      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }

  ._button {
    background-color: #0079c2e0;
    cursor: pointer;
    &:hover{
      background-color: $blue1;
    }
  }

  .header {

    @mixin center ($position:absolute){
      position: $position;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);
    }

    background-image: url("/images/group_header.jpg");
    height: 325px;
    width: 100%;
    position: relative;

    .profile_pic {
      padding-top: 5px;
      img {
        border-radius:100%;
        height: 400px;
        display: block;
        margin: 30px auto 0px auto;
        overflow:hidden;
        width: 400px;
        position: relative;
        border: 6px solid #fff;
        object-fit: cover;
        z-index: 10;
      }
    }

    .menu-bar {
      width: 100%;
      position: absolute;
      bottom: 0;
      background-color: #0a0a0a91;

      .arrow {
        border: solid white;
        border-width: 0 1px 1px 0;
        display: inline-block;
        padding: 10px;
        margin-bottom: -3px;
        margin-right: 5px;
      }

      .arrow-left {
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
      }

      .cross {
        display: inline-block;
        width: 25px;
        height: 25px;
        position: relative;
        margin-bottom: 2px;
        margin-right: 10px;
        vertical-align: middle;
        -moz-transition: all 0.2s ease-out;
        -o-transition: all 0.2s ease-out;
        -webkit-transition: all 0.2s ease-out;
        transition: all 0.2s ease-out;
      }

      .cross:hover {
        cursor: pointer;
        -moz-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
      }

      .cross:before, .cross:after {
        content: "";
        display: block;
        background: white;
        -moz-border-radius: 1px;
        -webkit-border-radius: 1px;
        border-radius: 1px;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        /* absolute centering */
      }

      .cross:before {
        width: 2px;
        height: 100%;
      }

      .cross:after {
        height: 2px;
        width: 100%;
      }

      .item {
        text-transform: uppercase;
        font-family: 'Montserrat', sans-serif;
        color: #fff;
        display: block;
        font-weight: lighter;
        padding: 23px;
        font-size: 16px;

        span {
          padding-bottom: 10px;
        }
      }

      .left {
        float: left;
        cursor: pointer;
      }
      .right {
        float: right;
      }
    }
  }
}
</style>
