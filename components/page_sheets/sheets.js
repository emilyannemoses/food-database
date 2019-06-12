class Sheets extends SPA {
    html(){
      return /*html*/`
        <div>
            <div class="newItem" id="addItem"></div>
            <div class="cardContainer" id="cardContainer"></div>
            <div>${this._component('Navbar')}</div>
        </div>
      `
    }
}