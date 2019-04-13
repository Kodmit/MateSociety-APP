<template>
  <div class="_footer">
    <img src="images/logo_footer.png" />
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
$dark: #222f47;
$blue1: #0079c2;
$blue2: #7ce7ff;
$grey: #eff0f9;
$white: #ffffff;

._footer {
  position: absolute;
  bottom: 0;
  padding: 15px;
  width: 100%;

  img {
    width: 200px;
  }

  .social {
    float: right;

    a {
      margin-right: 15px;
      color: $dark;
    }

    a:hover {
      color: $blue1;
    }
  }
}
</style>
