$(document).ready(() => {

    const buildHelpers = () => {
        const category = Object.keys(helper);
        list = ''
        category.forEach(item => {
            let entry = '<div class="item-container">\n'
            entry += '<img alt="IMG" class="item-image">\n'
            entry += '<div class="item-button"'
            if (getTickets() < helper[item].price * (1.15**(getNumHelpers(item)))) entry += 'style="color:#888800"'
            entry += `id=${item}>\n`
            entry += `<div id=${item}>${helper[item].name}</div>\n`;
            entry += `<div id=${item}>${Math.round(helper[item].price * (1.15**(getNumHelpers(item)))).toLocaleString()}TX ${getNumHelpers(item)}</div>\n</div>\n`;
            entry += `<div class="item-desc">${helper[item].effect.description}</div>\n</div>`;
            list += entry;
        });
        return list
    }

    const updateValues = () => {
        document.getElementById("mainScreenScoreInt").innerHTML = getState().score.toFixed(0)
        document.getElementById("mainScreenBalanceInt").innerHTML = getState().balance.toFixed(0)
    }

    const buildUpgrades = () => {
        const category = Object.keys(upgrade);
        list = ''
        category.forEach(item => {
            let entry = '<div class="item-container">\n'
            entry += '<img alt="IMG" class="item-image">\n'
            entry += '<div class="item-button"'
            if (ownsUpgrade(item)) entry += 'style="color:#FF0000"'
            else if (getNumHelpers(upgrade[item].for) < 10) entry += 'style="color:#333333"'
            else if (getTickets() < upgrade[item].price) entry += 'style="color:#888800"'
            entry += `id=${item}>\n`
            if (ownsUpgrade(item)) {
                entry += `<div id=${item}>SOLD OUT</div>\n`;
                entry += `<div id=${item}>FOREVER</div>\n</div>\n`;
            }
            else{
                entry += `<div id=${item}>${upgrade[item].name}</div>\n`;
                if (getNumHelpers(upgrade[item].for) < 10) entry += `<div id=${item}>LOCKED</div>\n</div>\n`;
                else entry += `<div id=${item}>${upgrade[item].price.toLocaleString()}TX</div>\n</div>\n`;
            }
            if (getNumHelpers(upgrade[item].for) < 10) entry += `<div class="item-desc">Own at least 10 ${helper[upgrade[item].for].name}s to unlock this upgrade</div>\n</div>`;
            else if (ownsUpgrade(item)) entry += `<div class="item-desc">We'll restock when we feel like it.</div>\n</div>`;
            else entry += `<div class="item-desc">${upgrade[item].effect.description}</div>\n</div>`;
            list += entry;
        });
        return list
    }

    const buildShop = () => {
        document.getElementById("helperList").innerHTML = buildHelpers();
        document.getElementById("upgradeList").innerHTML = buildUpgrades();
        $(".item-button").on('click', e => {
            itemID = e.target.id
            processRequest(itemID)
        });
    }

    const processRequest = item => {
        let total = 0
        if (helper.hasOwnProperty(item)) {
            total = Math.round(helper[item].price * (1.15**(getNumHelpers(item))))
            if (getTickets() >= total) addHelper(item)
        }
        else {
            total = upgrade[item].price
            if (getTickets() >= total && getNumHelpers(upgrade[item].for) >= 10) addUpgrade(item)
        }

        buildShop();
        removeTickets(total)
        updateValues()
        updateTPS()
    }
    buildShop();
    console.log(item)
    if (item == 'helper1') {
        window.open("../whackAMole/whackAMole.html");
    }
});