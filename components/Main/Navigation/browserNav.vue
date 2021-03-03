<template>
  <div>
    <b-navbar type="light" variant="light">
      <b-navbar-nav>
        <b-navbar-brand href="#">
          NavBar
        </b-navbar-brand>
        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="Lang" left>
          <b-dropdown-item
            v-for="locale in langs"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
          >
            {{ locale.name }}
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="User" left>
          <b-dropdown-item href="#">
            Account
          </b-dropdown-item>
          <b-dropdown-item href="#">
            Settings
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: 'BroswerNav',
  props: {
    langs: {
      type: Array,
      required: true
    }
  }
}
</script>
