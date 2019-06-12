class Navbar extends SPA {
  
    html() {
      return /*html*/`
        <div class="navbar">
          <div id="authStatus" class="authStat"></div>
          <br>
          <a id="signInOut" class="signOut" spaPage="#SignIn">Sign in</a>
          <a class="signOut">About</a>
          <a class="signOut">Privacy</a>
          <a href="http://emilyannemoses.com" class="signOut">&copy;Emily Anne Moses</a>
        </div>
     `
    }
}