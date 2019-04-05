<template>
  <div class="_footer">
    <div class="title">Mate Society</div>
    <div class="social">
      <a target="_blank" href=""><i class="fab fa-facebook-f"></i></a>
      <a target="_blank" href=""><i class="fab fa-twitter"></i></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Lalezar');

._footer {
  position: absolute;
  bottom: 0;
  padding: 15px;
  width: 100%;

  .title {
    font-size: 30px;
    color: #989898;
    margin-top: 20px;
    display: inline;
    font-family: 'Lalezar', cursive;
  }

  .social {
    float: right;

    a {
      margin-right: 15px;
    }
  }
}
</style>
