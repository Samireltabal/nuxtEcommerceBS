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
        <b-nav-item
          v-for="item in nav"
          :key="item.name"
          :to="localePath(item.link)"
          :class=" item.dropdown ? 'd-none' : ''"
        >
          {{ $t(item.name) }}
        </b-nav-item>
        <b-nav-item-dropdown
          v-for="item in nav"
          :key="item.name"
          :text="item.name"
          :class=" item.dropdown ? '' : 'd-none'"
        >
          <b-nav-item
            v-for="child in item.children"
            :key="child.name"
            :to="localePath(child.link)"
            :class=" child.dropdown ? 'd-none' : ''"
          >
            {{ $t(child.name) }}
          </b-nav-item>
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
  },
  data () {
    return {
      nav: [
        {
          name: 'home',
          link: '/',
          dropdown: false,
          children: []
        },
        {
          name: 'Products',
          link: '/products',
          dropdown: false,
          children: []
        },
        {
          name: 'Dropdown',
          link: '/products',
          dropdown: true,
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
  }
}
</script>
