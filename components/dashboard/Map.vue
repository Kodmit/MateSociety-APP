<template>
  <div>
    <div id="vmap" />
  </div>
</template>

<script>
import jQuery from 'jquery'
if (process.browser) {
  window.jQuery = window.$ = jQuery
  require('jqvmap')
  require('@/static/js/jquery.vmap.france.js')
  require('@/static/js/jquery.vmap.belgium.js')
  require('@/static/js/jquery.vmap.switzerland.js')
}
export default {
  name: 'Map',
  props: {
    map: {
      type: String,
      default: 'france_fr'
    }
  },
  mounted() {
    const self = this
    jQuery(document).ready(function () {
      jQuery('#vmap').vectorMap({
        map: self.map,
        backgroundColor: null,
        color: '#222F47',
        borderColor: '#FFF',
        borderOpacity: 1,
        borderWidth: 1,
        selectedColor: '#7CE7FF',
        hoverColor: '#0079C2',
        enableZoom: false,
        showTooltip: true,
        onRegionClick: function (element, code, region)
        {
          self.$root.$emit('map_click', [code.toUpperCase(), region])
        }
      })
    })
  }
}
</script>

<style scoped>
  #vmap {
    width: 100%;
    height: 700px;
  }
</style>
