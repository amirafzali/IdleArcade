$(document).ready(() => {

    const buildHelpers = () => {
        const category = Object.keys(helper);
        list = ''
        category.forEach((item, e) => {
            let entry = '<div class="item-container"'
            if (e === category.length) {
                entry += 'style="margin:none"'
                console.log(item)
            }
            entry += '>\n'
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

    const showMinigame = (item) => {
        if (item == 'upgrade1') {
            setMinigamePath("../whackAMole/whackAMole.html")
        } else if (item == 'upgrade2') {
            setMinigamePath("../WaterClick/water.html")
        } else if (item == 'upgrade3') {
            setMinigamePath("../brickBreaker/index.html")
        } else if (item == 'upgrade4') {
            setMinigamePath("../FortuneWheel/wheel.html")
        } else if (item == 'upgrade5') {
            setMinigamePath("../Runner/index.html")
        }
        $("#popup").show()
    }

    const updateValues = () => {
        document.getElementById("mainScreenScoreInt").innerHTML = Number(getState().score.toFixed(0)).toLocaleString()
        document.getElementById("mainScreenBalanceInt").innerHTML = Number(getState().balance.toFixed(0)).toLocaleString()
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
        if(getMinigamePath()) return

        let total = 0
        if (helper.hasOwnProperty(item)) {
            total = Math.round(helper[item].price * (1.15**(getNumHelpers(item))))
            if (getTickets() >= total) addHelper(item)
        }
        else {
            if (getTickets() >= total && getNumHelpers(upgrade[item].for) >= 10) {
                total = upgrade[item].price
                addUpgrade(item)
                showMinigame(item)
            }
        }
        removeTickets(total)
        updateValues()
        updateTPS()
        buildShop();
    
    }

    buildShop();

    setInterval(() => {
        buildShop()
    }, 1000);
});