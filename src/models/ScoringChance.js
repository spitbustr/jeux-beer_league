
export default class ScoringChance {
    static default = {
        id: "",
        name: "",
        detail: "",
    }

    constructor(prop = {}) {
        Object.assign(this, ScoringChance.default, prop);
    }
}