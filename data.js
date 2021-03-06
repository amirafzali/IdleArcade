const getState = () => {
    const state = localStorage.getItem('state')
    if(!state) {
        const newState = {
            balance: 0,
            score: 0,
            upgrades: {},
            helpers: {},
            multipliers: {'click': 1},
            username: "",
            tps: 0.0,
            minigamePath: ""
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
        username: "",
        tps: 0.0,
        minigamePath: ""
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
    updateState(state)
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
    if(!(m in state.multipliers)) return 1
    return state.multipliers[m]
}

const getTPS = () => {
    const state = getState()
    return state.tps
}

const updateTPS = () => {
    const state = getState();
    build = 0
    for(let helper of Object.keys(getHelpers())) 
    {
        let number = getHelpers()[helper]
        let comp = number*helperLookup[helper].effect.tps*getMultiplier(helper)
        build+=comp
    }
    state['tps'] = build
    updateState(state)
}


const getMinigamePath = () => {
    const state = getState()
    return state.minigamePath
}

const setMinigamePath = (path) => {
    const state = getState()
    state.minigamePath = path
    updateState(state)
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
    },

    upgrade7: {
        name: "Globalization",
        price: "200,000,000",
        for: "helper6",
        effect: {
            description: "Doubles the efficiency of arcade CEOs.",
            multiplier: 2
        }
    },

    upgrade8: {
        name: "Full Metal Alchemist",
        price: "3,000,000,000",
        for: "helper6",
        effect: {
            description: "Doubles the efficiency of alchemy.",
            multiplier: 2
        }
    },

    upgrade9: {
        name: "Intergalactic",
        price: "50,000,000,000",
        for: "helper6",
        effect: {
            description: "Doubles the efficiency of ticket aliens.",
            multiplier: 2
        }
    },

    upgrade10: {
        name: "Golden Token",
        price: "0",
        for: "click",
        effect: {
            description: "",
            multiplier: 10000
        }
    }
}

const helperLookup = {
    helper1: {
        name: "Kid",
        price: 10,
        effect: {
            description: "Recruit a kid to collect arcade tickets for you.",
            tps: 0.1
        }
    },

    helper2: {
        name: "Arcade Veteran",
        price: 100,
        effect: {
            description: "Recruit an arcade veteran to collect even more arcade tickets for you.",
            tps: 1
        }
    },

    helper3: {
        name: "Broken Machine",
        price: 1000,
        effect: {
            description: "Break open an arcade machine and pocket the tickets inside.",
            tps: 10
        }
    },

    helper4: {
        name: "Employee",
        price: 10000,
        effect: {
            description: "Become friends with an employee so they'll give you arcade tickets directly.",
            tps: 50
        }
    },

    helper5: {
        name: "Branch Manager",
        price: 100000,
        effect: {
            description: "Bribe a branch manager to give you his entire stock of tickets.",
            tps: 250
        }
    },

    helper6:{
        name: "Ticket Factory",
        price: 1000000,
        effect: {
            description: "Build a factory that produces arcade tickets automatically.",
            tps: 1250
        }
    },

    helper7:{
        name: "Arcade CEO",
        price: 20000000,
        effect: {
            description: "Befriend a CEO of an arcade companies, giving you access to all tickets in their posession.",
            tps: 10000
        }
    },

    helper8:{
        name: "Alchemy",
        price: 300000000,
        effect: {
            description: "Transmute worthless items like gold into more arcade tickets.",
            tps: 50000
        }
    },

    helper9:{
        name: "Aliens",
        price: 5000000000,
        effect: {
            description: "Otherwordly societies grant you their supply of arcade tickets.",
            tps: 275000
        }
    },
}