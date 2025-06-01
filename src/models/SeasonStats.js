
export default class SeasonStats {
    static default = {
        games: 0,
        goals: 0,
        assists: 0,
        pts: 0,
        penalty: 0,
    }

    constructor(prop = {}) {
        Object.assign(this, SeasonStats.default, prop);
    }
}