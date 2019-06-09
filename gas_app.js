var _gas = new GAS('https://script.google.com/macros/s/AKfycbyQcPNaZG-xO8gZapSNUDvrvCGnTSHhKcks_ZBJWrE70MJIEwY/exec')

window.onload = () => {

    _gas.crud( 'READ' , 'sheet', {
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
                    <div id="removeThis${rowId}"><div onClick="deleteRow('${rowId}')" style="float:left">✕ &nbsp;</div><div>${food.Name}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<span id="amt${rowId}">${food.Amount}</span><span id="increment" onClick="increment('increase', '${rowId}')" style="float:right">&nbsp;&#8593;</span><span style="float:right" id="decrement" onClick="increment('decrease', '${rowId}')">&nbsp;&#8595;</span></div></div>
                `
            })
        }
    })
}

const increment = (f, id) => {
    const amt = document.getElementById('amt'+id);
    let value = parseInt(amt.innerHTML);
    value = (f == 'decrease') ? value - 1 : value + 1;
    amt.innerHTML = value;
    if (value == 0) {
        deleteRow(id);
    } else {
        _gas.crud( 'UPDATE' , 'row', {
            sheetName: 'Sheet1',
            _Id: id,
            content: {
                Amount: value
            }
        }).then( payload => { payload });
    }
}

const deleteRow = (id) => {
    _gas.crud( 'DELETE' , 'row', {
        sheetName: 'Sheet1',
        _Id: id,
    }).then( payload => { payload })
    const remove = document.getElementById('removeThis'+id);
    remove.style.textDecoration = 'line-through';
}