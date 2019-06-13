class SignIn extends SPA {
    html(){
      if(!isAuthorized){
        return /*html*/`
          <div id="signIn">
            <h1>WELCOME.<br> U NEED <a href="https://accounts.google.com/SignUp" class="googLink">GOOGLE</a> TO USE THIS APP</h1>
            <div id="sign-in-or-out-button" class="signIn">Sign in</div>
            <br>
            <div class="styleText">
              <div id="revoke-access-button" style="display:none;"></div>
              <div id="auth-status"></div>
            </div>
          </div>
        `
      } else if(window.location.pathname == '') {
        window.location.href = 'http://localhost:5000/#U'
      }
    }
}