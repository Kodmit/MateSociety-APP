<template>
  <div class="language-switcher">
    <div class="languages-label">
      {{ $t('lang') }}:
    </div>
    <div class="languages">
      <div
        v-for="el in locales"
        :key="el.code"
        class="language"
        :class="{ active: el.code === locale }"
        @click="switchLanguage(el.code)"
      >
        <span>{{ el.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    locales() {
      return this.$store.state.locales
    },
    locale() {
      return this.$store.state.locale
    }
  },
  methods: {
    switchLanguage(localeCode) {
      document.cookie = `locale=${localeCode}`
      location.reload()
    }
  }
}
</script>

<style>
.language-switcher {
  display: flex;
  z-index: 99999;
  font-family: 'Raleway', sans-serif;
  position: relative;
  margin-bottom: -25px;
  margin-top: 5px;
  margin-left: 5px;
}
.languages {
  display: flex;
  justify-content: flex-end;
}

.language {
  padding-left: 0.25rem;
  cursor: pointer;
}
.language.active {
  text-decoration: underline;
}

.language:hover span {
  text-decoration: underline;
}

.language:not(:last-child):after {
  content: '|';
  padding-left: 0.25rem;
}
</style>
