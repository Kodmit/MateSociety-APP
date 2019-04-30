export default function ({ $axios, store, route, redirect }) {
  // Si l'utilisateur n'est pas authentifié
  // Ajout d'un meta pour check si dans groupe

  if (!store.state.auth) {
    return redirect('/login')
  }

  const inGroup = () => {
    $axios.get('/users/' + store.state.auth.user_id).then(function (response) {
      if (response.data.group_member) {
        return true
      }
      return false
    })
  }

  const blockGroup = route.meta.map((meta) => {
    if (meta.authenticated && typeof meta.authenticated.blockGroup !== 'undefined')
    {
      if (meta.authenticated.blockGroup === true && inGroup() === true)
      {
        return true
      }
    }
    return false
  })

  console.log(blockGroup)

  if (blockGroup === true) {
    return redirect('/dashboard')
  }
}
