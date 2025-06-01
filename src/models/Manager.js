
export default class Manager {
    static default = {
        infos: {
            image: "face_0_m",
            fullName: "Theo Boivin",
            gender: "m"
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