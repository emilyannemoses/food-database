var _gas = new GAS('https://script.google.com/macros/s/AKfycbyQcPNaZG-xO8gZapSNUDvrvCGnTSHhKcks_ZBJWrE70MJIEwY/exec');
function loadSheet() {
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
            <input type="text" placeholder="Category" id="categoryInput" />
            <input type="text" placeholder="Item" id="foodInput" />
            <input type="number" min="1" placeholder="Amount" id="amountInput" />
            <input type="submit" value="Submit" onClick="newItem()" id="submitButton">
            <input type="reset" value="Reset" onClick="resetPage()" id="resetButton">
        `
        for (let key in categories) {
            cardContainer.innerHTML += `
                <div class="card" id="card${key}">
                    <span class="heading">
                        ${key} 
                        <span onClick="addOne('${key}')" class="plusClass hover">+</span>
                    </span>
                    <hr>
                </div>
            `
            categories[key].forEach(function(food){
                const rowId = JSON.parse(food._Id)._Id
                const card = document.getElementById('card'+key);
                card.innerHTML += `
                    <div id="removeThis${rowId}">
                        <span id="decrement" onClick="increment('decrease', '${rowId}')" class="decreaseClass hover">&#8595;&nbsp;&nbsp;</span><span id="amt${rowId}">${food.Amount}</span><span id="increment" onClick="increment('increase', '${rowId}')" class="increaseClass hover">&nbsp;&nbsp;&#8593;&nbsp;&nbsp;</span>
                        <span>${food.Name}</span>
                        <span onClick="deleteRow('${rowId}')" class="deleteClass hover">
                            remove
                        </span>
                    </div>
                `
            })
        }
    })

    const increment = (f, id) => {
        let amt = document.getElementById('amt'+id);
        let value = parseInt(amt.innerHTML);
        value = (f == 'decrease') ? value - 1 : value + 1;
        amt.innerHTML = value;
        if (value < 1) {
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
        let catVal = cat.value.toLowerCase();
        let nameVal = name.value.toLowerCase();
        let amtVal = amt.value;
        let removeZero;
        if (amtVal == 0) {
            removeZero = amtVal.replace(amtVal, 1);
        }
        let catUpper = catVal.replace(catVal[0], catVal[0].toUpperCase());
        let nameUpper = nameVal.replace(nameVal[0], nameVal[0].toUpperCase());
        _gas.crud( "CREATE" , "row", {
            sheetName: 'Sheet1',
            content: {
                Category: catUpper,
                Name: nameUpper,
                Amount: removeZero || amtVal,
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

    const addOne = (key) => {
        addItem.style.paddingTop = '100px';
        addItem.style.paddingBottom = '100px';
        categoryInput.setAttribute('disabled', true);
        categoryInput.value = `${key}`;
        foodInput.focus();
    }

    const resetPage = () => {
        window.history.go();
    }
}