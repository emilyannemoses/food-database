var _gas = new GAS('https://script.google.com/macros/s/AKfycbyQcPNaZG-xO8gZapSNUDvrvCGnTSHhKcks_ZBJWrE70MJIEwY/exec')

window.onload = () => {

    _gas.crud( "READ" , "sheet", {
    sheetName: 'Sheet1',
    }).then(payload => payload)
    .then(data => {
        const categories = {}
        data.Sheet1.forEach(function(obj) {
            if(!categories[obj.Category]) {
                categories[obj.Category] = [];
            }
            categories[obj.Category].push(obj)
        })
        for (let key in categories) {
            cardContainer.innerHTML += `
                <div class="card" id="card${key}">
                    <h4>${key}</h4>
                    <hr>
                </div>
            `
            categories[key].forEach(function(food){
                const rowId = JSON.parse(food._Id)._Id
                const card = document.getElementById('card'+key);
                card.innerHTML += `
                    <div id="removeThis${rowId}"><input type="checkbox" onClick="deleteRow('${rowId}')" style="float:left"/> <div>${food.Name} | ${food.Amount}</div></div>
                `
            })
        }
    })

}
const deleteRow = (id) => {
    _gas.crud( "DELETE" , "row", {
        sheetName: 'Sheet1',
        _Id: id,
    }).then( payload => { console.log(payload) })
    const remove = document.getElementById('removeThis'+id);
    remove.style.display = 'none';
}