class Navbar extends SPA {
  
  html() {
    return /*html*/`
      <div class="navbar">
        <div id="auth-status" class="authStat"></div>
        <a id="sign-in-or-out-button" spaPage="#Home"></a> |
        <a id="revoke-access-button" spaPage="#SignIn"></a> |
        <a class="signOut">About</a> | 
        <a class="signOut">Privacy</a> |
        <a href="http://emilyannemoses.com" class="signOut">&copy; 2019 Emily Anne Moses</a>
      </div>
    `
  }
}