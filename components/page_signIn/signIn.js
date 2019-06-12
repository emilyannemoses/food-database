class SignIn extends SPA {
    html(){
      return /*html*/`
        <div id="signIn">
          <h1>WELCOME.<br> U NEED <a href="https://accounts.google.com/SignUp" class="googLink">GOOGLE</a> TO USE THIS APP</h1>
          <div id="signInPage" class="signInBox">
            <button id="signIn" class="signInButton" spaPage="#Home">Sign in</button>
            <br>
            <div id="authStatus"></div>
          </div>
        </div>
      `
    }
}