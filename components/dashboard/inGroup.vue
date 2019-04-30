<template>
  <div>
    Dans un groupe
  </div>
</template>

<script>
export default {
  name: 'InGroup',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  mounted() {
    // console.log(user)
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/css/dashboard.css';
</style>
