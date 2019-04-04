<template>
  <div class="concept">
    <div class="container">
      <div class="title">Le concept</div>
      <div class="text">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam posuere
          ultrices posuere. Morbi condimentum libero ipsum, quis luctus velit
          pharetra nec. Aenean et rhoncus mi. Proin varius pharetra varius.
          Etiam consequat lorem eget ex sollicitudin tristique. Integer at dolor
          vel mauris elementum mattis consequat sit amet sem. Praesent lacinia
          lacus erat, luctus consequat ex blandit quis. Aliquam laoreet gravida
          felis eget pretium. Proin felis ex, auctor ut turpis et, mattis
          bibendum justo.
        </p>
        <p>
          Quisque interdum, nunc ac lobortis varius, augue odio lobortis sem, in
          ultrices mi tellus tempus orci. Nunc varius diam quam. Duis molestie
          posuere euismod. Sed sodales lectus id tristique porttitor. Nunc
          vestibulum, lectus non rhoncus cursus, orci risus rhoncus enim, sit
          amet viverra dui libero id urna. Cras pellentesque egestas ligula,
          quis fringilla odio pharetra malesuada. Cras tempus finibus nulla nec
          gravida. Suspendisse potenti. Nullam rutrum ligula velit, quis
          malesuada est facilisis eget.
        </p>
      </div>
      <nuxt-link class="back_link" :to="{ path: '/' }">
        <i class="far fa-arrow-left"></i>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Concept',
  layout: 'NoNavbar',
  head() {
    return {
      title: 'Le concept'
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat|Oswald|Raleway|Roboto|Roboto+Condensed');
$dark: #1d1d1b;

.concept {
  background-color: $dark;
  position: absolute;
  bottom: 0px;
  top: 0px;
  right: 0px;
  left: 0px;
  color: #fff;

  .title {
    margin-top: 40px;
    font-family: 'Oswald', sans-serif;
    color: orange;
    text-transform: uppercase;
    font-weight: 200;
    text-align: center;
    letter-spacing: 5px;
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
