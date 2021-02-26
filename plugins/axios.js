export default function ({ $axios, redirect, app }, inject) {
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'application/json, */*'
      }
    }
  })

  // Set baseURL to something different
  api.setBaseURL(process.env.BASE_URL)

  // Inject to context as $api
  api.onRequest((config) => {
    api.setHeader('x-localization', app.i18n.locale)
    console.log('Making request to ' + config.url)
  })

  api.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })

  inject('api', api)
}
