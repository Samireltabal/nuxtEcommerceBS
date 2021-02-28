export default function ({ $axios, redirect, app }) {
  // const api = $axios.create({
  //   headers: {
  //     common: {
  //       Accept: 'application/json, */*'
  //     }
  //   }
  // })

  // Set baseURL to something different
  // api.setBaseURL(process.env.BASE_URL)

  // Inject to context as $api
  $axios.onRequest((config) => {
    $axios.setHeader('x-localization', app.i18n.locale)
    console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
