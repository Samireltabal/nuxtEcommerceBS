<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>hello</h1>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'admin',
  middleware: 'adminstrator',
  data () {
    return {

    }
  }
}
</script>
