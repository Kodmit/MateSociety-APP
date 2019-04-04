<template>
  <div class="language-switcher">
    <div class="languages-label">{{ $t('lang') }}:</div>
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
  padding: 1rem;
  z-index: 99999;
  position: absolute;
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
