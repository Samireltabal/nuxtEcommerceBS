<template>
  <form @submit.prevent="loginUser()">
    <h3>Sign In</h3>

    <div class="form-group">
      <label>Email address</label>
      <input v-model="email" type="email" class="form-control form-control-lg">
    </div>

    <div class="form-group">
      <label>Password</label>
      <input v-model="password" type="password" class="form-control form-control-lg">
    </div>
    <div class="d-grid gap-2">
      <button type="submit" class="btn btn-primary my-2">
        {{ $t('logintitle') }}
      </button>
    </div>
    <p class="forgot-password text-right mt-2 mb-4">
      <router-link to="/forgot-password">
        Forgot password ?
      </router-link>
      <router-link to="/">
        {{ $t('home') }}
      </router-link>
    </p>

    <div class="social-icons">
      <ul>
        <li><a href="#"><i class="fa fa-google" /></a></li>
        <li><a href="#"><i class="fa fa-facebook" /></a></li>
        <li><a href="#"><i class="fa fa-twitter" /></a></li>
      </ul>
    </div>
  </form>
</template>
<script>
export default {
  layout: 'sign',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginUser () {
      this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password
        }
      }).then((response) => {
        // this.$notify({
        //   group: 'main',
        //   type: 'success',
        //   title: '<i class="fa fa-check"></i>  <b>' + this.$t('success.login') + '</b>',
        //   duration: 10000
        // })
        this.$auth.setUser(response.data.user)
        this.$api.setToken(response.data.access_token, 'Bearer')
      }).catch(() => {
        // this.$notify({
        //   group: 'main',
        //   type: 'error',
        //   title: '<i class="fa fa-check"></i>  <b>' + this.$t('failed.login') + '</b>',
        //   duration: 10000
        // })
      }).finally(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>
