$(document).ready(() => {

    const createCategory = data => {
        const category = Object.keys(data);
        list = ''
        category.forEach(item => {
            let entry = '<div class="item-container">\n'
            entry += '<img alt="IMG" class="item-image">\n'
            entry += `<div class="item-button" id=${item}>\n`
            entry += `<div id=${item}>${data[item].name}</div>\n`;
            entry += `<div id=${item}>${data[item].price}T</div>\n</div>\n`; //REPLACE WITH CALCULATED PRICE
            //DISPLAY AMOUNT OWNED
            entry += `<div class="item-desc">${data[item].effect.description}</div>\n</div>`;
            list += entry;
        });
        return list
    }

    const updateHelper = helper => {

    }

    const deductBalance = amount => {

    }

    document.getElementById("helperList").innerHTML = createCategory(helper);
    document.getElementById("upgradeList").innerHTML = createCategory(upgrade);

    $(".item-button").on('click', e => {
        console.log(e.target.id)
        deductBalance()
    });
});