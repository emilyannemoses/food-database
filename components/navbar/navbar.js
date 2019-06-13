class Navbar extends SPA {
  html() {
    return /*html*/`
      <div class="navbar">
        <div id="auth-status" class="authStat"></div>
        <div id="sign-in-or-out-button" class="xyz"></div>
        <div id="revoke-access-button" class="xyz" spaPage="SignIn"></div>
        <div class="signOut xyz">About</div>
        <div class="signOut xyz">Privacy</div>
        <a href="http://emilyannemoses.com" class="signOut xyz">&copy; 2019 Emily Anne Moses</a>
      </div>
    `
  }
}