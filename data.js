const getState = () => {
    const state = localStorage.getItem('state')
    if(!state) {
        const newState = {
            balance: 0,
            score: 0,
            upgrades: {},
            helpers: {},
            multipliers: {'click': 1},
            username: ""
        }
        updateState(newState)
    }

    return JSON.parse(localStorage.getItem('state'))
}

const updateState = (newState) => {
    localStorage.setItem('state', JSON.stringify(newState))
}

const resetState = () => {
    const newState = {
        balance: 0,
        score: 0,
        upgrades: {},
        helpers: {},
        multipliers: {'click': 1},
        loggedIn: false,
        username: ""
    }
    updateState(newState)
}

const addTickets = (n) => {
    const state = getState()
    state.balance += n
    state.score += n
    updateState(state)
}

const removeTickets = (n) => {
    const state = getState()
    if(state.balance-n < 0) return
    state.balance -= n
    updateState(state)
}

const getTickets = () => {
    return getState().balance
}

const getScore = () => {
    return getState().score
}

const addUpgrade = (upgrade) => {
    const state = getState()
    state.upgrades[upgrade] = true
    updateState(state)
    addUpgradeMultiplier(upgrade)
}

const getUpgrades = () => {
    const state = getState()
    return state.upgrades
}

const ownsUpgrade = (upgrade) => {
    const state = getState()
    return (state.upgrades[upgrade])
}

const addUpgradeMultiplier = (upgrade) => {
    const state = getState()
    let need = upgradeLookup[upgrade]
    if(!need) return;
    let f = need.for
    let m = need.effect.multiplier

    if(!(f in state.multipliers)) {
        state.multipliers[f] = 1
    }

    state.multipliers[f]*=m
}

const addHelper = (helper) => {
    const state = getState()
    if(!(helper in state.helpers)) state.helpers[helper] = 0
    state.helpers[helper] += 1
    updateState(state)
}

const getHelpers = () => {
    const state = getState()
    return state.helpers
}

const getNumHelpers = (helper) => {
    const state = getState()
    if(!(helper in state.helpers)) return 0
    return state.helpers[helper]
}

const getUsername = () => {
    const state = getState()
    return state.username
}

const getMultiplier = (m) => {
    const state = getState()
    if(!(m in state.multipliers)) return 0
    return state.multipliers[m]
}

const upgradeLookup = {
    upgrade1: {
        name: "Bag of Candies",
        price: "100",
        for: "helper1",
        effect: {
            description: "Doubles the efficiency of kids.",
            multiplier: 2
        }
    },

    upgrade2: {
        name: "Arcade Bully",
        price: "1,000",
        for: "helper2",
        effect: {
            description: "Doubles the efficiency of arcade veterans.",
            multiplier: 2
        }
    },

    upgrade3: {
        name: "Baseball Bat",
        price: "10,000",
        for: "helper3",
        effect: {
            description: "Doubles the efficiency of broken machines.",
            multiplier: 2
        }
    },

    upgrade4: {
        name: "BFFs",
        price: "100,000",
        for: "helper4",
        effect: {
            description: "Doubles the efficiency of employees.",
            multiplier: 2
        }
    },

    upgrade5: {
        name: "Deep Pockets",
        price: "1,000,000",
        for: "helper5",
        effect: {
            description: "Doubles the efficiency of branch managers.",
            multiplier: 2
        }
    },

    upgrade6: {
        name: "Sweatshops",
        price: "10,000,000",
        for: "helper6",
        effect: {
            description: "Doubles the efficiency of ticket factories.",
            multiplier: 2
        }
    }
}