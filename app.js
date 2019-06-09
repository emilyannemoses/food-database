const _google_script_id = "1-4NkQiEKhl-GrBD_3HVKYLt0NSZO_8gq6FVQzPZmpa0"
var _sheets = {}
window.onload = ()=>{
  const _url = "https://spreadsheets.google.com/feeds"
  const _url_end = "/public/values?alt=json"
  _GET(_url+"/worksheets/"+_google_script_id+_url_end)
    .then(payload => _get_all_sheets(JSON.parse(payload.responseText).feed.entry))
}
_get_all_sheets = (data)=>{
  clean = (data, name)=>{
    let flatData = []
    for (field in data[0]) {
      const key = field.split('gsx$')[1]
      if (key) {
        for (let i = 0; i < data.length; i++) {
          if (!flatData[i]) flatData[i] = {}
          flatData[i][key] = data[i][field]['$t']
        }
      }
    }
    _sheets[name] = flatData
  }
  let sheets = []
  for (const sheet of data) {
    _sheets[sheet.content.$t]
    sheets.push(new Promise(function(resolve, reject) {
      _GET(sheet.link[0].href+"?alt=json")
        .then(payload => clean(JSON.parse(payload.responseText).feed.entry, sheet.content.$t))
        .then(resolve)
    }))
  }
  Promise.all(sheets)
    .then(x => {
        const categories = {}
        _sheets.Sheet1.forEach(function(obj) {
            if(!categories[obj.category]) {
                categories[obj.category] = [];
            }
            categories[obj.category].push(obj)
        })
        for (let key in categories) {
            cardContainer.innerHTML += `
                <div class="card" id="card${key}">
                    <h4>${key}</h4>
                    <hr>
                </div>
            `
            categories[key].forEach(function(food){
                const card = document.getElementById('card'+key);
                card.innerHTML += `
                <input type="checkbox" style="float:left"/> <div>${food.name} | ${food.amount}</div>
                `
            })
        }
    })

}
_GET = (url)=>{
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) res(xhr)
        else rej(xhr)
      }
    }
    xhr.send(null)
  })
}
