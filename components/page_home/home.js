class Home extends SPA {
    html(){
      return /*html*/`
        <div id="home">
            Poop
            <div class="newItem" id="addItem"></div>
            <div class="cardContainer" id="cardContainer"></div>
            <div>${this._component('Navbar')}</div>
        </div>
      `
    }
}