class SignIn extends SPA {
  // redirectIt() { // This is just for local development only. The redirect URL is saved in the Google console for the live APP
  //   window.location.href = 'http://localhost:5000/#U'
  // }
    html(){
      return /*html*/`
        <div id="signIn">
          <h1>WELCOME.<br> U NEED <a href="https://accounts.google.com/SignUp" class="googLink">GOOGLE</a> TO USE THIS APP</h1>
          <div id="sign-in-or-out-button" class="signIn">Sign in</div>
          <div spa="click=redirectIt()">Click here to redirect</div>
          <div id="revoke-access-button" style="display:none;"></div>
          <div id="auth-status" style="display:none;"></div>
        </div>
      `
    }
}