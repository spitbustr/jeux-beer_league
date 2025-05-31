
export default class Manager {
    static default = {
        infos: {
            image: "jersey_0",
            firstName: "",
            lastName: "",
        },
        stats: {
            relationship: 0,
            responsabiliy: 0,
            
        },
        items: {
            cards: [],
            money: 0,
       },
       team: {},

    }

    constructor(prop = {}) {
        Object.assign(this, Manager.default, prop);
    }
}