<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link :to="{ path: '/' }" class="navbar-item">
        <img src="/images/logo.png" alt="Logo">
      </nuxt-link>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div id="navBar" class="navbar-menu">
      <div class="navbar-start">
        <nuxt-link class="navbar-item" :to="{ path: '/' }">
          Acceuil
        </nuxt-link>
        <a class="navbar-item">
          Forum
        </a>
        <a class="navbar-item">
          Badges
        </a>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              About
            </a>
            <a class="navbar-item">
              Jobs
            </a>
            <a class="navbar-item">
              Contact
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              Report an issue
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            Mon compte
          </a>

          <div class="navbar-dropdown is-right">
            <nuxt-link v-if="$store.state.auth" :to="'/profile/' + $store.state.auth.user_id" class="navbar-item">
              Mon profil
            </nuxt-link>
            <a class="navbar-item">
              Paramètres
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              Déconnexion
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
