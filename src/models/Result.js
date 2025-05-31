
export default class Result {
    static default = {
        money: 0,
        beers: 0,
        players: [],
        injury: {
            games: 0,
        },
        missing: {
            games: 1,
            challenge: ""
        },
        item: {
            card: "",
            pick: 0,
            draw: 0,
        }
    }

    constructor(prop = {}) {
        Object.assign(this, Result.default, prop);
    }
}