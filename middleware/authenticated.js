export default function (context) {
  // If the user is not authenticated
  console.log(context)
  if (!(context.$wallet.wallet && context.$wallet.wallet.auth)) {
    context.$wallet.loginModal = true
  }
}
