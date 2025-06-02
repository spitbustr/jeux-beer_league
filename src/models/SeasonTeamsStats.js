
export default class SeasonTeamsStats {
    static default = {
        wins: 0,
        losses: 0,
        ties: 0,
        goalsFor: 0,
        goalsAgainst: 0,
    }

    constructor(prop = {}) {
        Object.assign(this, SeasonTeamsStats.default, prop);
    }

    get gamesPlayed() {
        return (this.wins || 0)+(this.losses || 0)+(this.ties || 0)
    }
    get diff() {
        return (this.goalsFor || 0) - (this.goalsAgainst || 0)
    }
    get points() {
        return ((this.wins || 0)* 2) + ((this.ties || 0)* 1)
    }
}