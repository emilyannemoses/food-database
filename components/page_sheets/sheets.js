class Sheets extends SPA {
    html(){
      console.log("In Sheets: ", GoogleAuth)
      return /*html*/`
      <div id="sheets">
        <div id="addItem" class="newItem"></div>
        <div id="cardContainer" class="cardContainer"></div>
        <div>${this._component('Navbar')}</div>
      </div>
      `
    }
}