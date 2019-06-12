class SPA {

    constructor() {
      this._body = document.getElementById('root')
      this._render = []
      this._data = {}
    }
  
    _start({landingPage, components}) {
      this._landingPage = landingPage
      this._currentPage = landingPage
  
      for (const key in components) {
        this[key] = components[key]
        this[key]._component = this._component.bind(this) // We need to add the _componet method and bind 'this' to it because we're accessting the spa scope to then call the function being nested
        this[key]._update = this._update.bind(this)
        this[key]._data = this._data
      }
  
      window.addEventListener("hashchange", ()=>{
        let hash = window.location.hash.split("#")[1] || this._landingPage
        if (hash === this._landingPage) { history.replaceState(null, null, " ")
        } else { window.location.hash = '#'+hash }
        this._currentPage = hash
        this._go(hash)
      })
  
      this._go(window.location.hash.split("#")[1])
    }
  
    _go(page) {
      this._currentPage = page || this._currentPage
      this._body.innerHTML = this._component(this._currentPage)
      this._render_components()
    }
  
    _component(comp) {
      this._render.unshift(comp)
      const content = this[comp].html.apply(this[comp])
      return `<comp-${comp}>${content}</comp-${comp}>`
    }
  
    _update(data) {
      for (const key in data) {
        this._data[key] = data[key]
      }
      this._go()
    }
  
    _render_components() {
      while (this._render.length > 0) {
        const comp = this._render.shift()
        const elm = document.getElementsByTagName("comp-"+comp)[0]
        this._spaEvent(comp, elm)
  
      }
      this._spaPage('spaPage')
    }
  
    _spaPage(attr) {
      document.querySelectorAll('['+attr+']').forEach((elm)=>{
        const str = elm.getAttribute(attr).split(/\(|\)|'|"| |,/).filter(i=>i)
        elm.addEventListener('click', ()=> window.location.hash = str )
      })
    }
  
    _spaEvent(comp, elms) {
      elms.querySelectorAll('[spa]').forEach((elm)=>{
        let [ htmlEvent, str ] = elm.getAttribute("spa").split("=")
        str = str.split(/\(|\)|'|"| |,/).filter(i=>i)
        const func = str.shift()
        elm.addEventListener(htmlEvent, ()=>{
          this[comp][func].apply(this[comp], this._args(str))
        })
        elm.removeAttribute("spa")
      })
    }
  
    _args(str){
      return str.map(arg=>{
        if (arg === "false") arg = false
        else if(arg === "true") arg = true
        return parseInt(arg) || arg.toString()
      })
    }
  }