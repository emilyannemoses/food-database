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
        addItem.innerHTML = `
            <input type="text" placeholder="Category" id="categoryInput"/><input type="text" placeholder="Food" id="foodInput"/><input type="text" placeholder="Amount" id="amountInput"/><br/><input type="submit" value="Submit" onClick="newItem()">
        `
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
    let amt = document.getElementById('amt'+id);
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
                Amount: "'"+value
            }
        }).then( payload => { payload });
    }
}

const newItem = () => {
    const cat = document.getElementById('categoryInput')
    const name = document.getElementById('foodInput')
    const amt = document.getElementById('amountInput')
    let catVal = cat.value;
    let nameVal = name.value;
    let amtVal = amt.value;
    let catUpper = catVal.replace(catVal[0], catVal[0].toUpperCase());
    let nameUpper = nameVal.replace(nameVal[0], nameVal[0].toUpperCase());
    _gas.crud( "CREATE" , "row", {
        sheetName: 'Sheet1',
        content: {
            Category: catUpper,
            Name: nameUpper,
            Amount: amtVal,
        }
    })
    .then( payload => { payload });
    setTimeout(function() {
        window.history.go();
    }, 2000)
}

const deleteRow = (id) => {
    _gas.crud( 'DELETE' , 'row', {
        sheetName: 'Sheet1',
        _Id: id,
    }).then( payload => { payload })
    const remove = document.getElementById('removeThis'+id);
    remove.style.textDecoration = 'line-through';
}