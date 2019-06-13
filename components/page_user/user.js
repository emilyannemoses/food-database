class U extends SPA {
    html(){
      let userName = user.w3 || {};
      let firstName = userName.ofa || null;
      let lastName = userName.wea || null;
      return /*html*/`
        <div id="user">
          <div class="sheetsDiv">
            Welcome ${firstName}${lastName}
            <br>
            <div spaPage="Sheets" class="userSheet">User sheets</div>
          </div>
        </div>
        <div>${this._component('Navbar')}</div>
      `
    }
}