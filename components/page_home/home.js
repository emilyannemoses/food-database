class Home extends SPA {
    html(){
      return /*html*/`
        <div id="home">
          <div class="sheetsDiv">
            This should be a list of all of the sheets a logged in user has made
            <br>
            <div spaPage="Sheets" class="mySheet">My sheet</div>
          </div>
        </div>
        <div>${this._component('Navbar')}</div>
      `
    }
}