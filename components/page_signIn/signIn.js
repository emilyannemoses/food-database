class SignIn extends SPA {
    html(){
      return /*html*/`
        <div id="signIn">
          <h1>WELCOME.<br> U NEED <a href="https://accounts.google.com/SignUp" class="googLink">GOOGLE</a> TO USE THIS APP</h1>
          <div id="sign-in-or-out-button" class="signIn" spaPage="Home">Sign in</div>
        </div>
      `
    }
}