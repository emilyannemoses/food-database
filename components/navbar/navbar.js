class Navbar extends SPA {
  
    html() {
      return /*html*/`
        <div class="navbar">
          <div id="authStatus" class="authStat"></div>
          <br>
          <a id="signIn" class="signIn signOut" spaPage="#SignIn">Sign in</a>
          <a id="signOut" class="signOut" spaPage="#SignOut">Sign out</a>
          <a class="signOut">About</a>
          <a class="signOut">Privacy</a>
          <a href="http://emilyannemoses.com" class="signOut">&copy; 2019 Emily Anne Moses</a>
        </div>
     `
    }
}