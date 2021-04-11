$(document).ready(() => {

    const createCategory = data => {
        const category = Object.keys(data);
        list = ''
        category.forEach(item => {
            let entry = '<div class="item-container">\n'
            entry += '<img alt="IMG" class="item-image">\n'
            entry += `<div class="item-button" id=${item}>\n`
            entry += `<div id=${item} >${data[item].name}</div>\n`;
            entry += `<div id=${item}>${data[item].price}TX</div>\n</div>\n`; //REPLACE WITH CALCULATED PRICE 1.15
            //DISPLAY AMOUNT OWNED
            entry += `<div class="item-desc">${data[item].effect.description}</div>\n</div>`;
            list += entry;
        });
        return list
    }

    const updateHelper = helper => {
        //EDIT HELPER NUMBER and PRICE
    }

    const updateUpgrade = upgrade => {
        //REMOVE UPGRADE FROM STORE
    }

    const deductBalance = total => {
        //DEDUCT
        console.log(total)
    }

    const processRequest = item => {
        let total = 0
        if (helper.hasOwnProperty(item)) {
            total = Number(helper[item].price.replace(/,/g, '')) //REPLACE WITH CALCULATED PRICE
            console.log("isHelper")
            updateHelper(item)
        }
        else {
            total = Number(upgrade[item].price.replace(/,/g, ''))
            console.log("isUpgrade")
            updateUpgrade(item)
        }
        deductBalance(total)
    }

    document.getElementById("helperList").innerHTML = createCategory(helper);
    document.getElementById("upgradeList").innerHTML = createCategory(upgrade);

    $(".item-button").on('click', e => {
        itemID = e.target.id
        processRequest(itemID)
    });
});