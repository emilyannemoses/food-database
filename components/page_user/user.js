class U extends SPA {
    html(){
      return /*html*/`
        <div id="user">
          <div class="sheetsDiv">
            This should be a list of all of the sheets a logged in user has made
            <br>
            <div spaPage="Sheets" class="userSheet">User sheets</div>
          </div>
        </div>
        <div>${this._component('Navbar')}</div>
      `
    }
}