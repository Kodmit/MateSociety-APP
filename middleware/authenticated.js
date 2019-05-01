export default function ({ store, redirect }) {
  // Si l'utilisateur n'est pas authentifié
  // Ajout d'un meta pour check si dans groupe

  if (!store.state.auth) {
    return redirect('/login')
  }
}
