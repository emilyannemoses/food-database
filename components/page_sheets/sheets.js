class Sheets extends SPA {
  resetPage = () => {
    window.history.go();
  }
    html(){
      loadSheet()
      return /*html*/`
      <div id="sheets">
        <div id="addItem" class="newItem"></div>
        <div id="cardContainer" class="cardContainer"></div>
        <div>${this._component('Navbar')}</div>
      </div>
      `
    }
}