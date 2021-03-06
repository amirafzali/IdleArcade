const helper = {
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
            tps: 1500
        }
    },

    helper7:{
        name: "Arcade CEO",
        price: 20000000,
        effect: {
            description: "Befriend a CEO of an arcade company, giving you access to all tickets in their posession.",
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
    }
}

const upgrade = {
    upgrade1: {
        name: "Bag of Candies",
        price: 100,
        for: "helper1",
        effect: {
            description: "Doubles the efficiency of kids.",
            multiplier: 2
        }
    },

    upgrade2: {
        name: "Arcade Bully",
        price: 1000,
        for: "helper2",
        effect: {
            description: "Doubles the efficiency of arcade veterans.",
            multiplier: 2
        }
    },

    upgrade3: {
        name: "Baseball Bat",
        price: 10000,
        for: "helper3",
        effect: {
            description: "Doubles the efficiency of broken machines.",
            multiplier: 2
        }
    },

    upgrade4: {
        name: "BFFs",
        price: 100000,
        for: "helper4",
        effect: {
            description: "Doubles the efficiency of employees.",
            multiplier: 2
        }
    },

    upgrade5: {
        name: "Deep Pockets",
        price: 1000000,
        for: "helper5",
        effect: {
            description: "Doubles the efficiency of branch managers.",
            multiplier: 2
        }
    },

    upgrade6: {
        name: "Sweatshops",
        price: 10000000,
        for: "helper6",
        effect: {
            description: "Doubles the efficiency of ticket factories.",
            multiplier: 2
        }
    },

    upgrade7: {
        name: "Globalization",
        price: 200000000,
        for: "helper6",
        effect: {
            description: "Doubles the efficiency of arcade CEOs.",
            multiplier: 2
        }
    },

    upgrade8: {
        name: "Full Metal Alchemist",
        price: 3000000000,
        for: "helper6",
        effect: {
            description: "Doubles the efficiency of alchemy.",
            multiplier: 2
        }
    },

    upgrade9: {
        name: "Intergalactic",
        price: 50000000000,
        for: "helper6",
        effect: {
            description: "Doubles the efficiency of aliens.",
            multiplier: 2
        }
    },
}