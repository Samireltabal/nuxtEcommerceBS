<template>
  <div>
    <b-navbar type="light" variant="light">
      <b-navbar-nav>
        <b-navbar-brand href="#">
          NavBar
        </b-navbar-brand>
        <b-nav-item-dropdown :text="$t('Language')" left>
          <b-dropdown-item
            v-for="locale in langs"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
          >
            {{ locale.name }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <navItem v-for="item in nav" :key="item.name" :item="item" />
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<script>
import NavItem from '../Navigation/navItem'
export default {
  name: 'BroswerNav',
  components: {
    NavItem
  },
  props: {
    langs: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      nav: [
        {
          name: 'home',
          link: '/',
          type: 'link',
          shown: 'all',
          children: []
        },
        {
          name: 'Products',
          link: '/products',
          type: 'link',
          shown: 'all',
          children: []
        },
        {
          name: 'Login',
          link: '/login',
          type: 'link',
          shown: 'guest',
          children: []
        },
        {
          name: 'Profile',
          link: '/profile',
          type: 'link',
          shown: 'loggedin',
          children: []
        },
        {
          name: 'Logout',
          link: '/logout',
          type: 'link',
          shown: 'loggedin',
          children: []
        },
        {
          name: 'Dropdown',
          link: '/products',
          type: 'dropdown',
          shown: 'all',
          children: [
            {
              name: 'Products1',
              link: '/products',
              dropdown: false,
              children: []
            },
            {
              name: 'Products2',
              link: '/products',
              dropdown: false,
              children: []
            }
          ]
        }
      ]
    }
  },
  computed: {
    loggedin () {
      return this.$auth.loggedIn
    }
  },
  methods: {
    handleApperance (state) {
      if (state.type === 'link') {
        return 'd-none'
      } else {
        return ''
      }
    }
  }
}
</script>
