const getState = () => {
    const state = localStorage.getItem('state')
    if(!state) {
        const newState = {
            balance: 0,
            score: 0,
            upgrades: {},
            helpers: {},
            multiplier: 1,
            loggedIn: false,
            username: ""
        }
        updateState(newState)
    }

    return JSON.parse(localStorage.getItem('state'))
}

const updateState = (newState) => {
    localStorage.setItem('state', JSON.stringify(newState))
}

const incrementMultiplier = (n) => {
    const state = getState()
    state.multiplier += n
    updateState(state)
}

const addTickets = (n) => {
    const state = getState()
    state.score += n
    updateState(state)
}

const removeTickets = (n) => {
    const state = getState()
    if(state.score-n < 0) return
    state.score -= n
    updateState(state)
}

const getTickets = () => {
    return getState().score
}

const addUpgrade = (upgrade) => {
    const state = getState()
    state.upgrades[upgrade] = true
    updateState(state)
}

const getUpgrades = () => {
    const state = getState()
    return state.upgrades
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

const getUsername = () => {
    const state = getState()
    return state.username
}