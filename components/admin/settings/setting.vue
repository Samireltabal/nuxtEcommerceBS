<template>
  <v-row>
    <v-col>
      <v-form>
        <v-text-field
          v-model="value"
          :label="setting.name"
          :hint="setting.type"
          required
          append-outer-icon="mdi-send"
          @click:append-outer="updateSet"
        />
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Setting',
  props: {
    setting: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      value: this.setting.val
    }
  },
  methods: {
    updateSet () {
      const data = {
        name: this.setting.name,
        val: this.value
      }
      this.$axios.post('/settings/create', data).then((res) => {
        this.$emit('success', 'successfully updated settings')
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
